import { Component, effect, HostListener, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { localStorageKey, UserAuthStore } from './utils/stores/auth.store';
import { dataConfigStore, localStorageDataConfigKey } from './utils/stores/data-config.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatSlideToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AGILTOO-APP';
  userAuthStore = inject(UserAuthStore);
  dataConfigStore = inject(dataConfigStore);

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: Event): void {
    if(this.userAuthStore && this.userAuthStore.isLoggedIn()) {
      this.userAuthStore.persistStore();
      this.dataConfigStore.persistStore();
    }
  }
}
