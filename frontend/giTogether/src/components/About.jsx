import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>About Git Together</h1>
      <div className="glass-card">
        <h2>Round 1: Github Speed Run (Individual, No Teams, No Elimination)</h2>
        <p>
          Participants will race individually to navigate from one GitHub article to another within the shortest time possible. This round encourages quick thinking and resourcefulness, with all participants receiving credit for their efforts. This engaging warm-up round aims to energize participants and introduce them to friendly competition.
        </p>
        <h2>Round 2: Box of Lies (Team Formation)</h2>
        <p>
          Participants will form teams in this round. Teams will be presented with a selection of unusual items, and one team member will describe an item to another team, who must guess if the description is true or a lie. Depending on the number of participants, this round may or may not include elimination, ensuring a fair chance for everyone to engage.
        </p>
        <h2>Round 3: Marketing Silly Things (Teams with More Points Win)</h2>
        <p>
          In the final round, each team will be given quirky or unconventional objects and asked to create a marketing pitch. Teams will earn points based on creativity, humor, and presentation style, with the highest-scoring team declared the winner of the event. This round promotes collaboration and innovation, giving participants an opportunity to showcase their skills in a fun, lighthearted way.
        </p>
      </div>
    </div>
  );
};

export default About;