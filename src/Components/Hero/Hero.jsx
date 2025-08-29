import React from "react";
import "./Hero.css";
import sakshis from "../../assets/sakshis.png";
import AnchorLink from "react-anchor-link-smooth-scroll";
const Hero = () => {
  return (
    <div id="home" className="hero">
      <img src={sakshis} alt="" />
      <h1>
        Hi,I'm Satyam Sachan <span className="span">Full-Stack developer</span>{" "}
        based in (Kanpur)India.
      </h1>
      <p>
        I have a passion for building seamless,beautiful, and creative
        websites.with hands-on experience in a wide range of programming
        languages and web technologies, I specialize in crafting user-friendly
        and visually appealing digital experience.
      </p>
      <div className="hero-action">
        <div className="hero-connect">
          <AnchorLink className="anchor-link" offset={50} href="#contact">
            Connect with me{" "}
          </AnchorLink>
        </div>
        <div className="hero-resume">
          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="resume-btn"
          >
            My Resume
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
