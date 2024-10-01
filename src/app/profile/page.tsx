'use client';

import UserCard from '@/components/user-card/user-card';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Profile: NextPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

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

  return (
    <section className='flex flex-col pr-[6%] pl-[6%] gap-5 bg-[#82d2ef]'>
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
        <div className='flex gap-2'>
          <h4>Пароль:</h4>
          <p>{user.password}</p>
        </div>
      </div>
      <ul className='flex flex-col justify-center items-center'>
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
      </ul>
    </section>
  );
};

export default Profile;
