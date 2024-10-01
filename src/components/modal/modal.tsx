'use client'
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = typeof window !== 'undefined' ? document.getElementById('modal-root') : null;

interface Card {
  title: string;
  description: string;
}

interface ModalProps {
  onClose: () => void;
  onSave: (title: string, description: string) => void;
  card: Card | null;
}

const Modal = ({ onClose, onSave, card }: ModalProps): JSX.Element | null => {
  const [title, setTitle] = useState(card?.title || '');
  const [description, setDescription] = useState(card?.description || '');

  useEffect(() => {
    setTitle(card?.title || '');
    setDescription(card?.description || '');
  }, [card]);

  const handleClose = () => onClose();
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') handleClose();
    if (e.key === 'Enter' && title && description) handleSave();
  };

  const handleSave = () => {
    if (title && description) {
      onSave(title, description);
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!modalRoot) {
    return null; // возвращаем null, если modalRoot не определён на сервере
  }

  return ReactDOM.createPortal(
    <>
      <ModalOverlay closeModal={handleClose} />
      <div className="fixed top-[15vh] left-[33vw] bg-[#82d2ef] w-[30vw] rounded-2xl z-[999] p-5">
        <button
          onClick={handleClose}
          className="absolute top-2.5 right-2.5 w-7 h-7 transition-transform ease-in-out hover:scale-120 active:scale-85"
        >
        </button>
        <h2 className='text-2xl mb-3'>{card ? 'Редактировать' : 'Добавить'}</h2>
        <div className="flex flex-col items-start justify-center gap-6">
          <div>
            <h3 className='text-xl'>Название</h3>
            <input
              className="w-[25vw] h-[4vh] rounded-lg border-none outline-none"
              placeholder="Название карточки"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <h3 className='text-xl'>Описание</h3>
            <textarea
              className="w-[25vw] h-[4vh] rounded-lg border-none outline-none"
              placeholder="Описание карточки"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="mb-[2vh] bg-black text-white w-[100px] h-[3vh] rounded-lg mr-[1vw] hover:bg-white hover:text-black active:scale-85 transform transition duration-300 ease-in-out"
            onClick={handleSave}
          >
            Сохранить
          </button>
        </div>
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
