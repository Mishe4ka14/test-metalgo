import { Middleware } from '@reduxjs/toolkit';

// милдвара для сохранения состояний в сторадж
const sessionStorageMiddleware: Middleware<{}, any> = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  sessionStorage.setItem('cardsState', JSON.stringify(state.cards));

  return result;
};

export default sessionStorageMiddleware;
