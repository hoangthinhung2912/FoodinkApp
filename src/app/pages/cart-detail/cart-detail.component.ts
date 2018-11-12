import { Component, OnInit } from '@angular/core';
import {CartModel, OrderInforModel} from "../../models/store/storeModel";
import {ApiService} from "../../services/ApiService";
import {Router} from "@angular/router";
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss']
})
export class CartDetailComponent implements OnInit {
  carts: CartModel[] = new Array();
  total: number;
  isOrderPopup: boolean = false;
  order: OrderInforModel = new OrderInforModel();
  phonePattern: any = /\A0\d{9,10}/;

  constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.apiService.get(`${this.apiService.apiUrl}/carts`).subscribe((data) => {
      this.carts = data.carts;
      this.calculatorTotal();
    });
  }

  onContinousShopping() {
    this.router.navigate(['home']);
  }

  onOrder() {
    this.isOrderPopup = true;
  }

  save(e) {
    alert(1);
    console.log(e);
    if (!e.validationGroup.value) {
      return false;
    }
    this.apiService.post(`${this.apiService.apiUrl}/orders`, this.order).subscribe(() => {
      notify('success', 'kiki');
    }, (error) => {
      alert(1);
      notify('error', 'kiki');
    });
  }

  calculatorTotal() {
    let sum = 0;
    for (let item of this.carts) {
      const x = item.quantity*item.size.price;
      sum += x;
    }
    this.total = sum;
  }

  onChangeQuantity(data, e) {
    data.data.quantity = e.value;
    const dt = {
      'quantity': data.data.quantity
    }
    this.apiService.patch(`${this.apiService.apiUrl}/carts/${data.data.id}`, dt).subscribe(() => {
    });
    this.calculatorTotal();
  }

  onDeleteItem(data) {
    this.apiService.delete(`${this.apiService.apiUrl}/carts/${data.data.id}`, '').subscribe(() => {
      this.loadCart();
    });
    this.calculatorTotal();
  }

}
