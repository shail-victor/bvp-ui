import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isUserLoggedIn: boolean = false;
  updatedData;
  isSuccess;
  reason;
  updatedSecondData;
  constructor() {
    if(localStorage.getItem('isUserLoggedIn') === 'true') {
      this.isUserLoggedIn = true;
    }
   }

  isLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }

  setData(updatedData) {
    this.updatedData = updatedData;
  }

  setSecondData(updatedSecondData) {
    this.updatedSecondData = updatedSecondData;
  }

  getData() {
    return this.updatedData;
  }

  getSecondData() {
    return this.updatedSecondData;
  }

  // setSuccess(value, reason) {
  //   this.isSuccess = value;
  //   this.reason = reason;
  // }

  // getSuccess() {
  //   return [this.isSuccess, this.reason]
  // }
}
