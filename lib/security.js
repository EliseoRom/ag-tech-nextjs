const MAX_PATH_LENGTH = 512;
const MAX_QUERY_LENGTH = 512;
const ALLOWED_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

const PROBE_PATHS =
  /(?:^|\/)(?:\.env(?:\..+)?|\.git|\.svn|\.htaccess|\.aws|\.ssh|id_rsa|credentials|docker-compose|composer\.(?:json|lock)|package-lock\.json|wp-admin|wp-login|xmlrpc\.php|phpmyadmin|phpinfo|adminer|cgi-bin|server-status|actuator|vendor\/phpunit|autoload\.php)(?:\/|$)/i;

const INJECTION =
  /(?:<script|<\/script|javascript:|vbscript:|data:text\/html|on(?:error|load|click|mouseover|focus)\s*=|union\s+select|drop\s+table|insert\s+into|benchmark\s*\(|sleep\s*\(|or\s+1\s*=\s*1|;\s*waitfor|\$\{|eval\s*\(|%\s*0\s*0|\\x00|\.\.(?:\/|\\)|%2e%2e|%252e|%c0%ae)/i;

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

export function requestIsBlocked(request) {
  const method = request.method.toUpperCase();
  if (!ALLOWED_METHODS.has(method)) return true;

  const { pathname, search } = request.nextUrl;

  if (pathname.length > MAX_PATH_LENGTH || search.length > MAX_QUERY_LENGTH) {
    return true;
  }

  const raw = `${pathname}${search}`;
  if (raw.includes("\0") || /%00/i.test(raw)) return true;

  const decoded = safeDecode(raw);
  if (decoded == null) return true;

  const haystack = `${raw}\n${decoded}`.toLowerCase();
  if (PROBE_PATHS.test(haystack) || INJECTION.test(haystack)) return true;
  if (/\.(?:php|asp|aspx|jsp)(?:\/|\?|$)/i.test(haystack)) return true;

  return false;
}
