import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
  public actionType = ActionType;
  name = signal('');
}
