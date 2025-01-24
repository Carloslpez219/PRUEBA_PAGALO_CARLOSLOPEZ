import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MoviesNowPlayingComponent } from './pages/movies-now-playing/movies-now-playing.component';
import { MoviesTopRatedComponent } from './pages/movies-top-rated/movies-top-rated.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'movies-now-playing', component: MoviesNowPlayingComponent, canActivate: [AuthGuard] },
  { path: 'movies-top-rated', component: MoviesTopRatedComponent, canActivate: [AuthGuard] },
  { path: 'movie-detail/:id', component: MovieDetailComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];
