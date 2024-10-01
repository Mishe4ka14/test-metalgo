import { UserState } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserState = {
  name: '',
  email: '',
  password: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      return { ...state, ...action.payload };
    },
    clearUser(state) {
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
