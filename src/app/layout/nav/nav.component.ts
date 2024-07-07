import { ChangeDetectionStrategy, Component, computed, inject, input, model, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { DialogService } from '../../utils/dialog.service';
import { ActionComponent, ActionType } from '../shared/modals/action/action.component';
import { UserAuthStore } from '../../utils/stores/auth.store';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  isSideNavBarOpened = model(false);
  userName = input.required<string>();
  sidenav = viewChild(MatDrawer);
  private dialogService = inject(DialogService);
  private UserAuthStore = inject(UserAuthStore);
  isAdmin = computed(() => this.UserAuthStore.getUserConnectedRole().includes('admin'))

  close() {
    this.sidenav()!.close().then(() => this.isSideNavBarOpened.set(false));
  }

  logout() {
    this.dialogService.openDialog(ActionComponent, undefined, {
      message : `Souhaitez-vous confirmer`,
      action: ActionType.CONFIRMER,
      modalTitle : `Déconnexion`
    })
  }
}
