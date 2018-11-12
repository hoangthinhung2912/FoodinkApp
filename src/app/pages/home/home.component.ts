import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/ApiService";
import {productModel} from "../../models/store/storeModel";
import {Router} from "@angular/router";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public images = [
    'assets/img/slider/slider-1.jpg',
    'assets/img/slider/slider-2.jpg'
  ];
  myCarouselImages = [1, 2, 3, 4, 5, 6].map((i) => `https://picsum.photos/640/480?image=${i}`);
  mySlideOptions= {items: 5, dots: false, nav: true, loop: true};

  products: productModel[] = new Array();
  message: number;

  constructor(private apiService: ApiService, private router: Router, private data: DataService) {

  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.apiService.get(`${this.apiService.apiUrl}/products`).subscribe((data) => {
      this.products = data.products;
    });
  }

  onShowProductDetail(e) {
    this.data.changeMessage(e.id);
    this.router.navigate(['products/detail']);
  }
}
