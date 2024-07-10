import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { UserAuthStore } from '../../../../utils/stores/auth.store';
import { dataConfigStore } from '../../../../utils/stores/data-config.store';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatDialogActions, 
    MatDialogClose, 
    MatDialogTitle, 
    MatDialogContent
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit {
  data = inject<{ message: string, isCountDownMode?: boolean}>(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<NotificationComponent>);
  private authUserStore = inject(UserAuthStore);
  private dataConfigStore = inject(dataConfigStore)
  countdownDuration = signal<number>(10);

  ngOnInit(): void {
    if(this.data.isCountDownMode) {
      this.startCountDown();
    }
  }

  private startCountDown() {
    const countdownInterval = setInterval(() => {
      this.countdownDuration.update((oldValue) => --oldValue);
      if (this.countdownDuration() <= 0) {
        clearInterval(countdownInterval);
        this.authUserStore.logout();
        this.dataConfigStore.clearDataConfigStore();
        this.dialogRef.close();
      }
  }, 1000);
  }
}
