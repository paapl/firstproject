import { Component, Inject, OnInit } from '@angular/core';
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
import { User } from '../../../interface/user.inteface';


@Component({
  selector: 'app-dialog-users-change',
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
  templateUrl: './dialog-users-change.component.html',
  styleUrl: './dialog-users-change.component.scss'
})
export class DialogUsersChange implements OnInit {

  constructor(
    private matDialogRef: MatDialogRef<DialogUsersChange>,
    @Inject(MAT_DIALOG_DATA) private readonly User?: User,
    ) {}
    
    get isEdit(): boolean{
      return Boolean(this.User);
    }
    ngOnInit(): void {
      if(this.User){
        this.myForm.patchValue(this.User);
      } 
    }
    closeDialog(): void {
      this.matDialogRef.close();
    }
    myForm = new FormGroup({
      id: new FormControl( new Date().getTime(), Validators.required),
      name: new FormControl( '' , Validators.required),
      username: new FormControl( '', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.minLength(5)]),
    })
}