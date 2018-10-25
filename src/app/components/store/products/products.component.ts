import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../services/ApiService";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  selectBoxDataSource = [ "Item 1", "Item 2", "Item 3" ];
  customers = [{
    ID: 1,
    CompanyName: "Super Mart of the West",
    City: "Bentonville",
    State: "Arkansas"
  }, {
    ID: 2,
    CompanyName: "Electronics Depot",
    City: "Atlanta",
    State: "Georgia"
  }];
  constructor(private apiService: ApiService) {

  }

  ngOnInit() {
    this.loadStores();
  }

  loadStores() {
    this.apiService.get(`${this.apiService.apiUrl}/dashboard/stores`).subscribe((data) => {

    });
  }

}
