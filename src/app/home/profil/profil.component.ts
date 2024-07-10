import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { DialogService } from '../../utils/dialog.service';
import { ActionComponent, ActionType } from '../../layout/shared/modals/action/action.component';
import { UpdatePasswordComponent } from '../../layout/shared/modals/update-password/update-password.component';
import { UserAuthStore } from '../../utils/stores/auth.store';
import { NotificationComponent } from '../../layout/shared/modals/notification/notification.component';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [
    MatCardModule, 
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent {
  private dialogService = inject(DialogService);
  userAuthStore = inject(UserAuthStore);
  currentLoggedUser = this.userAuthStore.userAuth!;
  destroyRef = inject(DestroyRef)
  

  onNameEdit() {
    this.dialogService.openDialog(ActionComponent, undefined, {
      message : 'Veuillez renseigner le nouveau nom',
      action: ActionType.UPDATE_NAME,
      modalTitle : 'Modification du nom'
    })
  }

  onPasswordChange() {
    const dialogRef = this.dialogService.openDialog(UpdatePasswordComponent);
    const subscribe = dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.dialogService.openDialog(NotificationComponent, 
          {
            disableClose : true
          }, {
            message: 'Vous allez être déconnecté dans :',
            isCountDownMode: true
          });
      }
    });
    this.destroyRef.onDestroy(() => {
      subscribe.unsubscribe();
    })
  }

}
