import { Component, computed, inject, model, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogConfig, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
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
  roles?: string[]
}

// interface Role {
//   id: number;
//   name: string;
// }

export const configUpdateRoleModal: MatDialogConfig = {
  maxWidth: '30vw',
  // maxHeight: '60vw',
  width: '100%',
  // height: '100%',
  position: {
    top: '69px'
  }
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
export class UpdateUserRoleComponent implements OnInit{
  public data: updateUserRoleModal = inject(MAT_DIALOG_DATA);
  public updateType = UpdateType;
  name = signal('');
  roles = signal<string[]>([]);
  readonly currentRole = model('');
  readonly rolesData = ['user', 'admin'];

  readonly filteredRoles = computed(() => {
    const currentRole = this.currentRole().toLowerCase();
    return currentRole
      ? this.rolesData.filter(role => role.toLowerCase().includes(currentRole))
      : this.rolesData.slice();
  });

  ngOnInit(): void {
    if(this.data.roles!.length) {
      const initRolesData = this.data.roles!;
      this.roles.update((roles) => [...roles, ...initRolesData])
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      const isAllReadyExisted = this.roles().find(role => role.toLowerCase().includes(value));
      if(!isAllReadyExisted) return;
      this.roles.update(roles => [...roles, value]);
    }
    this.currentRole.set('');
  }

  remove(role: string): void {
    this.roles.update(roles => {
      const index = roles.indexOf(role);
      if (index < 0) {
        return roles;
      }

      roles.splice(index, 1);
      return [...roles];
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const newValue = event.option.viewValue;
    const isAllReadyExisted = this.roles().find(role => role.toLowerCase().includes(newValue));
    if(!isAllReadyExisted) {
      this.roles.update(roles => [...roles, event.option.viewValue]);      
    }
    this.currentRole.set('');
    event.option.deselect();
  }

  onSavedRoles() {
    console.log(this.roles());
  }
}
