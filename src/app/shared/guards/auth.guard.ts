import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthGuardFn: CanActivateFn = (route, state) => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (auth.getToken()) {
        return true;
    } else {
        router.navigate(['/login']);
        return false;
    }
};

export const RedirectIfAuthenticated: CanActivateFn = (route, state) => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (auth.getToken()) {
        router.navigate(['/home']);
        return false;
    } else {
        return true;
    }
};
