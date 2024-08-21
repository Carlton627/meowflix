import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { User } from '../../shared/models/user.model';
import { ToastService } from '../../shared/services/toast.service';

@Component({
    selector: 'app-login-page',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
    private auth = inject(AuthService);
    private router = inject(Router);
    private fb = inject(FormBuilder);
    private toast = inject(ToastService);

    errorMessage = '';

    loginForm!: FormGroup;

    constructor() {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });
    }

    login() {
        if (!this.loginForm.valid) return;
        const user: User = this.loginForm.value as User;
        this.auth.login(user).subscribe({
            next: response => {
                this.auth.setUser(response.data);
                this.router.navigate(['/home']);
            },
            error: () => {
                this.errorMessage = 'Login Failed, Please try again!';
                this.toast.showToast(this.errorMessage, 'error');
            },
        });
    }
}
