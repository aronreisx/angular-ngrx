import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { MoviesModule } from './movies/movies.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MoviesModule
  ]
})
export class PagesModule { }
