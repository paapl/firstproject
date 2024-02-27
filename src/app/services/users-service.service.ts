import { Injectable, OnDestroy, inject } from '@angular/core';
import { UserApiServiceService } from './user-api-service.service';
import { IUser } from '../interface/iuser';
import { BehaviorSubject, tap, switchMap, shareReplay, map, takeUntil, Observable } from 'rxjs';
import { UserlocalstorageService } from './userlocalstorage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {
  
  constructor(){}

  private userApiServise = inject(UserApiServiceService);
  private userLocalStorage =inject(UserlocalstorageService);

  private readonly usersSubject$ = new BehaviorSubject<IUser[]>([]);
  public readonly users$ = this.usersSubject$.asObservable();

// Localstor
  public local(data: IUser[]): void{
    this.usersSubject$.next(data)
    console.log(data);
    console.log(this.usersSubject$.value);
  }

  public loadUserss(): void{
    this.userApiServise.getUsers().pipe(
      tap((data:IUser[]) => this.usersSubject$.next(data)),
      switchMap( () => this.usersSubject$),
      map(() => this.userLocalStorage.setItem(this.usersSubject$.value)),
      shareReplay(1),
    ).subscribe()
  }

// Delete User
  public deleteUser(id?:number): void{
    const upDataUsers = this.usersSubject$.value.filter(
      (user: IUser) => user.id !== id);
    this.usersSubject$.next(upDataUsers);
    this.userLocalStorage.setItem(this.usersSubject$.value);
  }

// Add User
  public addUser(data: IUser):void{
    this.usersSubject$.next(
      [...this.usersSubject$.value, data],
    )
    this.userLocalStorage.setItem(this.usersSubject$.value);
  }

// Edit User
  public saveEditDataUser(edituser: IUser):void{
     this.usersSubject$.next(
      this.usersSubject$.value.map(
        user => user.id === edituser.id ? edituser : user,
      ),
    )
    this.userLocalStorage.setItem(this.usersSubject$.value);
  }
}