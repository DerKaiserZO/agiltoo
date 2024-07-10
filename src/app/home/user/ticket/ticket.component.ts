import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, model, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { ItemType, Task, Ticket } from '../../../utils/models/item.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ItemsListComponent } from '../../../layout/shared/items-list/items-list.component';
import { PageEvent } from '@angular/material/paginator';
import { ItemDetailComponent } from '../../../layout/shared/item-detail/item-detail.component';
import { UserService } from '../../../utils/user.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SnackbarService } from '../../../utils/snackbar.service';
import { dataConfigStore, localStorageDataConfigKey } from '../../../utils/stores/data-config.store';
import { UserAuthStore } from '../../../utils/stores/auth.store';

const pageSize = 10;

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [
    MatCardModule, 
    MatDividerModule, 
    DatePipe, 
    MatIconModule,
    MatButtonModule,
    RouterLink,
    ItemsListComponent,
    ItemDetailComponent,
    MatProgressSpinnerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})
export class TicketComponent implements OnInit{
  userAuthStore = inject(UserAuthStore);
  dataConfigStore = inject(dataConfigStore);
  itemTypeTicket = ItemType.TICKET;
  itemTypeTask = ItemType.TASK;
  pageEvent:PageEvent | undefined;
  private userService = inject(UserService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private snackbar = inject(SnackbarService);
  router = inject(Router);
  private ticketId = this.activatedRoute.snapshot.paramMap.get('ticketId');
  ticket = model<Ticket>();
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.checkIfConfigDataIsLoaded();
    this.isLoading.set(true);
    const subscription = this.userService.getOneTicket(+this.ticketId!)
    .subscribe({
      next: (result) => {
        this.ticket.set(result);
        const tasksLength = result.tasks!.length;
        this.pageEvent = {pageIndex: 0, pageSize: pageSize, length: tasksLength};
      },
      error: (error) => {
        this.snackbar.openSnackBar(error.message, true);
        this.router.navigateByUrl('not-found', {
          replaceUrl: true
        });
      },
      complete: () => this.isLoading.set(false)
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe())
  }


  private checkIfConfigDataIsLoaded() {
    const persitedDataConfigStore = localStorage.getItem(localStorageDataConfigKey);
    if (this.userAuthStore && this.userAuthStore.isLoggedIn() && persitedDataConfigStore === null) {
      this.dataConfigStore.loadDataConfig();
    }
  }
}


