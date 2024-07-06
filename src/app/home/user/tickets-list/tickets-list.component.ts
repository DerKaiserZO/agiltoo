import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ItemsListComponent } from '../../../layout/shared/items-list/items-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { Item, ItemType } from '../../../layout/shared/items-list/item.model';
import { tickets } from '../../../dummy';
import { DialogService } from '../../../utils/dialog.service';
import { TaskModalComponent, configTaksModal } from '../../../layout/shared/modals/task-modal/task-modal.component';

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
  itemTypeTicket = ItemType.TICKET;
  data: Item[] = dummytickets;
  pageSize = 10;
  pageEvent: PageEvent = {pageIndex: 0, pageSize: this.pageSize, length: this.data.length};
  // private dialogService = inject(DialogService);
}
