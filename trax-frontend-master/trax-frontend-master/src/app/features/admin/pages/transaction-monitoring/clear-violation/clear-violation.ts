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
  branchOptions,
  clearViolationData,
  ClearViolationFilters,
  ClearViolationRecord,
  createClearViolationFilters,
  moduleOptions,
  remitterTypeOptions,
  transactionTypeOptions,
} from './clear-violation-data';


// ==================================================
// TABLE ROW
// ==================================================

interface ClearViolationTableRow
  extends ClearViolationRecord {

  slNo:
    number;

  moduleLabel:
    string;

  transactionTypeLabel:
    string;

  remitterTypeLabel:
    string;

  branchLabel:
    string;

  amountLabel:
    string;

  violationDateLabel:
    string;

  valueDateLabel:
    string;

  statusLabel:
    string;
}


@Component({
  selector:
    'app-clear-violation',

  standalone:
    true,

  imports: [
    CommonModule,
    FormsModule,
    LucideDynamicIcon,
    SharedTableComponent,
  ],

  templateUrl:
    './clear-violation.html',

  styleUrl:
    './clear-violation.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class ClearViolation
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
  // OPTIONS
  // ==================================================

  protected readonly modules =
    moduleOptions;


  protected readonly transactionTypes =
    transactionTypeOptions;


  protected readonly remitterTypes =
    remitterTypeOptions;


  protected readonly branches =
    branchOptions;


  // ==================================================
  // FILTERS
  // ==================================================

  protected filters:
    ClearViolationFilters =
      createClearViolationFilters();


  // ==================================================
  // RESULTS
  // ==================================================

  protected results:
    ClearViolationTableRow[] = [];


  protected hasSearched =
    false;


  // ==================================================
  // DATE ERROR
  // ==================================================

  protected dateError =
    '';


  // ==================================================
  // TABLE COLUMNS
  // ==================================================

  protected readonly columns:
    SharedTableColumn<
      ClearViolationTableRow
    >[] = [

      {
        key:
          'slNo',

        header:
          'Sl.No',

        width:
          '5%',
      },


      {
        key:
          'violationReference',

        header:
          'Violation Ref.',

        width:
          '12%',

        sortable:
          true,
      },


      {
        key:
          'moduleLabel',

        header:
          'Module',

        width:
          '11%',

        sortable:
          true,
      },


      {
        key:
          'transactionTypeLabel',

        header:
          'Transaction Type',

        width:
          '18%',

        sortable:
          true,
      },


      {
        key:
          'membershipNumber',

        header:
          'Membership No.',

        width:
          '11%',

        sortable:
          true,
      },


      {
        key:
          'customerName',

        header:
          'Customer',

        width:
          '14%',

        sortable:
          true,
      },


      {
        key:
          'remitterTypeLabel',

        header:
          'Remitter Type',

        width:
          '10%',
      },


      {
        key:
          'branchLabel',

        header:
          'Branch',

        width:
          '10%',
      },


      {
        key:
          'amountLabel',

        header:
          'Amount',

        width:
          '10%',
      },


      {
        key:
          'violationDateLabel',

        header:
          'Violation Date',

        width:
          '13%',

        sortable:
          true,
      },


      {
        key:
          'statusLabel',

        header:
          'Status',

        width:
          '8%',
      },

    ];


  constructor() {
    super();
  }


  // ==================================================
  // SEARCH
  // ==================================================

  protected search():
    void {

    this.dateError =
      '';


    if (
      this.filters.fromDate &&
      this.filters.toDate &&
      this.filters.fromDate >
        this.filters.toDate
    ) {

      this.dateError =
        'To Date cannot be earlier than From Date.';


      this.results =
        [];


      this.hasSearched =
        false;


      return;
    }


    const records =
      clearViolationData
        .filter(
          record =>
            this.matchesFilters(
              record,
            ),
        );


    this.results =
      this.toRows(
        records,
      );


    this.hasSearched =
      true;
  }


  // ==================================================
  // RESET
  // ==================================================

  protected reset():
    void {

    this.filters =
      createClearViolationFilters();


    this.results =
      [];


    this.hasSearched =
      false;


    this.dateError =
      '';
  }


  // ==================================================
  // MATCH
  // ==================================================

  private matchesFilters(
    record:
      ClearViolationRecord,
  ): boolean {

    // ================================================
    // MODULE
    // ================================================

    if (
      this.filters.module &&
      this.filters.module !==
        'all' &&
      record.module !==
        this.filters.module
    ) {

      return false;
    }


    // ================================================
    // TRANSACTION TYPE
    // ================================================

    if (
      this.filters.transactionType !==
        'all' &&
      record.transactionType !==
        this.filters.transactionType
    ) {

      return false;
    }


    // ================================================
    // REMITTER
    // ================================================

    if (
      this.filters.remitterType !==
        'all' &&
      record.remitterType !==
        this.filters.remitterType
    ) {

      return false;
    }


    // ================================================
    // MEMBERSHIP NUMBER
    // ================================================

    const membershipSearch =
      this.filters
        .membershipNumber
        .trim()
        .toLowerCase();


    if (
      membershipSearch &&
      !record
        .membershipNumber
        .toLowerCase()
        .includes(
          membershipSearch,
        )
    ) {

      return false;
    }


    // ================================================
    // BRANCH
    // ================================================

    if (
      this.filters.branch !==
        'all' &&
      record.branch !==
        this.filters.branch
    ) {

      return false;
    }


    // ================================================
    // DATE
    //
    // Checkbox controls whether From/To
    // uses Violation Date or Value Date.
    // ================================================

    const recordDate =
      this.filters.useValueDate
        ? record.valueDate
        : record.violationDate
            .slice(
              0,
              10,
            );


    if (
      this.filters.fromDate &&
      recordDate <
        this.filters.fromDate
    ) {

      return false;
    }


    if (
      this.filters.toDate &&
      recordDate >
        this.filters.toDate
    ) {

      return false;
    }


    return true;
  }


  // ==================================================
  // TABLE ROWS
  // ==================================================

  private toRows(
    records:
      ClearViolationRecord[],
  ): ClearViolationTableRow[] {

    return records.map(
      (
        record,
        index,
      ) => {

        const module =
          moduleOptions.find(
            option =>
              option.value ===
                record.module,
          );


        const transactionType =
          transactionTypeOptions.find(
            option =>
              option.value ===
                record.transactionType,
          );


        const remitterType =
          remitterTypeOptions.find(
            option =>
              option.value ===
                record.remitterType,
          );


        const branch =
          branchOptions.find(
            option =>
              option.value ===
                record.branch,
          );


        return {

          ...record,

          slNo:
            index + 1,

          moduleLabel:
            module?.label ??
            record.module,

          transactionTypeLabel:
            transactionType?.label ??
            record.transactionType,

          remitterTypeLabel:
            remitterType?.label ??
            record.remitterType,

          branchLabel:
            branch?.label ??
            record.branch,

          amountLabel:
            `${record.currency} ${record.amount.toLocaleString()}`,

          violationDateLabel:
            this.formatDateTime(
              record.violationDate,
            ),

          valueDateLabel:
            this.formatDate(
              record.valueDate,
            ),

          statusLabel:
            record.status ===
              'open'
              ? 'Open'
              : 'Cleared',
        };
      },
    );
  }


  // ==================================================
  // DATE
  // ==================================================

  private formatDate(
    value:
      string,
  ): string {

    if (!value) {
      return '—';
    }


    const date =
      new Date(
        `${value}T00:00:00`,
      );


    if (
      Number.isNaN(
        date.getTime(),
      )
    ) {

      return value;
    }


    return date
      .toLocaleDateString();
  }


  // ==================================================
  // DATE TIME
  // ==================================================

  private formatDateTime(
    value:
      string,
  ): string {

    if (!value) {
      return '—';
    }


    const date =
      new Date(
        value,
      );


    if (
      Number.isNaN(
        date.getTime(),
      )
    ) {

      return value;
    }


    return date
      .toLocaleString();
  }
}