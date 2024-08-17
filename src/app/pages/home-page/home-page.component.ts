import { Component, OnInit, inject } from '@angular/core';
import { StreamingService } from '../../shared/services/streaming.service';
import { Movie, MovieResponse } from '../../shared/models/movie.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
    private streaming = inject(StreamingService);
    private router = inject(Router);
    movies!: Movie[];

    ngOnInit(): void {
        this.streaming.getMovies().subscribe((response: MovieResponse) => {
            this.movies = response.data as Movie[];
        });
        this.streaming.getMovieById('').subscribe(console.log);
    }

    viewMovie(movieId: string) {
        this.router.navigate(['watch', movieId]);
    }
}
