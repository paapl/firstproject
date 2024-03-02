import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IUser } from '../interface/user.inteface';
import { Observable } from 'rxjs';
import { GET_USERS_URL } from '../constants/constancts';

@Injectable({
  providedIn: 'root'
})
export class UserApiServiceService {
  constructor( ) { }

  private http = inject(HttpClient);
  private users!: Observable<IUser[]> | undefined;
  
  getUsers(): Observable<IUser[]>{
    this.users = this.http.get<IUser[]>(GET_USERS_URL);
    return this.users;
  }
}
