import { Component, OnInit } from '@angular/core';

import {ApiService} from "../../services/ApiService";
import {HttpClient} from "@angular/common/http";
import {UserLoginModel, UserModel} from "../../models/account/userLoginModel";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userLogin: UserLoginModel = new UserLoginModel();
  user: UserModel = new UserModel();

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
   if (localStorage.getItem('token')) {
     this.router.navigate(['dashboard/store']);
   }
  }

  login(e) {
    if (!e.validationGroup.validate().isValid) {
      return false;
    }
    this.apiService.post(`${this.apiService.apiUrl}/login/`, this.userLogin).subscribe((data) =>
    {
      if (data.success) {
        this.user.token = data.auth_token.token;
        localStorage.setItem('token', this.user.token);
        console.log(localStorage);
        this.router.navigate(['dashboard/store']);
      }
    });
  }
}
