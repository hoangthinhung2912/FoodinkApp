import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/ApiService";
import {ImageModel, StoreModel} from "../../../models/store/storeModel";
import { DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {
  stores: StoreModel[] = new Array();
  isDetailPopup = false;
  store: StoreModel = new StoreModel();
  pictures: ImageModel[] = new Array();
  listFileImages: any[] = new Array();

  constructor(private apiService: ApiService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loadStores();
  }

  loadStores() {
    this.apiService.get(`${this.apiService.apiUrl}/dashboard/stores`).subscribe((data) => {
      this.stores = data.stores;
      for (let index = 0; index < data.stores.pictures.length; index++) {
        let item: ImageModel = {
          no: index,
          link: data.stores.pictures[index],
          is_destroy: 0,
          url: data.stores.pictures[index]
        };
        this.listFileImages.push(item);
      }
    });
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

  onEdit(data) {
    this.apiService.get(`${this.apiService.apiUrl}/dashboard/stores/${data.value}`).subscribe((data) => {
      this.store = data.store;
    });
    this.isDetailPopup = true;
  }


  save(e)
  {
    if (!e.validationGroup.validate().isValid) {
      return false;
    }
    const _formData = new FormData();
    _formData.append('name', this.store.name);
    _formData.append('email', this.store.email);
    _formData.append('phone', this.store.phone);
    _formData.append('address', this.store.address);
    _formData.append('open_at', this.store.open_at.toString());
    _formData.append('close_at', this.store.close_at.toString());
    for (let i = 0; i < this.listFileImages.length; i++) {
      _formData.append(`images_attributes[${this.listFileImages[i].no}][id]`, this.listFileImages[i].no);
      _formData.append(`images_attributes[${this.listFileImages[i].no}][link]`, this.listFileImages[i].file);
      _formData.append(`images_attributes[${this.listFileImages[i].no}][_destroy]`, this.listFileImages[i].is_destroy);
    }

    console.log(_formData.getAll('images_attributes[0][link]'));
    this.apiService.patch(`${this.apiService.apiUrl}/dashboard/stores/${this.store.id}`, this.store).subscribe((data) => {

    });
  }
}

