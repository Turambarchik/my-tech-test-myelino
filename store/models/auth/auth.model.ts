import { Action, action } from 'easy-peasy';

export interface AuthModel {
  token: string | null; 
  setToken: Action<this, string>; 
  resetStore: Action<this>; 
}

export const authModel: AuthModel = {
  token: null,
  setToken: action((state, token) => {
    state.token = token;
  }),
  resetStore: action((state) => {
    state.token = null;
  }),
};