import { Injectable } from '@angular/core';
import { API_END_POINTS } from '@app/shared/constants/api-end-points';
import { UserType } from '@app/shared/enums/shared.enums';
import { environment } from '@environments/environment';
import { LucideLoaderCircle } from '@lucide/angular';

@Injectable({
  providedIn: 'root',
})
export class BaseConfig {
  readonly apiBaseUrl = environment.apiBaseUrl;
  readonly apiEndPoint = API_END_POINTS;
  readonly UserType = UserType;
  readonly loader = LucideLoaderCircle;
}
