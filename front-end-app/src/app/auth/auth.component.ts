import { Component, OnInit } from '@angular/core';
import { CheckFormService } from '../check-form.service';
import { AuthService } from '../auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  login: String;
  password: String;

  constructor(
    private checkForm: CheckFormService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  userLoginClick() {
    const user = {
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
    if (!this.checkForm.checkLogin(user.login)) {
      this.flashMessages.show("Логін користувача не було введено", messageAlert);
      return false;
    } else if (!this.checkForm.checkPassword(user.password)) {
      this.flashMessages.show("Пароль користувача не було введено", messageAlert);
      return false;
    }
    this.authService.authUser(user).subscribe(data => {
      if (!data.success) {
        this.flashMessages.show(data.msg, messageAlert);
      } else {
        this.flashMessages.show(data.msg, messageSucces);
        this.router.navigate(['/dashboard']);
        this.authService.storeUser(data.token, data.user);
      }
    });
  }

}
