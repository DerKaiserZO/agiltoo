import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
    ReactiveFormsModule
  ],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss'
})
export class UpdatePasswordComponent {
onSubmit() {
throw new Error('Method not implemented.');
}
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
}
