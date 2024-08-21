import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StreamingService } from '../../shared/services/streaming.service';
import { Movie, MovieResponse } from '../../shared/models/movie.model';
import { ToastService } from '../../shared/services/toast.service';

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
    private toast = inject(ToastService);

    movie!: Movie;
    movieId!: string;

    constructor() {
        this.activatedRoute.paramMap.subscribe(params => {
            this.movieId = params.get('id') as string;
        });
    }

    ngOnInit(): void {
        this.streaming.getMovieById(this.movieId).subscribe({
            next: response => (this.movie = response.data as Movie),
            error: () =>
                this.toast.showToast(
                    'Unable to fetch movie, Please contact the developer',
                    'error'
                ),
        });
    }
}
