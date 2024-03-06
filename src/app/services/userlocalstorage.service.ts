import { Injectable } from '@angular/core';
import { UserInteface } from '../interface/user.inteface';
import { LOCAL_STORAGE_USERS_KEY } from '../constants/constancts';


@Injectable({
  providedIn: 'root'
})
export class UserlocalstorageService {

  public setItem(value: UserInteface[]): void{
    localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(value))
  }

  public getItem(key: string): UserInteface[] | void{
    const getValueStorage = localStorage.getItem(key);

    if(getValueStorage !== null){
      const valueStorage: UserInteface[] = JSON.parse(getValueStorage)
      return valueStorage;
    }
  }
}
