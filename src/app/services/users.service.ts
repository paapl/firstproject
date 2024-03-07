import { Injectable, inject } from '@angular/core';
import { UserApiServiceService } from './user-api-service.service';
import { UserlocalstorageService } from './userlocalstorage.service';
import { LOCAL_STORAGE_USERS_KEY } from '../constants/constancts';
import { Observable, delay, of, tap } from 'rxjs';
import { UserInteface } from '../interface/user.inteface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly userLocalStorage = inject(UserlocalstorageService);
  private readonly userApiService = inject(UserApiServiceService);

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
