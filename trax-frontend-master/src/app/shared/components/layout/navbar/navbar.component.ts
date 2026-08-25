import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import {
  LucideBell,
  LucideChevronDown,
  LucideChevronsUpDown,
  LucideCircleHelp,
  LucideDynamicIcon,
} from '@lucide/angular';

import { BasePage } from '@app/core/base/base-page';

export interface UserInfo {
  name: string;
  userId: string;
  avatar?: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    LucideDynamicIcon,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent extends BasePage {
  @Input() userInfo: UserInfo = {
    name: 'John Doe',
    userId: '#18345',

    /*
     * Replace this with the actual Trax
     * user avatar path when available.
     */
    avatar: '/images/user-icon.png',
  };

  protected readonly bellIcon =
    LucideBell;

  protected readonly helpIcon =
    LucideCircleHelp;

  protected readonly chevronDownIcon =
    LucideChevronDown;

  protected readonly chevronsIcon =
    LucideChevronsUpDown;

  constructor() {
    super();
  }

  protected getUserInitials(): string {
    const nameParts =
      this.userInfo.name
        .trim()
        .split(/\s+/);

    if (nameParts.length >= 2) {
      return (
        nameParts[0][0] +
        nameParts[1][0]
      ).toUpperCase();
    }

    return this.userInfo.name
      .substring(0, 2)
      .toUpperCase();
  }
}