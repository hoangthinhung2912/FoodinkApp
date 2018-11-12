import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../../services/data.service";
import {ApiService} from "../../services/ApiService";
import {productModel} from "../../models/store/storeModel";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  myCarouselImages = [1, 2, 3, 4, 5, 6].map((i) => `https://picsum.photos/640/480?image=${i}`);
  mySlideOptions= {items: 5, dots: false, nav: true, loop: true};
  productId: number;
  product: productModel = new productModel();
  price: number;
  quantity = 1;
  sizeId = 0;
  rate: number;
  content: string;

  constructor(private router: Router, private data: DataService, private apiService: ApiService) { }

  ngOnInit() {
    this.data.currentId.subscribe(message => this.productId = message);
    this.loadProduct();
  }

  loadProduct() {
    this.apiService.get(`${this.apiService.apiUrl}/products/${this.productId}`).subscribe((data) =>{
      this.product = data.product;
    });
  }

  showImage(e) {
    const x = document.getElementById('main-img') as HTMLImageElement;
    x.src =  e.target.src;
  }

  onBuyNow() {
    this.router.navigate(['home/carts']);
  }

  onAddCart() {
    const productData = {
      'product_id': this.productId,
      'size_id': this.sizeId,
      'quantity': this.quantity
    };
    this.apiService.post(`${this.apiService.apiUrl}/carts`, productData).subscribe(() => {
    });
  }

  onChangeSize(e) {
    this.sizeId = e.value;
    this.getPrice();

  }

  getPrice() {
    for (let size of this.product.sizes) {
      if (size.id == this.sizeId) {
        this.price = size.price;
        break;
      }
    }
  }

  onAddComment() {
    const rateData = {
      'product_id': this.productId,
      'rate': this.rate,
      'content': this.content
    }
   this.apiService.post(`${this.apiService.apiUrl}/rates`, rateData).subscribe(() => {
      this.loadProduct();
   });
  }
}
