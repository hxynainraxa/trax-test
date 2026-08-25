import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authenticator',
  imports: [],
  templateUrl: './authenticator.html',
})
export class Authenticator implements OnInit {
  private readonly recoveryFlowKey = 'traxBlockedRecoveryFlow';

  constructor(
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    /*
     * Prevent this screen from being opened directly.
     *
     * The user should only arrive here after:
     * Account blocked -> Back to login -> Correct credentials.
     */
    const isRecoveryFlow =
      sessionStorage.getItem(this.recoveryFlowKey) === 'true';

    if (!isRecoveryFlow) {
      this.router.navigate(['/login']);
    }
  }

selectGoogleAuthenticator(): void {
  this.router.navigate([
    '/auth-process/google-authenticator',
  ]);
}

selectOneTimePasscode(): void {
  this.router.navigateByUrl(
    '/auth-process/otp-authenticator',
  );
}

  backToLogin(): void {
    this.router.navigate(['/login']);
  }
}