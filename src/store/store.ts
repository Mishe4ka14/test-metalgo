import { configureStore } from '@reduxjs/toolkit';
import cardReducer from '../feature/cardSlicer';
import sessionStorageMiddleware from '@/middleware/session-storage-middleware';

// Функция для создания хранилища
export const makeStore = () => {
  // Загружаем состояние из sessionStorage в хранилище
  const preloadedState = () => {
    if (typeof window !== 'undefined') {
      const savedState = sessionStorage.getItem('cardsState');
      
      if (!savedState) {
        // Если sessionStorage пуст - записываем начальное состояние
        const initialCardsState = { cards: [] };
        sessionStorage.setItem('cardsState', JSON.stringify(initialCardsState));
        return { cards: initialCardsState };
      }
      
      const parsedState = JSON.parse(savedState);
      return { cards: parsedState };
    }
    
    // Если сервер - возвращаем начальное состояние
    return { cards: [] };
  };

  return configureStore({
    reducer: {
      cards: cardReducer,
    },
    preloadedState: preloadedState(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sessionStorageMiddleware),
  });
};

// Типы для RootState и AppDispatch
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
