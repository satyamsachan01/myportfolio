import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { intelligence } from '../../data/services';
import { useSectionLink } from '../../hooks/useSectionLink';
import { useVaultFilter } from '../../hooks/useVaultFilter';
import { chunkText, rank } from '../../utils/retrieval';
import { KnowledgeChamber } from '../ui/WorldObjects';
import { SectionHeader } from '../ui/SectionHeader';
import { Reveal } from '../ui/Reveal';

const SAMPLE = `Sample document: support policy for an example store.
Orders are processed within two business days and shipped with a tracking number by email.
Standard delivery takes three to six business days across India; express delivery takes one to two days in metro cities.
Returns are accepted within seven days of delivery if the product is unused and in its original packaging.
Refunds are issued to the original payment method within five to seven business days after the returned item is inspected.
Installation support is available on weekdays from 10 am to 6 pm. Annual maintenance contracts include two scheduled visits and priority call-outs.
For bulk or business orders, please request a quotation with quantities, delivery location and required timeline.`;

function Pipeline() {
  const [active, setActive] = useState(0);
  const stages = intelligence.pipeline;
  const stage = stages[active];
  return (
    <div className="pipeline">
      <ol className="pipeline__track">
        {stages.map((s, i) => (
          <li key={s.id}>
            <button type="button" className={`pipeline__stage ${i === active ? 'is-active' : ''} ${i < active ? 'is-past' : ''}`} aria-pressed={i === active} onClick={() => setActive(i)}>
              <span className="pipeline__n">{String(i + 1).padStart(2, '0')}</span>
              <span>{s.label}</span>
            </button>
          </li>
        ))}
      </ol>
      <motion.div key={stage.id} className="pipeline__detail" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} aria-live="polite">
        <h4>{stage.label}</h4>
        <p>{stage.text}</p>
        <p className="pipeline__how">{stage.detail}</p>
      </motion.div>
    </div>
  );
}

function RetrievalPlayground() {
  const [doc, setDoc] = useState(SAMPLE);
  const [size, setSize] = useState(40);
  const [question, setQuestion] = useState('How long do refunds take?');
  const chunks = useMemo(() => chunkText(doc, size, Math.round(size * 0.2)), [doc, size]);
  const results = useMemo(() => rank(question, chunks).slice(0, 3), [question, chunks]);
  const top = results[0]?.score ?? 1;

  return (
    <div className="playground">
      <div className="playground__head">
        <h3 className="world__subhead">Retrieval playground</h3>
        <span className="pill">Runs in your browser · no AI model</span>
      </div>
      <p className="playground__intro">
        Stages 02 and 03 of the pipeline, working for real: your text is split into overlapping chunks and ranked against a question with BM25 keyword scoring.
        A production RAG system would use embeddings and vector search, then send the top chunks to a language model through a secure backend.
      </p>
      <div className="playground__grid">
        <div className="field">
          <label htmlFor="pg-doc">Document</label>
          <textarea id="pg-doc" rows={9} value={doc} onChange={(e) => setDoc(e.target.value)} />
          <div className="field__row">
            <label htmlFor="pg-size">Chunk size: <strong>{size} words</strong> → {chunks.length} chunks</label>
            <input id="pg-size" type="range" min={15} max={90} step={5} value={size} onChange={(e) => setSize(Number(e.target.value))} />
          </div>
        </div>
        <div className="field">
          <label htmlFor="pg-q">Question</label>
          <input id="pg-q" type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask about the document…" />
          <ol className="results" aria-live="polite" aria-label="Most relevant chunks">
            {results.length === 0 && <li className="results__empty">No chunk shares keywords with that question yet.</li>}
            {results.map((r) => (
              <li key={r.chunk.id}>
                <div className="results__meta">
                  <span>Chunk #{r.chunk.id + 1}</span>
                  <span className="results__bar" style={{ ['--w' as string]: `${(r.score / top) * 100}%` }} aria-hidden="true" />
                  <span>{r.score.toFixed(2)}</span>
                </div>
                <p>{r.chunk.text}</p>
                <p className="results__matched">Matched: {r.matched.join(', ')}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export function AIProducts() {
  const go = useSectionLink();
  const setFilter = useVaultFilter((s) => s.set);

  return (
    <section id="intelligence" className="section section--alt world" style={{ ['--world' as string]: 'var(--w-ai)' }} aria-labelledby="intelligence-title">
      <div className="container">
        <SectionHeader chapter="intelligence" aside={<KnowledgeChamber />} eyebrow={intelligence.eyebrow} title={intelligence.title} accent={intelligence.accent} lead={intelligence.description} id="intelligence-title" />

        <ul className="capabilities">
          {intelligence.capabilities.map((c, i) => (
            <Reveal as="li" key={c} delay={(i % 6) * 0.04}>{c}</Reveal>
          ))}
        </ul>

        <h3 className="world__subhead">From business data to useful output</h3>
        <Pipeline />
        <RetrievalPlayground />

        <div className="ai__foot">
          <div>
            <p className="ai__label">Tools in this world</p>
            <ul className="tag-list">{intelligence.tech.map((t) => <li key={t} className="tag">{t}</li>)}</ul>
          </div>
          <p className="ai__disclaimer">
            AI work is shown as clearly labelled experiments and concepts. Live AI demos need a backend that holds API keys or a running local model. Keys never go into frontend code.
          </p>
          <a
            href="/#projects"
            className="btn world__cta"
            onClick={(e) => {
              setFilter('ai');
              go('projects')(e);
            }}
          >
            Explore AI projects <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
