import { Component, OnInit } from '@angular/core';
import {confirm} from "devextreme/ui/dialog";
import {Ng2Cable, Broadcaster} from "ng2-cable";

import {ApiService} from "../../../services/ApiService";
import {storeShortModel} from "../../../models/store/storeModel";


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  stores: storeShortModel[] = new Array();
  orders: any[];
  idStore: number;

  constructor(private apiService: ApiService,  private ng2cable: Ng2Cable,
              private broadcaster: Broadcaster) {
    this.ng2cable.subscribe('https://ng2-cable-example.herokuapp.com/', 'ChatChannel', { room: 'My room' });
    //By default event name is 'channel name'. But you can pass from backend field { action: 'MyEventName'}

    this.broadcaster.on<string>('ChatChannel').subscribe(
      message => {
        console.log(message);
      }
    );
  }

  ngOnInit() {
    this.loadStores();
  }

  loadOrders(idStore) {
    this.idStore = idStore;
    this.apiService.get(`${this.apiService.apiUrl}/dashboard/stores/${this.idStore}/orders`).subscribe((data) => {
      this.orders = data.orders;
    });
  }

  loadStores() {
    this.apiService.get(`${this.apiService.apiUrl}/dashboard/stores`).subscribe((data) => {
      this.stores = data.stores;
    });
  }

  onChangStore(e) {
    this.loadOrders(e.value);
  }

  onAcceptOrder(data) {
    const message = 'Do you want to accept this order?';
    const title = 'Accept Order';
    const value = {
      status: 'accept'
    }
    confirm(message, title).then((result) => {
      if (result) {
        this.apiService.patch(`${this.apiService.apiUrl}/dashboard/stores/${this.idStore}/orders/${data.value}`, value).subscribe((x) => {
          alert(x);
        });
      }
    });
  }

  onRejectOrder(data) {
    const message = 'Do you want to reject this order?';
    const title = 'Reject Order';
    const value = {
      status: 'reject'
    }
    confirm(message, title).then((result) => {
      if (result) {
        this.apiService.patch(`${this.apiService.apiUrl}/dashboard/stores/${this.idStore}/orders/${data.value}`, value).subscribe((x) => {
          alert(x);
        });
      }
    });
  }
}
