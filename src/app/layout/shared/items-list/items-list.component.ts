import { Component, effect, inject, input, model, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { ItemType, Task } from '../../../utils/models/item.model';
import {MatChipsModule} from '@angular/material/chips';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DialogService } from '../../../utils/dialog.service';
import { TaskModalComponent, configTaksModal } from '../modals/task-modal/task-modal.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActionComponent, ActionType } from '../modals/action/action.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TicketModalComponent } from '../modals/ticket-modal/ticket-modal.component';
import { ComponentType } from '@angular/cdk/portal';

export enum formAction {
  CREATE = "Create",
  UPDATE = "Update",
}

const BASE_URL = "/home/ticket"

@Component({
  selector: 'app-items-list',
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
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.scss'
})
export class ItemsListComponent {
  private dialogService = inject(DialogService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  items = model<Task[]>();
  paginatedData = signal<Task[]>([]);
  pageEvent = input.required<PageEvent>();
  title = input<string>();
  itemType = input.required<ItemType>();
  isLoadingContent = input<boolean>();
  error = input<string>('');
  private url = '';

  constructor() {
    effect(() => {
      if(this.pageEvent()){
        this.setNewPagination(this.pageEvent());
      }
    },{
      allowSignalWrites: true
    })
  }

    // ngOnInit(): void {
    //   console.log('items', this.items())
    //   if(this.pageEvent()){
    //     this.setNewPagination(this.pageEvent());
    //   }
    // }


  deleteItem(itemToDelete: Task) {
    let dialogRef = this.dialogService.openDialog(ActionComponent, undefined, {
      itemType : this.itemType(),
      message : `Souhaitez-vous supprimer ${itemToDelete.title}`,
      action: ActionType.SUPPRIMER,
      modalTitle : `${ActionType.SUPPRIMER} ${this.itemType()}`,
      itemToDelete: itemToDelete,
    });
    dialogRef.afterClosed().subscribe((result: Task) => {
      if(this.itemType() === ItemType.TASK && result) {
        this.items.update((oldValues) => {
          return oldValues!.filter((ticket) => ticket.id !== result.id);
        });
      }
    })
  };

  updateItemDetails(itemToUpdate: Task) {
    let dialogRef = this.dialogService.openDialog(TaskModalComponent, configTaksModal,  {
      itemType: this.itemType(),
      action: formAction.UPDATE,
      formData: this.initForm(itemToUpdate),
      itemId: itemToUpdate.id
    });
    dialogRef.afterClosed().subscribe((result: Task) => {
      if(this.itemType() === ItemType.TASK && result) {
        this.items.update((oldValues) => {
          return oldValues!.map((ticket) => {
            if(ticket.id === result.id){
              return { ...ticket, ...result };
            }
            return ticket;
          });
        });
      }
    })
  }

  getDetails(item: Task) {
    this.url = this.getCurrentUrl(item);
    this.router.navigateByUrl(this.url);
  }
  
  handlePageEvent($event: PageEvent) {
    if(this.pageEvent()) {
      this.setNewPagination($event);
    }
  }

  add() {
    const ticketId = this.activatedRoute.snapshot.paramMap.get('ticketId');
    let dialogRef = this.dialogService.openDialog(TaskModalComponent, configTaksModal, {
      itemType: this.itemType(),
      action: formAction.CREATE,
      ...(this.itemType() === ItemType.TASK && {ticketId} )
    });
    dialogRef.afterClosed().subscribe((result: Task) => {
      if(this.itemType() === ItemType.TASK && result) {
        this.items.update((oldValues) => [result, ...oldValues!])
      }
    });
  }

  private setNewPagination(pageEvent: PageEvent){
    if(this.items() && this.items()!.length) {
      const startIndex = pageEvent.pageIndex * pageEvent.pageSize;
      const endIndex = startIndex + pageEvent.pageSize;
      this.paginatedData.set(this.items()!.slice(startIndex, endIndex));
    }
  }

  private initForm(item: Task): FormGroup {
    return new FormGroup({
      title: new FormControl(item.title, Validators.required),
      description: new FormControl(item.description),
      statusId: new FormControl(item.status.id, Validators.required),
      priorityId: new FormControl(item.priority.id, Validators.required),
      comment: new FormControl(item.comment, Validators.required),
      storyPoint: new FormControl(item.storyPoint, Validators.required),
      responsibleId: new FormControl(item.responsible?.id, Validators.required)
    })
  }
  
  private getCurrentUrl(item: Task) {
    const ticketId = this.activatedRoute.snapshot.paramMap.get('ticketId');
    if(!ticketId){
     return `${BASE_URL}/${item.id}`
    } else {
      return `${BASE_URL}/${ticketId}`.concat(this.itemType() === ItemType.TASK ? `/task/${item.id}` : '');
    }
  }
}
