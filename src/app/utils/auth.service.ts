import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginUser } from './models/auth.model';
import { UserConnected } from './models/user-connected.model';
import { BASE_AUTH, BASE_URL } from './url-endpoints';
import { catchError, Observable, throwError } from 'rxjs';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private snackbarService = inject(SnackbarService);

  login(user: LoginUser): Observable<UserConnected>{
    return this.httpClient.post<UserConnected>(`${BASE_AUTH}/login` , {
      "email": user.email,
      "password": user.password
    })
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
}
