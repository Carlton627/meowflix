import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
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
    { path: 'home', component: HomePageComponent, canActivate: [AuthGuardFn] },
    {
        path: 'watch/:id',
        component: VideoViewPageComponent,
        canActivate: [AuthGuardFn],
    },
    { path: '**', redirectTo: '' },
];
