import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, OnInit, signal, viewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { User } from './user.model';
import {MatChipsModule} from '@angular/material/chips';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DialogService } from '../../utils/dialog.service';
import { configUpdateRoleModal, UpdateUserRoleComponent } from '../../layout/shared/modals/update-user-role/update-user-role.component';
import { UserService } from '../../utils/user.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminActionsComponent } from '../../layout/shared/modals/admin-actions/admin-actions.component';
import { SnackbarService } from '../../utils/snackbar.service';



@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    MatCardModule, 
    MatTableModule, 
    MatChipsModule, 
    MatPaginator, 
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit{
  private dialogService = inject(DialogService);
  displayedColumns: string[] = ['id', 'name', 'email', 'roles', 'isActive','actions'];
  dataSource?: MatTableDataSource<User>;
  paginator = viewChild(MatPaginator);
  userService = inject(UserService);
  isLoading = signal<boolean>(false);
  isLoadingRoleUpdate = signal<boolean>(false);
  destroyRef = inject(DestroyRef);
  private snackbar = inject(SnackbarService);
  
  constructor() {
    effect(() => {
      this.dataSource!.paginator = this.paginator()!;
    })
  }

  ngOnInit(): void {
    this.isLoading.set(true);
    const subscription = this.userService.loadUsers().subscribe({
      next: (users) => {
        this.dataSource = new MatTableDataSource(users);
      },
      error: () => {},
      complete: () => {
        this.isLoading.set(false);
      }
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  onActionClicked(selectedUser: User) {
    this.isLoadingRoleUpdate.set(true);
    const subscription = this.userService.updateUser({...selectedUser, isActive : !selectedUser.isActive}).subscribe({
      next: () => {
        this.isLoadingRoleUpdate.set(false);
        this.dataSource!.data = this.dataSource!.data.map((user) => {
          if(user.id === selectedUser.id) {
            return { ...user, isActive: !selectedUser.isActive}
          }
          return user;
        });
        this.snackbar.openSnackBar('Modification effectuée avec succés');
      },
      error: (error) => {
        this.snackbar.openSnackBar(error);
        this.isLoadingRoleUpdate.set(false);
      }
    })
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  onNameEdit(user: User) {
    const dialogRef = this.dialogService.openDialog(AdminActionsComponent, undefined, {
      message : 'Veuillez renseigner le nouveau nom',
      modalTitle : 'Modification du nom',
      user
    });
    const subscription = dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.dataSource!.data = this.dataSource!.data.map((user) => {
          if(user.id === result.id) {
            return { ...user, name: result.name}
          }
          return user;
        })
      }
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  onRoleEdit(user: User) {
    const dialogRef = this.dialogService.openDialog(UpdateUserRoleComponent, configUpdateRoleModal, {
      message : 'Veuillez choisir le role ',
      modalTitle : 'Modification du role',
      userToUpdate: user
    });
    const subscription = dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.dataSource!.data = this.dataSource!.data.map((user) => {
          if(user.id === result.id) {
            return { ...user, roles: result.roles}
          }
          return user;
        })
      }
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }
}
