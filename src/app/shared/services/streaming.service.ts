import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieResponse } from '../models/movie.model';

@Injectable({
    providedIn: 'root',
})
export class StreamingService {
    apiUrl = 'http://localhost:3000/api/v1/movies';

    private http = inject(HttpClient);

    constructor() {}

    getMovies(): Observable<MovieResponse> {
        return this.http.get<MovieResponse>(this.apiUrl);
    }

    getMovieById(id: string): Observable<MovieResponse> {
        return this.http.get<MovieResponse>(this.apiUrl + `/${id}`);
    }
}
