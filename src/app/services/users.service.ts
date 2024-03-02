import { Injectable, inject } from '@angular/core';
import { UserApiServiceService } from './user-api-service.service';
import { UserlocalstorageService } from './userlocalstorage.service';
import { LOCAL_STORAGE_USERS_KEY } from '../constants/constancts';
import { Store } from '@ngrx/store';
import { Observable, map, of, shareReplay, take, takeUntil, tap } from 'rxjs';
import { IUser } from '../interface/user.inteface';
import {selectUsers} from '../components/users-list/+state/users.selectors';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly userLocalStorage = inject(UserlocalstorageService);
  private readonly userApiService = inject(UserApiServiceService);
  constructor(private readonly store: Store){}

  upDataLocalStorage(){
    const data$ = this.store.select(selectUsers);
    data$.pipe(
      map((data:IUser[]) => {return this.userLocalStorage.setItem(data)}),
    ).subscribe();
  }

  initialUsers(): Observable<IUser[]>{
    const getValueStorage = this.userLocalStorage.getItem(LOCAL_STORAGE_USERS_KEY);

    if(getValueStorage){
      return of(getValueStorage);
    } else {
      return this.userApiService.getUsers().pipe(
        tap((dataUser: IUser[]) => this.userLocalStorage.setItem(dataUser)),
      )
    }
  }
}
