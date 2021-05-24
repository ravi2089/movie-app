import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Movie} from './movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private SERVER_URL = "http://localhost:11215";
  constructor(private httpClient: HttpClient) { }

  public getMovies(): Observable<Movie[]> {  
		return this.httpClient.get<Movie[]>(this.SERVER_URL + '/movie');
	}

  public getMovie(imdbID: string) {  
		return this.httpClient.get<any>(this.SERVER_URL + '/movie/'+imdbID);
	}
}
