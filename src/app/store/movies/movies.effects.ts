import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { MoviesService } from '@services/movies.service';
import { IAppState } from '@interfaces/appstate';
import { EMPTY, map, switchMap, withLatestFrom } from 'rxjs';
import {
  moviesFetchAPISuccess,
  deleteMovieAPISuccess,
  invokeMoviesAPI,
  invokeDeleteMovieAPI,
  invokeSaveMovieAPI,
  invokeUpdateMovieAPI,
  saveMovieAPISuccess,
  updateMovieAPISuccess,
} from './movies.action';
import { selectMovies } from './movies.selector';
import { setAPIStatus } from '@store/app.action';

@Injectable()
export class MoviesEffects {
  constructor(
    private actions$: Actions,
    private moviesService: MoviesService,
    private appStore: Store<IAppState>,
    private store: Store
  ) {}

  loadAllMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeMoviesAPI),
      withLatestFrom(this.store.pipe(select(selectMovies))),
      switchMap(([, moviesFromStore]) => {
        if (moviesFromStore.length > 0) {
          return EMPTY;
        }
        return this.moviesService.get().pipe(
          map((data) => {
            return moviesFetchAPISuccess({ movies: data });
          })
        );
      })
    );
  });

  saveNewMovie$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeSaveMovieAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.moviesService.create(action.movie).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return saveMovieAPISuccess({ movie: action.movie });
          })
        );
      })
    );
  });

  updateMovie$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeUpdateMovieAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.moviesService.update(action.movie).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return updateMovieAPISuccess({ movie: action.movie });
          })
        );
      })
    );
  });

  deleteMovie$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeDeleteMovieAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.moviesService.delete(action.id).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return deleteMovieAPISuccess({ id: action.id });
          })
        );
      })
    );
  });
}
