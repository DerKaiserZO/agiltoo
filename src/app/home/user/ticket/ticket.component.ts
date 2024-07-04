import { Component, OnChanges, OnInit, Signal, SimpleChanges, computed, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { Item, ItemType } from '../../../layout/shared/items-list/item.model';
import { ActivatedRouteSnapshot, ResolveFn, Router, RouterLink, RouterStateSnapshot } from '@angular/router';
import { tickets } from '../../../dummy';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ItemsListComponent } from '../../../layout/shared/items-list/items-list.component';
import { PageEvent } from '@angular/material/paginator';
import { ItemDetailComponent } from '../../../layout/shared/item-detail/item-detail.component';

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
    ItemDetailComponent
  ],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})
export class TicketComponent implements OnInit{
  ticket = input.required<Item>();
  itemTypeTicket = ItemType.TICKET;
  itemTypeTask = ItemType.TASK;
  pageEvent:PageEvent | undefined;
  private router = inject(Router);

  ngOnInit(): void {
    if(!this.ticket()) {
      this.router.navigateByUrl('not-found', {
        replaceUrl: true
      });
      return;
    }
    if(this.ticket().tasks) {
      const tasksLength = this.ticket().tasks!.length;
      this.pageEvent = {pageIndex: 0, pageSize: pageSize, length: tasksLength};
    }
  }

}

export const resolveTicket: ResolveFn<Item | undefined> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const dummiesTickets = tickets;
  const ticketToShow = dummiesTickets.find((ticket) => ticket.id === +activatedRoute.paramMap.get('ticketId')!);
  if(!ticketToShow) return undefined;
  return ticketToShow;
}


// export const resolvePagination: ResolveFn<PageEvent> = (
//   activatedRoute: ActivatedRouteSnapshot,
//   routerState: RouterStateSnapshot
// ) => {
//   const ticket = resolveTicket(activatedRoute, routerState) as (Item | undefined);
//   const tasksLength = ticket ? ticket.tasks?.length : 0;
//   return {pageIndex: 0, pageSize: pageSize, length: tasksLength!};
// }

