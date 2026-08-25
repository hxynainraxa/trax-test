import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  signal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import {
  BasePage,
} from '@app/core/base/base-page';


interface StoredUser {
  id: number;
  username: string;
  password: string;
}


@Component({
  selector: 'app-reset-user-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reset-user-password.html',
  styleUrl: './reset-user-password.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetUserPassword
  extends BasePage
  implements OnDestroy
{
  protected form = {
    username: '',
    newPassword: '',
    confirmPassword: '',
  };

  protected readonly toast =
    signal<{
      type: 'success' | 'error';
      text: string;
    } | null>(null);

  private timer?: ReturnType<typeof setTimeout>;


  protected resetPassword(): void {
    const {
      username,
      newPassword,
      confirmPassword,
    } = this.form;

    if (
      !username.trim() ||
      !newPassword ||
      !confirmPassword
    ) {
      return this.show(
        'error',
        'All fields are required.',
      );
    }

    if (
      newPassword !==
      confirmPassword
    ) {
      return this.show(
        'error',
        'New Password and Retype Password must match.',
      );
    }

    const users =
      this.getUsers();

    const index =
      users.findIndex(
        user =>
          user.username.toLowerCase() ===
          username.trim().toLowerCase(),
      );

    if (
      index === -1
    ) {
      return this.show(
        'error',
        'User Name could not be found.',
      );
    }

    users[index] = {
      ...users[index],
      password: newPassword,
    };

    localStorage.setItem(
      'traxUsers',
      JSON.stringify(users),
    );

    this.clear();

    this.show(
      'success',
      'User password reset successfully.',
    );
  }


  protected clear(): void {
    this.form = {
      username: '',
      newPassword: '',
      confirmPassword: '',
    };
  }


  private getUsers():
    StoredUser[] {
    try {
      const users =
        JSON.parse(
          localStorage.getItem(
            'traxUsers',
          ) ?? '[]',
        );

      return Array.isArray(users)
        ? users
        : [];
    } catch {
      return [];
    }
  }


  private show(
    type: 'success' | 'error',
    text: string,
  ): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.toast.set({
      type,
      text,
    });

    this.timer = setTimeout(
      () => this.toast.set(null),
      5000,
    );
  }


  ngOnDestroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}