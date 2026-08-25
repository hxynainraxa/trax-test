import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account-blocked',
  imports: [],
  templateUrl: './account-blocked.html',
})
export class AccountBlocked implements OnInit, OnDestroy {
  reference = '';
  blockedAt = '';

  requestSent = false;

  private toastTimer?: ReturnType<typeof setTimeout>;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.reference = params.get('reference') ?? '—';
      this.blockedAt = params.get('blockedAt') ?? '—';
    });
  }

  contactAdministrator(): void {
    /*
     * TODO:
     * Call administrator notification API here later.
     */

    this.requestSent = true;

    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }

    this.toastTimer = setTimeout(() => {
      this.requestSent = false;
    }, 3500);
  }

  backToLogin(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
  }
}