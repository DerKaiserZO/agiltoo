import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Task, Ticket } from "./models/item.model";
import { BASE_API_TASK, BASE_API_TICKET, BASE_API_USERS } from "./url-endpoints";
import { catchError, concatMap, debounceTime, map, of, retry, switchMap, tap, throwError } from "rxjs";
import { SnackbarService } from "./snackbar.service";
import { ItemRequestModel, TaskRequestModel } from "../layout/shared/modals/task-modal/item-request.model";
import { User } from "../home/admin/user.model";
import { UserAuthStore } from "./stores/auth.store";

@Injectable({
    providedIn: 'root'
  })
export class UserService {
    private httpClient = inject(HttpClient);
    private snackbarService = inject(SnackbarService);
    tickets = signal<Ticket[]>([]);
    private userAuthStore = inject(UserAuthStore);

    updateUserLoggedName(newName: string) {
      return this.httpClient.patch<User>(`${BASE_API_USERS}/change/name/${newName}`, {})
      .pipe(
        tap((user) => this.userAuthStore.upDateUserAuth(user)),
        catchError(
          (error) => throwError (
            () => {
              return new Error('Impossible de modifier le nom');
            }
          )
        )
      )
    }

    updateUserPassword(newPassword: string) {
      return this.httpClient.patch<User>(`${BASE_API_USERS}/change/password/${newPassword}`, {})
      .pipe(
        catchError(
          (error) => throwError (
            () => {
              return new Error('Impossible de modifier le mot de passe');
            }
          )
        ),
      )
    }

    updateUser(userToUpdate: User) {
      return of(userToUpdate).pipe(
        debounceTime(5000),
        concatMap((user) => this.httpClient.put<User>(`${BASE_API_USERS}`, user)
          .pipe(
            catchError(
              (error) => throwError (
                () => {
                  return new Error('Impossible de modifier le nom');
                }
              )
            ),
          )
        )
      )
    }

    loadUsers() {
      return this.httpClient.get<User[]>(`${BASE_API_USERS}/complet`)
      .pipe(catchError(
        (error) => throwError (
            () => {
              return new Error('Impossible de récupérer les données');
            }
          )
        ),
        retry(3)
      )
    }

    getTickets() {
        return this.httpClient.get<{ tickets: Ticket[]}>(`${BASE_API_TICKET}`)
        .pipe(
          map((result) => result['tickets']),
          tap((tickets) => tickets.sort((a, b) => b.id - a.id)),
          catchError(
            (error) => throwError (
              () => {
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
    return this.httpClient.post<Ticket>(`${BASE_API_TICKET}`, ticketToSave)
      .pipe(
        map((savedIem) => this.tickets.set([...previousTickets, savedIem])),
        tap(() => this.tickets.update((oldValues) => oldValues.sort((a, b) => b.id - a.id))),
        catchError(
          (error) => throwError (
            () => {
              this.tickets.set(previousTickets);
              return new Error('Impossible de sauvegarder la donnée');
            }
          )
        ),
      )
  }

  updateTicket(ticketId: number, ticketToUpdate: ItemRequestModel) {
    const previousTickets = this.tickets();
    return this.httpClient.put<Ticket>(`${BASE_API_TICKET}`, {id: ticketId, ...ticketToUpdate})
      .pipe(
        tap((savedIem) => {
          this.tickets.update((oldValues) => {
            return oldValues.map((ticket) => {
              if(ticket.id === ticketId){
                return { ...ticket, ...savedIem };
              }
              return ticket;
            });
          })
        }),
        catchError(
          (error) => throwError (
            () => {
              this.tickets.set(previousTickets);
              return new Error('Impossible de récupérer les données');
            }
          )
        ),
      )
  }

  deleteItem(ticketId: number) {
    const previousTickets = this.tickets();
    return this.httpClient.delete<Ticket>(`${BASE_API_TICKET}/${ticketId}`)
      .pipe(
        tap((savedIem) => {
          this.tickets.update((oldValues) => {
            return oldValues.filter((ticket) => ticket.id !== ticketId);
          })
        }),
        catchError(
          (error) => throwError (
            () => {
              this.tickets.set(previousTickets);
              return new Error('Impossible de supprimer la donnée');
            }
          )
        ),
      )
  }

  getOneTicket(ticketId: number) {
    return this.httpClient.get<Ticket>(`${BASE_API_TICKET}/${ticketId}`)
    .pipe(
      catchError(
        (error) => throwError (
          () => {
            return new Error('Impossible de récupérer la donnée');
          }
        )
      ),
    )
  }

  createTask(ticketId: number, taskToSave: TaskRequestModel) {
    return this.httpClient.post<Task>(`${BASE_API_TASK}/todo/${ticketId}`, taskToSave)
      .pipe(
        catchError(
          (error) => throwError (
            () => {
              return new Error('Impossible de sauvegarder la donnée');
            }
          )
        ),
      )
  }

  updateTask(ticketId: number, taskToUpdate: TaskRequestModel) {
    const previousTickets = this.tickets();
    return this.httpClient.put<Task>(`${BASE_API_TASK}`, {id: ticketId, ...taskToUpdate})
      .pipe(
        tap((savedIem) => {
          this.tickets.update((oldValues) => {
            return oldValues.map((ticket) => {
              if(ticket.id === ticketId){
                return { ...ticket, ...savedIem };
              }
              return ticket;
            });
          })
        }),
        catchError(
          (error) => throwError (
            () => {
              this.tickets.set(previousTickets);
              return new Error('Impossible de récupérer les données');
            }
          )
        ),
      )
  }

  deleteTask(ticketId: number) {
    const previousTickets = this.tickets();
    return this.httpClient.delete<Task>(`${BASE_API_TASK}/${ticketId}`)
      .pipe(
        tap((savedIem) => {
          this.tickets.update((oldValues) => {
            return oldValues.filter((ticket) => ticket.id !== ticketId);
          })
        }),
        catchError(
          (error) => throwError (
            () => {
              this.tickets.set(previousTickets);
              this.snackbarService.openSnackBar('Impossible de supprimer la donnée');
              return new Error('Impossible de supprimer la donnée');
            }
          )
        ),
      )
  }

  getOneTask(ticketId: number) {
    return this.httpClient.get<Task>(`${BASE_API_TASK}/${ticketId}`)
    .pipe(
      catchError(
        (error) => throwError (
          () => {
            this.snackbarService.openSnackBar('Impossible de récupérer la donnée');
            return new Error('Impossible de récupérer la donnée');
          }
        )
      ),
    )
  }
}