import {Component, EventEmitter, Output} from '@angular/core';
import { SideNavButtonComponent } from '../side-nav-button/side-nav-button.component';
import {SideNavComponent} from "../side-nav/side-nav.component";
import {HeaderComponent} from "../header/header.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    SideNavComponent,
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './dashboard-layout.component.html'
})
export class DashboardLayoutComponent {
  sideNavCollapsed: boolean;
  @Output() isCollapsed = new EventEmitter<boolean>(true)
  @Output() onSideNavToggle: EventEmitter<boolean> = new EventEmitter<boolean>()
  protected readonly SideNavButtonComponent = SideNavButtonComponent;

  whenSideNavToggle() {
    this.sideNavCollapsed = !this.sideNavCollapsed;
    this.onSideNavToggle.emit(this.sideNavCollapsed);
  }
}
