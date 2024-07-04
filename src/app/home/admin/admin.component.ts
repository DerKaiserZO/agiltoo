import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { USERS_DATA } from '../../dummy';
import { User } from './user.model';

const USERS_DATA_TO_DISPLAY : User[] = USERS_DATA;


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatCardModule, MatTableModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'isActive', 'roles'];
  dataSource = USERS_DATA_TO_DISPLAY;
}
