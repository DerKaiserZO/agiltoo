import { DatePipe } from '@angular/common';
import { Component, inject, input, model, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Item, ItemType } from '../../../utils/models/item.model';
import { DialogService } from '../../../utils/dialog.service';
import { TaskModalComponent, configTaksModal } from '../modals/task-modal/task-modal.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionComponent, ActionType } from '../modals/action/action.component';
import { ComponentType } from '@angular/cdk/portal';
import { TicketModalComponent } from '../modals/ticket-modal/ticket-modal.component';
import { Router } from '@angular/router';
import { NotificationComponent } from '../modals/notification/notification.component';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [
    MatCardModule, 
    MatDividerModule, 
    DatePipe, 
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.scss'
})
export class ItemDetailComponent {
  item = model<(Item)>();
  itemType = input.required<ItemType>();
  private dialogService = inject(DialogService);
  router = inject(Router);
  isTheOwner = signal<boolean>(true);
  
  deleteItem() {
    if(this.itemType() === ItemType.TICKET && this.item()!.tasks?.length){
      this.dialogService.openDialog(NotificationComponent, undefined, {
        message : 'Veuillez d\'abord supprimer les tâches du ticket !'
      })
      return
    } 
    let dialogRef = this.dialogService.openDialog(ActionComponent, undefined, {
      itemType : this.itemType(),
      message : `Souhaitez-vous supprimer ${this.item()!.title} ?`,
      action: ActionType.SUPPRIMER,
      modalTitle : `${ActionType.SUPPRIMER} ${this.itemType()}`,
      itemToDelete: this.item()!
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.item.set(result);
        this.router.navigateByUrl('/home', {
          replaceUrl: true
        });
      }
    });
  };
  
  updateItemDetails() {
    let component: ComponentType<any> = this.itemType() === ItemType.TICKET ? TicketModalComponent : TaskModalComponent;
    let dialogRef = this.dialogService.openDialog(component, configTaksModal,  {
      itemType: this.itemType(),
      action: 'Update',
      formData: this.initForm(),
      itemId: this.item()!.id
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.item.set(result);
      }
    });
    
  };

  private initForm(): FormGroup {
    if(this.itemType() == ItemType.TICKET) {
      return new FormGroup({
        projectId: new FormControl(this.item()!.project!.id, Validators.required),
        typeId: new FormControl(this.item()!.type!.id, Validators.required),
        title: new FormControl(this.item()!.title, Validators.required),
        description: new FormControl(this.item()!.description),
        statusId: new FormControl(this.item()!.status.id, Validators.required),
        priorityId: new FormControl(this.item()!.priority.id, Validators.required),
        comment: new FormControl(this.item()!.comment),
        storyPoint: new FormControl(this.item()!.storyPoint, Validators.required),
        tagId: new FormControl(this.item()!.tag!.id, Validators.required),
        epicLinkId: new FormControl(this.item()!.epicLink!.id, Validators.required),
        responsibleId: new FormControl(this.item()!.responsible?.id)
      });
    }
    return new FormGroup({
      title: new FormControl(this.item()!.title, Validators.required),
      description: new FormControl(this.item()!.description),
      statusId: new FormControl(this.item()!.status.id, Validators.required),
      priorityId: new FormControl(this.item()!.priority.id, Validators.required),
      comment: new FormControl(this.item()!.comment),
      storyPoint: new FormControl(this.item()!.storyPoint, Validators.required),
      responsibleId: new FormControl(this.item()!.responsible?.id)
    })
  }
}
