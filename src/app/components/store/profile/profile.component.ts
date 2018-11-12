import { Component, OnInit } from '@angular/core';
import {ProfileModel} from "../../../models/account/userLoginModel";
import {ApiService} from "../../../services/ApiService";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: ProfileModel = new ProfileModel();
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.profile = JSON.parse(localStorage.getItem('user'));
  }

  save() {
    this.apiService.patch(`${this.apiService.apiUrl}/profile`, this.profile).subscribe((data) => {
      console.log(data);
    });
  }

}
