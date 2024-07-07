import { ChangeDetectionStrategy, Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toSignal } from "@angular/core/rxjs-interop";
import { ItemsListComponent } from '../../../layout/shared/items-list/items-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { Item, ItemType } from '../../../layout/shared/items-list/item.model';
import { tickets } from '../../../dummy';
import { UserService } from '../../../utils/user.service';
import { tap } from 'rxjs';

const dummytickets = tickets
@Component({
  selector: 'app-tickets-list',
  standalone: true,
  imports: [
    ItemsListComponent, 
    MatCardModule, 
    MatButtonModule, 
    MatPaginatorModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tickets-list.component.html',
  styleUrl: './tickets-list.component.scss'
})
export class TicketsListComponent implements OnInit{
  private userService = inject(UserService);
  private destroyRef = inject(DestroyRef);
  itemTypeTicket = ItemType.TICKET;
  isLoading = signal<boolean>(false);
  data = this.userService.loadedTickets;
  error = signal('');
  pageSize = 10;
  pageEvent: PageEvent = {pageIndex: 0, pageSize: this.pageSize, length: this.data.length};

  ngOnInit(): void {
    this.isLoading.set(true);
    const subscription = this.userService.getTickets()
    .subscribe(
        {
          error: (error: Error) => {
            this.error.set(error.message);
          },
          complete: () => this.isLoading.set(false)
        }
    )
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
