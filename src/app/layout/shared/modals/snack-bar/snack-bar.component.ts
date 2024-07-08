import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MAT_SNACK_BAR_DATA, MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatSnackBarLabel, 
    MatSnackBarActions, 
    MatSnackBarAction,
    MatIconModule
  ],
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.scss'
})
export class SnackBarComponent {
  snackBarRef = inject(MatSnackBarRef);
  data: {message: string, hasError?: boolean} = inject(MAT_SNACK_BAR_DATA);
}
