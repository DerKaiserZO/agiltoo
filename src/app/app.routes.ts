import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { NotFoundRedirectGuard } from './utils/guards/not-found-redirect.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo : 'login',
        pathMatch: 'full'
    },
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'signup',
        loadComponent: () => import('./auth/signup/signup.component').then(component => component.SignupComponent)
    },
    {
        path: 'home',
        component: HomeComponent,
        loadChildren: () => import('./home/home.routes').then(component => component.routes)
    },
    { path: 'not-found', loadComponent: () => import('./not-found/not-found.component').then(component => component.NotFoundComponent)},
    {
      path: '**',
      loadComponent: () => import('./not-found/not-found.component').then(component => component.NotFoundComponent),
      canActivate: [NotFoundRedirectGuard],
    }
];
