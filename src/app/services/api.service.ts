import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from './api-url.token';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(API_URL);
  
  public get<T>(url: string): Observable<T>{
    return this.http.get<T>(`${this.apiUrl}${url}`);
  }

  public delete<T>(url: string): Observable<T>{
    return this.http.delete<T>(`${this.apiUrl}${url}`);
  }

  public post<T>(url: string, data: T ): Observable<T>{
    return this.http.post<T>(`${this.apiUrl}${url}`, JSON.stringify(data));
  }

  public put<T>(url: string, data: T): Observable<T>{
    return this.http.put<T>(`${this.apiUrl}${url}`, JSON.stringify(data));
  }

}
