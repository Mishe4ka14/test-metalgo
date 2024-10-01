import { removeCard } from '@/feature/cardSlicer';
import { ICard } from '@/types/types';
import React from 'react';
import { useDispatch } from 'react-redux';

interface UserCardProps {
  card: ICard;
  index: number;
  onItemClick: () => void;
}
const UserCard: React.FC<UserCardProps> = ({ card, onItemClick })=> {
  const dispatch = useDispatch();
  const { title, description, id, date } = card;

  const handleDelete = (id: string) => {
    dispatch(removeCard(id));
  };
  return (
    <>
      <div className="flex justify-around items-center py-2 w-[70%] mb-[1%] bg-wheat border-2 border-black rounded-lg
                      transition-all duration-300 ease-in-out pl-2 hover:bg-[#1D78F0] hover:text-azure active:scale-95"
          onClick={onItemClick}
                      >
        <h3 className="max-w-10 w-[1vw]">{title}</h3>
        <p className="w-[50%] ">{description}</p>
        <p className='w-[1vw]'>{date}</p>
        <button
            className='border-2 border-black rounded-lg p-[3px] hover:bg-white transform transition duration-300 ease-in-out'
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(id);
            }}
          >
            Удалить
          </button>
      </div>
    </>
  );
}

export default React.memo(UserCard);
