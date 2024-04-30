import { CommonModule } from '@angular/common';
import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {TuiSvgModule} from "@taiga-ui/core";

@Component({
  selector: 'app-side-nav-button',
  standalone: true,
  imports: [
    CommonModule, RouterLink, TuiSvgModule
  ],
  templateUrl: './side-nav-button.component.html'
})
export class SideNavButtonComponent {
  @Input() tuiIcon: string;
  @Input() sideNavCollapsed: boolean;
  @Input() name: string;
  @Input() link: string;
}
