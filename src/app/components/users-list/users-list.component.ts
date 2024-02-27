import { Component, OnInit, inject } from '@angular/core';
import { UsersServiceService } from '../../services/users-service.service';
import { UserApiServiceService } from '../../services/user-api-service.service';
import { UserCardComponent } from '../UI/user-card/user-card.component';
import { AsyncPipe, NgForOf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CreateedituserComponent } from '../dialogedit/dialogedit.component';
import { MatDialog } from '@angular/material/dialog';
import { map, take } from 'rxjs';
import { IUser } from '../../interface/iuser';
import { UserlocalstorageService } from '../../services/userlocalstorage.service';


@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    UserCardComponent,
    CreateedituserComponent,
    NgForOf,
    AsyncPipe,
    MatButtonModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  providers: [UsersServiceService, UserApiServiceService]
})

export class UsersListComponent{

  constructor(public dialog: MatDialog){
    this.setLocal();
  }
  public usersService = inject(UsersServiceService);
  public localService = inject(UserlocalstorageService);

  // Удаление карточки
  deleteUser(id:number): void{
    this.usersService.deleteUser(id);
  }

  // Открытие формы создания
  openDialog():void{
    const dialogRef = this.dialog.open(CreateedituserComponent, {data:{}});
    dialogRef.afterClosed().pipe(
      map((myForm: IUser) => {
        if(myForm != undefined){
          this.usersService.addUser(myForm)
          console.log(myForm)
        }
      }),
      take(1)
    ).subscribe()
  }
    //Localstorage

    setLocal(): void{
      const data = this.localService.getItem();
      if(data === null){
        this.usersService.loadUserss();
      } else {
        this.usersService.local(data);
      }
    }
}


