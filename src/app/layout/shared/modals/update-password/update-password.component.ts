import { Component, DestroyRef, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../../../utils/user.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

function equalValues(controlName1: string, controlName2: string) {
  return (control:AbstractControl) => {
    const password = control.get(controlName1)?.value;
    const confirmPassword = control.get(controlName2)?.value;
  
    if(password === confirmPassword) {
      return null;
    }
    return {
      passNotEqual: true
    }
  }
}

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatDialogActions, 
    MatDialogClose, 
    MatDialogTitle, 
    MatDialogContent,
    MatFormField,
    MatFormFieldModule, 
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss'
})
export class UpdatePasswordComponent {
  private userService = inject(UserService);
  private dialogRef = inject(MatDialogRef<UpdatePasswordComponent>);
  destroyRef = inject(DestroyRef);
  isLoading = signal<boolean>(false);

  updatePasswordForm = new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    }, {
      validators: [equalValues('password', 'confirmPassword')]
    })

  onSubmit() {
    this.isLoading.set(true)
    const subscription = this.userService.updateUserPassword(this.updatePasswordForm.value.password!)
    .subscribe( {
      next: () => {
        this.isLoading.set(false);
        this.dialogRef.close(true);
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe())
  }
}
