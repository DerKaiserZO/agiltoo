import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserAuthStore } from '../../../../utils/stores/auth.store';
import { dataConfigStore } from '../../../../utils/stores/data-config.store';

export enum ActionType {
  CONFIRMER = 'Confirmer',
  SUPPRIMER = 'Supprimer',
  UPDATE_NAME = 'Update',
}

export interface actionModal {
  action: ActionType;
  itemType?: string;
  modalTitle: string;
  message: string;
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
    FormsModule
  ],
  templateUrl: './action.component.html',
  styleUrl: './action.component.scss'
})
export class ActionComponent {
  public data: actionModal = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<ActionComponent>)
  readonly userAuthStore = inject(UserAuthStore);
  readonly dataConfigStore = inject(dataConfigStore);
  public actionType = ActionType;
  name = signal('');

  submit() {
    if(this.data.action === this.actionType.CONFIRMER) {
      this.userAuthStore.logout();
      this.dataConfigStore.clearDataConfigStore();
      this.dialogRef.close();
    }
  }
}
