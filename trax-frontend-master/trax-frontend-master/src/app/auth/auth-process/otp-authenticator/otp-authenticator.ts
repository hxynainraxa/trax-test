import {
  Component,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BasePage } from '@app/core/base/base-page';

@Component({
  selector: 'app-otp-authenticator',
  imports: [FormsModule],
  templateUrl: './otp-authenticator.html',
})
export class OtpAuthenticator
  extends BasePage
  implements OnInit, OnDestroy
{
  readonly otpLength = 6;

  otpDigits: string[] = Array(this.otpLength).fill('');

  errorMessage = '';

  isLocked = false;

  /*
   * Signal ensures the countdown visibly updates
   * in the Angular template every second.
   */
  readonly remainingSeconds = signal(0);

  private incorrectAttempts = 0;

  private countdownTimer: ReturnType<typeof setInterval> | null = null;

  private readonly maxAttempts = 3;

  /*
   * 15 minutes
   */
  private readonly lockDurationMs =
    15 * 60 * 1000;

  /*
   * TEMPORARY TEST OTP
   */
  private readonly testOtp = '000000';

  private readonly recoveryFlowKey =
    'traxBlockedRecoveryFlow';

  private readonly attemptStorageKey =
    'traxOtpIncorrectAttempts';

  private readonly lockUntilStorageKey =
    'traxOtpLockedUntil';

  ngOnInit(): void {
    const isRecoveryFlow =
      sessionStorage.getItem(
        this.recoveryFlowKey,
      ) === 'true';

    if (!isRecoveryFlow) {
      this.router.navigate(['/login']);
      return;
    }

    /*
     * Restore failed attempts after refresh/navigation.
     */
    this.incorrectAttempts = Number(
      sessionStorage.getItem(
        this.attemptStorageKey,
      ) ?? '0',
    );

    /*
     * Check whether a previous lock is still active.
     */
    this.restoreLockState();
  }

  ngOnDestroy(): void {
    this.clearCountdownTimer();
  }

  onOtpInput(
    index: number,
    event: Event,
  ): void {
    if (this.isLocked) {
      return;
    }

    const input =
      event.target as HTMLInputElement;

    const value = input.value
      .replace(/\D/g, '')
      .slice(-1);

    this.otpDigits[index] = value;
    input.value = value;

    this.errorMessage = '';

    if (
      value &&
      index < this.otpLength - 1
    ) {
      this.focusInput(index + 1);
    }
  }

  onOtpKeyDown(
    index: number,
    event: KeyboardEvent,
  ): void {
    if (this.isLocked) {
      return;
    }

    if (
      event.key === 'Backspace' &&
      !this.otpDigits[index] &&
      index > 0
    ) {
      this.focusInput(index - 1);
    }
  }

  onOtpPaste(
    event: ClipboardEvent,
  ): void {
    if (this.isLocked) {
      return;
    }

    event.preventDefault();

    const pastedValue =
      event.clipboardData
        ?.getData('text')
        .replace(/\D/g, '')
        .slice(0, this.otpLength) ?? '';

    if (!pastedValue) {
      return;
    }

    this.otpDigits =
      Array(this.otpLength).fill('');

    pastedValue
      .split('')
      .forEach((digit, index) => {
        if (index < this.otpLength) {
          this.otpDigits[index] = digit;
        }
      });

    this.errorMessage = '';

    const lastIndex =
      Math.min(
        pastedValue.length,
        this.otpLength,
      ) - 1;

    if (lastIndex >= 0) {
      setTimeout(() => {
        this.focusInput(lastIndex);
      });
    }
  }

  verifyOtp(): void {
    if (this.isLocked) {
      return;
    }

    this.errorMessage = '';

    const enteredOtp =
      this.otpDigits.join('');

    /*
     * Require all 6 digits.
     */
    if (
      enteredOtp.length !==
      this.otpLength
    ) {
      this.errorMessage =
        'Wrong OTP try again';

      return;
    }

    /*
     * Correct test OTP.
     */
    if (enteredOtp === this.testOtp) {
      this.handleSuccessfulVerification();
      return;
    }

    this.handleIncorrectOtp();
  }

  resendOtp(): void {
    if (this.isLocked) {
      return;
    }

    /*
     * Testing:
     * OTP remains 000000.
     *
     * Failed attempts are intentionally NOT reset.
     */
    this.resetOtp();

    this.errorMessage = '';

    setTimeout(() => {
      this.focusInput(0);
    });
  }

  cancel(): void {
    this.router.navigateByUrl(
      '/auth-process/authenticator',
    );
  }

  otherMethods(): void {
    this.router.navigateByUrl(
      '/auth-process/authenticator',
    );
  }

  /*
   * Converts:
   *
   * 900 -> 15:00
   * 899 -> 14:59
   * 53  -> 00:53
   */
  get formattedRemainingTime(): string {
    const totalSeconds =
      this.remainingSeconds();

    const minutes =
      Math.floor(totalSeconds / 60);

    const seconds =
      totalSeconds % 60;

    return (
      `${minutes
        .toString()
        .padStart(2, '0')}:` +
      `${seconds
        .toString()
        .padStart(2, '0')}`
    );
  }

  private handleIncorrectOtp(): void {
    this.incorrectAttempts++;

    sessionStorage.setItem(
      this.attemptStorageKey,
      this.incorrectAttempts.toString(),
    );

    this.resetOtp();

    /*
     * Wrong attempt 1 and 2.
     */
    if (
      this.incorrectAttempts <
      this.maxAttempts
    ) {
      this.errorMessage =
        'Wrong OTP try again';

      setTimeout(() => {
        this.focusInput(0);
      });

      return;
    }

    /*
     * Wrong attempt 3.
     */
    this.lockOtp();
  }

  private handleSuccessfulVerification(): void {
    this.clearOtpRecoveryState();

    sessionStorage.removeItem(
      this.recoveryFlowKey,
    );

    this.router.navigate(['/admin']);
  }

  private lockOtp(): void {
    /*
     * Store exact real-world time at which
     * the 15-minute lock expires.
     */
    const lockedUntil =
      Date.now() +
      this.lockDurationMs;

    sessionStorage.setItem(
      this.lockUntilStorageKey,
      lockedUntil.toString(),
    );

    this.isLocked = true;

    this.errorMessage =
      'Too many incorrect codes. Resending is locked for 15 minutes.';

    this.resetOtp();

    /*
     * Starts at 15:00 and visibly counts down.
     */
    this.startCountdown(lockedUntil);
  }

  private restoreLockState(): void {
    const storedLockUntil =
      sessionStorage.getItem(
        this.lockUntilStorageKey,
      );

    if (!storedLockUntil) {
      return;
    }

    const lockedUntil =
      Number(storedLockUntil);

    /*
     * Lock already expired.
     */
    if (
      !lockedUntil ||
      Date.now() >= lockedUntil
    ) {
      this.unlockOtp();
      return;
    }

    /*
     * Lock is still active.
     */
    this.isLocked = true;

    this.errorMessage =
      'Too many incorrect codes. Resending is locked for 15 minutes.';

    this.startCountdown(lockedUntil);
  }

  private startCountdown(
    lockedUntil: number,
  ): void {
    this.clearCountdownTimer();

    /*
     * Update immediately.
     *
     * This makes 15:00 appear without waiting
     * for the first setInterval tick.
     */
    this.updateRemainingTime(
      lockedUntil,
    );

    /*
     * Update every second.
     */
    this.countdownTimer =
      setInterval(() => {
        this.updateRemainingTime(
          lockedUntil,
        );
      }, 1000);
  }

  private updateRemainingTime(
    lockedUntil: number,
  ): void {
    const millisecondsLeft =
      lockedUntil - Date.now();

    /*
     * Timer reached zero.
     */
    if (millisecondsLeft <= 0) {
      this.remainingSeconds.set(0);

      this.unlockOtp();

      return;
    }

    /*
     * Convert real remaining milliseconds
     * into seconds.
     */
    const secondsLeft =
      Math.ceil(
        millisecondsLeft / 1000,
      );

    /*
     * Signal update immediately refreshes UI.
     */
    this.remainingSeconds.set(
      secondsLeft,
    );
  }

  private unlockOtp(): void {
    this.clearCountdownTimer();

    this.isLocked = false;

    this.remainingSeconds.set(0);

    this.incorrectAttempts = 0;

    this.errorMessage = '';

    this.resetOtp();

    sessionStorage.removeItem(
      this.lockUntilStorageKey,
    );

    sessionStorage.removeItem(
      this.attemptStorageKey,
    );

    setTimeout(() => {
      this.focusInput(0);
    });
  }

  private resetOtp(): void {
    this.otpDigits =
      Array(this.otpLength).fill('');
  }

  private clearOtpRecoveryState(): void {
    this.clearCountdownTimer();

    sessionStorage.removeItem(
      this.lockUntilStorageKey,
    );

    sessionStorage.removeItem(
      this.attemptStorageKey,
    );
  }

  private clearCountdownTimer(): void {
    if (!this.countdownTimer) {
      return;
    }

    clearInterval(
      this.countdownTimer,
    );

    this.countdownTimer = null;
  }

  private focusInput(
    index: number,
  ): void {
    const input =
      document.getElementById(
        `otp-${index}`,
      ) as HTMLInputElement | null;

    input?.focus();
  }
}