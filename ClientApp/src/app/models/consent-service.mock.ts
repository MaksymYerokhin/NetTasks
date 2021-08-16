import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsentServiceMock {

  create(consent) {
    return {
      ...consent,
      id: '3'
    }
  }

  update(consent) {
    return consent
  }

  get = jest.fn().mockReturnValue([
    { id: '1', userName: 'Max', webSite: 'google.com', responsesBitmask: 5, date: new Date() },
    { id: '2', userName: 'Max2', webSite: 'google.com', responsesBitmask: 6, date: new Date() }
  ]);

  delete = jest.fn();
}
