import { Injectable, OnInit, inject } from '@angular/core';
import { UserApiServiceService } from './user-api-service.service';
import { IUser } from '../interface/iuser';
import { BehaviorSubject, tap, switchMap, shareReplay, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService{
  
  private UserApiServise = inject(UserApiServiceService);

  private readonly usersSubject$ = new BehaviorSubject<IUser[]>([]);
  public readonly users$ = this.usersSubject$.asObservable();

  loadUsers = this.UserApiServise.getUsers().pipe(
      tap ((data: IUser[]) => this.usersSubject$.next(data)),
      switchMap( () => this.usersSubject$), 
      shareReplay(1),
  ) 

  public deleteUser(id?:number): void{
    const upDataUsers = this.usersSubject$.value.filter(
    (user: IUser) => user.id !== id);
    this.usersSubject$.next(upDataUsers);
  }

  public addNewUser(data: IUser): void{
    const newUser = this.usersSubject$.value.concat(data);
    this.usersSubject$.next(newUser);
  }
}
