import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BasePage } from './core/base/base-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App extends BasePage {
  protected readonly title = signal('billGoose-admin');
  constructor() {
    super();
  }

  ngOnInit() {}
}
