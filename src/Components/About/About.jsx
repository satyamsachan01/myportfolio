import React from "react";
import "./About.css";
import theme_pattern from "../../assets/theme_pattern.svg";
import saty from "../../assets/saty.png";

const About = () => {
  return (
    <div id="about" className="about">
      <div className="about-title">
        <h1>About me</h1>
        <img src={theme_pattern} alt="" />
      </div>
      <div className="about-sections">
        <div className="about-left">
          <img src={saty} alt="" />
        </div>
        <div className="about-right">
          <div className="about-para">
            <p>
              I am a developer skilled in HTML & CSS, React JS, Core Java, and
              JavaScript, passionate about building responsive and user-friendly
              web applications.
            </p>
            <p>
              My solid foundation in front-end and back-end development enables
              me to craft seamless digital experiences, from interactive
              interfaces to robust functionality.
            </p>
          </div>
          <div className="about-skills">
            <div className="about-skill">
              <p>HTML & CSS</p>
              <hr style={{ width: "50%" }} />
            </div>
            <div className="about-skill">
              <p>React JS</p>
              <hr style={{ width: "70%" }} />
            </div>
            <div className="about-skill">
              <p>Core Java</p>
              <hr style={{ width: "60%" }} />
            </div>
            <div className="about-skill">
              <p>JavaScript</p>
              <hr style={{ width: "30%" }} />
            </div>
          </div>
          <div className="about-achievements">
            <div className="about-achievement">
              <h1>00+</h1>
              <p>Years of Experience</p>
            </div>
            <hr />
            <div className="about-achievement">
              <h1>03+</h1>
              <p>Project completed</p>
            </div>
            <hr />
            <div className="about-achievement">
              <h1>00+</h1>
              <p>Happy clients</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
