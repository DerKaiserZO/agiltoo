import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DialogService } from '../../../utils/dialog.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ItemType, Owner, Ticket } from '../../../utils/models/item.model';
import { ActionComponent, ActionType } from '../../../layout/shared/modals/action/action.component';
import { configTaksModal, TicketModalComponent } from '../../../layout/shared/modals/ticket-modal/ticket-modal.component';
import { UserService } from '../../../utils/user.service';
import { NotificationComponent } from '../../../layout/shared/modals/notification/notification.component';
import { UserAuthStore } from '../../../utils/stores/auth.store';

export enum formAction {
  CREATE = "Create",
  UPDATE = "Update",
}

const BASE_URL = "/home/ticket"
const ITEM_TYPE = "Tickets"

@Component({
  selector: 'app-tickets-list',
  standalone: true,
  imports: [
    MatCardModule, 
    MatExpansionModule, 
    MatButtonModule, 
    MatChipsModule,
    DatePipe,
    RouterLink, 
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './tickets-list.component.html',
  styleUrl: './tickets-list.component.scss'
})
export class TicketsListComponent {
  private dialogService = inject(DialogService);
  private router = inject(Router);
  private userService = inject(UserService);
  private destroyRef = inject(DestroyRef);
  private authStore = inject(UserAuthStore);
  items = this.userService.tickets;
  paginatedData = signal<Ticket[]>([]);
  title = ITEM_TYPE;
  isLoadingContent = signal<boolean>(false);
  error = signal<string>('');
  private url = '';
  pageSize = 10;
  pageEvent: PageEvent = {pageIndex: 0, pageSize: this.pageSize, length: this.items()!.length};

  constructor() {
    effect(() => {
      if(this.pageEvent){
        this.setNewPagination(this.pageEvent);
      }
      },{
        allowSignalWrites: true
      }
    )
  }

  ngOnInit(): void {
    this.isLoadingContent.set(true)
    const subscription = this.userService.getTickets()
    .subscribe(
        {
          next: (result) => this.items.set(result),
          complete: () => this.isLoadingContent.set(false)
        }
    )
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }


  deleteItem(itemToDelete: Ticket) {
    if(itemToDelete.tasks.length){
      this.dialogService.openDialog(NotificationComponent, undefined, {
        message : 'Veuillez d\'abord supprimer les tâches du ticket !'
      })
      return;
    } 
    this.dialogService.openDialog(ActionComponent, undefined, {
      itemType: ItemType.TICKET,
      message : `Souhaitez-vous supprimer ${itemToDelete.title}`,
      action: ActionType.SUPPRIMER,
      modalTitle : `${ActionType.SUPPRIMER} ${ITEM_TYPE}`,
      itemToDelete: itemToDelete,
    });
  };

  updateItemDetails(itemToUpdate: Ticket) {
    this.dialogService.openDialog(TicketModalComponent, configTaksModal,  {
      action: formAction.UPDATE,
      formData: this.initForm(itemToUpdate),
      itemId: itemToUpdate.id
    });
  }

  getDetails(item: Ticket) {
    this.url = `${BASE_URL}/${item.id}`;
    this.router.navigateByUrl(this.url);
  }
  
  handlePageEvent($event: PageEvent) {
    if(this.pageEvent) {
      this.setNewPagination($event);
    }
  }

  add() {
    this.dialogService.openDialog(TicketModalComponent, configTaksModal, {
      action: formAction.CREATE,
    });
  }

  isTheOwner(owner: Owner): boolean {
    const currentConnectedUser = this.authStore.getUserConnected();
    return (currentConnectedUser?.id === owner.id && currentConnectedUser.name === owner.name) ? true : false ;
  }

  private setNewPagination(pageEvent: PageEvent){
    if(this.items() && this.items()!.length) {
      const startIndex = pageEvent.pageIndex * pageEvent.pageSize;
      const endIndex = startIndex + pageEvent.pageSize;
      this.paginatedData.set(this.items()!.slice(startIndex, endIndex));
    }
  }

  private initForm(item: Ticket): FormGroup {
    return new FormGroup({
      projectId: new FormControl(item.project!.id, Validators.required),
      typeId: new FormControl(item.type!.id, Validators.required),
      title: new FormControl(item.title, Validators.required),
      description: new FormControl(item.description),
      statusId: new FormControl(item.status.id, Validators.required),
      priorityId: new FormControl(item.priority.id, Validators.required),
      comment: new FormControl(item.comment),
      storyPoint: new FormControl(item.storyPoint, Validators.required),
      tagId: new FormControl(item.tag!.id, Validators.required),
      epicLinkId: new FormControl(item.epicLink!.id, Validators.required),
      responsibleId: new FormControl(item.responsible?.id)
    })
  }

}
