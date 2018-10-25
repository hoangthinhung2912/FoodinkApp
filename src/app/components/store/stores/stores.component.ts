import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../services/ApiService";
import {StoreModel} from "../../../models/store/storeModel";

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {
  stores: StoreModel[] = new Array();
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadStores();
  }

  loadStores() {
    this.apiService.get(`${this.apiService.apiUrl}/dashboard/stores`).subscribe((data) => {
      this.stores = data.stores;
      console.log(this.stores);
    });
  }
}
