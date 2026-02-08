import "./Footer.css";
import { Link } from "react-router-dom";
import LinkedIn from "../../images/LinkedIn.png";
import Github from "../../images/github.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__home-and-tripleten-container">
          <Link to="/">
            <button type="button" className="footer__home-btn">
              Home
            </button>
          </Link>
          <p className="footer__triple-ten-text">TripleTen</p>
        </div>
        <div className="footer__logo-container">
          <img src={Github} alt="Githublogo" className="footer__github-logo" />
          <img
            src={LinkedIn}
            alt="LinkedInLogo"
            className="footer__linkedin-logo"
          />
        </div>
      </div>
      <div className="footer__text-container">
        <p className="footer__text">© 2024 Supersite, Powered by News API</p>
      </div>
    </footer>
  );
}

export default Footer;
