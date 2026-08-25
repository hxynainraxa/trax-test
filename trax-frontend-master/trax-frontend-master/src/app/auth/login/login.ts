import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BasePage } from '@app/core/base/base-page';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
})
export class Login extends BasePage {
  uniqueId = '';
  password = '';

  errorMessage = '';

  isLoading = false;

  private readonly maxAttempts = 3;
  private remainingAttempts = this.maxAttempts;
private readonly recoveryFlowKey = 'traxBlockedRecoveryFlow';
  /*
   * Used temporarily to remember that the user has gone
   * through the blocked-account recovery flow.
   *
   * Later this should come from the backend.
   */
  private readonly blockedRecoveryKey = 'traxBlockedRecoveryFlow';

  /*
   * TEMPORARY TEST CREDENTIALS
   *
   * Replace with authentication API later.
   */
  private readonly testUniqueId = 'TRX-admin';
  private readonly testPassword = '123';

  onLogin(): void {
    if (this.isLoading) {
      return;
    }

    this.errorMessage = '';

    const uniqueId = this.uniqueId.trim();
    const password = this.password.trim();

    /*
     * Empty fields do NOT consume a login attempt.
     */
    if (!uniqueId || !password) {
      this.errorMessage =
        'Enter both your Unique ID and password.';

      return;
    }

    const credentialsAreValid =
      uniqueId === this.testUniqueId &&
      password === this.testPassword;

    if (credentialsAreValid) {
      this.handleSuccessfulLogin();
      return;
    }

    this.handleFailedLogin();
  }

private handleSuccessfulLogin(): void {
  this.errorMessage = '';
  this.remainingAttempts = this.maxAttempts;

  const isRecoveryFlow =
    sessionStorage.getItem(
      this.recoveryFlowKey,
    ) === 'true';

  if (isRecoveryFlow) {
    this.router.navigateByUrl(
      '/auth-process/authenticator',
    );

    return;
  }

  // Normal login
  this.router.navigateByUrl('/admin');
}

private handleFailedLogin(): void {
  this.remainingAttempts--;

  if (this.remainingAttempts <= 0) {
    // Remember that this user entered the blocked recovery flow.
    sessionStorage.setItem(
      this.recoveryFlowKey,
      'true',
    );

    this.goToAccountBlocked();
    return;
  }

  const attemptLabel =
    this.remainingAttempts === 1
      ? 'attempt'
      : 'attempts';

  this.errorMessage =
    `Incorrect password. ${this.remainingAttempts} ${attemptLabel} left before this account is blocked.`;
}

  private goToAccountBlocked(): void {
    const reference = this.generateBlockReference();
    const blockedAt = this.getCurrentTime();

    this.router.navigate(['/account-blocked'], {
      queryParams: {
        reference,
        blockedAt,
      },
    });
  }

  private generateBlockReference(): string {
    const number = Math.floor(
      100000 + Math.random() * 900000,
    );

    return `BLK-${number}`;
  }

  private getCurrentTime(): string {
    return new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  }
}