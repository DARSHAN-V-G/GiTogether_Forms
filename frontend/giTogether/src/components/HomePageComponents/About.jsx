import './About.css';
import { FaGithub, FaUsers, FaBullhorn } from 'react-icons/fa';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    // Scroll the About component into view when it mounts
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    // Set initial opacity and clear properties
    gsap.set('.glass-card', {
      opacity: 1,
      clearProps: "all"
    });

    // Animate the cards with gsap
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          end: "top center",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        duration: 0.5,
        delay: index * 0.2,
        ease: "power2.out"
      });
    });
  }, []);

  return (
    <div ref={aboutRef} className="about-container">
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