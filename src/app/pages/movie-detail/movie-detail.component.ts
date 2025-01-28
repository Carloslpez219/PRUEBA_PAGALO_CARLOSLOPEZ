import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../../services/movies.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: any;
  cast: any[] = [];
  crew: any[] = [];
  recommendedMovies: any[] = [];
  userRating: number = 0;
  isLoading = false;
  routeSub!: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private moviesService: MoviesService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const movieId = params['id'];
      if (movieId) {
        this.loadMovieDetails(movieId);
      }
    });
  }

  loadMovieDetails(id: string) {
    this.isLoading = true;

    // Obtener detalles de la película
    this.moviesService.getDetallesPelicula(id).subscribe(movie => {
      console.log(movie)
      this.movie = movie;
      this.isLoading = false;
    });

    // Obtener reparto y equipo de producción
    this.moviesService.getDetallesCredits(id).subscribe(credits => {
      this.cast = credits.cast.slice(0, 12); // Mostrar solo los primeros 12 actores
      this.crew = credits.crew.filter(member => member.job === 'Director' || member.job === 'Producer'
        || member.job === 'Director of Photography' || member.job === 'Producer' || member.job === 'Writer'
      ); // Filtrar equipo clave
    });

    // Obtener películas relacionadas
    this.moviesService.getRecommendedMovies(id).subscribe(response => {
      this.recommendedMovies = response.results;
    });
  }

  voteMovie() {
    alert(`Gracias por votar con ${this.userRating} estrellas!`);
  }

  getSpokenLanguages(): string {
    return this.movie?.spoken_languages?.map((lang: { name: any; }) => lang.name).join(', ') || 'No disponible';
  }
  
  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
