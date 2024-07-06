import { ChangeDetectionStrategy, Component, OnInit, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ItemDetailComponent } from '../../../layout/shared/item-detail/item-detail.component';
import { ActivatedRouteSnapshot, ResolveFn, Router, RouterLink, RouterStateSnapshot } from '@angular/router';
import { Item, ItemType } from '../../../layout/shared/items-list/item.model';
import { tickets } from '../../../dummy';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    MatCardModule, 
    ItemDetailComponent,
    MatButtonModule,
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
  task = input<Item>();
  router = inject(Router)
  itemTypeTicket = ItemType.TASK;

  ngOnInit(): void {
    if(!this.task()) {
      this.router.navigateByUrl('not-found', {
        replaceUrl: true
      });
      return;
    }
  }
}


export const resolveTaskDetail: ResolveFn<Item | undefined> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const dummiesTickets = tickets;
  const ticketToShow = dummiesTickets.find((ticket) => ticket.id === +activatedRoute.paramMap.get('ticketId')!);
  if(!ticketToShow) return undefined;
  const taskToShow = ticketToShow.tasks?.find((task) => task.id === +activatedRoute.paramMap.get('taskId')!);
  if(!taskToShow) return undefined;
  return taskToShow;
}