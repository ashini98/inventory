import { Routes } from '@angular/router';
import {AuthPageComponent} from "./feature/auth/auth-page/auth-page.component";
import {LoginComponent} from "./feature/home-page/login/login.component";
import {RegisterFormComponent} from "./feature/home-page/register-form/register-form.component";
import {ItemFormComponent} from "./feature/home-page/item/item-form/item-form.component";
import {ItemComponent} from "./feature/home-page/item/item.component";
import {SupplierFormComponent} from "./feature/home-page/supplier/supplier-form/supplier-form.component";
import {OrderFormComponent} from "./feature/home-page/order/order-form/order-form.component";
import {DashboardComponent} from "./feature/home-page/dashboard/dashboard.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthPageComponent
  },
  {
    path: 'home',
    loadComponent: () => import('./feature/home-page/home-page.component').then(m => m.HomePageComponent),
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },

      {
        path: 'login',
        component: LoginComponent
      },

      {
        path: 'register',
        component: RegisterFormComponent
      },

      {
        path: 'add-item',
        component: ItemFormComponent
      },

      {
        path: 'add-supplier',
        component: SupplierFormComponent
      },

      {
        path: 'add-order',
        component: OrderFormComponent

      }

    ]
  }
];
