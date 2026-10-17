import { faqs } from '../../data/faq';
import { Reveal } from '../ui/Reveal';

/** Plain questions and answers. Mirrors the FAQPage structured data exactly. */
export function Faq() {
  return (
    <section id="faq" className="section faq" aria-labelledby="faq-title">
      <div className="container faq__inner">
        <div className="faq__head">
          <Reveal><p className="eyebrow">Questions</p></Reveal>
          <Reveal delay={0.08}>
            <h2 id="faq-title" className="section-title">Frequently asked <span className="accent">questions.</span></h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="section-lead">Short answers to what clients and recruiters usually ask first.</p>
          </Reveal>
        </div>
        <div className="faq__list">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={Math.min(i, 4) * 0.04}>
              <details className="faq__item" open={i === 0}>
                <summary><h3>{f.q}</h3><span aria-hidden="true">+</span></summary>
                <p>{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
