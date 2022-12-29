import { createReducer, on } from '@ngrx/store';
import { IMovie } from '@interfaces/movie';
import {
  moviesFetchAPISuccess,
  deleteMovieAPISuccess,
  saveMovieAPISuccess,
  updateMovieAPISuccess,
} from './movies.action';

export const initialState: Readonly<IMovie[]> = [];

export const movieReducer = createReducer(
  initialState,
  on(moviesFetchAPISuccess, (state, { movies }) => {
    return movies;
  }),
  on(saveMovieAPISuccess, (state, { movie }) => {
    return [...state, movie];
  }),
  on(updateMovieAPISuccess, (state, { movie }) => {
    const newState = state.filter((item) => item.id !== movie.id);
    return [...newState, movie];
  }),
  on(deleteMovieAPISuccess, (state, { id }) => {
    const newState = state.filter((item) => item.id !== id);
    return newState;
  })
);
