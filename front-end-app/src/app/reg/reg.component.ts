import { Component, OnInit } from '@angular/core';
import { CheckFormService } from '../check-form.service';
import { AuthService } from '../auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

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
    private flashMessages: FlashMessagesService,
    private router: Router,
    private authService: AuthService
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
     const messageAlert = {
       cssClass: 'alert-danger',
       timeout: 4000
     };
     const messageSucces = {
       cssClass: 'alert-success',
       timeout: 4000
     };
     if (!this.checkForm.checkName(user.name)) {
       this.flashMessages.show("Ім'я користувача не було введено", messageAlert);
       return false;
     } else if (!this.checkForm.checkLogin(user.login)) {
       this.flashMessages.show("Логін користувача не було введено", messageAlert);
       return false;
     } else if (!this.checkForm.checkEmail(user.email)) {
       this.flashMessages.show("Електрону пошту користувача не було введено", messageAlert);
       return false;
     } else if (!this.checkForm.checkPassword(user.password)) {
       this.flashMessages.show("Пароль користувача не було введено", messageAlert);
       return false;
     }
     this.authService.registerUser(user).subscribe(data => {
       if (!data.success) {
         this.flashMessages.show(data.msg, messageAlert);
         this.router.navigate(['/reg']);
       } else {
         this.flashMessages.show(data.msg, messageSucces);
         this.router.navigate(['/auth']);
       }
     });
  }
}
