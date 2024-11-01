import './Footer.css';
import Instagram from '../../assets/Instagram.png';
import Linkedin from '../../assets/Linkedin.png';

const Footer = () => {
  return (
    <>
    <div className="footer">
      <div className="container">
        <div className="logo">
          <a href="https://www.instagram.com/githubcampusclub.psgtech" target='__blank'>
            <img className="social" src={Instagram}/>
          </a>
          <a href="https://www.linkedin.com/company/github-campus-club-psgtech/" target='__blank'>
            <img className="social" src={Linkedin}/>
          </a>
        </div>
        <div className="contact">
          <p>Contact:</p>
          <p>Adhish Krishna S - 8217896832</p>
          <p>Logavarshini K - 6380031439</p>
          <p>Eswari - 7010674015</p>
        </div>
      </div>
      <div className="copyright">
        <p>2024 Copyright. Github Campus Club PSGCT. All Rights Reserved</p>
      </div>
    </div>
    </>
  );
};

export default Footer;