import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesEffects } from '@store/movies/movies.effects';
import { movieReducer } from '@store/movies/movies.reducer';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';

@NgModule({
  declarations: [HomeComponent, EditComponent, AddComponent],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    FormsModule,
    StoreModule.forFeature('movies', movieReducer),
    EffectsModule.forFeature([MoviesEffects])
  ],
})
export class MoviesModule {}
