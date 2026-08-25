import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BasePage } from '@app/core/base/base-page';

type Tab = 'add' | 'edit' | 'search';

interface AmountRiskRecord {
  id: number;
  transactionType: string;
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
  selector: 'app-transaction-amount-risk-score',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './transaction-amount-risk-score.html',

  /*
   * Reuse exact styling from
   * Risk Transaction Frequency.
   */
  styleUrl:
    '../risk-transaction-frequency/risk-transaction-frequency.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class TransactionAmountRiskScore
  extends BasePage
{
  protected activeTab: Tab = 'add';

  protected selectedId:
    number | null = null;

  protected readonly transactionTypes = [
    'All',
  ];

  protected readonly customerTypes = [
    'ALL',
    'INDIVIDUAL',
    'CORPORATE',
  ];

  protected records:
    AmountRiskRecord[] =
      this.load();

  protected results:
    AmountRiskRecord[] = [];

  protected form =
    this.defaults();

  protected readonly message =
    signal<string | null>(null);


  // ==================================================
  // TAB
  // ==================================================

  protected setTab(
    tab: Tab,
  ): void {
    this.activeTab = tab;
    this.reset();
  }


  // ==================================================
  // SAVE
  // ==================================================

  protected save(): void {
    const record:
      AmountRiskRecord = {
        id:
          this.selectedId ??
          Date.now(),

        transactionType:
          this.form.transactionType,

        customerType:
          this.form.customerType,

        active:
          this.form.active,

        lowFrom:
          this.form.lowFrom,

        lowTo:
          this.form.lowTo,

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


    if (
      this.selectedId !== null
    ) {
      this.records =
        this.records.map(item =>
          item.id === this.selectedId
            ? record
            : item,
        );

      this.show(
        'Transaction amount risk score updated successfully.',
      );
    }
    else {
      this.records = [
        ...this.records,
        record,
      ];

      this.show(
        'Transaction amount risk score created successfully.',
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

    this.results =
      this.records.filter(item =>
        (
          this.form.transactionType ===
            'All' ||
          item.transactionType ===
            this.form.transactionType
        ) &&
        (
          this.form.customerType ===
            'ALL' ||
          item.customerType ===
            this.form.customerType
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
  // SELECT EDIT RESULT
  // ==================================================

  protected editRecord(
    item: AmountRiskRecord,
  ): void {
    if (
      this.activeTab !== 'edit'
    ) {
      return;
    }

    this.selectedId = item.id;

    this.form = {
      transactionType:
        item.transactionType,

      customerType:
        item.customerType,

      active:
        item.active,

      lowFrom:
        item.lowFrom,

      lowTo:
        item.lowTo,

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


  // ==================================================
  // RESET
  // ==================================================

  protected reset(): void {
    this.selectedId = null;

    this.results = [];

    this.form =
      this.defaults();
  }


  private defaults() {
    return {
      transactionType: 'All',
      customerType: 'ALL',
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
    };
  }


  // ==================================================
  // STORAGE
  // ==================================================

  private persist(): void {
    localStorage.setItem(
      'traxTransactionAmountRiskScore',

      JSON.stringify(
        this.records,
      ),
    );
  }


  private load():
    AmountRiskRecord[] {
    try {
      return JSON.parse(
        localStorage.getItem(
          'traxTransactionAmountRiskScore',
        ) ?? '[]',
      );
    }
    catch {
      return [];
    }
  }


  private show(
    text: string,
  ): void {
    this.message.set(text);

    setTimeout(
      () =>
        this.message.set(null),
      5000,
    );
  }
}