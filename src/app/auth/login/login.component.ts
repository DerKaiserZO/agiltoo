import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CardComponent } from '../../layout/shared/card/card.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardComponent, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
