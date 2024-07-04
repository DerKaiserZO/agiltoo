import { ComponentType } from '@angular/cdk/portal';
import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialog = inject(MatDialog);
  
  openDialog<T>(component: ComponentType<T>,config?: MatDialogConfig, data?: any): MatDialogRef<T> {
    return this.dialog.open(component, {
      ...config,
      data: data
    });
  }
}
