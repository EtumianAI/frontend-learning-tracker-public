import { useEffect, useMemo, useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Stats from './components/Stats.jsx';
import TopicCard from './components/TopicCard.jsx';
import TopicForm from './components/TopicForm.jsx';
import QuestionForm from './components/QuestionForm.jsx';
import PracticeCard from './components/PracticeCard.jsx';
import ReviewList from './components/ReviewList.jsx';
import { initialQuestions, loadState, saveState, exportState } from './lib/storage.js';
import { sections } from './data/topics.js';
import { makeId } from './lib/utils.js';

const descriptions = {
  overview: ['Мой план обучения', 'Начни с одной темы, затем закрепи её практикой.'],
  javascript: ['JavaScript', 'Фундамент уже знакомее — закрепи базу и переходи к задачам.'],
  react: ['React', 'Больше практики на компонентах и состоянии. Маленькими шагами — тоже прогресс.'],
  tasks: ['Практические задачи', 'Проверяй знания кодом и отмечай, что хочется улучшить.'],
  interviews: ['Подготовка к собеседованиям', 'Собирай короткие объяснения и помечай темы для повтора перед интервью.'],
};

export default function App() {
  const [state, setState] = useState(loadState);
  const [view, setView] = useState('overview');
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('Все уровни');
  const [status, setStatus] = useState('Все статусы');
  const [editingTopic, setEditingTopic] = useState(null);
  const [formSection, setFormSection] = useState(null);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => { saveState(state); }, [state]);
  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const items = state.items;
  const customQuestions = state.questions || [];
  const questions = useMemo(() => [...initialQuestions, ...customQuestions], [customQuestions]);
  const visibleItems = useMemo(() => items.filter((item) => {
    const matchesView = view === 'overview' || item.section === view || (view === 'weak' && item.weak) || (view === 'interviews' && item.interview);
    const matchesSearch = !search || `${item.name} ${item.notes} ${item.explain}`.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = level === 'Все уровни' || item.level === level;
    const matchesStatus = status === 'Все статусы' || item.status === ({ Запланировано: 'planned', 'В работе': 'progress', Завершено: 'done' })[status];
    return matchesView && matchesSearch && matchesLevel && matchesStatus;
  }), [items, view, search, level, status]);

  const changeItem = (id, patch) => setState((current) => ({ ...current, items: current.items.map((item) => item.id === id ? { ...item, ...patch } : item) }));
  const saveTopic = (item) => {
    setState((current) => ({ ...current, items: current.items.some((entry) => entry.id === item.id) ? current.items.map((entry) => entry.id === item.id ? { ...entry, ...item } : entry) : [...current.items, item] }));
    setEditingTopic(null); setFormSection(null); setToast('Сохранено');
  };
  const removeTopic = (id) => {
    if (window.confirm('Удалить эту тему?')) setState((current) => ({ ...current, items: current.items.filter((item) => item.id !== id) }));
  };
  const addQuestion = (question) => {
    setState((current) => ({ ...current, questions: [...(current.questions || []), question], answer: '' }));
    setShowQuestionForm(false); setToast('Вопрос добавлен в тренировку');
  };
  const handlePracticeResult = (kind, question) => {
    if (kind === 'good') {
      setState((current) => ({ ...current, seen: [...(current.seen || []), { question: question.q, at: Date.now() }], answer: '' }));
      setToast('Отлично, двигайся дальше!');
      return;
    }
    const related = items.find((item) => item.section === (question.section === 'React' ? 'react' : 'javascript') && item.name.toLowerCase().includes(question.section === 'React' ? 'usestate' : 'замык'));
    setState((current) => ({
      ...current,
      items: kind === 'repeat' && related ? current.items.map((item) => item.id === related.id ? { ...item, weak: true } : item) : current.items,
      errors: [...current.errors, { id: makeId(), question: question.q, section: question.section, answer: current.answer, date: new Date().toISOString(), resolved: false }],
      answer: '',
    }));
    setToast(kind === 'repeat' ? 'Добавил в слабые темы и ошибки' : 'Записал в список ошибок');
  };

  const title = descriptions[view]?.[0] || (view === 'practice' ? 'Режим тренировки' : view === 'weak' ? 'Слабые темы' : 'Повторение ошибок');
  const desc = descriptions[view]?.[1] || (view === 'practice' ? 'Ответь сам, затем открой объяснение и реши, что стоит повторить.' : view === 'weak' ? 'Возвращайся к темам, которые пока трудно объяснить без подсказки.' : 'Ошибки из тренировки остаются здесь, пока ты не отметишь их разобранными.');

  const topicGrid = (list = visibleItems) => <div className="cards">{list.length ? list.map((item) => <TopicCard key={item.id} item={item} onChange={changeItem} onEdit={setEditingTopic} onDelete={removeTopic} />) : <div className="empty">По этому фильтру тем пока нет.</div>}</div>;
  const controls = <div className="toolbar"><input className="input" placeholder="Поиск по темам и заметкам…" value={search} onChange={(event) => setSearch(event.target.value)} /><select className="select" value={level} onChange={(event) => setLevel(event.target.value)}><option>Все уровни</option><option>Стажёр</option><option>Junior</option></select><select className="select" value={status} onChange={(event) => setStatus(event.target.value)}><option>Все статусы</option><option>Запланировано</option><option>В работе</option><option>Завершено</option></select><button className="btn" onClick={() => { setEditingTopic(null); setFormSection(view in sections ? view : 'javascript'); }}>＋ Добавить тему</button></div>;

  return (
    <div className="shell">
      <header className="topbar"><div className="brand"><span className="brand-mark">&lt;/&gt;</span><span>Трекер frontend-разработчика</span></div><div className="top-actions"><button className="btn ghost desktop" onClick={() => exportState(state)}>Экспорт данных</button><button className="btn primary" onClick={() => { setEditingTopic(null); setFormSection('javascript'); }}>＋ Быстро добавить</button></div></header>
      <section className="hero"><div><div className="eyebrow">Твой маршрут · стажёр → junior</div><h1>Учись. Практикуй.<br />Объясняй своими словами.</h1><p>Один рабочий стол для тем, задач и подготовки к собеседованиям. Записывай не только что прошёл, но и что уже можешь объяснить без подсказки.</p></div><div className="hero-side"><strong>Твой фокус сейчас</strong>JavaScript уже знакомее. React даётся тяжелее — поэтому здесь он выделен отдельно и чаще попадает в тренировку.</div></section>
      <Stats items={items} errors={state.errors} />
      <div className="layout"><Sidebar view={view} onChange={(next) => { setView(next); setSearch(''); setLevel('Все уровни'); setStatus('Все статусы'); }} items={items} errors={state.errors} />
        <main className="main">
          {view === 'practice' ? <section className="panel"><div className="section-head"><div><h2>{title}</h2><p>{desc}</p></div></div><PracticeCard questions={questions} answer={state.answer} onAnswer={(answer) => setState((current) => ({ ...current, answer }))} onResult={handlePracticeResult} onAddQuestion={() => setShowQuestionForm(true)} /></section> : null}
          {view === 'overview' && <><section className="panel"><div className="section-head"><div><h2>{title}</h2><p>{desc}</p></div></div>{controls}{topicGrid()}</section><div className="split"><section className="panel"><div className="section-head"><div><h2>Следующий шаг</h2><p>Продолжай с того, что уже начато.</p></div></div>{items.filter((item) => item.status === 'progress').slice(0, 4).map((item) => <div className="list-row" key={item.id}><div><strong>{item.name}</strong><small>{sections[item.section]} · {item.level}</small></div><button className="btn small" onClick={() => { setView(item.section); setSearch(item.name); }}>Открыть тему</button></div>)}</section><section className="panel"><div className="section-head"><div><h2>Тренировка</h2><p>Вопрос → твой ответ → разбор → пример.</p></div><button className="btn small" onClick={() => setView('practice')}>Открыть</button></div><PracticeCard compact questions={questions} answer={state.answer} onAnswer={(answer) => setState((current) => ({ ...current, answer }))} onResult={handlePracticeResult} onAddQuestion={() => setShowQuestionForm(true)} /></section></div></>}
          {sections[view] && view !== 'overview' && <section className="panel"><div className="section-head"><div><h2>{title}</h2><p>{desc}</p></div></div>{controls}{topicGrid()}</section>}
          {view === 'weak' && <><section className="panel"><div className="section-head"><div><h2>{title}</h2><p>{desc}</p></div><button className="btn" onClick={() => setView('practice')}>Тренироваться</button></div>{topicGrid(items.filter((item) => item.weak))}</section><section className="panel"><div className="section-head"><div><h2>Ошибки для разбора</h2><p>Вопросы, в которых ответ пока не сложился.</p></div></div><ReviewList errors={state.errors.filter((error) => !error.resolved).slice(0, 4)} onResolve={(id) => setState((current) => ({ ...current, errors: current.errors.map((error) => error.id === id ? { ...error, resolved: true } : error) }))} onDelete={(id) => setState((current) => ({ ...current, errors: current.errors.filter((error) => error.id !== id) }))} /></section></>}
          {view === 'errors' && <section className="panel"><div className="section-head"><div><h2>{title}</h2><p>{desc}</p></div><button className="btn" onClick={() => setView('practice')}>＋ Новая тренировка</button></div><ReviewList errors={state.errors} onResolve={(id) => setState((current) => ({ ...current, errors: current.errors.map((error) => error.id === id ? { ...error, resolved: true } : error) }))} onDelete={(id) => setState((current) => ({ ...current, errors: current.errors.filter((error) => error.id !== id) }))} /></section>}
        </main>
      </div>
      <footer>Данные хранятся в этом браузере · выгрузи резервную копию, если меняешь устройство</footer>
      {(editingTopic || formSection) && <TopicForm item={editingTopic} section={formSection} onSave={saveTopic} onClose={() => { setEditingTopic(null); setFormSection(null); }} />}
      {showQuestionForm && <QuestionForm onSave={addQuestion} onClose={() => setShowQuestionForm(false)} />}
      {toast && <div role="status" className="toast show">{toast}</div>}
    </div>
  );
}
