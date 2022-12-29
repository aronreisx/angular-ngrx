import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMovie } from '@interfaces/movie';

export const selectMovies = createFeatureSelector<IMovie[]>('movies');

export const selectMovieById = (movieId: Readonly<number>) => {
  return createSelector(selectMovies, (movies: IMovie[]) => {
    const movieById = movies.filter((item) => item.id == movieId);
    if (movieById.length === 0) {
      return null;
    }
    return movieById[0];
  });
};
