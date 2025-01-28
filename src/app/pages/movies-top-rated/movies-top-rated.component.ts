import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../../services/movies.service';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  currentPage = 1;
  totalPages = 1;

  constructor(private moviesService: MoviesService, private router: Router) {}

  ngOnInit() {
    this.loadTopRatedMovies();
  }

  //Carga de peliculas
  loadTopRatedMovies() {
    if (this.isLoading || this.currentPage > this.totalPages) return;
    this.isLoading = true;

    this.moviesService.getFeature(this.currentPage).subscribe(response => {
      this.topRatedMovies.push(...response.results);
      this.totalPages = response.total_pages;
      this.currentPage++;
      this.isLoading = false;
    });
  }

  //Infinity scroll
  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
      this.loadTopRatedMovies();
    }
  }

  searchMovies() {
    if (!this.searchQuery.trim()) {
      this.currentPage = 1;
      this.topRatedMovies = [];
      this.loadTopRatedMovies();
      return;
    }

    this.isLoading = true;
    this.moviesService.search(this.searchQuery).subscribe(response => {
      this.topRatedMovies = response.results;
      this.isLoading = false;
    });
  }

  onMovieSelected(id: number): void {
    this.router.navigate(['/movie-detail', id]);
  }
}
