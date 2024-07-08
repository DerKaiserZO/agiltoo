import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, effect, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { ItemType, Task, Ticket } from '../../../utils/models/item.model';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, Router, RouterLink, RouterStateSnapshot } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ItemsListComponent } from '../../../layout/shared/items-list/items-list.component';
import { PageEvent } from '@angular/material/paginator';
import { ItemDetailComponent } from '../../../layout/shared/item-detail/item-detail.component';
import { UserService } from '../../../utils/user.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SnackbarService } from '../../../utils/snackbar.service';

const pageSize = 10;

const initItem = {
  id: 0,
  title: '',
  description: '',
  comment: '',
  storyPoint: 0,
  priority: '',
  status: '',
  owner: '',
  responsible: '',
  createdOn: '',
  updatedOn: '',
  project: '',
  type: '',
  tag: '',
  epicLink: '',
  tasks: [],
}
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
  itemTypeTicket = ItemType.TICKET;
  itemTypeTask = ItemType.TASK;
  pageEvent:PageEvent | undefined;
  private userService = inject(UserService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private snackbar = inject(SnackbarService);
  router = inject(Router);
  private ticketId = this.activatedRoute.snapshot.paramMap.get('ticketId');
  ticket?:Ticket;
  tasks: Task[] = [];
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.isLoading.set(true);
    const subscription = this.userService.getOneTicket(+this.ticketId!)
    .subscribe({
      next: (result) => {
        this.ticket = result;
        this.tasks = result.tasks!;
        this.pageEvent = {pageIndex: 0, pageSize: pageSize, length: this.tasks!.length};
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

}


