import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'
import { UsersServiceService } from '../services/users-service.service';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { IUser } from '../interface/iuser';

@Component({
  selector: 'app-createedituser',
  standalone: true,
  imports: [
    FormsModule, 
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './createedituser.component.html',
  styleUrl: './createedituser.component.scss'
})
export class CreateedituserComponent {
  public UserService = inject(UsersServiceService);

  constructor(
    public dialogRef: MatDialogRef<CreateedituserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}