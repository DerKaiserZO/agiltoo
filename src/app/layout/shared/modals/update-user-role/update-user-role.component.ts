import { Component, computed, DestroyRef, inject, model, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogConfig, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { UserService } from '../../../../utils/user.service';
import { User } from '../../../../home/admin/user.model';
import { SnackbarService } from '../../../../utils/snackbar.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export interface updateUserRoleModal {
  modalTitle: string;
  message: string;
  userToUpdate: User
}

export const configUpdateRoleModal: MatDialogConfig = {
  maxWidth: '30vw',
  width: '100%',
  position: {
    top: '69px'
  },
  disableClose : true
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
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './update-user-role.component.html',
  styleUrl: './update-user-role.component.scss'
})
export class UpdateUserRoleComponent implements OnInit{
  public data: updateUserRoleModal = inject(MAT_DIALOG_DATA);
  name = signal('');
  isLoading = signal<boolean>(false);
  userService = inject(UserService);
  destroyRef = inject(DestroyRef);
  roles = signal<string[]>([]);
  readonly currentRole = model('');
  readonly rolesData = ['user', 'admin'];
  private dialogRef = inject(MatDialogRef<UpdateUserRoleComponent>);
  private snackbar = inject(SnackbarService);

  readonly filteredRoles = computed(() => {
    const currentRole = this.currentRole().toLowerCase();
    return currentRole
      ? this.rolesData.filter(role => role.toLowerCase().includes(currentRole))
      : this.rolesData.slice();
  });

  ngOnInit(): void {
    const user = this.data.userToUpdate;
    if(user.roles!.length) {
      const initRolesData = user.roles!;
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
    const user = this.data.userToUpdate;
    const rolesToUpdate =  this.roles();
    this.isLoading.set(true);
    const subscription = this.userService.updateUser({
      ...user,
      roles: rolesToUpdate
    }).subscribe(
      {
        next: (savedUser) => {
          this.snackbar.openSnackBar('Modification effectuée avec succés');
          this.dialogRef.close(savedUser)
        },
        error: (error) => {
          this.isLoading.set(false);
          this.snackbar.openSnackBar(error);
        },
        complete: () => this.isLoading.set(false)
      }
    );

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }
}
