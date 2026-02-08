import "./About.css";
import Avatar from "../../images/avatar.png";

function About() {
  return (
    <section className="about">
      <img src={Avatar} alt="Avatar" className="about__avatar" />
      <div className="about__author-container">
        <h2 className="about__title">About the author</h2>
        <p className="about__description">
          Hello, my name is Tajgi Fields. An aspiring software engineer with a
          strong background in music and video gaming. Around a year ago, I
          began my TripleTen journey with zero experience about coding. All of
          my computer skills came from being a audio engineer. It was
          intimidating at first, but with hard work and determination, I made
          it. I look forward to my job search, and am confident that I am
          equipped with the knowledge and resources to be a very successful
          developer.
        </p>
      </div>
    </section>
  );
}

export default About;
