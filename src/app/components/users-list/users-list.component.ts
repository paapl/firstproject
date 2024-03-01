import { Component, OnInit, inject } from '@angular/core';
import { UserApiServiceService } from '../../services/user-api-service.service';
import { UserCardComponent } from './user-card/user-card.component';
import { AsyncPipe, NgForOf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { DialogEdit } from './dialogedit/dialogedit.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, take } from 'rxjs';
import { IUser } from '../../interface/user.inteface';
import { Store } from '@ngrx/store';
import { selectUsers } from './+state/users.selectors';
import * as userAcrion from './+state/users.action';


@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    UserCardComponent,
    DialogEdit,
    NgForOf,
    AsyncPipe,
    MatButtonModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  providers: [ UserApiServiceService]
})

export class UsersListComponent implements OnInit{
  users$!: Observable<IUser[]>;
  
  constructor( public dialog: MatDialog, private readonly store: Store ){
    this.users$ = this.store.select(selectUsers);
  }

  ngOnInit(): void {
      this.store.dispatch(userAcrion.loadUsers())
  }

  deleteUser(id:number): void{
    this.store.dispatch(userAcrion.deleteUsers({id}))
  }
  
  openDialog():void{
    const dialogRef = this.dialog.open(DialogEdit, {data:{}});
    dialogRef.afterClosed().pipe(
      map((myForm: IUser) => {
        if(myForm !== undefined){
          this.store.dispatch(userAcrion.createUsers({newUser: myForm}))
        }
      }),
      take(1)
    ).subscribe()
  }
}


