import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User, UserResponse } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    // apiUrl = 'http://localhost:3000/api/v1/users';
    apiUrl = 'https://meowflix-api.onrender.com/api/v1/users';

    private router = inject(Router);
    private http = inject(HttpClient);

    private userSubject = new BehaviorSubject<User | null>(null);

    constructor() {
        const token = this.getToken();
        if (token) {
            const decodedToken = this.decodeToken(token);
            this.setUser(decodedToken.user);
        }
    }

    user$ = this.userSubject.asObservable();

    setUser(user: User) {
        this.userSubject.next(user);
    }

    private clearUser() {
        return this.userSubject.next(null);
    }

    login(user: User): Observable<UserResponse> {
        return this.http
            .post<UserResponse>(this.apiUrl + '/login', {
                username: user.username,
                password: user.password,
            })
            .pipe(
                tap((res: UserResponse) => {
                    this.saveToken(res.token);
                })
            );
    }

    register(user: User): Observable<UserResponse> {
        return this.http
            .post<UserResponse>(this.apiUrl + '/register', user)
            .pipe(
                tap((res: UserResponse) => {
                    this.saveToken(res.token);
                })
            );
    }

    private saveToken(token: string) {
        sessionStorage.setItem('authToken', token);
    }

    getToken(): string | null {
        return sessionStorage.getItem('authToken');
    }

    decodeToken(token: string) {
        try {
            const payload = token.split('.')[1];
            return JSON.parse(atob(payload));
        } catch (err) {
            console.error('Invalid JWT token');
            return null;
        }
    }

    logout() {
        this.clearUser();
        sessionStorage.removeItem('authToken');
        this.router.navigate(['/']);
    }
}
