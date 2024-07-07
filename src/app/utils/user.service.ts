import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Item } from "../layout/shared/items-list/item.model";
import { BASE_API_TICKET } from "./url-endpoints";
import { catchError, map, tap, throwError } from "rxjs";
import { SnackbarService } from "./snackbar.service";
import { ItemRequestModel } from "../layout/shared/modals/task-modal/item-request.model";

@Injectable({
    providedIn: 'root'
  })
export class UserService {
    private httpClient = inject(HttpClient);
    private snackbarService = inject(SnackbarService);
    private tickets = signal<Item[]>([]);

    loadedTickets = this.tickets.asReadonly();
    
    getTickets() {
        return this.httpClient.get<{ tickets: Item[]}>(`${BASE_API_TICKET}`)
        .pipe(
          map((result) => result['tickets']),
          catchError(
            (error) => throwError (
              () => {
                this.snackbarService.openSnackBar('Impossible de récupérer les données');
                return new Error('Impossible de récupérer les données');
              }
            )
          ),
          tap({
            next: (ticketsResults) => this.tickets.set(ticketsResults)
          })
        )
    }

  createTicket(ticketToSave: ItemRequestModel) {
    const previousTickets = this.tickets();
    return this.httpClient.post<Item>(`${BASE_API_TICKET}`, ticketToSave)
      .pipe(
        map((savedIem) => this.tickets.set([...previousTickets, savedIem])),
        catchError(
          (error) => throwError (
            () => {
              this.tickets.set(previousTickets);
              this.snackbarService.openSnackBar('Impossible de récupérer les données');
              return new Error('Impossible de récupérer les données');
            }
          )
        ),
      )
  }
}