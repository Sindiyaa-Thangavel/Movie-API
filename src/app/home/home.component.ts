import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../movie-model';
import { MovieService } from '../Services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  movies$: Observable<Movie[]> = new Observable<Movie[]>();
  favoriteMovies: Movie[] = [];
  successMessage: string = '';
  isModalOpen: boolean = false;

  constructor(private readonly movieService: MovieService) {}

  ngOnInit(): void {
    this.getRecentMovies();
  }

  getRecentMovies(): void {
    this.movies$ = this.movieService.getRecentMovies();
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

  truncateTitle(title: string, maxLength: number): string {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  }
  
  showSuccessModal(message: string): void {
    this.successMessage = message;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
  
}
