import { useState } from 'react';

export default function QuestionForm({ onSave, onClose }) {
  const [form, setForm] = useState({ q: '', section: 'JavaScript', level: 'Стажёр', a: '', code: '' });
  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  return (
    <div className="modal open" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="question-form-title">
        <div className="modal-head"><h2 id="question-form-title">Новый вопрос для тренировки</h2><button className="icon-btn" onClick={onClose} aria-label="Закрыть">×</button></div>
        <form onSubmit={(event) => { event.preventDefault(); onSave(form); }}><div className="form-grid">
          <label className="form-field full">Вопрос<textarea className="textarea" required autoFocus value={form.q} onChange={(event) => set('q', event.target.value)} /></label>
          <label className="form-field">Раздел<select className="select" value={form.section} onChange={(event) => set('section', event.target.value)}>{['JavaScript','React','HTML/CSS','TypeScript','Next.js','Redux','Git'].map((value) => <option key={value}>{value}</option>)}</select></label>
          <label className="form-field">Уровень<select className="select" value={form.level} onChange={(event) => set('level', event.target.value)}><option>Стажёр</option><option>Junior</option></select></label>
          <label className="form-field full">Краткое объяснение<textarea className="textarea" required value={form.a} onChange={(event) => set('a', event.target.value)} /></label>
          <label className="form-field full">Пример кода (необязательно)<textarea className="textarea code-entry" value={form.code} onChange={(event) => set('code', event.target.value)} /></label>
        </div><div className="modal-actions"><button type="button" className="btn" onClick={onClose}>Отмена</button><button className="btn primary">Сохранить вопрос</button></div></form>
      </div>
    </div>
  );
}
