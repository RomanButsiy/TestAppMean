import { Component, OnInit } from '@angular/core';
import { CheckFormService } from '../check-form.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {

  name: String;
  login: String;
  email: String;
  password: String;

  constructor(
    private checkForm: CheckFormService,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  userRegisterClick() {
     const user = {
       name: this.name,
       email: this.email,
       login: this.login,
       password: this.password
     };
     const messagesAlert = {
       cssClass: 'alert-danger',
       timeout: 4000
     };
     if (!this.checkForm.checkName(user.name)) {
       this.flashMessages.show("Ім'я користувача не було введено", messagesAlert);
       return false;
     } else if (!this.checkForm.checkLogin(user.login)) {
       this.flashMessages.show("Логін користувача не було введено", messagesAlert);
       return false;
     } else if (!this.checkForm.checkEmail(user.email)) {
       this.flashMessages.show("Електрону пошту користувача не було введено", messagesAlert);
       return false;
     } else if (!this.checkForm.checkPassword(user.password)) {
       this.flashMessages.show("Пароль користувача не було введено", messagesAlert);
       return false;
     }
     return false;
  }

}
