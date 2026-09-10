const MAX_PATH_LENGTH = 512;
const MAX_QUERY_LENGTH = 512;
const MAX_QUERY_PARAMS = 24;
const ALLOWED_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

const PROBE_PATHS =
  /(?:^|\/)(?:\.env(?:\..+)?|\.git|\.svn|\.hg|\.htaccess|\.htpasswd|\.aws|\.ssh|\.docker|\.kube|id_rsa|credentials|docker-compose|composer\.(?:json|lock)|package-lock\.json|yarn\.lock|pnpm-lock\.yaml|wp-admin|wp-login|wp-content|wp-includes|xmlrpc\.php|phpmyadmin|phpinfo|adminer|cgi-bin|server-status|actuator|vendor\/phpunit|autoload\.php|config\.json|web\.config|crossdomain\.xml|\.well-known\/security\.txt\.bak)(?:\/|$)/i;

const INJECTION =
  /(?:<script|<\/script|javascript:|vbscript:|data:text\/html|on(?:error|load|click|mouseover|focus|submit)\s*=|union\s+select|drop\s+table|insert\s+into|benchmark\s*\(|sleep\s*\(|or\s+1\s*=\s*1|;\s*waitfor|\$\{jndi:|\$\{|eval\s*\(|%\s*0\s*0|\\x00|\.\.(?:\/|\\)|%2e%2e|%252e|%c0%ae|base64_decode|passthru|shell_exec|system\s*\()/i;

const BAD_UA =
  /(?:sqlmap|nikto|nmap|masscan|zgrab|dirbuster|gobuster|wfuzz|acunetix|nessus|openvas|havij|w3af|scrapy|semrushbot|ahrefsbot|mj12bot|petalbot|bytespider|gptbot|ccbot)/i;

function safeDecode(value) {
  let current = value;
  for (let i = 0; i < 3; i += 1) {
    try {
      const next = decodeURIComponent(current.replace(/\+/g, " "));
      if (next === current) break;
      current = next;
    } catch {
      return null;
    }
  }
  return current;
}

function countQueryParams(search) {
  if (!search || search === "?") return 0;
  return search
    .replace(/^\?/, "")
    .split("&")
    .filter(Boolean).length;
}

export function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

/** Simple sliding-window rate limit (per edge isolate). */
const hitBuckets = new Map();
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 120;

export function isRateLimited(ip) {
  const now = Date.now();
  let bucket = hitBuckets.get(ip);
  if (!bucket || now - bucket.start > RATE_WINDOW_MS) {
    bucket = { start: now, count: 0 };
    hitBuckets.set(ip, bucket);
  }
  bucket.count += 1;

  if (hitBuckets.size > 5_000) {
    for (const [key, value] of hitBuckets) {
      if (now - value.start > RATE_WINDOW_MS) hitBuckets.delete(key);
    }
  }

  return bucket.count > RATE_MAX;
}

export function requestIsBlocked(request) {
  const method = request.method.toUpperCase();
  if (!ALLOWED_METHODS.has(method)) return true;

  const { pathname, search } = request.nextUrl;

  if (pathname.length > MAX_PATH_LENGTH || search.length > MAX_QUERY_LENGTH) {
    return true;
  }

  if (countQueryParams(search) > MAX_QUERY_PARAMS) return true;

  const ua = request.headers.get("user-agent") || "";
  if (!ua || ua.length < 8 || BAD_UA.test(ua)) return true;

  // Reject oversized headers often used in smuggling/DoS probes
  const rawHeadersLen =
    (request.headers.get("cookie") || "").length +
    (request.headers.get("referer") || "").length +
    ua.length;
  if (rawHeadersLen > 8_192) return true;

  const raw = `${pathname}${search}`;
  if (raw.includes("\0") || /%00/i.test(raw)) return true;

  const decoded = safeDecode(raw);
  if (decoded == null) return true;

  const haystack = `${raw}\n${decoded}`.toLowerCase();
  if (PROBE_PATHS.test(haystack) || INJECTION.test(haystack)) return true;
  if (/\.(?:php|asp|aspx|jsp|cgi|exe|dll|bat|cmd|sh)(?:\/|\?|$)/i.test(haystack)) {
    return true;
  }

  // Block double-encoded / weird traversal
  if (/%2e%2e|%252e|%c0%ae|\.\.%2f|\.\.%5c/i.test(raw)) return true;

  return false;
}
