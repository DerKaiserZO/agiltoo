import { ChangeDetectionStrategy, Component, computed, inject, input, model, signal, viewChild } from '@angular/core';
import { ResolveFn, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../layout/header/header.component';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { NavComponent } from '../layout/nav/nav.component';
import { UserAuthStore } from '../utils/stores/auth.store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet, 
    HeaderComponent,
    NavComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  userAuthStore = inject(UserAuthStore);
  isSideNavBarOpened = model(false);
  sidenav = viewChild(MatDrawer);
  userConnectedName = computed(() => {
    if(this.userAuthStore.isLoggedIn() &&!this.userAuthStore.isAdmin() && this.userAuthStore.getUserConnectedName()) {
      return this.userAuthStore.getUserConnectedName()
    } else {
      return 'Admin'
    }
  });

  
  close() {
    this.sidenav()!.close().then(() => this.isSideNavBarOpened.set(false));
  }
    
}
export const resolveUserConnectedName: ResolveFn<string> = (
  activatedRouteSnapshot,
  routerState
) => {
  const userAuthStore = inject(UserAuthStore);
  const isUserRole = userAuthStore.getUserConnectedRole().includes('user');
  if(isUserRole) return userAuthStore.getUserConnectedName();
  return 'Admin';
};
