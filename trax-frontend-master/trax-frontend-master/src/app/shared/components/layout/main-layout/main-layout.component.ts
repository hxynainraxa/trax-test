import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { BasePage } from '@app/core/base/base-page';

import { SidebarMenuItem } from '@app/shared/interfaces/shared.interfaces';

import { NavbarComponent } from '../navbar/navbar.component';
import { Sidebar } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    Sidebar,
    NavbarComponent,
  ],
  templateUrl:
    './main-layout.component.html',
  styleUrls: [
    './main-layout.component.scss',
  ],
})
export class MainLayout extends BasePage {
  @Input()
  menuItems: SidebarMenuItem[] = [];

  constructor() {
    super();
  }
}