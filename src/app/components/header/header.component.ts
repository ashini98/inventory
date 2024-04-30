import {Component, EventEmitter, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TuiRootModule, TuiSvgModule} from "@taiga-ui/core";
import {TuiAvatarModule} from "@taiga-ui/kit";
import {tuiIconBellLarge, tuiIconMenu, tuiIconSearch, tuiIconSettingsLarge} from "@taiga-ui/icons";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TuiSvgModule, TuiAvatarModule, RouterOutlet, TuiRootModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output()
  public sideNavToggle = new EventEmitter<boolean>(true)

  public searchBar = new EventEmitter<string>();

  public notifications = new EventEmitter<number>();
  public settingsUpdate = new EventEmitter<any>();

  protected readonly tuiIconMenu = tuiIconMenu;
  protected readonly tuiIconSearch = tuiIconSearch;
  protected readonly tuiIconBellLarge = tuiIconBellLarge;
  protected readonly tuiIconSettingsLarge = tuiIconSettingsLarge;
}
