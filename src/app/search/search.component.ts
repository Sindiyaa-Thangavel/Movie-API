import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../movie-model';
import { MovieService } from '../Services/movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  query: string = '';
  movies$: Observable<Movie[]> = new Observable<Movie[]>();
  favoriteMovies: Movie[] = [];
  successMessage: string = '';
  isModalOpen: boolean = false;

  constructor(private readonly movieService: MovieService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'] || '';
      this.getSearchResults();
    });
    this.loadFavoriteMovies();
  }

  getSearchResults(): void {
    if (this.query.trim() !== '') {
      this.movies$ = this.movieService.searchMovie(this.query);
    } else {
      this.movies$ = new Observable<Movie[]>();
    }
  }

  toggleFavorite(movie: Movie): void {
    if (this.isFavorite(movie)) {
      const favoriteMovie = this.favoriteMovies.find(fav => fav.imdbID === movie.imdbID);
      if (favoriteMovie) {
        this.movieService.removeFavoriteMovie(favoriteMovie.id).subscribe({
          next: () => {
            this.loadFavoriteMovies();
            this.showSuccessModal('Movie removed from favorites successfully.');
          },
          error: (err) => {
            console.error('Error removing movie from favorites', err);
          }
        });
      }
    } else {
      this.movieService.addFavoriteMovie(movie).subscribe({
        next: () => {
          this.loadFavoriteMovies();
          this.showSuccessModal('Movie added to favorites successfully.');
        },
        error: (err) => {
          console.error('Error adding movie to favorites', err);
        }
      });
    }
  }

  loadFavoriteMovies(): void {
    this.movieService.getFavoriteMovies().subscribe({
      next: (movies) => {
        this.favoriteMovies = movies;
      },
      error: (err) => {
        console.error('Error fetching favorite movies', err);
      }
    });
  }

  isFavorite(movie: Movie): boolean {
    return !!this.favoriteMovies.find(fav => fav.imdbID === movie.imdbID);
  }

  truncateTitle(title: string | undefined, maxLength: number): string {
    if (!title) {
      return ''; // Return empty string if title is null or undefined
    }
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + '...';
    }
    return title;
  }

  showSuccessModal(message: string): void {
    this.successMessage = message;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
