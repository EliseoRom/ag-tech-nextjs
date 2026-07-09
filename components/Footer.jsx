"use client";

export default function Footer() {
  return (
    <footer>
      <div className="foot-top">
        <div className="foot-brand">
          <h5>Properties Technological Solutions.</h5>
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
          <a href="mailto:hola@ag-tech.studio">hola@ag-tech.studio</a>
          <a href="#">+34 600 000 000</a>
          <a href="#">LinkedIn</a>
          <a href="#">Instagram</a>
        </div>
      </div>
      <div className="foot-bottom">
        <span>© 2026 Properties Technological Solutions. All rights reserved.</span>
        <span>Made with obsession in Barcelona ↘</span>
      </div>
    </footer>
  );
}
