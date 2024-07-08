import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogConfig, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { EpicLink, ItemType, Owner, Priority, Project, Status, Tag, Type } from '../../../../utils/models/item.model';
import { formAction } from '../../items-list/items-list.component';
import { SnackbarService } from '../../../../utils/snackbar.service';
import { dataConfigStore } from '../../../../utils/stores/data-config.store';
import { AuthService } from '../../../../utils/auth.service';
import { UserService } from '../../../../utils/user.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
  responsibleId: new FormControl(null)
});


@Component({
  selector: 'app-ticket-modal',
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
  templateUrl: './ticket-modal.component.html',
  styleUrl: './ticket-modal.component.scss'
})
export class TicketModalComponent implements OnInit{
  public data: { action: formAction, formData: FormGroup, itemId?: number} = inject(MAT_DIALOG_DATA);
  
  private dialogRef = inject(MatDialogRef<TicketModalComponent>);
  private snackbar = inject(SnackbarService);
  private dataConfigStore = inject(dataConfigStore);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private userService = inject(UserService);
  isLoading = signal<boolean>(false);

  itemForm = this.initForm();
  projects: Project[] = [];
  types: Type[] = [];
  priorities: Priority[] = [];
  statuses: Status[] = [];
  tags: Tag[] = [];
  epics: EpicLink[] = [];
  users: Owner[] = [];

  get Title() {
    const title = this.data.action === formAction.CREATE ? 'Création ' : 'Modification ';
    return `${title} Ticket` ;
  }


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
    this.isLoading.set(true);
    this.ticketLogic();
    
  }

  private initForm(): FormGroup {
    if (this.data.action === formAction.UPDATE) {
      return this.data.formData;
    }
    return ticketFormInitialized;
  }

  private ticketLogic() {
    if(this.data.action === formAction.UPDATE) {
      this.updateTicket();
    } else {
      this.createTicket();
    }
  }

  private createTicket() {
    const subscription = this.userService.createTicket(this.itemForm.value)
    .subscribe({
      next: () => {
        this.snackbar.openSnackBar('Création effectuée avec succés');
        this.initForm().reset();
      },
      error: (error: Error) => {
        this.snackbar.openSnackBar(error.message, true);
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
        this.dialogRef.close();
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  private updateTicket() {
    const subscription = this.userService.updateTicket(this.data.itemId!, this.itemForm.value)
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
  
}
