import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService {

  constructor(public _http: HttpClient) {
  }

  public POST<T>(url: string, item: T): Promise<T> {
    return new Promise((resolve, reject) => {
      this._http.post(url, item).subscribe(
        (data: T) => {
          resolve(data);
        },
        err => {
          console.log(err);
          reject();
        }
      );
    });
  }

  public GET<T>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this._http.get(url).subscribe(
        (data: T) => {
          resolve(data);
        },
        err => {
          console.log(err);
          reject();
        }
      );
    });
  }

  public PUT<T>(url: string, item: T): Promise<T> {
    return new Promise((resolve, reject) => {
      this._http.put(url, item).subscribe(
        (data: T) => {
          resolve(data);
        },
        err => {
          console.log(err);
          reject();
        }
      );
    });
  }

  public DELETE<T>(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this._http.delete(url).subscribe(
        (_) => {
          resolve();
        },
        err => {
          console.log(err);
          reject();
        }
      );
    });
  }

}
