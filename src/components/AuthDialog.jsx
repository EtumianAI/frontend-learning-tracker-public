import { useEffect, useState } from 'react';

export default function AuthDialog({ client, onClose, recoveryMode = false }) {
  const [mode, setMode] = useState(recoveryMode ? 'update' : 'signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (recoveryMode) setMode('update');
  }, [recoveryMode]);

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    setMessage('');

    try {
      if (mode === 'update') {
        const { error: authError } = await client.auth.updateUser({ password });
        if (authError) throw authError;
        onClose();
      } else if (mode === 'signup') {
        const { data, error: authError } = await client.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: window.location.origin + window.location.pathname,
          },
        });
        if (authError) throw authError;
        if (data.session) onClose();
        else setMessage('Письмо с подтверждением отправлено. Перейди по ссылке, чтобы завершить регистрацию.');
      } else if (mode === 'signin') {
        const { error: authError } = await client.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (authError) throw authError;
        onClose();
      } else {
        const { error: authError } = await client.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: window.location.origin + window.location.pathname,
        });
        if (authError) throw authError;
        setMessage('Если аккаунт с этой почтой существует, мы отправили письмо для смены пароля.');
      }
    } catch (authError) {
      setError(authError.message || 'Не удалось выполнить запрос. Попробуй ещё раз.');
    } finally {
      setBusy(false);
    }
  };

  const title = mode === 'signup' ? 'Создать аккаунт' : mode === 'reset' ? 'Сбросить пароль' : mode === 'update' ? 'Задать новый пароль' : 'Войти в трекер';

  return (
    <div className="modal open auth-modal" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal-card auth-card" role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <div className="modal-head">
          <div><div className="eyebrow">Твой прогресс в облаке</div><h2 id="auth-title">{title}</h2></div>
          <button className="icon-btn" type="button" onClick={onClose} aria-label="Закрыть">×</button>
        </div>
        <p className="auth-copy">Заметки, ответы и прогресс будут привязаны к почте и доступны после входа с другого устройства.</p>
        <form onSubmit={submit}>
          <div className="form-grid auth-fields">
            {mode !== 'update' && <label className="form-field full">Электронная почта
              <input className="input" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" />
            </label>}
            {mode !== 'reset' && <label className="form-field full">{mode === 'update' ? 'Новый пароль' : 'Пароль'}
              <input className="input" type="password" autoComplete={mode === 'signup' || mode === 'update' ? 'new-password' : 'current-password'} minLength={6} required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Не менее 6 символов" />
            </label>}
          </div>
          {error && <p className="auth-message error" role="alert">{error}</p>}
          {message && <p className="auth-message success" role="status">{message}</p>}
          <div className="auth-actions">
            <button className="btn primary" disabled={busy}>{busy ? 'Подожди…' : title}</button>
            {mode === 'signin' && <button className="text-btn" type="button" onClick={() => { setMode('reset'); setMessage(''); setError(''); }}>Забыл пароль?</button>}
          </div>
        </form>
        {mode !== 'reset' && mode !== 'update' && <div className="auth-switch">
          {mode === 'signin' ? 'Впервые здесь?' : 'Уже зарегистрирован?'}
          <button className="text-btn" type="button" onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setMessage(''); setError(''); }}>
            {mode === 'signin' ? 'Создать аккаунт' : 'Войти'}
          </button>
        </div>}
        {mode === 'reset' && <button className="text-btn auth-back" type="button" onClick={() => { setMode('signin'); setMessage(''); setError(''); }}>Вернуться ко входу</button>}
      </section>
    </div>
  );
}
