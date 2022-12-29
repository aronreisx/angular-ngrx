import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  invokeDeleteMovieAPI,
  invokeMoviesAPI,
} from '@store/movies/movies.action';
import { selectMovies } from '@store/movies/movies.selector';
import { setAPIStatus } from '@store/app.action';
import { selectAppState } from '@store/app.selector';
import { IAppState } from '@interfaces/appstate';

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  movies$ = this.store.pipe(select(selectMovies));

  deleteModal: any;
  idToDelete: number = 0;

  constructor(private store: Store, private appStore: Store<IAppState>) {}

  ngOnInit(): void {
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );
    this.store.dispatch(invokeMoviesAPI());
  }

  public openDeleteModal(id: number): void {
    this.idToDelete = id;
    this.deleteModal.show();
  }

  public delete(): void {
    this.store.dispatch(
      invokeDeleteMovieAPI({
        id: this.idToDelete,
      })
    );
    const apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.deleteModal.hide();
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
      }
    });
  }
}
