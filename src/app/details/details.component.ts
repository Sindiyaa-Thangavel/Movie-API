import { Component, OnInit } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Movie, MovieDetail } from '../movie-model';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../Services/movie.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{
  movieDetils$: Observable<MovieDetail> | undefined;

  constructor(private readonly route: ActivatedRoute,private readonly movieService: MovieService) {}

  ngOnInit() {
    this.movieDetils$ = this.route.queryParams.pipe(
      map(queryParams => queryParams["movieId"]),
      switchMap(imdbId => this.movieService.getMovieDetails(imdbId)),
      switchMap((movie: MovieDetail) =>
        this.movieService.searchMovie(movie.Title).pipe(
          map((similarMovies: Array<Movie>) =>
            similarMovies.filter(
              (similarMovie: Movie) => similarMovie.Title !== movie.Title
            )
          ),
          map((similarMovies: Array<Movie>) => ({...movie,similarMovies}))
        )
      )
    );
  }
}
