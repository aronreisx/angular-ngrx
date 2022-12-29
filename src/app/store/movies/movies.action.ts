import { createAction, props } from '@ngrx/store';
import { IMovie } from '@interfaces/movie';

export const invokeMoviesAPI = createAction(
  '[Movies API] Invoke Movies Fetch API'
);

export const moviesFetchAPISuccess = createAction(
  '[Movies API] Fetch API success',
  props<{ movies: Readonly<IMovie[]> }>()
);

export const invokeSaveMovieAPI = createAction(
  '[Movies API] Invoke save movie API',
  props<{ movie: Readonly<IMovie> }>()
);

export const saveMovieAPISuccess = createAction(
  '[Movies API] Save movie API success',
  props<{ movie: Readonly<IMovie> }>()
);

export const invokeUpdateMovieAPI = createAction(
  '[Movies API] Invoke update movie API',
  props<{ movie: Readonly<IMovie> }>()
);

export const updateMovieAPISuccess = createAction(
  '[Movies API] Update movie API success',
  props<{ movie: Readonly<IMovie> }>()
);

export const invokeDeleteMovieAPI = createAction(
  '[Movies API] Invoke delete movie API',
  props<{ id: Readonly<number> }>()
);

export const deleteMovieAPISuccess = createAction(
  '[Movies API] Delete movie API success',
  props<{ id: Readonly<number> }>()
);
