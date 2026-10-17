import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { intelligence } from '../../data/services';
import { useSectionLink } from '../../hooks/useSectionLink';
import { useVaultFilter } from '../../hooks/useVaultFilter';
import { chunkText, rank, tokenize, type Chunk } from '../../utils/retrieval';
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

const SAMPLE_QUESTIONS = [
  'How long do refunds take?',
  'Can I return a product?',
  'How fast is delivery?',
  'When is installation support available?',
];

/** Split text into sentences (keeps the original wording for display). */
function sentencesOf(text: string): Chunk[] {
  return text
    .split(/(?<=[.!?])\s+|\n+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 3)
    .map((t, id) => ({ id, text: t, tokens: tokenize(t) }));
}

/** Wrap words whose stem matched the question in <mark>. */
function Highlight({ text, matched }: { text: string; matched: string[] }) {
  const set = new Set(matched);
  return (
    <>
      {text.split(/(\s+)/).map((part, i) => {
        const stem = tokenize(part)[0];
        return stem && set.has(stem) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>;
      })}
    </>
  );
}

function RetrievalPlayground() {
  const [doc, setDoc] = useState(SAMPLE);
  const [size, setSize] = useState(40);
  const [question, setQuestion] = useState(SAMPLE_QUESTIONS[0]);
  const chunks = useMemo(() => chunkText(doc, size, Math.round(size * 0.2)), [doc, size]);
  const results = useMemo(() => rank(question, chunks).slice(0, 3), [question, chunks]);
  // Best sentence: the one covering the most distinct question words, then the highest score.
  const answer = useMemo(
    () => rank(question, sentencesOf(doc)).sort((x, y) => y.matched.length - x.matched.length || y.score - x.score)[0],
    [question, doc],
  );
  const top = results[0]?.score ?? 1;

  return (
    <div className="playground">
      <div className="playground__head">
        <div>
          <h3 className="playground__title">Try it: ask a document</h3>
          <p className="playground__intro">
            This is the first step of an AI assistant that answers from a company's own documents. Ask a question and it finds the exact
            part of the document that answers it, instantly.
          </p>
        </div>
        <span className="pill">Live demo · runs in your browser</span>
      </div>

      <div className="ask">
        <label htmlFor="pg-q" className="sr-only">Your question</label>
        <input id="pg-q" className="ask__input" type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask anything about the document below…" />
        <div className="ask__chips" role="group" aria-label="Example questions">
          {SAMPLE_QUESTIONS.map((q) => (
            <button key={q} type="button" className={`ask__chip ${q === question ? 'is-active' : ''}`} onClick={() => setQuestion(q)}>
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className="answer" aria-live="polite">
        <p className="answer__label">Answer found in the document</p>
        {answer ? (
          <p className="answer__text"><Highlight text={answer.chunk.text} matched={answer.matched} /></p>
        ) : (
          <p className="answer__text answer__text--empty">Nothing in the document matches that question yet. Try one of the examples.</p>
        )}
      </div>

      <div className="playground__grid">
        <div className="field">
          <label htmlFor="pg-doc">The document <span className="field__opt">(edit it, paste your own)</span></label>
          <textarea id="pg-doc" rows={8} value={doc} onChange={(e) => setDoc(e.target.value)} />
        </div>
        <div className="field">
          <p className="field__label">How it decided</p>
          <ol className="results" aria-label="Most relevant passages">
            {results.length === 0 && <li className="results__empty">No passage shares words with the question.</li>}
            {results.map((r, i) => (
              <li key={r.chunk.id}>
                <div className="results__meta">
                  <span>{i === 0 ? 'Best match' : `Match ${i + 1}`}</span>
                  <span className="results__bar" style={{ ['--w' as string]: `${(r.score / top) * 100}%` }} aria-hidden="true" />
                  <span>{Math.round((r.score / top) * 100)}%</span>
                </div>
                <p><Highlight text={r.chunk.text} matched={r.matched} /></p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <details className="playground__adv">
        <summary>How this works (for developers)</summary>
        <p>
          The document is split into overlapping passages and scored against the question with BM25 keyword ranking. A production
          system (RAG) would use embeddings and vector search, then pass the best passages to a language model through a secure backend.
        </p>
        <label htmlFor="pg-size">Passage size: <strong>{size} words</strong>, {chunks.length} passages</label>
        <input id="pg-size" type="range" min={15} max={90} step={5} value={size} onChange={(e) => setSize(Number(e.target.value))} />
      </details>
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
