import { useMemo, useState } from 'react';

export default function PracticeCard({ questions, answer, onAnswer, onResult, onAddQuestion, compact = false }) {
  const [index, setIndex] = useState(0);
  const [level, setLevel] = useState('Все уровни');
  const [showExplanation, setShowExplanation] = useState(false);
  const filtered = useMemo(() => questions.map((question, sourceIndex) => ({ question, sourceIndex })).filter(({ question }) => level === 'Все уровни' || question.level === level), [questions, level]);
  const safeIndex = Math.min(index, Math.max(filtered.length - 1, 0));
  const current = filtered[safeIndex];
  if (!current) return <div className="empty">Для выбранного уровня вопросов пока нет.</div>;
  const move = (direction) => {
    setIndex((safeIndex + direction + filtered.length) % filtered.length);
    setShowExplanation(false);
  };
  const result = (kind) => {
    onResult(kind, current.question);
    onAnswer('');
    move(1);
  };
  return (
    <div className={`practice-card ${compact ? 'compact' : ''}`}>
      <div className="practice-meta"><span>{current.question.section} · {current.question.level}</span><span>{safeIndex + 1} / {filtered.length}</span></div>
      <p className="practice-q">{current.question.q}</p>
      <textarea className="answer" value={answer} onChange={(event) => onAnswer(event.target.value)} placeholder="Сначала ответь своими словами…" />
      <div className="answer-actions"><span className="field-label">Сначала подумай сам — подсказка ниже 🙂</span><button className="btn primary" onClick={() => setShowExplanation((value) => !value)}>{showExplanation ? 'Скрыть разбор' : 'Показать разбор'}</button></div>
      {showExplanation && <div className="explanation"><p>{current.question.a}</p><pre className="code"><code>{current.question.code || '// Добавь пример, когда будешь готов'}</code></pre><div className="practice-bottom"><button className="btn small" onClick={() => result('good')}>Ответил уверенно</button><button className="btn small" onClick={() => result('repeat')}>Повторить вопрос</button><button className="btn small ghost" onClick={() => result('error')}>Записать ошибку</button></div></div>}
      <div className="practice-nav"><button className="btn small" onClick={() => move(-1)}>Предыдущий</button><div className="practice-nav-right">{!compact && <><select className="select" value={level} onChange={(event) => { setLevel(event.target.value); setIndex(0); setShowExplanation(false); }}><option>Все уровни</option><option>Стажёр</option><option>Junior</option></select><button className="btn small" onClick={onAddQuestion}>＋ Добавить вопрос</button></>}<button className="btn small" onClick={() => move(1)}>Следующий вопрос</button></div></div>
    </div>
  );
}
