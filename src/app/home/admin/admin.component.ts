import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal, viewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { USERS_DATA } from '../../dummy';
import { User } from './user.model';
import {MatChipsModule} from '@angular/material/chips';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DialogService } from '../../utils/dialog.service';
import { ActionComponent, ActionType } from '../../layout/shared/modals/action/action.component';
import { configUpdateRoleModal, UpdateUserRoleComponent } from '../../layout/shared/modals/update-user-role/update-user-role.component';
import { UserService } from '../../utils/user.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const USERS_DATA_TO_DISPLAY : User[] = USERS_DATA;


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
export class AdminComponent implements AfterViewInit, OnInit{
  private dialogService = inject(DialogService);
  displayedColumns: string[] = ['id', 'name', 'email', 'roles', 'isActive','actions'];
  dataSource = new MatTableDataSource<User>([]);
  paginator = viewChild(MatPaginator);
  userService = inject(UserService);
  isLoading = signal<boolean>(false);
  destroyRef = inject(DestroyRef);
  resultsLength = 0;

  ngOnInit(): void {
    this.isLoading.set(true);
    const subscription = this.userService.loadUsers().subscribe({
      next: (users) => {
        this.dataSource.data = users;
        this.resultsLength = users.length;
      },
      error: () => {},
      complete: () => {
        this.isLoading.set(false)
      }
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator()!;
  }

  onActionClicked(selectedUser: User) {
    this.dataSource.data = this.dataSource.data.map((user) => {
      if(user.id === selectedUser.id) {
        return { ...user, isActive: !selectedUser.isActive}
      }
      return user;
    })
  }

  onNameEdit(user: User) {
    this.dialogService.openDialog(ActionComponent, undefined, {
      message : 'Veuillez renseigner le nouveau nom',
      action: ActionType.UPDATE_NAME,
      modalTitle : 'Modification du nom'
    })
  }

  onRoleEdit(user: User) {
    this.dialogService.openDialog(UpdateUserRoleComponent, configUpdateRoleModal, {
      message : 'Veuillez choisir le role ',
      action: ActionType.UPDATE_NAME,
      modalTitle : 'Modification du role',
      roles: user.roles
    })
  }
}
