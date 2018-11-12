import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SliderComponent } from './components/slider/slider.component';
import { OwlModule } from "angular-owl-carousel";
import { StoreComponent } from './pages/store/store.component';
import { ProductsComponent } from './components/store/products/products.component';
import {
  DxButtonModule,
  DxSelectBoxModule,
  DxDataGridModule,
  DxFormModule,
  DxTextBoxModule,
  DxValidationGroupModule,
  DxValidatorModule,
  DxPopupModule,
  DxNumberBoxModule,
  DxDateBoxModule, DxTextAreaModule, DxFileUploaderModule, DxCheckBoxModule, DxRadioGroupModule
} from 'devextreme-angular';
import { LoginComponent } from './pages/login/login.component';
import {ApiService} from "./services/ApiService";
import {HttpClientModule} from "@angular/common/http";
import { StoresComponent } from './components/store/stores/stores.component';
import { OrdersComponent } from './components/store/orders/orders.component';
import { ProfileComponent } from './components/store/profile/profile.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CartDetailComponent } from './pages/cart-detail/cart-detail.component';
import {FormsModule} from "@angular/forms";
import {Ng2CableModule} from "ng2-cable";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    StoreComponent,
    ProductsComponent,
    LoginComponent,
    StoresComponent,
    OrdersComponent,
    ProfileComponent,
    ProductDetailComponent,
    CartDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OwlModule,
    DxButtonModule,
    DxSelectBoxModule,
    DxFormModule,
    DxTextBoxModule,
    DxValidationGroupModule,
    DxValidatorModule,
    DxDataGridModule,
    HttpClientModule,
    DxButtonModule, DxPopupModule,
    DxNumberBoxModule,
    DxDateBoxModule,
    DxTextAreaModule,
    DxFileUploaderModule,
    DxCheckBoxModule,
    DxRadioGroupModule,
    FormsModule,
    Ng2CableModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
