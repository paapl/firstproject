import { Injectable } from '@angular/core';
import { IUser } from '../interface/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserlocalstorageService {

  constructor() {}

  public setItem(value: IUser[]): void{
    localStorage.setItem( 'key', JSON.stringify(value))
  }

  public getItem():IUser[] | null{
    const key = 'key'
    const users = localStorage.getItem(key);
    if(users === null){
      return null
    }
    try {
      return JSON.parse(users)
    } catch {
      return null
    }
  }
}
