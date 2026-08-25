import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/shared/services/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
