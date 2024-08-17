import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StreamingService } from '../../shared/services/streaming.service';
import { Movie, MovieResponse } from '../../shared/models/movie.model';

@Component({
    selector: 'app-video-view-page',
    standalone: true,
    imports: [],
    templateUrl: './video-view-page.component.html',
    styleUrl: './video-view-page.component.scss',
})
export class VideoViewPageComponent implements OnInit {
    private activatedRoute = inject(ActivatedRoute);
    private streaming = inject(StreamingService);
    movie!: Movie;
    movieId!: string;

    constructor() {
        this.activatedRoute.paramMap.subscribe(params => {
            this.movieId = params.get('id') as string;
        });
    }

    ngOnInit(): void {
        this.streaming
            .getMovieById(this.movieId)
            .subscribe((response: MovieResponse) => {
                this.movie = response.data as Movie;
            });
    }
}
