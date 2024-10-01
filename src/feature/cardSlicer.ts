import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICard } from '@/types/types';
import formatTime from '@/hooks/format-time';
import { v4 as uuidv4 } from 'uuid'; 

interface CardState {
  cards: ICard[];
}

const initialState: CardState = {
  cards: [],
};

const cardSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {
    addCard(state, action: PayloadAction<ICard>) {
        const newCard = {
          id: uuidv4(),
          title: action.payload.title,
          description: action.payload.description,
          completed: false,
          date: formatTime(new Date()),
        };
        state.cards.push(newCard);
    },
    changeCard: (state, action: PayloadAction<{id: string, title: string, description: string}>) => {
      const index = state.cards.findIndex(card => card.id === action.payload.id);
      if (index !== -1) {
        state.cards[index] = {
          ...state.cards[index],
          title: action.payload.title,
          description: action.payload.description,
        };
    }
    },
    removeCard(state, action: PayloadAction<string>) {
      state.cards = state.cards.filter(card => card.id !== `${action.payload}`);
    },
    clearCard(state) {
      state.cards = [];
    },
  },
});

export const { addCard, removeCard, clearCard, changeCard } = cardSlice.actions;
export default cardSlice.reducer;
