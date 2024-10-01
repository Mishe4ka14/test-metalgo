import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICard } from '@/types/types';

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
      state.cards.push(action.payload);
    },
    removeCard(state, action: PayloadAction<number>) {
      state.cards = state.cards.filter(card => card.id !== action.payload);
    },
    clearCard(state) {
      state.cards = [];
    },
  },
});

export const { addCard, removeCard, clearCard } = cardSlice.actions;
export default cardSlice.reducer;
