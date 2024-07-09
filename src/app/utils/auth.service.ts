import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginUser, SignupUser } from './models/auth.model';
import { UserConnected } from './models/user-connected.model';
import { BASE_API_EPICLINK, BASE_API_PRIORITY, BASE_API_PROJECT, BASE_API_STATUS, BASE_API_TAG, BASE_API_TYPE, BASE_API_USERS, BASE_AUTH } from './url-endpoints';
import { catchError, concatMap, distinctUntilChanged, Observable, of, throwError, toArray } from 'rxjs';
import { SnackbarService } from './snackbar.service';
import { User } from '../home/admin/user.model';
import { DataConfigType } from './stores/data-config.store';
import { Owner } from './models/item.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private snackbarService = inject(SnackbarService);
  private dataConfigLink$ = of(BASE_API_PROJECT, BASE_API_TYPE, BASE_API_PRIORITY, BASE_API_STATUS, BASE_API_TAG, BASE_API_EPICLINK);

  login(user: LoginUser): Observable<UserConnected>{
    return this.httpClient.post<UserConnected>(`${BASE_AUTH}/login` , user)
    .pipe(
      catchError(
        (error) => throwError (
          () => {
            this.snackbarService.openSnackBar('Email ou mot de passe incorrecte');
            return new Error('Email ou mot de passe incorrecte');
          }
        )
      )
    )
  }

  signup(user: SignupUser): Observable<UserConnected>{
    return this.httpClient.post<UserConnected>(`${BASE_AUTH}/register`, user)
    .pipe(
      catchError(
        (error) => throwError (
          () => {
            this.snackbarService.openSnackBar('Un probléme est servenu, veuillez réessayer plus tard');
            return new Error('Un probléme est servenu, veuillez réessayer plus tard');
          }
        )
      )
    )
  }

  getCurrentUserInfos() {
    return this.httpClient.get<User>(`${BASE_API_USERS}/me`)
    .pipe(
      catchError(
        (error) => throwError (
          () => {
            this.snackbarService.openSnackBar('Impossible de récupérer les données');
            return new Error('Impossible de récupérer les données');
          }
        )
      )
    )
  };

  getDataConfig() {
    return this.dataConfigLink$.pipe(
      concatMap(url => this.httpClient.get<DataConfigType[]>(`${url}`)),
      catchError(
        (error) => throwError (
          () => {
            // this.snackbarService.openSnackBar('Email ou mot de passe incorrecte');
            return new Error('Oups Erreur!');
          }
        )
      ),
      toArray()
    )
  };

  getResponsibles() {
    return this.httpClient.get<Owner[]>(`${BASE_API_USERS}`)
    .pipe(
      distinctUntilChanged(),
      catchError(
        (error) => throwError (
          () => {
            this.snackbarService.openSnackBar('Impossible de récupérer les données');
            return new Error('Impossible de récupérer les données');
          }
        )
      )
    )
  }
}
