import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMovie } from '@interfaces/movie';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private readonly apiMovieUrl = `${environment.apiUrl}/movies`;

  constructor(private http: HttpClient) {}

  public get(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(this.apiMovieUrl);
  }

  public create(movie: Readonly<IMovie>): Observable<IMovie> {
    return this.http.post<Readonly<IMovie>>(this.apiMovieUrl, movie);
  }

  public update(movie: Readonly<IMovie>): Observable<Readonly<IMovie>> {
    return this.http.put<Readonly<IMovie>>(
      `${this.apiMovieUrl}/${movie.id}`,
      movie
    );
  }

  public delete(id: Readonly<number>): Observable<void> {
    return this.http.delete<void>(
      `${this.apiMovieUrl}/${id}`
    );
  }
}
