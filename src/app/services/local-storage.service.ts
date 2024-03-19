import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public setItem<T>(key:string, value:T): void{
    localStorage.setItem(key, JSON.stringify(value))
  }

  public getItem<T>(key: string): any {
    const getValueStorage = localStorage.getItem(key);

    if(getValueStorage !== null){
      const valueStorage = JSON.parse(getValueStorage)
      return valueStorage;
    }
  }
}
