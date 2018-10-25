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
  DxButtonModule, DxSelectBoxModule, DxDataGridModule,
  DxFormModule, DxTextBoxModule, DxValidationGroupModule, DxValidatorModule
} from 'devExtreme-angular';
import { LoginComponent } from './pages/login/login.component';
import {ApiService} from "./services/ApiService";
import {HttpClientModule} from "@angular/common/http";
import { StoresComponent } from './components/store/stores/stores.component';

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
    HttpClientModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
