import { ICard } from '@/types/types';
import React from 'react';

interface UserCardProps {
  // card: ICard;
  // index: number;
  // onItemClick: () => void;
}
const UserCard: React.FC<UserCardProps> = ()=> {
  return (
    <>
      <div className="flex justify-around items-center w-[70%] mb-[1%] bg-wheat border-2 border-black rounded-lg
                      transition-all duration-300 ease-in-out pl-2 hover:bg-[#1D78F0] hover:text-azure active:scale-95">
        <h3 className="w-[1vw]">Первая задача</h3>
        <p className="w-[50%] ">Описание Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
        <p className='w-[1vw]'>13.13</p>
      </div>
    </>
  );
}

export default UserCard;
