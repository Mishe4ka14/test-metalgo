import { configureStore } from '@reduxjs/toolkit';
import cardReducer from '../feature/cardSlicer'; 
import sessionStorageMiddleware from '@/middleware/session-storage-middleware';

// загружаем состояние из стораджа в хранилище, чтобы сохранять состояние между обновлением страницы
const preloadedState = () => {
  if (typeof window !== 'undefined') { // удостоверимся что мы на клиенте

    const savedState = sessionStorage.getItem('cardsState');
    
    if (!savedState) {
      // если sessionStorage пуст - записываем начальное состояние
      const initialCardsState = { cards: [] };
      sessionStorage.setItem('cardsState', JSON.stringify(initialCardsState));
      return { 
        cards: initialCardsState
      };
    }
  
    const parsedState = JSON.parse(savedState);
    return { 
      cards: parsedState 
    };
  }

  // если сервер -  возвращаем начальное состояние
  return { cards: [] };
};


const store = configureStore({
  reducer: {
    cards: cardReducer,
  },
  preloadedState: preloadedState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sessionStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;