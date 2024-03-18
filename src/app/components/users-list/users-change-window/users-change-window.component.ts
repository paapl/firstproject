import { Component, Inject, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { UserInteface } from '../../../interface/user.inteface';


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
  templateUrl: './users-change-window.component.html',
  styleUrl: './users-change-window.component.scss'
})
export class UsersChangeWindow implements OnInit {

  constructor(
    private dialogChangeUsers: MatDialogRef<UsersChangeWindow>,
    @Inject(MAT_DIALOG_DATA) public data: {isEdit: boolean, dataUser: UserInteface},
    ) {}
    
    ngOnInit(): void {
      if(this.data.isEdit){
        this.myForm.patchValue(this.data.dataUser)
      } 
    }
    onNoClick(): void {
      this.dialogChangeUsers.close();
    }
    myForm = new FormGroup({
      id: new FormControl( new Date().getTime(), Validators.required),
      name: new FormControl( '' , Validators.required),
      username: new FormControl( '', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.minLength(5)]),
    })
}