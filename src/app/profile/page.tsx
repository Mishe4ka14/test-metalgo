'use client';

import Button from '@/components/button/button';
import Modal from '@/components/modal/modal';
import UserCard from '@/components/user-card/user-card';
import { addCard, changeCard } from '@/feature/cardSlicer';
import { RootState } from '@/store/store';
import { ICard } from '@/types/types';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid'; 

const Profile: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [user, setUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentCard, setCurrentCard] = useState<ICard | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const cardItems = useSelector((store: RootState) => store.card.cards)

  useEffect(() => {
    const data = sessionStorage.getItem('userData');

    if (data) {
      const parsedUser = JSON.parse(data);
      setUser(parsedUser); 
    } else {
      console.log('Данные отсутствуют');
      router.push('/register');
    }
  }, [router]);

  if (!user) {
    return <div>Загрузка...</div>;
  }

  const handleAddTask = (() => {
    setCurrentCard(null);
    setIsModalOpen(true);
  });

  const handleItemClick = ((item: ICard) => {
    setCurrentCard(item);
    setIsModalOpen(true);
  });

  const handleSave = (title: string, description: string) => {
    if (currentCard) {
      dispatch(changeCard({ 
        id: currentCard.id ?? '', 
        title, 
        description 
      }));
    } else {
      dispatch(addCard({ 
        title, 
        description,
        id: uuidv4(),
      }));
    }
    setIsModalOpen(false);
  };
  
  

  return (
    <section className='flex flex-col pr-[6%] pl-[6%] gap-5 bg-[#82d2ef]'>
      <div className='flex justify-between items-center'>
        <div>
          <h3 className='text-xl font-bold'>Данные пользователя</h3>
          <div className='flex gap-2'>
            <h4>Имя:</h4>
            <p>{user.name}</p>
          </div>
          <div className='flex gap-2'>
            <h4>Email:</h4>
            <p>{user.email}</p>
          </div>
          <div 
            className='flex gap-2'
            onMouseEnter={() => setShowPassword(true)} // показываем пароль при наведении
            onMouseLeave={() => setShowPassword(false)} 
          >
            <h4>Пароль:</h4>
            <p>
              {showPassword ? user.password : '*'.repeat(user.password.length)} 
            </p>
          </div>
        </div>  
        <Button large={false} onClick={handleAddTask}>Добавить</Button>
      </div>
      <ul className='flex flex-col justify-center items-center'>
      {cardItems.length ? cardItems.map((item, index) => (
        <UserCard
          key={item.id}
          card={item}
          index={index}
          onItemClick={() => handleItemClick(item)}
        />
      )) : null}
      </ul>
      {isModalOpen ? (
        <Modal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          card={currentCard}
        />
      ) : null}
    </section>
  );
};

export default Profile;
