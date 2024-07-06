import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from '../../layout/shared/card/card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CardComponent, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    RouterLink,
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
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
  })
}
