import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CardComponent } from '../../layout/shared/card/card.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../utils/auth.service';
import { LoginUser } from '../../utils/models/auth.model';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { UserAuthStore } from '../../utils/stores/auth.store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardComponent, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    RouterLink,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  readonly userAuthStore = inject(UserAuthStore);

  authService = inject(AuthService);
  isFetching = this.userAuthStore.isLoading;
  private router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)]
    })
  });

  // get emailIsInvalid() {
  //   return (this.loginForm.controls.email.touched && this.loginForm.controls.email.dirty && this.loginForm.controls.email.invalid);
  // }

  // get passwordIsInvalid() {
  //   return (this.loginForm.controls.password.touched && this.loginForm.controls.password.dirty && this.loginForm.controls.password.invalid);
  // }

  onSubmit(){
    this.userAuthStore.login(this.loginForm.value as LoginUser);
  }
}
