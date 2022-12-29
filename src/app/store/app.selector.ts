import { createFeatureSelector } from '@ngrx/store';
import { IAppState } from '@interfaces/appstate';

export const selectAppState = createFeatureSelector<IAppState>('appstate');
