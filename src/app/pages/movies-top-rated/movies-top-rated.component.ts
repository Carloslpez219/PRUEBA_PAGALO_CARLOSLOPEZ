import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../../services/movies.service';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movies-top-rated',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, FormsModule],
  templateUrl: './movies-top-rated.component.html',
  styleUrls: ['./movies-top-rated.component.css']
})
export class MoviesTopRatedComponent implements OnInit {
  topRatedMovies: any[] = [];
  searchQuery = '';
  isLoading = false;

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.loadTopRatedMovies();
  }

  loadTopRatedMovies() {
    if (this.isLoading) return;
    this.isLoading = true;

    this.moviesService.getFeature().subscribe(response => {
      this.topRatedMovies = response.results;
      this.isLoading = false;
    });
  }

  searchMovies() {
    if (!this.searchQuery.trim()) {
      this.loadTopRatedMovies();
      return;
    }

    this.isLoading = true;
    this.moviesService.search(this.searchQuery).subscribe(response => {
      this.topRatedMovies = response.results;
      this.isLoading = false;
    });
  }
}
