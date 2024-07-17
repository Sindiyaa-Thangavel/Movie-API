import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Movie, MovieDetail } from '../movie-model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly API_KEY = `157f9eb7`;
  private readonly CURRENT_YEAR = new Date().getFullYear();

  constructor(private http: HttpClient) { }

  searchMovie(searchQuery: string): Observable<Array<Movie>> {
    return this.http.get(`https://omdbapi.com/?apikey=${this.API_KEY}&s=${searchQuery}`)
      .pipe(
        map((response: any) => response.Search)
      );
  }

  getMovieDetails(imdbId: string): Observable<MovieDetail> {
    return this.http.get(`https://www.omdbapi.com/?apikey=${this.API_KEY}&i=${imdbId}&plot=full`)
      .pipe(
        map((response: any) => response as MovieDetail)
      );
  }


  // Crud operation for favourites

  getFavoriteMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`http://localhost:3000/fav`);
  }

  addFavoriteMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`http://localhost:3000/fav`, movie);
  }

  removeFavoriteMovie(id: string): Observable<void> {
    return this.http.delete<void>(`${`http://localhost:3000/fav`}/${id}`);
  }

  // recent Movie
  getRecentMovies(): Observable<Array<Movie>> {
    return this.http.get(`https://omdbapi.com/?apikey=${this.API_KEY}&y=${this.CURRENT_YEAR}&s=movie`)
      .pipe(
        map((response: any) => response.Search)
      );
  }
}
