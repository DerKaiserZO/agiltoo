import { ChangeDetectionStrategy, Component, model, viewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../layout/header/header.component';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { NavComponent } from '../layout/nav/nav.component';

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
  isSideNavBarOpened = model(false);
  sidenav = viewChild(MatDrawer);
  
  close() {
    this.sidenav()!.close().then(() => this.isSideNavBarOpened.set(false));
  }
  
  logout() {
    throw new Error('Method not implemented.');
  }
    
}
