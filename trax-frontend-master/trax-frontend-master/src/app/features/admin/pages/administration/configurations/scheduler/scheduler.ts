import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BasePage } from '@app/core/base/base-page';

interface SchedulerConfig {
  uploadTime: string;
  ofacUrl: string;
  euUrl: string;
  unUrl: string;
  ukUrl: string;
}

@Component({
  selector: 'app-scheduler',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './scheduler.html',
  styleUrl: './scheduler.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Scheduler extends BasePage {
  private readonly storageKey =
    'traxSchedulerConfig';

  private readonly defaults: SchedulerConfig = {
    uploadTime: '02:11',

    ofacUrl:
      'https://sanctionslistservice.ofac.treas.gov/api/PublicationPreview/exports/SDN_XML.ZIP',

    euUrl:
      'https://webgate.ec.europa.eu/europeaid/fsd/fsf/public/files/xmlFullSanctionsList_1_1/content',

    unUrl:
      'https://scsanctions.un.org/resources/xml/en/consolidated.xml',

    ukUrl:
      'https://ofsistorage.blob.core.windows.net/publishlive/2022format/ConList.xml',
  };

  protected form =
    this.load();

  protected readonly toast =
    signal<{
      type: 'success' | 'error';
      text: string;
    } | null>(null);

  private timer?: ReturnType<typeof setTimeout>;


  // ==================================================
  // SAVE
  // ==================================================

  protected save(): void {
    if (
      !this.form.uploadTime ||
      !this.form.ofacUrl.trim() ||
      !this.form.euUrl.trim() ||
      !this.form.unUrl.trim() ||
      !this.form.ukUrl.trim()
    ) {
      return this.show(
        'error',
        'Upload time and all Watch-List URLs are required.',
      );
    }

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.form),
    );

    this.show(
      'success',
      'Scheduler configuration saved successfully.',
    );
  }


  // ==================================================
  // UPDATE NOW
  // ==================================================

  protected updateNow(): void {
    if (!this.validUrls()) {
      return this.show(
        'error',
        'Please provide all Watch-List URLs before updating.',
      );
    }

    /*
     * Replace later with actual API call.
     */
    this.show(
      'success',
      'Watch-List update has been triggered successfully.',
    );
  }


  // ==================================================
  // CLEAR / RESTORE
  // ==================================================

  protected clear(): void {
    this.form =
      this.load();
  }


  // ==================================================
  // HELPERS
  // ==================================================

  private validUrls(): boolean {
    return !!(
      this.form.ofacUrl.trim() &&
      this.form.euUrl.trim() &&
      this.form.unUrl.trim() &&
      this.form.ukUrl.trim()
    );
  }


  private load(): SchedulerConfig {
    try {
      return JSON.parse(
        localStorage.getItem(
          this.storageKey,
        ) ?? 'null',
      ) ?? {
        ...this.defaults,
      };
    } catch {
      return {
        ...this.defaults,
      };
    }
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

    this.timer =
      setTimeout(
        () => this.toast.set(null),
        5000,
      );
  }
}