import { Injectable } from '@angular/core';
import { IUser } from '../interface/user.inteface';
import { LOCAL_STORAGE_USERS_KEY } from '../constants/constancts';


@Injectable({
  providedIn: 'root'
})
export class UserlocalstorageService {

  public setItem(value: IUser[]): void{
    localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(value))
  }

  public getItem(key: string): IUser[] | void{
    const getValueStorage = localStorage.getItem(key);

    if(getValueStorage !== null){
      const valueStorage: IUser[] = JSON.parse(getValueStorage)
      return valueStorage;
    } else {
      return 
    }
  }
}
