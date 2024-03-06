import { Injectable, inject } from '@angular/core';
import { UserApiServiceService } from './user-api-service.service';
import { UserlocalstorageService } from './userlocalstorage.service';
import { LOCAL_STORAGE_USERS_KEY } from '../constants/constancts';
import { Observable, delay, of, takeUntil, tap } from 'rxjs';
import { UserInteface } from '../interface/user.inteface';
import { usersListFacade } from '../components/users-list/+state/users.facade';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly userLocalStorage = inject(UserlocalstorageService);
  private readonly userApiService = inject(UserApiServiceService);
  constructor(private readonly usersFacade: usersListFacade){}

  private data$ = this.usersFacade.users$;
  
  upDataLocalStorage(){
    this.data$.pipe(
      tap((data: UserInteface[]) => this.userLocalStorage.setItem(data))
    ).subscribe()
  }

  initialUsers(): Observable<UserInteface[]>{
    const getValueStorage = this.userLocalStorage.getItem(LOCAL_STORAGE_USERS_KEY);

    if(getValueStorage && getValueStorage.length !== 0){
      return of(getValueStorage);
    } else {
      return this.userApiService.getUsers().pipe(
        delay(1500),
        tap((dataUser: UserInteface[]) => this.userLocalStorage.setItem(dataUser)),
      )
    }
  }
}
