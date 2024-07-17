import { Component } from '@angular/core';
import { Movie } from '../movie-model';
import { MovieService } from '../Services/movie.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent {

  favoriteMovies: Movie[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.loadFavoriteMovies();
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

  removeFavorite(id: string): void {
    this.movieService.removeFavoriteMovie(id).subscribe({
      next: () => {
        console.log(`Movie with ID ${id} removed from favorites`);
        this.loadFavoriteMovies();
      },
      error: (err) => console.error('Error removing movie from favorites', err)
    });
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
  
}
