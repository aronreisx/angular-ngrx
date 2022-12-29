import { IAppState } from '@interfaces/appstate';
import { createAction, props } from '@ngrx/store';

export const setAPIStatus = createAction(
  '[API] Success or failure status',
  props<{ apiStatus: IAppState }>()
);
