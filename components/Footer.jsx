"use client";

import { SITE_NAME } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="foot-top">
        <div className="foot-brand">
          <h5>{SITE_NAME}.</h5>
          <p>
            Digital studio specializing in premium products, intelligent
            automation, and immersive experiences. Barcelona — Madrid — remote.
          </p>
        </div>
        <div className="foot-col">
          <h6>Services</h6>
          <a href="#">Web development</a>
          <a href="#">Automation</a>
          <a href="#">360° tours</a>
          <a href="#">Brand identity</a>
        </div>
        <div className="foot-col">
          <h6>Studio</h6>
          <a href="#">Philosophy</a>
          <a href="#">Case studies</a>
          <a href="#">Process</a>
          <a href="#">Team</a>
        </div>
        <div className="foot-col">
          <h6>Contact</h6>
        </div>
      </div>
      <div className="foot-copyright">
        <h6>Copyright</h6>
        <p>
          © {year} {SITE_NAME}. All rights reserved. The design, copy,
          software, and visual assets of this website are the exclusive
          intellectual property of {SITE_NAME}. Reproduction, distribution,
          or use without prior written authorization is prohibited.
        </p>
      </div>
      <div className="foot-bottom">
        <span>
          © {year} {SITE_NAME}. All rights reserved.
        </span>
        <span>Made with obsession in Barcelona ↘</span>
      </div>
    </footer>
  );
}
