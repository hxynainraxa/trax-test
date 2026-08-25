import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BasePage } from '@app/core/base/base-page';

type Tab = 'add' | 'edit' | 'search';

interface FrequencyRecord {
  id: number;
  transactionType: string;
  period: string;
  customerType: string;
  active: boolean;
  lowFrom: number;
  lowTo: number;
  mediumFrom: number;
  mediumTo: number;
  mediumHighFrom: number;
  mediumHighTo: number;
  highFrom: number;
  highTo: number;
  lowScore: number;
  mediumScore: number;
  mediumHighScore: number;
  highScore: number;
}

@Component({
  selector: 'app-risk-transaction-frequency',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './risk-transaction-frequency.html',
  styleUrl: './risk-transaction-frequency.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RiskTransactionFrequency extends BasePage {

  protected activeTab: Tab = 'add';

  protected readonly transactionTypes = ['All'];
  protected readonly periods = ['Week'];
  protected readonly customerTypes = [
    'ALL',
    'INDIVIDUAL',
    'CORPORATE',
  ];

  protected records: FrequencyRecord[] =
    this.load();

  protected selectedId:
    number | null = null;

  protected results:
    FrequencyRecord[] = [];

  protected form =
    this.defaults();

  protected readonly message =
    signal<string | null>(null);


  protected setTab(tab: Tab): void {
    this.activeTab = tab;
    this.reset();
  }


  protected save(): void {
    const record: FrequencyRecord = {
      id:
        this.selectedId ??
        Date.now(),

      transactionType:
        this.form.transactionType,

      period:
        this.form.period,

      customerType:
        this.form.customerType,

      active:
        this.form.active,

      lowFrom: this.form.lowFrom,
      lowTo: this.form.lowTo,

      mediumFrom:
        this.form.mediumFrom,

      mediumTo:
        this.form.mediumTo,

      mediumHighFrom:
        this.form.mediumHighFrom,

      mediumHighTo:
        this.form.mediumHighTo,

      highFrom:
        this.form.highFrom,

      highTo:
        this.form.highTo,

      lowScore:
        this.form.lowScore,

      mediumScore:
        this.form.mediumScore,

      mediumHighScore:
        this.form.mediumHighScore,

      highScore:
        this.form.highScore,
    };


    if (this.selectedId !== null) {
      this.records =
        this.records.map(item =>
          item.id === this.selectedId
            ? record
            : item,
        );

      this.show(
        'Risk transaction frequency updated successfully.',
      );
    }
    else {
      this.records = [
        ...this.records,
        record,
      ];

      this.show(
        'Risk transaction frequency created successfully.',
      );
    }

    this.persist();
    this.reset();
  }


  protected search(): void {
    this.selectedId = null;

    this.results =
      this.records.filter(item =>
        (
          this.form.transactionType === 'All' ||
          item.transactionType ===
            this.form.transactionType
        ) &&
        (
          item.period ===
          this.form.period
        ) &&
        (
          this.form.customerType === 'ALL' ||
          item.customerType ===
            this.form.customerType
        ) &&
        (
          !this.form.active ||
          item.active
        ) &&
        (
          this.activeTab !== 'search' ||
          this.form.score === null ||
          [
            item.lowScore,
            item.mediumScore,
            item.mediumHighScore,
            item.highScore,
          ].includes(
            Number(this.form.score),
          )
        )
      );

    this.show(
      `${this.results.length} record(s) found.`,
    );
  }


  protected editRecord(
    item: FrequencyRecord,
  ): void {
    if (this.activeTab !== 'edit') {
      return;
    }

    this.selectedId = item.id;

    this.form = {
      ...this.defaults(),

      transactionType:
        item.transactionType,

      period:
        item.period,

      customerType:
        item.customerType,

      active:
        item.active,

      lowFrom: item.lowFrom,
      lowTo: item.lowTo,

      mediumFrom:
        item.mediumFrom,

      mediumTo:
        item.mediumTo,

      mediumHighFrom:
        item.mediumHighFrom,

      mediumHighTo:
        item.mediumHighTo,

      highFrom:
        item.highFrom,

      highTo:
        item.highTo,

      lowScore:
        item.lowScore,

      mediumScore:
        item.mediumScore,

      mediumHighScore:
        item.mediumHighScore,

      highScore:
        item.highScore,
    };
  }


  protected reset(): void {
    this.selectedId = null;
    this.results = [];
    this.form = this.defaults();
  }


  private defaults() {
    return {
      transactionType: 'All',
      period: 'Week',

      customerType:
        this.activeTab === 'add'
          ? 'INDIVIDUAL'
          : 'ALL',

      active: true,

      lowFrom: 0,
      lowTo: 0,

      mediumFrom: 0,
      mediumTo: 0,

      mediumHighFrom: 0,
      mediumHighTo: 0,

      highFrom: 0,
      highTo: 0,

      lowScore: 0,
      mediumScore: 0,
      mediumHighScore: 0,
      highScore: 0,

      score:
        null as number | null,
    };
  }


  private persist(): void {
    localStorage.setItem(
      'traxRiskTransactionFrequency',
      JSON.stringify(this.records),
    );
  }


  private load():
    FrequencyRecord[] {
    try {
      return JSON.parse(
        localStorage.getItem(
          'traxRiskTransactionFrequency',
        ) ?? '[]',
      );
    }
    catch {
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