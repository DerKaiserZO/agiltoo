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
  authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  isFetching = signal(false);
  private router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)]
    })
  });

  onSubmit(){
    this.isFetching.set(true);
    const subscription = this.authService.login(this.loginForm.value as LoginUser).subscribe({
      error: () => {
        this.isFetching.set(false);
      },
      complete: () => {
        this.isFetching.set(false);
        this.router.navigate(['/home'], { replaceUrl: true });
      }
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
