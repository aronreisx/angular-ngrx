import { HttpResponse } from '@angular/common/http';
import { environment } from '@environments/environment';
import { IMovie } from '@interfaces/movie';
import { of } from 'rxjs';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpClientMock: any;
  let moviesApiUrl: string;

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn(),
    };
    service = new MoviesService(httpClientMock);
    moviesApiUrl = `${environment.apiUrl}/movies`;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to call get movie', () => {
    const response: IMovie[] = [
      {
        id: 1,
        title: 'title',
        year: 'year',
        category: ['category'],
        director: 'director',
        price: 0,
      }
    ];

    const httpResponse = new HttpResponse({ body: response });
    console.log(httpResponse);

    jest
      .spyOn(httpClientMock, 'get')
      .mockReturnValue(of<HttpResponse<IMovie[]>>(httpResponse));

    service.get();

    expect(httpClientMock.get).toHaveBeenCalledTimes(1);
    expect(httpClientMock.get).toHaveBeenCalledWith(moviesApiUrl);
  });
});
