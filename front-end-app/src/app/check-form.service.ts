import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckFormService {

  constructor() { }

  checkName(name) {
    if (name == undefined || name == "") {
      return false;
    } else {
      return true;
    }
  }

  checkLogin(login) {
    if (login == undefined || login == "") {
      return false;
    } else {
      return true;
    }
  }

  checkEmail(email) {
    if (email == undefined || email == "") {
      return false;
    } else {
      return true;
    }
  }

  checkPassword(password) {
    if (password == undefined || password == "") {
      return false;
    } else {
      return true;
    }
  }
}
