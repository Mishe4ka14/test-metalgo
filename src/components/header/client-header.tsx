'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/header/header';

export default function ClientHeader() {
  const pathname = usePathname();

  // Показываем хедер только если текущий путь не '/register'
  if (pathname === '/register') {
    return null;
  }

  return <Header />;
}