import { Injectable, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyFormatPipe, TruncatePipe } from '@app/shared/pipes/pipes-index';
import { BaseConfig } from './base-config';

@Injectable()
export abstract class BasePage {
  // ========== INJECTED DEPENDENCIES ==========
  protected router = inject(Router);
  protected config = inject(BaseConfig);
  protected route = inject(ActivatedRoute);
  protected fb = inject(FormBuilder);

  protected pipes = {
    truncate: new TruncatePipe(),
    currencyFormat: new CurrencyFormatPipe(),
  };
}
