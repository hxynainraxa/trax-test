import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BasePage } from '@app/core/base/base-page';

type Tab = 'add' | 'edit' | 'search';

interface SuspiciousWord {
  id: number;
  word: string;
  description: string;
  status: 'active' | 'inactive';
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
}

@Component({
  selector: 'app-suspicious-words',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './suspicious-words.html',
  styleUrl: './suspicious-words.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuspiciousWords extends BasePage {

  protected activeTab: Tab = 'add';
  protected selectedId: number | null = null;
  protected records = this.load();

  protected readonly message =
    signal<string | null>(null);

  protected form = this.defaults();


  protected setTab(tab: Tab): void {
    this.activeTab = tab;
    this.reset();
  }


  // ==================================================
  // ADD / SEARCH / EDIT
  // ==================================================

  protected submit(): void {
    if (this.activeTab === 'add') {
      this.save();
      return;
    }

    const found =
      this.records.find(item =>
        (!this.form.word ||
          item.word.toLowerCase().includes(
            this.form.word.toLowerCase(),
          )) &&
        (!this.form.description ||
          item.description.toLowerCase().includes(
            this.form.description.toLowerCase(),
          )),
      );

    if (!found) {
      return this.show(
        'No suspicious word found.',
      );
    }

    this.selectedId = found.id;
    this.form = { ...found };

    this.show(
      this.activeTab === 'edit'
        ? 'Suspicious word loaded for editing.'
        : 'Suspicious word found successfully.',
    );
  }


  protected save(): void {
    if (!this.form.word.trim()) {
      return this.show(
        'Suspicious Word is required.',
      );
    }

    if (
      this.activeTab === 'edit' &&
      this.selectedId
    ) {
      this.records =
        this.records.map(item =>
          item.id === this.selectedId
            ? {
                ...item,
                ...this.form,
                modifiedBy: 'Admin',
                modifiedDate:
                  new Date().toLocaleString(),
              }
            : item,
        );

      this.persist();
      this.show(
        'Suspicious word updated successfully.',
      );

      return;
    }

    this.records = [
      ...this.records,
      {
        id: Date.now(),
        word: this.form.word.trim(),
        description:
          this.form.description.trim(),
        status: this.form.status,
        createdBy: 'Admin',
        createdDate:
          new Date().toLocaleString(),
        modifiedBy: '',
        modifiedDate: '',
      },
    ];

    this.persist();
    this.reset();

    this.show(
      'Suspicious word saved successfully.',
    );
  }


  // ==================================================
  // FILE UPLOAD
  // ==================================================

  protected async uploadFile(
    event: Event,
  ): Promise<void> {
    const input =
      event.target as HTMLInputElement;

    const file =
      input.files?.[0];

    if (!file) return;

    const text =
      await file.text();

    const rows =
      text
        .split(/\r?\n/)
        .map(row => row.trim())
        .filter(Boolean);

    const added =
      rows
        .filter(
          (_, index) =>
            !(index === 0 &&
              rows[0]
                .toLowerCase()
                .includes('word')),
        )
        .map(row => {
          const [
            word,
            description = '',
          ] = row.split(',');

          return {
            id:
              Date.now() +
              Math.random(),

            word:
              word.trim(),

            description:
              description.trim(),

            status:
              'active' as const,

            createdBy:
              'Admin',

            createdDate:
              new Date()
                .toLocaleString(),

            modifiedBy: '',
            modifiedDate: '',
          };
        })
        .filter(item => item.word);

    this.records = [
      ...this.records,
      ...added,
    ];

    this.persist();

    input.value = '';

    this.show(
      `${added.length} suspicious word(s) uploaded successfully.`,
    );
  }


  // ==================================================
  // DOWNLOAD
  // ==================================================

  protected download(): void {
    const rows = [
      'Suspicious Word,Description,Status',
      ...this.records.map(item =>
        `"${item.word.replace(/"/g, '""')}",` +
        `"${item.description.replace(/"/g, '""')}",` +
        item.status,
      ),
    ];

    const blob =
      new Blob(
        [rows.join('\n')],
        {
          type:
            'text/csv;charset=utf-8',
        },
      );

    const link =
      document.createElement('a');

    link.href =
      URL.createObjectURL(blob);

    link.download =
      'suspicious-words.csv';

    link.click();

    URL.revokeObjectURL(
      link.href,
    );
  }


  // ==================================================
  // RESET
  // ==================================================

  protected reset(): void {
    this.selectedId = null;
    this.form = this.defaults();
  }


  private defaults() {
    return {
      word: '',
      description: '',
      status:
        (this.activeTab === 'add'
          ? 'active'
          : 'active') as
          'active' | 'inactive',

      createdBy: '',
      createdDate: '',
      modifiedBy: '',
      modifiedDate: '',
    };
  }


  private persist(): void {
    localStorage.setItem(
      'traxSuspiciousWords',
      JSON.stringify(
        this.records,
      ),
    );
  }


  private load():
    SuspiciousWord[] {
    try {
      return JSON.parse(
        localStorage.getItem(
          'traxSuspiciousWords',
        ) ?? '[]',
      );
    } catch {
      return [];
    }
  }


  private show(text: string): void {
    this.message.set(text);

    setTimeout(
      () =>
        this.message.set(null),
      5000,
    );
  }
}