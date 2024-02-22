import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IUser } from '../interface/iuser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiServiceService {
  constructor( ) { }

  private _http = inject(HttpClient);

  private url: string = 'https://jsonplaceholder.typicode.com/users';
  

  getUsers(): Observable<IUser[]>{
    return this._http.get<IUser[]>(this.url);
  }
}
