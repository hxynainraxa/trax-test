import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BasePage } from '@app/core/base/base-page';

type Tab = 'add' | 'edit' | 'search';

interface RemitterRisk {
  id: number;
  remitterType: string;
  transactionRisk: string;
  transactionScore: number | null;
  onboardScore: number | null;
  active: boolean;
}

@Component({
  selector: 'app-remitter-type-risk-score',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './remitter-type-risk-score.html',

  // Same styling as Transaction Frequency
  styleUrl:
    '../risk-transaction-frequency/risk-transaction-frequency.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemitterTypeRiskScore extends BasePage {

  protected activeTab: Tab = 'add';
  protected selectedId: number | null = null;

  protected readonly remitterTypes = [
    'INDIVIDUAL',
    'CORPORATE',
    'SME',
    'GRE',
    'Government',
    'Reserver',
  ];

  protected readonly transactionRisks = [
    'LOW',
    'MEDIUM',
    'MEDIUM HIGH',
    'HIGH',
  ];

  protected records: RemitterRisk[] = this.load();
  protected results: RemitterRisk[] = [];
  protected form = this.defaults();

  protected readonly message =
    signal<string | null>(null);


  protected setTab(tab: Tab): void {
    this.activeTab = tab;
    this.reset();
  }


  // ==================================================
  // SAVE / UPDATE
  // ==================================================

  protected save(): void {
    const record: RemitterRisk = {
      id: this.selectedId ?? Date.now(),
      remitterType: this.form.remitterType,
      transactionRisk: this.form.transactionRisk,
      transactionScore: this.form.transactionScore,
      onboardScore: this.form.onboardScore,
      active: this.form.active,
    };

    if (this.selectedId !== null) {
      this.records = this.records.map(item =>
        item.id === this.selectedId
          ? record
          : item,
      );

      this.show(
        'Remitter Type Risk Score updated successfully.',
      );
    } else {
      this.records = [
        ...this.records,
        record,
      ];

      this.show(
        'Remitter Type Risk Score created successfully.',
      );
    }

    this.persist();
    this.reset();
  }


  // ==================================================
  // SEARCH
  // ==================================================

  protected search(): void {
    this.selectedId = null;

    this.results = this.records.filter(item =>
      (
        this.form.remitterType === 'ALL' ||
        item.remitterType === this.form.remitterType
      ) &&
      (
        this.form.transactionRisk === 'All' ||
        item.transactionRisk ===
          this.form.transactionRisk
      ) &&
      (
        this.form.transactionScore === null ||
        item.transactionScore ===
          this.form.transactionScore
      ) &&
      (
        this.form.onboardScore === null ||
        item.onboardScore ===
          this.form.onboardScore
      ) &&
      (
        !this.form.active ||
        item.active
      )
    );

    this.show(
      `${this.results.length} record(s) found.`,
    );
  }


  // ==================================================
  // LOAD RECORD FOR EDIT
  // ==================================================

  protected editRecord(
    item: RemitterRisk,
  ): void {
    if (this.activeTab !== 'edit') {
      return;
    }

    this.selectedId = item.id;

    this.form = {
      remitterType: item.remitterType,
      transactionRisk: item.transactionRisk,
      transactionScore: item.transactionScore,
      onboardScore: item.onboardScore,
      active: item.active,
    };
  }


  // ==================================================
  // RESET
  // ==================================================

  protected reset(): void {
    this.selectedId = null;
    this.results = [];
    this.form = this.defaults();
  }


  private defaults() {
    const searching =
      this.activeTab === 'search' ||
      this.activeTab === 'edit';

    return {
      remitterType:
        searching
          ? 'ALL'
          : 'INDIVIDUAL',

      transactionRisk:
        searching
          ? 'All'
          : 'LOW',

      transactionScore:
        null as number | null,

      onboardScore:
        null as number | null,

      active: true,
    };
  }


  // ==================================================
  // LOCAL MOCK STORAGE
  // ==================================================

  private persist(): void {
    localStorage.setItem(
      'traxRemitterTypeRiskScore',
      JSON.stringify(this.records),
    );
  }


  private load(): RemitterRisk[] {
    try {
      return JSON.parse(
        localStorage.getItem(
          'traxRemitterTypeRiskScore',
        ) ?? '[]',
      );
    } catch {
      return [];
    }
  }


  private show(text: string): void {
    this.message.set(text);

    setTimeout(
      () => this.message.set(null),
      5000,
    );
  }
}