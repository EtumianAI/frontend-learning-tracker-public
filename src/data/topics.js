const topic = (id, name, section, level, status = 'planned', notes = '', links = [], interview = false, weak = false) => ({
  id, name, section, level, status, notes, explain: '', links, interview, weak,
});

export const sections = {
  javascript: 'JavaScript',
  react: 'React',
  tasks: 'Практические задачи',
  interviews: 'Подготовка к собеседованиям',
};

export const initialTopics = [
  topic('js-closures', 'Замыкания', 'javascript', 'Стажёр', 'progress', 'Понять связь функции с лексическим окружением.', ['https://developer.mozilla.org/ru/docs/Web/JavaScript/Closures'], true, true),
  topic('js-hoisting', 'Hoisting и область видимости', 'javascript', 'Стажёр', 'progress', 'Сравнить var, let и const; отдельно разобрать TDZ.', ['https://developer.mozilla.org/ru/docs/Glossary/Hoisting'], true),
  topic('js-async', 'Promise, async/await', 'javascript', 'Junior', 'progress', 'Порядок выполнения, обработка ошибок через try/catch.', ['https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/async_function'], true),
  topic('js-fetch', 'fetch и работа с API', 'javascript', 'Стажёр', 'progress', 'Проверять response.ok: HTTP 404 сам по себе не отклоняет Promise.', ['https://developer.mozilla.org/ru/docs/Web/API/Fetch_API/Using_Fetch'], true),
  topic('js-array', 'map, filter и reduce', 'javascript', 'Стажёр', 'progress', 'Закрепить на преобразовании массива объектов.', ['https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array']),
  topic('js-destructuring', 'Деструктуризация', 'javascript', 'Стажёр', 'progress', 'Массивы, объекты, значения по умолчанию.', ['https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Destructuring']),
  topic('js-optional', 'Optional chaining и nullish coalescing', 'javascript', 'Стажёр', 'progress', 'Разобрать ?. и ?? на вложенных данных.', ['https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Optional_chaining']),
  topic('js-classes', 'Классы, this и наследование', 'javascript', 'Junior', 'planned', 'Сравнить синтаксис классов с прототипной моделью.', ['https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Classes'], true),
  topic('react-props', 'Пропсы', 'react', 'Стажёр', 'progress', 'Данные приходят сверху; компонент не меняет props напрямую.', ['https://react.dev/learn/passing-props-to-a-component'], true, true),
  topic('react-tree', 'Родительские и дочерние компоненты', 'react', 'Стажёр', 'progress', 'Разобрать передачу данных вниз и callback вверх.', ['https://react.dev/learn/sharing-state-between-components'], true, true),
  topic('react-state', 'useState и состояние', 'react', 'Стажёр', 'progress', 'При обновлении состояния React повторно вызывает компонент.', ['https://react.dev/reference/react/useState'], true, true),
  topic('react-effect', 'useEffect и синхронизация с внешним миром', 'react', 'Junior', 'progress', 'Зависимости, очистка эффекта, типичные лишние эффекты.', ['https://react.dev/reference/react/useEffect'], true, true),
  topic('react-render', 'Рендеринг и ключи списков', 'react', 'Стажёр', 'planned', 'Понять, зачем key должен быть стабильным и уникальным.', ['https://react.dev/learn/rendering-lists'], true),
  topic('react-forms', 'Формы и контролируемые поля', 'react', 'Junior', 'planned', 'Собрать простую форму с валидацией.', ['https://react.dev/learn/reacting-to-input-with-state']),
  topic('task-todo', 'Задачник: добавление, удаление и done', 'tasks', 'Стажёр', 'progress', 'Практика useState, списков и событий.'),
  topic('task-important', 'Задачник: пометка «важное»', 'tasks', 'Стажёр', 'planned', 'Добавить фильтр «все / важные / выполненные».'),
  topic('task-portfolio', 'Учебный проект-портфолио', 'tasks', 'Стажёр', 'progress', 'Улучшать адаптивность, доступность и структуру компонентов.', ['']),
  topic('task-api', 'Каталог с загрузкой данных через fetch', 'tasks', 'Junior', 'planned', 'Состояния загрузки, ошибки и пустого ответа.'),
  topic('int-closure', 'Объяснить замыкание на примере', 'interviews', 'Стажёр', 'progress', 'Коротко объяснить и привести практический случай.', [], true, true),
  topic('int-react-flow', 'Объяснить поток данных в React', 'interviews', 'Стажёр', 'progress', 'Пропсы вниз, события вверх, состояние у владельца данных.', [], true, true),
  topic('int-git', 'Git: ветка, commit, merge и pull request', 'interviews', 'Стажёр', 'planned', 'Подготовить рассказ о своём рабочем процессе.', ['https://git-scm.com/docs'], true),
  topic('int-ts', 'TypeScript: типизация props и состояния', 'interviews', 'Junior', 'planned', 'Повторить типы объектов, union и generics.', ['https://www.typescriptlang.org/docs/'], true),
  topic('int-next', 'Next.js: зачем нужен и что добавляет', 'interviews', 'Junior', 'planned', 'Подготовить объяснение маршрутизации и рендеринга.', ['https://nextjs.org/docs'], true),
  topic('int-redux', 'Redux: store, action, reducer', 'interviews', 'Junior', 'planned', 'Сопоставить Redux с локальным состоянием React.', ['https://redux.js.org/'], true),
  topic('int-html-css', 'HTML/CSS: семантика и адаптивная вёрстка', 'interviews', 'Стажёр', 'planned', 'Повторить семантические элементы, Flexbox и Grid.', ['https://developer.mozilla.org/ru/docs/Learn'], true),
];
