import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { IAppState } from '@interfaces/appstate';
import { invokeUpdateMovieAPI } from '../../../../store/movies/movies.action';
import { selectMovieById } from '../../../../store/movies/movies.selector';
import { IMovie } from '@interfaces/movie';
import { setAPIStatus } from '@store/app.action';
import { selectAppState } from '@store/app.selector';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<IAppState>
  ) {}

  movieForm: IMovie = {
    id: 0,
    director: '',
    title: '',
    price: 0,
    category: [],
    year: '',
  };

  ngOnInit(): void {
    let fetchData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        var id = Number(params.get('id'));
        return this.store.pipe(select(selectMovieById(id)));
      })
    );
    fetchData$.subscribe((data) => {
      if (data) {
        this.movieForm = { ...data };
      }
      else{
        this.router.navigate(['/']);
      }
    });
  }

  update() {
    this.store.dispatch(
      invokeUpdateMovieAPI({ movie: { ...this.movieForm } })
    );
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
