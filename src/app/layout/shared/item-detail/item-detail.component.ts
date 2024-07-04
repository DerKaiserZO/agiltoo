import { DatePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Item, ItemType } from '../items-list/item.model';
import { DialogService } from '../../../utils/dialog.service';
import { TaskModalComponent, configTaksModal } from '../modals/task-modal/task-modal.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionComponent, ActionType } from '../modals/action/action.component';

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
  item = input.required<Item>();
  itemType = input.required<ItemType>();
  // initForm = input.required<FormGroup>();
  private dialogService = inject(DialogService);
  
  deleteItem() {
    this.dialogService.openDialog(ActionComponent, undefined, {
      itemType : this.itemType(),
      message : `Souhaitez-vous supprimer ${this.item().title} ?`,
      action: ActionType.SUPPRIMER,
      modalTitle : `${ActionType.SUPPRIMER} ${this.itemType()}`
    })
  };
  
  updateItemDetails() {
    this.dialogService.openDialog(TaskModalComponent, configTaksModal,  {
      itemType: this.itemType(),
      action: 'Update',
      formData: this.initForm()
    });
  };

  private initForm(): FormGroup {
    if(this.itemType() == 'Ticket') {
      return new FormGroup({
        projectId: new FormControl(this.item().project!.id, Validators.required),
        typeId: new FormControl(this.item().type!.id, Validators.required),
        title: new FormControl(this.item().title, Validators.required),
        description: new FormControl(this.item().description),
        statusId: new FormControl(this.item().status.id, Validators.required),
        priorityId: new FormControl(this.item().priority.id, Validators.required),
        comment: new FormControl(this.item().comment),
        // storyPoint: new FormControl(this.item()., Validators.required),
        tagId: new FormControl(this.item().tag!.id, Validators.required),
        epicLinkId: new FormControl(this.item().epicLink!.id, Validators.required),
        responsibleId: new FormControl(this.item().responsible?.id)
      });
    }
    return new FormGroup({
      title: new FormControl(this.item()!.title, Validators.required),
      description: new FormControl(this.item()!.description),
      statusId: new FormControl(this.item()!.status.id, Validators.required),
      priorityId: new FormControl(this.item()!.priority.id, Validators.required),
      comment: new FormControl(this.item()!.comment),
      // storyPoint: new FormControl(this.item()!., Validators.required),
      responsibleId: new FormControl(this.item()!.responsible?.id)
    })
  }
}
