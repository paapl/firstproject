import { Component, OnInit, inject } from '@angular/core';
import { UserApiServiceService } from '../../services/user-api-service.service';
import { UserCardComponent } from './user-card/user-card.component';
import { AsyncPipe, NgForOf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { UsersChangeWindow } from './users-change-window/users-change-window.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, take } from 'rxjs';
import { UserInteface } from '../../interface/user.inteface';
import { UsersService } from '../../services/users.service';
import { UsersfilterComponent } from './usersfilter/usersfilter.component';
import { usersListFacade } from './+state/users.facade';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    UserCardComponent,
    UsersfilterComponent,
    UsersChangeWindow,
    NgForOf,
    AsyncPipe,
    MatButtonModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  providers: [ UserApiServiceService]
})

export class UsersListComponent implements OnInit{ 

  public readonly usersService = inject(UsersService);
  public user$!: Observable<UserInteface[]>;

  constructor(private dialog: MatDialog, private readonly usersFacade: usersListFacade){}

  ngOnInit(): void {
    this.user$ = this.usersFacade.users$;
    this.usersFacade.loadUsers();
    this.usersService.upDataLocalStorage();
  }
  
  deleteUser(id:number): void{
    this.usersFacade.deleteUser(id);
  }
  
  openDialog():void{
    const dialogRef = this.dialog.open(UsersChangeWindow, {data:{}});
    dialogRef.afterClosed().pipe(
      map((myForm: UserInteface) => {
        if(myForm !== undefined){
          this.usersFacade.createUser(myForm);
        }
      }),
      take(1)
    ).subscribe()
  }
}


