import { Component, inject } from '@angular/core';
import { UsersServiceService } from '../../services/users-service.service';
import { UserApiServiceService } from '../../services/user-api-service.service';
import { UserCardComponent } from '../UI/user-card/user-card.component';
import { AsyncPipe, NgForOf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CreateedituserComponent } from '../createedituser/dialogedit.component';
import { MatDialog } from '@angular/material/dialog';
import { map, takeUntil } from 'rxjs';
import { IUser } from '../../interface/iuser';


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

  constructor(public dialog: MatDialog){}
  public UsersService = inject(UsersServiceService);

  // Удаление карточки
  deleteUser(id:number): void{
    this.UsersService.deleteUser(id);
  }

  // Открытие формы создания
  openDialog():void{
    const dialogRef = this.dialog.open(CreateedituserComponent, {data:{}});
    dialogRef.afterClosed().pipe(
      map((myForm: IUser) => {
        if(myForm != undefined){
          this.UsersService.addUser(myForm)
        }
      }),
      takeUntil(dialogRef.afterClosed())
    ).subscribe()
  }
}


