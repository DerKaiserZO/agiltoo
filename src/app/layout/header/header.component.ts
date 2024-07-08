import { ChangeDetectionStrategy, Component, computed, inject, input, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatChipsModule} from '@angular/material/chips';
import {MatBadgeModule} from '@angular/material/badge';
import { RouterLink } from '@angular/router';
import { UserAuthStore } from '../../utils/stores/auth.store';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule, 
    MatIconModule, 
    MatButtonModule,
    MatChipsModule,
    MatBadgeModule,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  sideNavOpened = model<boolean>();
  private userAuthStore = inject(UserAuthStore);
  isVisible = computed(() => {
    const isUserRole = this.userAuthStore.getUserConnectedRole().includes('user');
    if(isUserRole || (this.userAuthStore.isAdmin() && isUserRole)){
      return true;
    } else {
      return false;
    }
  })

  onSideNavOpened() {
    this.sideNavOpened.set(!this.sideNavOpened());
  }
  userName = input.required<string>();
}
