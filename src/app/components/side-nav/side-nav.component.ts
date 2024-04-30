import {Component, inject, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CommonModule} from '@angular/common';
import {SideNavButtonComponent} from "../side-nav-button/side-nav-button.component";
import {tuiPure} from "@taiga-ui/cdk";
import {tuiIconLogOut} from "@taiga-ui/icons";
import {TuiDurationOptions} from "@taiga-ui/core";

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, SideNavButtonComponent],
  templateUrl: './side-nav.component.html'
})
export class SideNavComponent {
  @Input() isCollapsed = false;

  router = inject(Router);
  activeRoute: string = this.activatedRoute.snapshot['_routerState'].url.split('/').pop();
  protected readonly tuiIconLogOut = tuiIconLogOut;
  protected readonly SideNavButtonComponent = SideNavButtonComponent;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
  }

  @tuiPure
  getAnimation(duration: number): TuiDurationOptions {
    return {value: '', params: {duration}};
  }

  onLogout() {
    this.router.navigate(["/home"]);
  }
}
