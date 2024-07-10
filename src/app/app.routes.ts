import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent, resolveUserConnectedName } from './home/home.component';
import { NotFoundRedirectGuard } from './utils/guards/not-found-redirect.guard';
import { connectedUserGuard } from './utils/guards/connected-user.guard';

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
        canMatch: [connectedUserGuard],
        loadChildren: () => import('./home/home.routes').then(component => component.routes)
    },
    { path: 'not-authorized', loadComponent: () => import('./not-authorized/not-authorized.component').then(component => component.NotAuthorizedComponent)},
    { path: 'not-found', loadComponent: () => import('./not-found/not-found.component').then(component => component.NotFoundComponent)},
    {
      path: '**',
      loadComponent: () => import('./not-found/not-found.component').then(component => component.NotFoundComponent),
      canActivate: [NotFoundRedirectGuard],
    }
];
