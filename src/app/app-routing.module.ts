import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {StoreComponent} from "./pages/store/store.component";
import {LoginComponent} from "./pages/login/login.component";
import {ApiService} from "./services/ApiService";
import {ProductDetailComponent} from "./pages/product-detail/product-detail.component";
import {CartDetailComponent} from "./pages/cart-detail/cart-detail.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard/store', component: StoreComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products/detail', component: ProductDetailComponent},
  { path: 'home/carts', component: CartDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
