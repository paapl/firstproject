import { Injectable, inject } from '@angular/core';
import { UserApiServiceService } from './user-api-service.service';
import { IUser } from '../interface/iuser';
import { BehaviorSubject, tap, switchMap, shareReplay, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {
  
  private userApiServise = inject(UserApiServiceService);

  private readonly usersSubject$ = new BehaviorSubject<IUser[]>([]);
  public readonly users$ = this.usersSubject$.asObservable();

// Load User
  loadUsers = this.userApiServise.getUsers().pipe(
    tap ((data: IUser[]) => this.usersSubject$.next(data)),
    switchMap( () => this.usersSubject$), 
    shareReplay(1),
  ) 
// Delete User
  public deleteUser(id?:number): void{
    const upDataUsers = this.usersSubject$.value.filter(
      (user: IUser) => user.id !== id);
    this.usersSubject$.next(upDataUsers);
  }
// Add User
  public addUser(data: IUser):void{
    this.usersSubject$.next(
      [...this.usersSubject$.value, data],
    )
  }
// Edit User
  public saveEditDataUser(edituser: IUser):void{
     this.usersSubject$.next(
      this.usersSubject$.value.map(
        user => user.id === edituser.id ? edituser : user,
      )
    )
  }
}
