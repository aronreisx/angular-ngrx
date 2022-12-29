import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@interfaces/appstate';
import { selectAppState } from '@store/app.selector';
import { setAPIStatus } from '@store/app.action';
import { invokeSaveMovieAPI } from '@store/movies/movies.action';
import { IMovie } from '@interfaces/movie';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  constructor(
    private store: Store,
    private appStore: Store<IAppState>,
    private router: Router
  ) {}

  movieForm: IMovie = {
    id: 0,
    director: '',
    title: '',
    price: 0,
    category: [''],
    year: '',
  };

  ngOnInit(): void {}

  save() {
    this.store.dispatch(invokeSaveMovieAPI({ movie: this.movieForm }));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        this.router.navigate(['/']);
      }
    });
  }
}
