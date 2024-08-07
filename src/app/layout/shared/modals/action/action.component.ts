import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserAuthStore } from '../../../../utils/stores/auth.store';
import { dataConfigStore } from '../../../../utils/stores/data-config.store';
import { UserService } from '../../../../utils/user.service';
import { SnackbarService } from '../../../../utils/snackbar.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Item, ItemType } from '../../../../utils/models/item.model';
import { Router } from '@angular/router';

export enum ActionType {
  CONFIRMER = 'Confirmer',
  SUPPRIMER = 'Supprimer',
  UPDATE_NAME = 'Update',
}

export interface actionModal {
  action: ActionType;
  itemType?: ItemType;
  modalTitle: string;
  message: string;
  itemToDelete?: Item
}

@Component({
  selector: 'app-action',
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
    MatProgressSpinnerModule
  ],
  templateUrl: './action.component.html',
  styleUrl: './action.component.scss'
})
export class ActionComponent {
  public data: actionModal = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<ActionComponent>);
  readonly userAuthStore = inject(UserAuthStore);
  readonly dataConfigStore = inject(dataConfigStore);
  private userService = inject(UserService);
  private snackbar = inject(SnackbarService);
  router = inject(Router);
  destroyRef = inject(DestroyRef);
  public actionType = ActionType;
  name = signal('');
  isLoading = signal<boolean>(false);

  submit() {
    if(this.data.action === this.actionType.CONFIRMER) {
      this.userAuthStore.logout();
      this.dataConfigStore.clearDataConfigStore();
      this.dialogRef.close();
    }
    if(this.data.itemType === ItemType.TICKET && this.data.action === this.actionType.SUPPRIMER && this.data.itemToDelete!) {
      this.ticketLogic();
    }
    if(this.data.itemType === ItemType.TASK && this.data.action === this.actionType.SUPPRIMER && this.data.itemToDelete!) {
      this.taskLogic();
    }

    if(this.data.action === this.actionType.UPDATE_NAME && this.name()) {
      this.nameChangeLogic();
    }
    
  }

  private nameChangeLogic() {
    this.isLoading.set(true);
    const subscription = this.userService.updateUserLoggedName(this.name())
      .subscribe({
        next: (user) => {
          this.snackbar.openSnackBar('Modification effectuée avec succés');
          this.userAuthStore.upDateCurrentUserName(this.name());
          this.dialogRef.close();
        },
        error: (error: Error) => {
          this.isLoading.set(false);
          this.snackbar.openSnackBar(error.message, true);
          this.dialogRef.close();
        },
        complete: () => {
          this.isLoading.set(false);
        }
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  private taskLogic() {
    this.isLoading.set(true);
    const subscription = this.userService.deleteTask(this.data.itemToDelete!.id!).subscribe({
      next: (deleteTask) => {
        this.dialogRef.close(deleteTask);
        this.snackbar.openSnackBar('Suppression effectuée avec succés');
      },
      error: (error: Error) => {
        this.isLoading.set(false);
        this.snackbar.openSnackBar(error.message, true);
        this.dialogRef.close();
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  private ticketLogic() {
    this.isLoading.set(true);
    const subscription = this.userService.deleteItem(this.data.itemToDelete!.id).subscribe({
      next: () => {
        this.snackbar.openSnackBar('Suppression effectuée avec succés');
      },
      error: (error: Error) => {
        this.isLoading.set(false);
        this.snackbar.openSnackBar(error.message, true);
        this.dialogRef.close();
      },
      complete: () => {
        this.isLoading.set(false);
        this.dialogRef.close();
        this.router.navigateByUrl('/home', {
          replaceUrl: true
        });
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
