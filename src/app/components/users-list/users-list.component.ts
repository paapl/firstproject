import { Component, OnDestroy, inject } from '@angular/core';
import { UserCardComponent } from './user-card/user-card.component';
import { AsyncPipe, NgForOf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { DialogUsersChange } from './dialog-users-change/dialog-users-change.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, map, take, tap } from 'rxjs';
import { User } from '../../interface/user.inteface';
import { UsersFilterComponent } from './users-filter/users-filter.component';
import { UsersListFacade } from './+state/users.facade';
import { LocalStorageService } from '../../services/local-storage.service';
import { LOCAL_STORAGE_USERS_KEY } from '../../constants/constants';
import { API_URL } from '../../services/api-url.token';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    UserCardComponent,
    UsersFilterComponent,
    DialogUsersChange,
    NgForOf,
    AsyncPipe,
    MatButtonModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})

export class UsersListComponent implements OnDestroy{ 

  constructor(){
    this.UsersFacade.loadUsers();
    this.removeDataLocalStorage();
  }

  private readonly UsersLocalStorage = inject(LocalStorageService);
  private matDialogCreateUser = inject(MatDialog);
  private readonly UsersFacade = inject(UsersListFacade);
  public readonly user$ = this.UsersFacade.users$;
  private readonly key = LOCAL_STORAGE_USERS_KEY;
  public subscripion!: Subscription;
  
  ngOnDestroy(): void {
    this.subscripion.unsubscribe()
  }

  removeDataLocalStorage(){
    this.subscripion = this.user$.pipe(
      tap((data) => this.UsersLocalStorage.setItem(this.key, data))
    ).subscribe()
  }
  
  deleteUser(id:number): void{
    this.UsersFacade.deleteUser(id);
  }
  
  openDialog():void{
    const dialogRef = this.matDialogCreateUser.open(DialogUsersChange);
    dialogRef.afterClosed().pipe(
      map((myForm: User) => {
        if(myForm !== undefined){
          this.UsersFacade.createUser(myForm);
        }
      }),
      take(1)
    ).subscribe()
  }
}


