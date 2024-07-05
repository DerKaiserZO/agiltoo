import { Component, computed, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';

export enum UpdateType {
  NAME = 'name',
  ROLE = 'role'
}
export interface updateUserRoleModal {
  action: UpdateType;
  itemType?: string;
  modalTitle: string;
  message: string;
}

interface Role {
  id: number;
  name: string;
}


@Component({
  selector: 'app-update-user-role',
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
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule
  ],
  templateUrl: './update-user-role.component.html',
  styleUrl: './update-user-role.component.scss'
})
export class UpdateUserRoleComponent {
  public data: updateUserRoleModal = inject(MAT_DIALOG_DATA);
  public updateType = UpdateType;
  name = signal('');
  readonly roles = signal([]);
  readonly currentRole = model('');
  readonly rolesData: Role[] = [];

  readonly filteredFruits = computed(() => {
    const currentRole = this.currentRole().toLowerCase();
    return currentRole
      ? this.rolesData.filter(role => role.name.toLowerCase().includes(currentRole))
      : this.rolesData.slice();
  });

  // add(event: MatChipInputEvent): void {
  //   const value = (event.value || '').trim();

  //   if (value) {
  //     this.roles.update(roles => [...roles, value]);
  //   }

  //   // Clear the input value
  //   this.currentFruit.set('');
  // }

  // remove(fruit: string): void {
  //   this.fruits.update(fruits => {
  //     const index = fruits.indexOf(fruit);
  //     if (index < 0) {
  //       return fruits;
  //     }

  //     fruits.splice(index, 1);
  //     this.announcer.announce(`Removed ${fruit}`);
  //     return [...fruits];
  //   });
  // }

  // selected(event: MatAutocompleteSelectedEvent): void {
  //   this.fruits.update(fruits => [...fruits, event.option.viewValue]);
  //   this.currentFruit.set('');
  //   event.option.deselect();
  // }
}
