import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IUser } from '../interface/iuser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiServiceService {
  constructor( ) { }

  private http = inject(HttpClient);

  private url = 'https://jsonplaceholder.typicode.com/users';
  
  getUsers(): Observable<IUser[]>{
    return this.http.get<IUser[]>(this.url);
  }
}
