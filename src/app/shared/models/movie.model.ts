export interface Movie {
    title: string;
    url: string;
    uploadedBy: string;
    _id: string;
}

export interface MovieResponse {
    results: number;
    status: string;
    data: Movie[] | Movie;
}
