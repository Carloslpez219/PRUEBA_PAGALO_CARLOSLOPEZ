import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PeliculaDetalle, RespuestaCredits, RespuestaMDB } from '../interfaces/interfaces';


const url = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private popularesPage = 0;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene películas populares (paginadas).
   */
  getPopulary() {
    this.popularesPage++;
    const query = `/discover/movie?sort_by=popularity.desc&include_video=true&page=${this.popularesPage}`;
    return this.ejecutarQuery<RespuestaMDB>(query);
  }

  /**
   * Obtiene las películas mejor valoradas.
   */
  getFeature() {
    const query = '/movie/top_rated?include_video=true';
    return this.ejecutarQuery<RespuestaMDB>(query);
  }

  /**
   * Obtiene las películas próximas a estrenarse.
   */
  getNext() {
    const query = '/movie/upcoming?include_video=true';
    return this.ejecutarQuery<RespuestaMDB>(query);
  }

  /**
   * Obtiene las películas que están siendo tendencia esta semana.
   */
  getTrending() {
    const query = '/trending/movie/week?include_video=true';
    return this.ejecutarQuery<RespuestaMDB>(query);
  }

  /**
   * Obtiene detalles específicos de una película por ID.
   */
  getDetallesPelicula(id: string) {
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
  }

  /**
   * Obtiene los créditos (actores y equipo) de una película.
   */
  getDetallesCredits(id: string) {
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`);
  }

  /**
   * Busca películas por clave.
   */
  search(clave: string) {
    return this.ejecutarQuery<RespuestaMDB>(`/search/movie?query=${clave}&page=1`);
  }

  /**
   * Busca detalles de una película específica.
   */
  searchPelícula(clave: string) {
    return this.ejecutarQuery<RespuestaMDB>(`/search/movie?query=${clave}&page=1`);
  }

  /**
   * Obtiene los videos/trailers relacionados con una película.
   */
  getVideo(id: string) {
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}/videos`);
  }

  /**
   * Método genérico para realizar consultas a la API.
   */
  private ejecutarQuery<T>(query: string) {
    query = url + query;
    query += `&api_key=${apiKey}&language=es&include_image_language=es`;
    console.log(query); // Para debug
    return this.http.get<T>(query);
  }
}
