import './Header.css'
import PSGLogo from '../../assets/PSG Logo.png';
import GithubLogo from '../../assets/GithubLogo.png';

const Header = ()=>{
  return(
    <>
    <div className="navbar">
      <img src={PSGLogo} className="psglogo" />
      <img src={GithubLogo} className="githublogo" />
    </div>
    </>
  )
}

export default Header;