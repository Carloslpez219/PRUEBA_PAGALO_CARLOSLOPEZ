import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pelicula } from '../../interfaces/interfaces';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
  imports: [CommonModule]
})
export class MovieCardComponent {
  @Input() movie!: Pelicula;
  @Output() movieClicked = new EventEmitter<number>();

  onMovieClick() {
    this.movieClicked.emit(this.movie.id);
  }
}
