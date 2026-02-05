import "./Footer.css";
import { Link } from "react-router-dom";
import LinkedIn from "../../assets/LinkedIn.png";
import Github from "../../assets/github.png";

function Footer() {
  return (
    <div className="footer__container">
  <div className="footer__top">
    <div className="home-and-tripleten__container">
      <Link to="/">
        <button type="button" className="footer__home-btn">Home</button>
      </Link>
      <p className="footer__triple-ten-text">TripleTen</p>
    </div>
    <div className="logo__container">
      <img src={Github} alt="Githublogo" className="github__logo" />
      <img src={LinkedIn} alt="LinkedInLogo" className="linkedin__logo" />
    </div>
  </div>
  <div className="footer-text__container">
    <p className="footer__text">© 2024 Supersite, Powered by News API</p>
  </div>
</div>
  );
}

export default Footer;
