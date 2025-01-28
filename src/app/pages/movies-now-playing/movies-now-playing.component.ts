import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../../services/movies.service';
import { RespuestaMDB, Pelicula } from '../../interfaces/interfaces';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movies-now-playing',
  standalone: true,
  templateUrl: './movies-now-playing.component.html',
  styleUrls: ['./movies-now-playing.component.css'],
  imports: [CommonModule, MovieCardComponent, FormsModule]
})
export class MoviesNowPlayingComponent implements OnInit {
  movies: Pelicula[] = [];
  searchQuery: string = '';
  startDate: string = '';
  endDate: string = '';
  isLoading: boolean = false;
  routeSub!: Subscription;

  constructor(private moviesService: MoviesService, private router: Router) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  //Carga de peliculas
  loadMovies(): void {
    if (this.isLoading) return;
    this.isLoading = true;

    this.moviesService.getPopulary().subscribe((res: RespuestaMDB) => {
      this.movies.push(...res.results);
      this.isLoading = false;
    });
  }

  searchMovies(): void {
    if (this.searchQuery.length > 0) {
      this.moviesService.search(this.searchQuery).subscribe((res: RespuestaMDB) => {
        this.movies = res.results;
      });
    } else {
      this.movies = [];
      this.loadMovies();
    }
  }

  onMovieSelected(id: number): void {
    this.router.navigate(['/movie-detail', id]);
  }

  //Infinity scroll
  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
      this.loadMovies();
    }
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
