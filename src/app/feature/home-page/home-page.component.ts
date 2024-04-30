import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardLayoutComponent} from "../../components/dashboard-layout/dashboard-layout.component";
import {HeaderComponent} from "../../components/header/header.component";
import {SideNavButtonComponent} from "../../components/side-nav-button/side-nav-button.component";
import {
  tuiIconCreditCard,
  tuiIconGrid,
  tuiIconMessageSquareLarge,
  tuiIconUser,
  tuiIconUserPlus
} from "@taiga-ui/icons";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, DashboardLayoutComponent, HeaderComponent, SideNavButtonComponent],
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {
  sideNavCollapsed: boolean = false;
  protected readonly tuiIconGrid = tuiIconGrid;
  protected readonly tuiIconUser = tuiIconUser;
  protected readonly tuiIconCreditCard = tuiIconCreditCard;
  protected readonly tuiIconUserPlus = tuiIconUserPlus;
  protected readonly tuiIconMessageSquareLarge = tuiIconMessageSquareLarge;
}
