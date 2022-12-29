import { createReducer, on } from '@ngrx/store';
import { setAPIStatus } from './app.action';
import { IAppState } from '@interfaces/appstate';

export const initialState: IAppState = {
  apiStatus: '',
  apiResponseMessage: '',
};

export const appReducer = createReducer(
  initialState,
  on(setAPIStatus, (state, { apiStatus }) => {
    return {
      ...state,
      ...apiStatus
    }
  })
);
