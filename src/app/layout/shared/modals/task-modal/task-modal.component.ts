import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogConfig, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { Owner, Priority, Status, Type } from '../../../../utils/models/item.model';
import { formAction } from '../../items-list/items-list.component';
import { SnackbarService } from '../../../../utils/snackbar.service';
import { dataConfigStore } from '../../../../utils/stores/data-config.store';
import { AuthService } from '../../../../utils/auth.service';
import { UserService } from '../../../../utils/user.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export const configTaksModal: MatDialogConfig = {
  maxWidth: '50vw',
  width: '100%',
  position: {
    top: '69px'
  },
  disableClose : true
}

const taskFormInitialized = new FormGroup({
  title: new FormControl('', Validators.required),
  description: new FormControl(''),
  statusId: new FormControl('', Validators.required),
  priorityId: new FormControl('', Validators.required),
  comment: new FormControl('', Validators.required),
  storyPoint: new FormControl(0, {
    validators: [Validators.required, Validators.min(0)]
  }),
  responsibleId: new FormControl(null)
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
    MatDialogContent,
    MatProgressSpinnerModule
  ],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss'
})
export class TaskModalComponent implements OnInit{
  public data: { action: formAction, formData: FormGroup,ticketId: number ,itemId?: number} = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<TaskModalComponent>);
  private snackbar = inject(SnackbarService);
  private dataConfigStore = inject(dataConfigStore);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private userService = inject(UserService);
  isLoading = signal<boolean>(false);

  itemForm = this.initForm();
  types: Type[] = [];
  priorities: Priority[] = [];
  statuses: Status[] = [];
  users: Owner[] = [];

  get Title() {
    const title = this.data.action === formAction.CREATE ? 'Création ' : 'Modification ';
    return `${title} Tâches`;
  }


  ngOnInit(): void {
    this.types = this.dataConfigStore.types();
    this.priorities = this.dataConfigStore.priorities();
    this.statuses = this.dataConfigStore.status();
    const subscription = this.authService.getResponsibles().subscribe((results) => this.users = results);
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
  
  onSubmit() {
    this.isLoading.set(true);
    this.taskLogic();    
  }

  private initForm(): FormGroup {
    if (this.data.action === formAction.UPDATE) {
      return this.data.formData;
    }
    return taskFormInitialized;
  }

  private taskLogic() {
    if(this.data.action === formAction.UPDATE) {
      this.updateTask();
    } else {
      this.createTask();
    }
  }


  private updateTask() {
    const subscription = this.userService.updateTask(this.data.itemId!, this.itemForm.value)
      .subscribe({
        next: (updatedTicket) => {
          this.snackbar.openSnackBar('Modification effectuée avec succés');
          this.initForm().reset();
          this.dialogRef.close(updatedTicket);
        },
        error: (error: Error) => {
          this.snackbar.openSnackBar(error.message, true);
          this.isLoading.set(false);
        },
        complete: () => {
          this.isLoading.set(false);
        }
      });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
  
  private createTask() {
    const subscription = this.userService.createTask(this.data.ticketId, this.itemForm.value)
      .subscribe({
        next: (createdTask) => {
          this.snackbar.openSnackBar('Création effectuée avec succés');
          this.initForm().reset();
          this.dialogRef.close(createdTask);
        },
        error: (error: Error) => {
          this.snackbar.openSnackBar(error.message, true);
          this.isLoading.set(false);
        },
        complete: () => {
          this.isLoading.set(false);
        }
      });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
