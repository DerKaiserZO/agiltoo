import { Component, DestroyRef, OnInit, inject } from '@angular/core';
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
import { dataConfigStore } from '../../../../utils/stores/data-config.store';
import { AuthService } from '../../../../utils/auth.service';

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
  storyPoint: new FormControl(0, {
    validators: [Validators.required, Validators.min(0)]
  }),
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
  storyPoint: new FormControl(0, {
    validators: [Validators.required, Validators.min(0)]
  }),
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
export class TaskModalComponent implements OnInit{
  public data: { itemType: ItemType, action: formAction, formData: FormGroup} = inject(MAT_DIALOG_DATA);
  private snackbar = inject(SnackbarService);
  private dataConfigStore = inject(dataConfigStore);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  projects: Project[] = [];
  types: Type[] = [];
  priorities: Priority[] = [];
  statuses: Status[] = [];
  tags: Tag[] = [];
  epics: EpicLink[] = [];
  users: Owner[] = [];

  get Title() {
    const title = this.data.action === formAction.CREATE ? 'Création ' : 'Modification ';
    const label = this.data.itemType === ItemType.TASK ? 'Tâche' : this.data.itemType;
    return title + label;
  }

  itemForm = this.initForm();

  ngOnInit(): void {
    this.projects = this.dataConfigStore.projects();
    this.types = this.dataConfigStore.types();
    this.priorities = this.dataConfigStore.priorities();
    this.statuses = this.dataConfigStore.status();
    this.tags = this.dataConfigStore.tags();
    this.epics = this.dataConfigStore.epics();
    const subscription = this.authService.getResponsibles().subscribe((results) => this.users = results);
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
  
  onSubmit() {
    console.log('submitted', this.itemForm.value)
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
