'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '../../store/store';

//провайдер для использования в серверном layout
export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore(); // cоздаем экземпляр хранилища
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}