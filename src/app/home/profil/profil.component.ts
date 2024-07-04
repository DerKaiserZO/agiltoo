import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { DialogService } from '../../utils/dialog.service';
import { ActionComponent, ActionType } from '../../layout/shared/modals/action/action.component';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [
    MatCardModule, 
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent {
  private dialogService = inject(DialogService);

  onNameEdit() {
    this.dialogService.openDialog(ActionComponent, undefined, {
      message : 'Veuillez renseigner le nouveau nom',
      action: ActionType.UPDATE_NAME,
      modalTitle : 'Modification du nom'
    })
  }

}
