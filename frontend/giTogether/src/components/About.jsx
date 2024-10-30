import './About.css';
import { FaGithub, FaUsers, FaBullhorn } from 'react-icons/fa';

const About = () => {
  return (
    <div className="about-container">
      <h1 className="abouttxt">About Git Together</h1>
      <div className="glass-card">
        <h2><FaGithub /> Round 1: Github Speed Run (Individual, No Teams, No Elimination)</h2>
        <ul>
          <li>Race individually to navigate between GitHub articles quickly.</li>
          <li>Encourages quick thinking and resourcefulness.</li>
          <li>All participants receive credit for their efforts.</li>
          <li>Engaging warm-up to energize participants and introduce friendly competition.</li>
        </ul>
      </div>
      <div className="glass-card">
        <h2><FaUsers /> Round 2: Box of Lies (Team Formation)</h2>
        <ul>
          <li>Form teams and receive a selection of unusual items.</li>
          <li>Describe an item to your team, who must guess if it's true or a lie.</li>
          <li>May include elimination based on participant numbers.</li>
          <li>Ensures a fair chance for everyone to engage.</li>
        </ul>
      </div>
      <div className="glass-card">
        <h2><FaBullhorn /> Round 3: Marketing Silly Things (Team with Most Points Wins)</h2>
        <ul>
          <li>Create marketing pitches for quirky or unconventional objects.</li>
          <li>Earn points based on creativity, humor, and presentation style.</li>
          <li>Highest-scoring team declared the winner.</li>
          <li>Promotes collaboration and innovation in a fun, lighthearted way.</li>
        </ul>
      </div>
    </div>
  );
};

export default About;