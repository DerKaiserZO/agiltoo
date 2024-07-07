import { ChangeDetectionStrategy, Component, computed, inject, model, OnInit, signal, viewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../layout/header/header.component';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
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
    return this.userAuthStore.getUserConnectedRole().includes('admin') ? 'Admin' : this.userAuthStore.getUserConnectedName();
  });
  
  close() {
    this.sidenav()!.close().then(() => this.isSideNavBarOpened.set(false));
  }
    
}
