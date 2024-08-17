import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user.model';
import { UtilService } from '../../shared/services/util.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
    public util = inject(UtilService);
    private auth = inject(AuthService);

    user: User | null = null;

    ngOnInit(): void {
        this.auth.user$.subscribe((user: User | null) => {
            this.user = user;
        });
    }

    logout() {
        this.auth.logout();
    }
}
