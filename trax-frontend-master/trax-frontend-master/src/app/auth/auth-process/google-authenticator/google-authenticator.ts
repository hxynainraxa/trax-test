import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BasePage } from '@app/core/base/base-page';

@Component({
  selector: 'app-google-authenticator',
  imports: [FormsModule],
  templateUrl: './google-authenticator.html',
})
export class GoogleAuthenticator extends BasePage implements OnInit {
  readonly otpLength = 6;

  otpDigits: string[] = Array(this.otpLength).fill('');

  errorMessage = '';

  private readonly recoveryFlowKey = 'traxBlockedRecoveryFlow';

  /*
   * TEMPORARY TEST OTP
   *
   * Replace this with the real Google Authenticator
   * verification API later.
   */
  private readonly testOtp = 'google';

  ngOnInit(): void {
    /*
     * User should only reach this screen during
     * the blocked account recovery flow.
     */
    const isRecoveryFlow =
      sessionStorage.getItem(this.recoveryFlowKey) === 'true';

    if (!isRecoveryFlow) {
      this.router.navigate(['/login']);
    }
  }

  onOtpInput(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;

    /*
     * Keep only the latest character entered.
     */
    const value = input.value.slice(-1);

    this.otpDigits[index] = value;
    input.value = value;

    this.errorMessage = '';

    /*
     * Automatically focus next OTP box.
     */
    if (value && index < this.otpLength - 1) {
      this.focusInput(index + 1);
    }
  }

  onOtpKeyDown(index: number, event: KeyboardEvent): void {
    /*
     * Move backwards when pressing Backspace
     * on an already empty field.
     */
    if (
      event.key === 'Backspace' &&
      !this.otpDigits[index] &&
      index > 0
    ) {
      this.focusInput(index - 1);
    }
  }

  onOtpPaste(event: ClipboardEvent): void {
    event.preventDefault();

    const pastedValue =
      event.clipboardData
        ?.getData('text')
        .trim()
        .slice(0, this.otpLength) ?? '';

    if (!pastedValue) {
      return;
    }

    this.otpDigits = Array(this.otpLength).fill('');

    pastedValue.split('').forEach((character, index) => {
      if (index < this.otpLength) {
        this.otpDigits[index] = character;
      }
    });

    this.errorMessage = '';

    const lastIndex =
      Math.min(pastedValue.length, this.otpLength) - 1;

    if (lastIndex >= 0) {
      setTimeout(() => {
        this.focusInput(lastIndex);
      });
    }
  }

  verifyOtp(): void {
    this.errorMessage = '';

    const enteredOtp =
      this.otpDigits.join('').trim().toLowerCase();

    /*
     * Testing OTP = google
     */
    if (enteredOtp !== this.testOtp) {
      this.errorMessage = 'Wrong OTP try again';
      return;
    }

    /*
     * Verification completed.
     * Clear recovery flow.
     */
    sessionStorage.removeItem(this.recoveryFlowKey);

    this.router.navigate(['/admin']);
  }

  otherMethods(): void {
    this.errorMessage = '';

    this.router.navigate([
      '/auth-process/authenticator',
    ]);
  }

  private focusInput(index: number): void {
    const input = document.getElementById(
      `otp-${index}`,
    ) as HTMLInputElement | null;

    input?.focus();
  }
}