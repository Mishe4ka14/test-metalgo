'use client';
import Button from '@/components/button/button';
import { clearCard } from '@/feature/cardSlicer';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const Header: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [tooltipVisible, setTooltipVisible] = useState(false); // состояние для подсказки
  
  const handleLogout = (): void => {
    sessionStorage.removeItem('userData');
    dispatch(clearCard());
    router.push('/register');
  };

  return (
    <header className="flex justify-between items-center bg-[#1A1A2E] px-[5vw] py-2 rounded-md">
      <h1 className="text-white text-2xl">Личный кабинет</h1>
      <div 
        className="relative inline-block"
        onMouseEnter={() => setTooltipVisible(true)} 
        onMouseLeave={() => setTooltipVisible(false)} 
      >
        <Button large={false} onClick={handleLogout}>Выход</Button>
      </div>
        <span className={`absolute w-[160px] bg-[#1A1A2E] text-white text-center rounded-[5px] py-[5px] left-[81%] top-11
          transform -translate-x-1/2 transition-opacity duration-300 ${tooltipVisible ? 'opacity-100 z-50' : 'opacity-0'}`}
        >
          Сброс текущей сессии
        </span>
    </header>
  );
};

export default Header;
