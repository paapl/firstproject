import { Component, Inject, inject, OnInit } from '@angular/core';
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
  templateUrl: './dialogedit.component.html',
  styleUrl: './dialogedit.component.scss'
})
export class DialogEdit implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DialogEdit>,
    @Inject(MAT_DIALOG_DATA) public data: {isEdit: boolean | undefined, dataUser:any},
    ) {}

    ngOnInit(): void {
      if(this.data.isEdit){
        this.pathValueForm();
      } 
    }
    onNoClick(): void {
      this.dialogRef.close();
    }

    myForm = new FormGroup({
      id: new FormControl( new Date().getTime(), Validators.required),
      name: new FormControl( '' , Validators.required),
      username: new FormControl( '', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.minLength(5)]),
    })
    
    pathValueForm(){
      this.myForm.patchValue(this.data.dataUser)
    }
}