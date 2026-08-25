import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
  CreateRuleStoreService,
} from '../create-rule/create-rule-store.service';

import {
  branchOptions,
  createDailyRuleViolationFilters,
  dailyRuleViolationData,
  DailyRuleViolationFilters,
  DailyRuleViolationRecord,
  remitterTypeOptions,
} from './daily-rule-violation-data';


// ==================================================
// TABLE ROW
// ==================================================

interface DailyRuleViolationTableRow
  extends DailyRuleViolationRecord {

  slNo:
    number;

  ruleNumber:
    string;

  ruleName:
    string;

  remitterTypeLabel:
    string;

  branchLabel:
    string;

  amountLabel:
    string;

  violationDateLabel:
    string;

  statusLabel:
    string;
}


@Component({
  selector:
    'app-daily-rule-violation',

  standalone:
    true,

  imports: [
    CommonModule,
    FormsModule,
    LucideDynamicIcon,
    SharedTableComponent,
  ],

  templateUrl:
    './daily-rule-violation.html',

  styleUrl:
    './daily-rule-violation.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class DailyRuleViolation
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
  // FILTER OPTIONS
  // ==================================================

  protected readonly remitterTypes =
    remitterTypeOptions;


  protected readonly branches =
    branchOptions;


  // ==================================================
  // RULE OPTIONS
  //
  // Comes directly from CreateRuleStoreService.
  //
  // Add a rule on Create Rule page and it
  // automatically appears here.
  // ==================================================

  protected readonly ruleOptions =
    computed(
      () =>
        this.ruleStore
          .records()
          .map(
            rule => ({

              value:
                rule.id,

              label:
                `${rule.ruleNumber} - ${rule.ruleName}`,
            }),
          ),
    );


  // ==================================================
  // FILTERS
  // ==================================================

  protected filters:
    DailyRuleViolationFilters =
      createDailyRuleViolationFilters();


  // ==================================================
  // RESULTS
  // ==================================================

  protected results:
    DailyRuleViolationTableRow[] = [];


  protected hasSearched =
    false;


  // ==================================================
  // TABLE COLUMNS
  // ==================================================

  protected readonly columns:
    SharedTableColumn<
      DailyRuleViolationTableRow
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
          'ruleNumber',

        header:
          'Rule Number',

        width:
          '10%',

        sortable:
          true,
      },


      {
        key:
          'ruleName',

        header:
          'Rule Name',

        width:
          '16%',

        sortable:
          true,
      },


      {
        key:
          'violationReference',

        header:
          'Violation Ref.',

        width:
          '13%',

        sortable:
          true,
      },


      {
        key:
          'membershipNo',

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
          '15%',

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

        sortable:
          true,
      },


      {
        key:
          'branchLabel',

        header:
          'Branch',

        width:
          '11%',

        sortable:
          true,
      },


      {
        key:
          'amountLabel',

        header:
          'Amount',

        width:
          '10%',

        sortable:
          true,
      },


      {
        key:
          'violationDateLabel',

        header:
          'Violation Date',

        width:
          '14%',

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

        sortable:
          true,
      },

    ];


  // ==================================================
  // CONSTRUCTOR
  // ==================================================

  constructor(
    private readonly ruleStore:
      CreateRuleStoreService,
  ) {
    super();
  }


  // ==================================================
  // SEARCH
  // ==================================================

  protected search():
    void {

    /*
     * Invalid date range.
     *
     * For now simply return zero results.
     * Can be changed to your standard toast later
     * if needed.
     */
    if (
      this.filters.fromDate &&
      this.filters.toDate &&
      this.filters.fromDate >
        this.filters.toDate
    ) {

      this.results =
        [];


      this.hasSearched =
        true;


      return;
    }


    const records =
      dailyRuleViolationData
        .filter(
          violation =>
            this.matchesFilters(
              violation,
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
      createDailyRuleViolationFilters();


    this.results =
      [];


    this.hasSearched =
      false;
  }


  // ==================================================
  // MATCH FILTERS
  // ==================================================

  private matchesFilters(
    violation:
      DailyRuleViolationRecord,
  ): boolean {

    // ================================================
    // RULE
    // ================================================

    if (
      this.filters.ruleId !==
        'all' &&
      violation.ruleId !==
        this.filters.ruleId
    ) {

      return false;
    }


    // ================================================
    // FROM DATE
    // ================================================

    const violationDate =
      violation.violationDate
        .slice(
          0,
          10,
        );


    if (
      this.filters.fromDate &&
      violationDate <
        this.filters.fromDate
    ) {

      return false;
    }


    // ================================================
    // TO DATE
    // ================================================

    if (
      this.filters.toDate &&
      violationDate >
        this.filters.toDate
    ) {

      return false;
    }


    // ================================================
    // REMITTER TYPE
    // ================================================

    if (
      this.filters.remitterType !==
        'all' &&
      violation.remitterType !==
        this.filters.remitterType
    ) {

      return false;
    }


    // ================================================
    // BRANCH
    // ================================================

    if (
      this.filters.branch !==
        'all' &&
      violation.branch !==
        this.filters.branch
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
      DailyRuleViolationRecord[],
  ): DailyRuleViolationTableRow[] {

    const rules =
      this.ruleStore
        .records();


    return records
      .map(
        (
          record,
          index,
        ) => {

          const rule =
            rules.find(
              item =>
                item.id ===
                record.ruleId,
            );


          /*
           * If the corresponding rule was deleted,
           * do not show an orphan violation.
           */
          if (!rule) {
            return null;
          }


          const branch =
            branchOptions.find(
              option =>
                option.value ===
                record.branch,
            );


          const remitterType =
            remitterTypeOptions.find(
              option =>
                option.value ===
                record.remitterType,
            );


          return {

            ...record,

            slNo:
              index + 1,

            ruleNumber:
              rule.ruleNumber,

            ruleName:
              rule.ruleName,

            remitterTypeLabel:
              remitterType?.label ??
              record.remitterType,

            branchLabel:
              branch?.label ??
              record.branch,

            amountLabel:
              this.formatAmount(
                record.transactionAmount,
                record.currency,
              ),

            violationDateLabel:
              this.formatDateTime(
                record.violationDate,
              ),

            statusLabel:
              record.status ===
                'open'
                ? 'Open'
                : 'Cleared',
          };

        },
      )
      .filter(
        (
          row,
        ): row is DailyRuleViolationTableRow =>
          row !== null,
      )
      .map(
        (
          row,
          index,
        ) => ({
          ...row,

          slNo:
            index + 1,
        }),
      );
  }


  // ==================================================
  // FORMAT AMOUNT
  // ==================================================

  private formatAmount(
    amount:
      number,

    currency:
      string,
  ): string {

    return (
      `${currency} ${amount.toLocaleString()}`
    );
  }


  // ==================================================
  // FORMAT DATE
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