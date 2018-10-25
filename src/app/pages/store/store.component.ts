import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import {ApiService} from "../../services/ApiService";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  tabClicked: string = 'products';
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/home']);
    }
  }

  x() {
    document.getElementById('sidebar').classList.toggle('active');
  }

  tabClick(e) {
    this.tabClicked = e.toElement.id;
    const tabs = document.getElementsByClassName('tab');
    for (let i=0; i<tabs.length; i++) {
      tabs[i].classList.remove('active');
    }
    document.getElementById(this.tabClicked).classList.add('active');
  }

  logout() {
    this.apiService.delete(`${this.apiService.apiUrl}/logout`, '').subscribe(() => {
      localStorage.clear();
      this.router.navigate(['/home']);
    });

  }
}
