import { Component, inject } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user.model';
import { Router } from '@angular/router';
import { ToastService } from '../../shared/services/toast.service';

@Component({
    selector: 'app-register-page',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './register-page.component.html',
    styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
    private fb = inject(FormBuilder);
    private auth = inject(AuthService);
    private router = inject(Router);
    private toast = inject(ToastService);

    registerForm!: FormGroup;

    errorMessage = '';

    constructor() {
        this.registerForm = this.fb.group({
            name: ['', [Validators.required]],
            username: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });
    }

    register() {
        if (!this.registerForm.valid) return;
        const user: User = this.registerForm.value as User;
        this.auth.register(user).subscribe({
            next: response => {
                this.auth.setUser(response.data);
                this.toast.showToast('Welcome to Meowflix 😺', 'success');
                this.router.navigate(['/home']);
            },
            error: () => {
                this.errorMessage = 'Something went wrong :(, Please Try Again';
                this.toast.showToast(this.errorMessage, 'error');
            },
        });
    }
}
