import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user.model';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
    private router = inject(Router);
    private auth = inject(AuthService);

    user: User | null = null;

    ngOnInit(): void {
        this.auth.user$.subscribe((user: User | null) => {
            this.user = user;
        });
    }

    navigate(route: string) {
        this.router.navigate([route]);
    }

    logout() {
        this.auth.logout();
    }
}
