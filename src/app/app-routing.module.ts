import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';

import { SalesComponent } from './Pages/sales/sales.component';
import { FurnitureComponent } from './Pages/Product/furniture/furniture.component';
import { AboutusComponent } from './Pages/aboutus/aboutus.component';
import { ContactComponent } from './Pages/contact/contact.component';
import { DecoritemsComponent } from './Pages/Product/decoritems/decoritems.component';
import { CartComponent } from './Pages/cart/cart.component';
import { AccountComponent } from './Pages/account/account.component';
import { ShopComponent } from './Pages/Product/shop/shop.component';
import { SearchpageComponent } from './Pages/searchpage/searchpage.component';
import { OrderComponent } from './Pages/order/order.component';
import { ProductDetailComponent } from './Pages/product-detail/product-detail.component';
import { OrderSuccessComponent } from './Pages/order-success/order-success.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'product',
    component:FurnitureComponent
  },
  {
    path:'about',
    component:AboutusComponent
  },
  {
    path:'contact',
    component:ContactComponent
  },
  {
    path:'decoritems',
    component:DecoritemsComponent
  },{
    path:'cart',
    component:CartComponent
  },{
    path:'profile',
    component:AccountComponent
  },{
    path:'shop',
    component:ShopComponent
  },{
    path:'search',
    component:SearchpageComponent
  },{
    path:'checkout',
    component:OrderComponent
  },{
    path:'detailpage',
    component:ProductDetailComponent
  },{
    path:'ConfirmOrder',
    component:OrderSuccessComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
