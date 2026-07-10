import React from "react";
import sakshis from "../../assets/sakshis.png";

const Hero = () => (
  <main id="home" className="hero section-shell">
    <div className="hero-copy">
      <div className="eyebrow"><span className="status-dot" /> Available for freelance & full-time roles</div>
      <h1>I build websites that <span>look sharp</span> and work harder.</h1>
      <p>Full-Stack & CMS Developer creating high-performance React, WordPress and Shopify experiences for ambitious businesses.</p>
      <div className="hero-actions"><a className="button primary" href="#work">Explore my work <span>↗</span></a><a className="button secondary" href="/Resume.pdf" target="_blank" rel="noreferrer">View resume</a></div>
      <div className="trust-row"><div><strong>04+</strong><span>Years experience</span></div><div><strong>10+</strong><span>Projects shipped</span></div><div><strong>15+</strong><span>Happy clients</span></div></div>
    </div>
    <div className="hero-visual">
      <div className="orbit orbit-one" /><div className="orbit orbit-two" />
      <div className="profile-card"><div className="profile-glow" /><img src={sakshis} alt="Satyam Sachan, web developer" /></div>
      <div className="floating-chip chip-code"><span>⌘</span> Clean code</div><div className="floating-chip chip-cms"><span>W</span> WordPress</div><div className="floating-chip chip-shop"><span>◆</span> Shopify</div>
    </div>
  </main>
);
export default Hero;
