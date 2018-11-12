import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../services/ApiService";
import {categoryModel, ImageModel, productModel, SizeModel, storeShortModel} from "../../../models/store/storeModel";
import {DomSanitizer} from "@angular/platform-browser";
import { confirm } from 'devextreme/ui/dialog';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  stores: storeShortModel[] = new Array();
  products: productModel[] = new Array();
  isDetailPopup = false;
  idStore: number;
  product: productModel = new productModel();
  categories: categoryModel[] = new Array();
  listFileImages: any[] = new Array();
  sizes: SizeModel[] = new Array();

  ProductsType = ['food', 'drink'];

  constructor(private apiService: ApiService, private sanitizer: DomSanitizer) {
    this.getCategories();
  }

  ngOnInit() {
    this.loadStores();
  }

  getCategories() {
    this.apiService.get(`${this.apiService.apiUrl}/categories`).subscribe((data) => {
      this.categories = data.categories;
    });
  }

  loadStores() {
    this.apiService.get(`${this.apiService.apiUrl}/dashboard/stores`).subscribe((data) => {
      this.stores = data.stores;
    });
  }

  loadProducts(idStore) {
    this.idStore = idStore;
    this.apiService.get(`${this.apiService.apiUrl}/dashboard/stores/${idStore}/products`).subscribe((data) => {
      this.products = data.products;
    });
  }

  onChangStore(e) {
    this.loadProducts(e.value);
  }

  onAdd() {
    this.product = new productModel();
    this.isDetailPopup = true;
  }

  onEdit(data) {
    this.apiService.get(`${this.apiService.apiUrl}/dashboard/stores/${this.idStore}/products/${data.value}`).subscribe((data) => {
      this.product = data.product;
      this.sizes = this.product.sizes;
    });
    this.isDetailPopup = true;
  }

  safeGetUrl(url) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  fileEvent(e) {
    for (let i = 0; i < e.target.files.length; i++) {
      let item: ImageModel = {
        no: i,
        link: e.target.files[i],
        is_destroy: 0,
        url: window.URL.createObjectURL(e.target.files[i])
      };
      this.listFileImages.push(item);
    }
    console.log(this.listFileImages);
    e.target.value = null;
  }

  removeImage(i) {
    if (i > -1) {
      this.listFileImages.splice(i, 1);
    }
  }

  removeSizeItem(i) {
    if (i > -1) {
      this.sizes.splice(i, 1);
    }
  }

  onAddSize() {
    const size = new SizeModel();
    this.sizes.push(size);
  }

  onDelete(data) {
    const message = 'Do you want to delete this product?';
    const title = 'Delete Product';
    confirm(message, title).then((result) => {
      if (result) {
        this.apiService.delete(`${this.apiService.apiUrl}/dashboard/stores/${this.idStore}/products/${data.value}`, this.product).subscribe((data) => {
          alert(data);
        });
      }
    });
  }
}
