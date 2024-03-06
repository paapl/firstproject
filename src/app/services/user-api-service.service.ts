import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserInteface } from '../interface/user.inteface';
import { Observable } from 'rxjs';
import { GET_USERS_API } from '../constants/constancts';

@Injectable({
  providedIn: 'root'
})
export class UserApiServiceService {
  constructor( ) { }

  private http = inject(HttpClient);
  private users!: Observable<UserInteface[]>;
  
  getUsers(): Observable<UserInteface[]>{
    this.users = this.http.get<UserInteface[]>(GET_USERS_API + '/users');
    return this.users;
  }
}
