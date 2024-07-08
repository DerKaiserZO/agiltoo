import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ItemDetailComponent } from '../../../layout/shared/item-detail/item-detail.component';
import { ActivatedRoute, Router, RouterLink, RouterStateSnapshot } from '@angular/router';
import { Task, ItemType } from '../../../utils/models/item.model';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../utils/user.service';
import { SnackbarService } from '../../../utils/snackbar.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    MatCardModule, 
    ItemDetailComponent,
    MatButtonModule,
    RouterLink,
    MatProgressSpinnerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
  task?:Task;
  private router = inject(Router);
  private userService = inject(UserService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private snackbar = inject(SnackbarService);
  itemTypeTask = ItemType.TASK;
  isLoading = signal<boolean>(false);


  ngOnInit(): void {
    this.isLoading.set(true);
    const subscription = this.userService.getOneTask(+this.activatedRoute.snapshot.paramMap.get('taskId')!)
    .subscribe({
      next: (result) => {
        this.task = result;
      },
      error: (error) => {
        this.snackbar.openSnackBar(error.message, true);
        this.router.navigateByUrl('not-found', {
          replaceUrl: true
        });
      },
      complete: () => this.isLoading.set(false)
    })
    this.destroyRef.onDestroy(() => subscription.unsubscribe())
  }
}