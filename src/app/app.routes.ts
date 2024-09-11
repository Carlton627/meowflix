import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { VideoViewPageComponent } from './pages/video-view-page/video-view-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import {
    AuthGuardFn,
    RedirectIfAuthenticated,
} from './shared/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: LandingPageComponent,
        canActivate: [RedirectIfAuthenticated],
    },
    { path: 'login', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent },
    {
        path: 'home',
        loadComponent: () =>
            import('./pages/home-page/home-page.component').then(
                m => m.HomePageComponent
            ),
        canActivate: [AuthGuardFn],
    },
    {
        path: 'watch/:id',
        loadComponent: () =>
            import('./pages/video-view-page/video-view-page.component').then(
                m => m.VideoViewPageComponent
            ),
        canActivate: [AuthGuardFn],
    },
    { path: '**', redirectTo: '' },
];
