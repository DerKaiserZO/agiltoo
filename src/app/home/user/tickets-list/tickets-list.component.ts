import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { toSignal } from "@angular/core/rxjs-interop";
import { ItemsListComponent } from '../../../layout/shared/items-list/items-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { Item, ItemType } from '../../../layout/shared/items-list/item.model';
import { tickets } from '../../../dummy';
import { UserService } from '../../../utils/user.service';

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
export class TicketsListComponent {
  private userService = inject(UserService);
  itemTypeTicket = ItemType.TICKET;
  data = toSignal(this.userService.getTickets());
  pageSize = 10;
  pageEvent: PageEvent = {pageIndex: 0, pageSize: this.pageSize, length: this.data.length};
  isLoading = computed(() => this.userService.isLoading())

  constructor() {
    effect(() => {
      console.log('data', this.isLoading())
    })
  }
  // private dialogService = inject(DialogService);
}
