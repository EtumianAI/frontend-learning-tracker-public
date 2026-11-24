import { useEffect, useState } from 'react';
import { makeId } from '../lib/utils.js';

const blankTopic = { name: '', section: 'javascript', level: 'Стажёр', status: 'planned', notes: '', explain: '', links: [], interview: false, weak: false };

export default function TopicForm({ item, section, onSave, onClose }) {
  const [form, setForm] = useState(blankTopic);
  useEffect(() => setForm(item ? { ...blankTopic, ...item } : { ...blankTopic, section: section || 'javascript' }), [item, section]);
  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const submit = (event) => {
    event.preventDefault();
    onSave({ ...form, id: item?.id || makeId(), links: form.linksText ? form.linksText.split('\n').map((value) => value.trim()).filter(Boolean) : form.links || [] });
  };
  const linksText = form.linksText ?? (form.links || []).join('\n');
  return (
    <div className="modal open" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="topic-form-title">
        <div className="modal-head"><h2 id="topic-form-title">{item ? 'Редактировать тему' : 'Добавить тему'}</h2><button className="icon-btn" onClick={onClose} aria-label="Закрыть">×</button></div>
        <form onSubmit={submit}><div className="form-grid">
          <label className="form-field full">Название<input className="input" autoFocus required value={form.name} onChange={(event) => set('name', event.target.value)} placeholder="Например, замыкания в React" /></label>
          <label className="form-field">Раздел<select className="select" value={form.section} onChange={(event) => set('section', event.target.value)}>{[['javascript','JavaScript'],['react','React'],['tasks','Практические задачи'],['interviews','Подготовка к собеседованиям']].map(([value,label]) => <option key={value} value={value}>{label}</option>)}</select></label>
          <label className="form-field">Уровень<select className="select" value={form.level} onChange={(event) => set('level', event.target.value)}><option>Стажёр</option><option>Junior</option></select></label>
          <label className="form-field">Статус<select className="select" value={form.status} onChange={(event) => set('status', event.target.value)}><option value="planned">Запланировано</option><option value="progress">В работе</option><option value="done">Завершено</option></select></label>
          <label className="form-field">Повторить к интервью?<select className="select" value={form.interview ? 'yes' : 'no'} onChange={(event) => set('interview', event.target.value === 'yes')}><option value="no">Нет</option><option value="yes">Да</option></select></label>
          <label className="form-field full">Заметки<textarea className="textarea" value={form.notes} onChange={(event) => set('notes', event.target.value)} /></label>
          <label className="form-field full">Объяснение своими словами<textarea className="textarea" value={form.explain} onChange={(event) => set('explain', event.target.value)} /></label>
          <label className="form-field full">Ссылки (каждая с новой строки)<textarea className="textarea" value={linksText} onChange={(event) => set('linksText', event.target.value)} placeholder="https://developer.mozilla.org/…" /></label>
        </div><div className="modal-actions"><button type="button" className="btn" onClick={onClose}>Отмена</button><button className="btn primary">Сохранить</button></div></form>
      </div>
    </div>
  );
}
