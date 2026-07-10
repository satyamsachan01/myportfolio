import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="navbar">
      <a className="brand" href="#home" aria-label="Satyam Sachan home">
        <span className="brand-mark">SS</span><span>Satyam<span className="accent">.</span></span>
      </a>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>{open ? "×" : "☰"}</button>
      <nav className={open ? "nav-menu open" : "nav-menu"}>
        <a href="#about" onClick={close}>About</a><a href="#services" onClick={close}>Expertise</a><a href="#work" onClick={close}>Work</a><a href="#contact" onClick={close}>Contact</a>
      </nav>
      <a className="nav-cta" href="#contact">Let's work <span>↗</span></a>
    </header>
  );
};
export default Navbar;
