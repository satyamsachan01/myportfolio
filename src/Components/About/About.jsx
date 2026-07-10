import React from "react";
import saty from "../../assets/saty.png";

const About = () => (
  <section id="about" className="about section-shell section-block">
    <div className="section-heading"><span className="section-no">01</span><div><p className="kicker">A little about me</p><h2>Developer mindset.<br/><span>Business focus.</span></h2></div></div>
    <div className="about-grid">
      <div className="about-photo"><img src={saty} alt="Satyam Sachan" /><div className="photo-label"><span>Based in</span><strong>Kanpur, India</strong></div></div>
      <div className="about-content"><p className="lead">I turn complex ideas into fast, accessible and easy-to-manage digital products.</p><p>My work sits at the intersection of design and engineering. From a polished React interface to a custom WordPress build or a conversion-ready Shopify store, I focus on details users notice and systems clients can actually manage.</p><p>I also handle technical SEO, malware cleanup, performance improvements and ongoing website care—so the final product stays secure and valuable after launch.</p>
        <div className="principles"><div><span>01</span><strong>Responsive by default</strong></div><div><span>02</span><strong>Performance focused</strong></div><div><span>03</span><strong>Built to be editable</strong></div></div>
      </div>
    </div>
  </section>
);
export default About;
