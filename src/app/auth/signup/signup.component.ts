import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CardComponent } from '../../layout/shared/card/card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserAuthStore } from '../../utils/stores/auth.store';
import { SignupUser } from '../../utils/models/auth.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-signup',
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
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  userAuthStore = inject(UserAuthStore);
  isFetching = this.userAuthStore.isLoading;

  signUpForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required]
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }), 
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)]
    })
  });

  submit() {
    this.userAuthStore.signup(this.signUpForm.value as SignupUser);
  }
}
