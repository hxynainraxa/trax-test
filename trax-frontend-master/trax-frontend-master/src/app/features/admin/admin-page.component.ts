import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BasePage } from '@app/core/base/base-page';
import { MainLayout } from '@app/shared/components/layout/main-layout/main-layout.component';
import { UserType } from '@app/shared/enums/shared.enums';
import { SidebarMenuItem } from '@app/shared/interfaces/shared.interfaces';
import { MenuService } from '@app/shared/services/menu.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, MainLayout],
  template: `
    <app-main-layout [menuItems]="menuItems">
      <router-outlet></router-outlet>
    </app-main-layout>
  `,
})
export class AdminComponent extends BasePage {
  menuService = inject(MenuService);
  protected menuItems: SidebarMenuItem[] = [];

  constructor() {
    super();
    this.menuItems = this.menuService.getMenu(UserType.ADMIN);
  }
}
