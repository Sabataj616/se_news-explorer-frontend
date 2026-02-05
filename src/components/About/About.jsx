import "./About.css";
import Avatar from "../../assets/avatar.png";

function About() {
  return (
    <div className="about__container">
      <img src={Avatar} alt="Avatar" className="about__avatar" />
      <div className="about-author__container">
        <h1 className="about__title">About the author</h1>
        <p className="about__description">
          Hello, my name is Tajgi Fields. An aspiring software engineer with a
          strong background in music and video gaming. Around a year ago, I
          began my TripleTen journey with zero experience about coding. All of my computer skills came from being a audio engineer. It was
          intimidating at first, but with hard work and determination, I made
          it. I look forward to my job search, and am confident that I am
          equipped with the knowledge and resources to be a very successful
          developer.
        </p>
      </div>
    </div>
  );
}

export default About;
