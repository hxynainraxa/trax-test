import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BasePage } from '@app/core/base/base-page';

type Tab = 'add' | 'edit' | 'search';

type WeightageForm = Record<
  string,
  number | null
>;

interface RecordItem {
  id: number;
  data: WeightageForm;
}

@Component({
  selector: 'app-score-weightage-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './score-weightage-settings.html',
  styleUrl: './score-weightage-settings.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreWeightageSettings
  extends BasePage
{
  protected readonly activeTab =
    signal<Tab>('add');

  protected readonly toast =
    signal<{
      type: 'success' | 'error';
      text: string;
    } | null>(null);

  private readonly storageKey =
    'traxScoreWeightageSettings';

  private timer?: ReturnType<
    typeof setTimeout
  >;


  // ==================================================
  // FIELD DEFINITIONS
  // ==================================================

  protected readonly senderFields = [
    ['senderName', 'Sender Name'],
    ['senderId', 'Sender Id'],
    ['senderCountry', 'Sender Country'],
    ['senderNationality', 'Sender Nationality'],
    ['senderDob', 'Sender DOB'],
  ] as const;

  protected readonly beneficiaryFields = [
    ['beneficiaryName', 'Beneficiary Name'],
    ['beneficiaryId', 'Beneficiary Id'],
    ['beneficiaryCountry', 'Beneficiary Country'],
    ['beneficiaryNationality', 'Beneficiary Nationality'],
    ['beneficiaryDob', 'Beneficiary DOB'],
  ] as const;

  protected readonly thresholdFields = [
    ['threshold', 'Threshold'],
    ['intermediateThreshold', 'Intermediate Threshold'],
    ['minimumThreshold', 'Minimum Threshold'],
  ] as const;


  // ==================================================
  // FORM
  // ==================================================

  protected form =
    this.emptyForm();

  protected records:
    RecordItem[] =
      this.load();

  protected results:
    RecordItem[] = [];

  protected selectedId:
    number | null =
      null;


  // ==================================================
  // TAB
  // ==================================================

  protected setTab(
    tab: Tab,
  ): void {
    this.activeTab.set(tab);
    this.form = this.emptyForm();
    this.results = [];
    this.selectedId = null;
  }


  // ==================================================
  // ADD
  // ==================================================

  protected save(): void {
    if (!this.valid()) return;

    this.records.push({
      id:
        Date.now(),

      data: {
        ...this.form,
      },
    });

    this.persist();

    this.form =
      this.emptyForm();

    this.show(
      'success',
      'Score weightage setting created successfully.',
    );
  }


  // ==================================================
  // SEARCH
  // ==================================================

  protected search(): void {
    this.results =
      this.records.filter(
        record =>
          Object.entries(
            this.form,
          ).every(
            ([key, value]) =>
              value === null ||
              record.data[key] === value,
          ),
      );

    if (
      this.activeTab() === 'edit' &&
      this.results.length === 1
    ) {
      this.loadForEdit(
        this.results[0],
      );
    }
  }


  // ==================================================
  // LOAD EDIT
  // ==================================================

  protected loadForEdit(
    record: RecordItem,
  ): void {
    this.selectedId =
      record.id;

    this.form = {
      ...record.data,
    };
  }


  // ==================================================
  // UPDATE
  // ==================================================

  protected update(): void {
    if (
      this.selectedId === null
    ) {
      return this.show(
        'error',
        'Search and select a record first.',
      );
    }

    if (!this.valid()) return;

    this.records =
      this.records.map(
        record =>
          record.id ===
          this.selectedId
            ? {
                ...record,
                data: {
                  ...this.form,
                },
              }
            : record,
      );

    this.persist();

    this.show(
      'success',
      'Score weightage setting updated successfully.',
    );
  }


  // ==================================================
  // DELETE
  // ==================================================

  protected remove(): void {
    if (
      this.selectedId === null
    ) {
      return this.show(
        'error',
        'Select a record first.',
      );
    }

    this.records =
      this.records.filter(
        record =>
          record.id !==
          this.selectedId,
      );

    this.persist();
    this.setTab('edit');

    this.show(
      'success',
      'Score weightage setting deleted successfully.',
    );
  }


  // ==================================================
  // RESET
  // ==================================================

  protected reset(): void {
    this.form =
      this.emptyForm();

    this.results = [];

    this.selectedId = null;
  }


  // ==================================================
  // VALIDATION
  // ==================================================

  private valid(): boolean {
    const weightageKeys = [
      ...this.senderFields,
      ...this.beneficiaryFields,
    ].map(([key]) => key);

    const invalid =
      weightageKeys.some(
        key => {
          const value =
            this.form[key];

          return (
            value === null ||
            value < 0 ||
            value > 1
          );
        },
      );

    if (invalid) {
      this.show(
        'error',
        'Weightage values must be between 0 and 1.',
      );

      return false;
    }

    return true;
  }


  // ==================================================
  // DEFAULT FORM
  // ==================================================

  private emptyForm():
    WeightageForm {
    return {
      senderName: 0,
      senderId: 0,
      senderCountry: 0,
      senderNationality: 0,
      senderDob: 0,

      beneficiaryName: 0,
      beneficiaryId: 0,
      beneficiaryCountry: 0,
      beneficiaryNationality: 0,
      beneficiaryDob: 0,

      beneficiaryBankName: 0,

      threshold: 0,
      intermediateThreshold: 0,
      minimumThreshold: 0,
    };
  }


  // ==================================================
  // STORAGE
  // ==================================================

  private persist(): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(
        this.records,
      ),
    );
  }

  private load():
    RecordItem[] {
    try {
      return JSON.parse(
        localStorage.getItem(
          this.storageKey,
        ) ?? '[]',
      );
    } catch {
      return [];
    }
  }


  // ==================================================
  // TOAST
  // ==================================================

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
        () =>
          this.toast.set(null),
        5000,
      );
  }
}