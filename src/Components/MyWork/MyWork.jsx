import React from "react";
import "./MyWork.css";
import theme_pattern from "../../assets/theme_pattern.svg";
import mywork_data from "../../assets/mywork_data";
import arrow_icon from "../../assets/arrow_icon.svg";

const MyWork = () => {
  return (
    <div id="work" className="mywork">
      {/* Section Title */}
      <div className="mywork-title">
        <h1>My Projects</h1>
        <img src={theme_pattern} alt="pattern" />
      </div>

      {/* Projects Grid */}
      <div className="mywork-container">
        {mywork_data.map((project) => (
          <div key={project.w_no} className="project-card">
            <img
              src={project.w_img}
              alt={project.w_name}
              className="project-img"
            />
            <h3>{project.w_name}</h3>
            <p className="technologies">
              Technologies: {project.technologies.join(", ")}
            </p>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
            >
              View Link
            </a>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      <div className="mywork-showmore">
        <p>Show More</p>
        <img src={arrow_icon} alt="arrow" />
      </div>
    </div>
  );
};

export default MyWork;
