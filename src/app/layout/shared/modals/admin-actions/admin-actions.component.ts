import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserService } from '../../../../utils/user.service';
import { SnackbarService } from '../../../../utils/snackbar.service';
import { User } from '../../../../home/admin/user.model';


export interface actionModal {
  modalTitle: string;
  message: string;
  user: User
}

@Component({
  selector: 'app-admin-actions',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatDialogActions, 
    MatDialogClose, 
    MatDialogTitle, 
    MatDialogContent,
    MatFormField,
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  templateUrl: './admin-actions.component.html',
  styleUrl: './admin-actions.component.scss'
})
export class AdminActionsComponent {
  public data: actionModal = inject(MAT_DIALOG_DATA);
  name = signal('');
  isLoading = signal<boolean>(false);
  userService = inject(UserService);
  destroyRef = inject(DestroyRef);
  private dialogRef = inject(MatDialogRef<AdminActionsComponent>);
  private snackbar = inject(SnackbarService);

  submit() {
    this.isLoading.set(true)
    let subscription = this.userService.updateUser({
      ...this.data.user,
      name: this.name()
    }).subscribe({
      next: (changedName) => {
        this.snackbar.openSnackBar('Modification effectuée avec succés');
        this.dialogRef.close(changedName);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.snackbar.openSnackBar(error);
      },
      complete: () => this.isLoading.set(false)
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }
}
