import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

import {
  CommonModule,
} from '@angular/common';

import {
  FormsModule,
} from '@angular/forms';

import {
  LucideDynamicIcon,
  LucideRotateCcw,
  LucideSearch,
} from '@lucide/angular';

import {
  BasePage,
} from '@app/core/base/base-page';

import {
  SharedTableComponent,
} from '@shared/components/shared-table/shared-table';

import {
  SharedTableColumn,
} from '@shared/interfaces/shared-table.types';

import {
  createDefaultTransactionFilters,
  searchTransactions,
  TransactionScreeningFilters,
  TransactionScreeningRecord,
} from './transaction-data';


@Component({
  selector:
    'app-transaction-screening',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    LucideDynamicIcon,
    SharedTableComponent,
  ],

  templateUrl:
    './transaction-screening.html',

  styleUrl:
    './transaction-screening.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class TransactionScreening
  extends BasePage
{

  // ==================================================
  // ICONS
  // ==================================================

  protected readonly searchIcon =
    LucideSearch;

  protected readonly resetIcon =
    LucideRotateCcw;


  // ==================================================
  // FILTERS
  // ==================================================

  protected filters:
    TransactionScreeningFilters =
      createDefaultTransactionFilters();


  // ==================================================
  // SEARCH STATE
  // ==================================================

  protected hasSearched =
    false;

  protected validationMessage =
    '';


  // ==================================================
  // RESULTS
  // ==================================================

  protected results:
    TransactionScreeningRecord[] = [];


  // ==================================================
  // TABLE COLUMNS
  // ==================================================

  protected readonly columns:
    SharedTableColumn<
      TransactionScreeningRecord
    >[] = [

      {
        key: 'referenceNumber',

        header:
          'Reference Number',

        width: '19%',

        sortable: true,
      },


      {
        key: 'customerName',

        header:
          'Customer Name',

        width: '18%',

        sortable: true,
      },


      {
        key: 'transactionType',

        header:
          'Transaction Type',

        width: '18%',

        sortable: true,
      },


      {
        key: 'scanType',

        header:
          'Scan Type',

        width: '13%',

        sortable: true,
      },


      {
        key: 'amount',

        header:
          'Amount',

        width: '10%',

        sortable: true,

        formatter:
          (
            value,
            row,
          ) =>
            `${Number(value).toLocaleString()} ${row.currency}`,
      },


      {
        key: 'status',

        header:
          'Status',

        width: '11%',

        sortable: true,
      },


      {
        key: 'screeningDate',

        header:
          'Date',

        width: '11%',

        sortable: true,
      },

    ];


  // ==================================================
  // SEARCH
  // ==================================================

  protected onSearch(): void {

    this.validationMessage =
      '';


    // ================================================
    // REQUIRE AT LEAST ONE SCAN TYPE
    // ================================================

    const hasScanType =
      this.filters
        .scanTypes
        .nameChecker ||
      this.filters
        .scanTypes
        .ruleCheck ||
      this.filters
        .scanTypes
        .caseCheck;


    if (!hasScanType) {

      this.validationMessage =
        'Select at least one scan type.';

      this.results = [];

      this.hasSearched =
        false;

      return;
    }


    // ================================================
    // SEARCH DUMMY DATA
    // ================================================

    this.results =
      searchTransactions(
        this.filters,
      );


    this.hasSearched =
      true;
  }


  // ==================================================
  // RESET
  // ==================================================

  protected onReset(): void {

    this.filters =
      createDefaultTransactionFilters();


    this.results = [];


    this.hasSearched =
      false;


    this.validationMessage =
      '';
  }
}