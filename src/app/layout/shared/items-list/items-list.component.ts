import { Component, DestroyRef, effect, inject, input, model, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { ItemType, Owner, Task, Ticket } from '../../../utils/models/item.model';
import {MatChipsModule} from '@angular/material/chips';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DialogService } from '../../../utils/dialog.service';
import { TaskModalComponent, configTaksModal } from '../modals/task-modal/task-modal.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActionComponent, ActionType } from '../modals/action/action.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserAuthStore } from '../../../utils/stores/auth.store';

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
  private authStore = inject(UserAuthStore);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  paginatedData = signal<Task[]>([]);
  pageEvent = input.required<PageEvent>();
  title = input<string>();
  itemType = input.required<ItemType>();
  isLoadingContent = input<boolean>();
  error = input<string>('');
  private url = '';
  ticketParent = model<Ticket>();
  tasks = signal<(Task[] | undefined)>(undefined);

  constructor() {
    effect(() => {
      if(this.ticketParent()) {
        this.tasks.set(this.ticketParent()?.tasks)
      }
      if(this.pageEvent()){
        this.setNewPagination(this.pageEvent());
      }
    },{
      allowSignalWrites: true
    })
  }


  deleteItem(itemToDelete: Task) {

    const dialogRef = this.dialogService.openDialog(ActionComponent, 
      { disableClose : true }, 
      {
        itemType : this.itemType(),
        message : `Souhaitez-vous supprimer ${itemToDelete.title}`,
        action: ActionType.SUPPRIMER,
        modalTitle : `${ActionType.SUPPRIMER} ${this.itemType()}`,
        itemToDelete: itemToDelete,
      }
    );

    const subscription = dialogRef.afterClosed().subscribe((result: Task) => {
      if(this.itemType() === ItemType.TASK && result) {
        this.ticketParent.update(state => {
          if (state) {
            return {
              ...state,
              tasks: state.tasks.filter(task => task.id !== result.id)
            };
          }
          return state;
        });
      }
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  };

  updateItemDetails(itemToUpdate: Task) {
    const dialogRef = this.dialogService.openDialog(TaskModalComponent, configTaksModal,  {
      itemType: this.itemType(),
      action: formAction.UPDATE,
      formData: this.initForm(itemToUpdate),
      itemId: itemToUpdate.id
    });

    const subscription = dialogRef.afterClosed().subscribe((result: Task) => {
      if(this.itemType() === ItemType.TASK && result) {
        this.ticketParent.update(state => {
          if (state) {
            return {
              ...state,
              tasks: state.tasks.map(task => task.id === result.id ? {...task, ...result}: task)
            };
          }
          return state;
        });
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
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
    const dialogRef = this.dialogService.openDialog(TaskModalComponent, configTaksModal, {
      itemType: this.itemType(),
      action: formAction.CREATE,
      ...(this.itemType() === ItemType.TASK && {ticketId} )
    });

    const subscription = dialogRef.afterClosed().subscribe((result: Task) => {
      if(this.itemType() === ItemType.TASK && result) {
        this.ticketParent.update(state => {
          if (state) {
            return {
              ...state,
              tasks: [...state.tasks, result]
            };
          }
          return state;
        });
      }
    });
    
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  
  isTheOwner(owner: Owner): boolean {
    const currentConnectedUser = this.authStore.getUserConnected();
    return (currentConnectedUser?.id === owner.id && currentConnectedUser.name === owner.name) ? true : false ;
  }

  isTheTicketOwner(): boolean {
    const currentConnectedUser = this.authStore.getUserConnected();
    return (currentConnectedUser?.id === this.ticketParent()?.owner.id && currentConnectedUser?.name === this.ticketParent()?.owner.name) ? true : false ;
  }

  private setNewPagination(pageEvent: PageEvent){
    if(this.tasks() && this.tasks()!.length) {
      const startIndex = pageEvent.pageIndex * pageEvent.pageSize;
      const endIndex = startIndex + pageEvent.pageSize;
      this.paginatedData.set(this.tasks()!.slice(startIndex, endIndex));
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
