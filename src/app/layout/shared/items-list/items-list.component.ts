import { Component, OnInit, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { Item, ItemType, Task } from './item.model';
import {MatChipsModule} from '@angular/material/chips';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterLink } from '@angular/router';
import { DialogService } from '../../../utils/dialog.service';
import { TaskModalComponent, configTaksModal } from '../modals/task-modal/task-modal.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActionComponent, ActionType } from '../modals/action/action.component';

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
    MatPaginatorModule 
  ],
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.scss'
})
export class ItemsListComponent implements OnInit{
  items = input<Item[]>();
  paginatedData = signal<Item[]>([]);
  pageEvent = input.required<PageEvent>();
  title = input<string>();
  itemType = input.required<ItemType>();
  private dialogService = inject(DialogService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private url = '';

  ngOnInit(): void {
    if(this.pageEvent()){
      this.setNewPagination(this.pageEvent());
    }
  }

  deleteItem(itemToDelete: Item) {
    this.dialogService.openDialog(ActionComponent, undefined, {
      itemType : this.itemType(),
      message : `Souhaitez-vous supprimer ${itemToDelete.title}`,
      action: ActionType.SUPPRIMER,
      modalTitle : `${ActionType.SUPPRIMER} ${this.itemType()}`
    })
  };

  updateItemDetails(itemToUpdate: Item) {
    console.log('item', itemToUpdate.project)
    this.dialogService.openDialog(TaskModalComponent, configTaksModal,  {
      itemType: this.itemType(),
      action: formAction.UPDATE,
      formData: this.initForm(itemToUpdate)
    });
  }

  getDetails(item: Item) {
    const ticketId = this.activatedRoute.snapshot.paramMap.get('ticketId');
    if(!ticketId){
      this.url = `${BASE_URL}/${item.id}`
    } else {
      this.url = `${BASE_URL}/${ticketId}`.concat(this.itemType() === ItemType.TASK ? `/task/${item.id}` : ``);
    }
    this.router.navigateByUrl(this.url);
  }
  
  handlePageEvent($event: PageEvent) {
    if(this.pageEvent()) {
      this.setNewPagination($event);
    }
  }

  add() {
    this.dialogService.openDialog(TaskModalComponent, configTaksModal, {
      itemType: this.itemType(),
      action: formAction.CREATE
    });
  }

  private setNewPagination(pageEvent: PageEvent){
    const startIndex = pageEvent.pageIndex * pageEvent.pageSize;
    const endIndex = startIndex + pageEvent.pageSize;
    this.paginatedData.set(this.items()!.slice(startIndex, endIndex));
  }

  private initForm(item: Item): FormGroup {
    if(this.itemType() === ItemType.TICKET) {
      return new FormGroup({
        projectId: new FormControl(item.project!.id, Validators.required),
        typeId: new FormControl(item.type!.id, Validators.required),
        title: new FormControl(item.title, Validators.required),
        description: new FormControl(item.description),
        statusId: new FormControl(item.status.id, Validators.required),
        priorityId: new FormControl(item.priority.id, Validators.required),
        comment: new FormControl(item.comment),
        // storyPoint: new FormControl(item., Validators.required),
        tagId: new FormControl(item.tag!.id, Validators.required),
        epicLinkId: new FormControl(item.epicLink!.id, Validators.required),
        responsibleId: new FormControl(item.responsible?.id)
      })
    } else {
      return new FormGroup({
        title: new FormControl(item.title, Validators.required),
        description: new FormControl(item.description),
        statusId: new FormControl(item.status.id, Validators.required),
        priorityId: new FormControl(item.priority.id, Validators.required),
        comment: new FormControl(item.comment),
        // storyPoint: new FormControl(item., Validators.required),
        responsibleId: new FormControl(item.responsible?.id)
      })
    }
  }
}
