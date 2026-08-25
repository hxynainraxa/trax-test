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


@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePassword
  extends BasePage
  implements OnDestroy
{
  protected form = {
    currentPassword: '',
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
    if (
      !this.form.currentPassword ||
      !this.form.newPassword ||
      !this.form.confirmPassword
    ) {
      return this.show(
        'error',
        'All password fields are required.',
      );
    }

    if (
      this.form.newPassword !==
      this.form.confirmPassword
    ) {
      return this.show(
        'error',
        'New Password and Retype Password must match.',
      );
    }

    const current =
      localStorage.getItem(
        'traxCurrentPassword',
      ) ?? 'Trax@123';

    if (
      this.form.currentPassword !==
      current
    ) {
      return this.show(
        'error',
        'Current password is incorrect.',
      );
    }

    localStorage.setItem(
      'traxCurrentPassword',
      this.form.newPassword,
    );

    this.clear();

    this.show(
      'success',
      'Password changed successfully.',
    );
  }


  protected clear(): void {
    this.form = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
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