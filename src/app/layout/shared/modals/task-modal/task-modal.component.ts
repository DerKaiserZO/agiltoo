import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogConfig, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { EpicLink, ItemType, Owner, Priority, Project, Status, Tag, Type } from '../../items-list/item.model';
import { epic, priority, projects, status, tag, typeItem, user } from '../../../../dummy';
import { formAction } from '../../items-list/items-list.component';
import { SnackbarService } from '../../../../utils/snackbar.service';

export const configTaksModal: MatDialogConfig = {
  maxWidth: '50vw',
  // maxHeight: '60vw',
  width: '100%',
  // height: '100%',
  position: {
    top: '69px'
  }
}

const ticketFormInitialized = new FormGroup({
  projectId: new FormControl('', Validators.required),
  typeId: new FormControl('', Validators.required),
  title: new FormControl('', Validators.required),
  description: new FormControl(''),
  statusId: new FormControl('', Validators.required),
  priorityId: new FormControl('', Validators.required),
  comment: new FormControl(''),
  // storyPoint: new FormControl('', Validators.required),
  tagId: new FormControl('', Validators.required),
  epicLinkId: new FormControl('', Validators.required),
  responsibleId: new FormControl('')
});

const taskFormInitialized = new FormGroup({
  title: new FormControl('', Validators.required),
  description: new FormControl(''),
  statusId: new FormControl('', Validators.required),
  priorityId: new FormControl('', Validators.required),
  comment: new FormControl(''),
  // storyPoint: new FormControl('', Validators.required),
  responsibleId: new FormControl('')
});

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField, 
    MatInputModule,
    MatButtonModule, 
    MatSelectModule, 
    MatDialogActions, 
    MatDialogClose, 
    MatDialogTitle, 
    MatDialogContent
  ],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss'
})
export class TaskModalComponent {
  public data: { itemType: ItemType, action: formAction, formData: FormGroup} = inject(MAT_DIALOG_DATA);
  private snackbar = inject(SnackbarService);

  get Title() {
    const title = this.data.action === formAction.CREATE ? 'Création ' : 'Modification ';
    const label = this.data.itemType === ItemType.TASK ? 'Tâche' : this.data.itemType;
    return title + label;
  }

  itemForm = this.initForm();
  
  projects: Project[] = projects;
  types: Type[] = typeItem;
  priorities: Priority[] = priority;
  // storyPoints: {id: number; name: string}[] = [];
  statuses: Status[] = status;
  tags: Tag[] = tag;
  epics: EpicLink[] = epic;
  users: Owner[] = user;

  onSubmit() {
    console.log("form", this.itemForm);
    setTimeout(() => {
      this.initForm().reset();
      this.snackbar.openSnackBar('ok');
    },4000)
  }

  private initForm(): FormGroup {
    if (this.data.action === formAction.UPDATE) {
      return this.data.formData;
    } else {
      if (this.data.itemType == ItemType.TASK) {
        return taskFormInitialized;
      }
      return ticketFormInitialized;
    }
  }
}
