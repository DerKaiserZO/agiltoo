import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Item } from "../layout/shared/items-list/item.model";
import { BASE_API_TICKET } from "./url-endpoints";
import { catchError, map, tap, throwError } from "rxjs";
import { SnackbarService } from "./snackbar.service";

@Injectable({
    providedIn: 'root'
  })
export class UserService {
    private httpClient = inject(HttpClient);
    private snackbarService = inject(SnackbarService);
    public isLoading = signal<boolean>(false);
    
    getTickets() {
        return this.httpClient.get<{ tickets: Item[]}>(`${BASE_API_TICKET}`)
        .pipe(
          tap(() => {
            this.isLoading.set(true)
          }),
          map((result) => result['tickets']),
          catchError(
            (error) => throwError (
              () => {
                this.snackbarService.openSnackBar('Impossible de récupérer les données');
                this.isLoading.set(false);
                return new Error('Impossible de récupérer les données');
              }
            )
          ),
          tap(() => this.isLoading.set(false)),
        )
    }
}