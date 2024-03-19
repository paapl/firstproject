import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { LocalStorageService } from './local-storage.service';
import { LOCAL_STORAGE_USERS_KEY } from '../constants/constants';
import { Observable, of, tap } from 'rxjs';
import { User } from '../interface/user.inteface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly userLocalStorage = inject(LocalStorageService);
  private readonly userApiService = inject(ApiService);

  initialUsers(): Observable<User[]>{
    const storageValue = this.userLocalStorage.getItem(LOCAL_STORAGE_USERS_KEY);

    if(storageValue && storageValue.length !== 0){
      return of(storageValue);
    } else {
      return this.userApiService.get<User[]>(`/users`).pipe(
        tap((dataUser: User[]) => this.userLocalStorage.setItem(LOCAL_STORAGE_USERS_KEY, dataUser)),
      )
    }
  }
  
}
