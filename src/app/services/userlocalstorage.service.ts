import { Injectable } from '@angular/core';
import { IUser } from '../interface/user.inteface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserlocalstorageService {

  public setItem(value: IUser[]): Observable<IUser[]>{
    localStorage.setItem( 'key', JSON.stringify(value))
    return of(value)
  }

  public getItem():IUser[]{
    const key = 'key'
    const users = localStorage.getItem(key) as string;
    return JSON.parse(users)
  }

  public addUser(value: IUser): Observable<IUser>{
    const users = this.getItem();
    const localStorage = users.length > 0 ? users[users.length -1].id + 1 : 0;
    const addUser: IUser = {...value, id: localStorage};
    this.setItem([...users, addUser]);
    return of(value);
  }

  public deletUser(id:number):Observable<IUser[]>{
    const users = this.getItem();
    const newUsers = users.filter(user => user.id !== id);
    return this.setItem(newUsers);
  }

  public editUser(value: IUser):Observable<IUser>{
    const users = this.getItem();
    const editUser = users.map(
      user => user.id === value.id ? value : user
    );
    this.setItem(editUser);
    return of(value);
  }
}
