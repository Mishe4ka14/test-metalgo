export interface ICard {
  id: string;
  title: string;
  description: string;
  date?: string;
}

export interface UserState {
  name: string;
  email: string;
  password: string;
}