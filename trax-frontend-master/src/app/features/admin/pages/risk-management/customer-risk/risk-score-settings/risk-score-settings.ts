import {
  ChangeDetectionStrategy,
  Component,
  signal,
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
  createRiskScoreHistoryFilters,
  currentRiskScoreConfiguration,
  riskScoreHistory,
  RiskScoreHistoryFilters,
  RiskScoreHistoryRecord,
} from './risk-score-setting-data';


// ==================================================
// TAB
// ==================================================

type RiskScoreTab =
  | 'risk-score'
  | 'history';


// ==================================================
// TABLE ROW
// ==================================================

interface RiskScoreHistoryTableRow
  extends RiskScoreHistoryRecord {

  slNo:
    number;

  lowRange:
    string;

  mediumRange:
    string;

  mediumHighRange:
    string;

  highRange:
    string;

  statusLabel:
    string;

  createdOnLabel:
    string;
}


@Component({
  selector:
    'app-risk-score-settings',

  standalone:
    true,

  imports: [
    CommonModule,
    FormsModule,
    LucideDynamicIcon,
    SharedTableComponent,
  ],

  templateUrl:
    './risk-score-settings.html',

  styleUrl:
    './risk-score-settings.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class RiskScoreSettings
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
  // ACTIVE TAB
  // ==================================================

  protected readonly activeTab =
    signal<RiskScoreTab>(
      'risk-score',
    );


  // ==================================================
  // CURRENT FIXED CONFIGURATION
  // ==================================================

  protected readonly configuration =
    currentRiskScoreConfiguration;


  // ==================================================
  // HISTORY FILTERS
  // ==================================================

  protected filters:
    RiskScoreHistoryFilters =
      createRiskScoreHistoryFilters();


  // ==================================================
  // RESULTS
  // ==================================================

  protected results:
    RiskScoreHistoryTableRow[] =
      this.toRows(
        riskScoreHistory,
      );


  protected hasSearched =
    false;


  // ==================================================
  // TABLE
  // ==================================================

  protected readonly columns:
    SharedTableColumn<
      RiskScoreHistoryTableRow
    >[] = [

      {
        key:
          'slNo',

        header:
          'Sl.No',

        width:
          '6%',
      },

      {
        key:
          'lowRange',

        header:
          'Low',

        width:
          '14%',

        sortable:
          true,
      },

      {
        key:
          'mediumRange',

        header:
          'Medium',

        width:
          '14%',

        sortable:
          true,
      },

      {
        key:
          'mediumHighRange',

        header:
          'Medium High',

        width:
          '14%',

        sortable:
          true,
      },

      {
        key:
          'highRange',

        header:
          'High',

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
          '10%',

        sortable:
          true,
      },

      {
        key:
          'createdBy',

        header:
          'Created By',

        width:
          '12%',

        sortable:
          true,
      },

      {
        key:
          'createdOnLabel',

        header:
          'Created On',

        width:
          '16%',

        sortable:
          true,
      },

    ];


  constructor() {
    super();
  }


  // ==================================================
  // TAB
  // ==================================================

  protected setTab(
    tab:
      RiskScoreTab,
  ): void {

    this.activeTab.set(
      tab,
    );


    if (
      tab ===
      'history'
    ) {

      /*
       * Show latest history automatically.
       */
      this.results =
        this.toRows(
          riskScoreHistory,
        );
    }
  }


  // ==================================================
  // SEARCH HISTORY
  // ==================================================

  protected search():
    void {

    const records =
      riskScoreHistory
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
      createRiskScoreHistoryFilters();


    this.results =
      this.toRows(
        riskScoreHistory,
      );


    this.hasSearched =
      false;
  }


  // ==================================================
  // FILTER
  // ==================================================

  private matchesFilters(
    record:
      RiskScoreHistoryRecord,
  ): boolean {

    const matchesNumber =
      (
        actual:
          number,

        filter:
          string,
      ): boolean => {

        if (
          !filter.trim()
        ) {
          return true;
        }


        const value =
          Number(
            filter,
          );


        if (
          Number.isNaN(
            value,
          )
        ) {

          return true;
        }


        return (
          actual === value
        );
      };


    if (
      !matchesNumber(
        record.lowFrom,
        this.filters.lowFrom,
      )
    ) {

      return false;
    }


    if (
      !matchesNumber(
        record.lowTo,
        this.filters.lowTo,
      )
    ) {

      return false;
    }


    if (
      !matchesNumber(
        record.mediumFrom,
        this.filters.mediumFrom,
      )
    ) {

      return false;
    }


    if (
      !matchesNumber(
        record.mediumTo,
        this.filters.mediumTo,
      )
    ) {

      return false;
    }


    if (
      !matchesNumber(
        record.highFrom,
        this.filters.highFrom,
      )
    ) {

      return false;
    }


    if (
      !matchesNumber(
        record.highTo,
        this.filters.highTo,
      )
    ) {

      return false;
    }


    if (
      this.filters.status !==
        'all' &&
      record.status !==
        this.filters.status
    ) {

      return false;
    }


    return true;
  }


  // ==================================================
  // TABLE
  // ==================================================

  private toRows(
    records:
      RiskScoreHistoryRecord[],
  ): RiskScoreHistoryTableRow[] {

    return records.map(
      (
        record,
        index,
      ) => ({

        ...record,

        slNo:
          index + 1,

        lowRange:
          `${record.lowFrom} - ${record.lowTo}`,

        mediumRange:
          `${record.mediumFrom} - ${record.mediumTo}`,

        mediumHighRange:
          `${record.mediumHighFrom} - ${record.mediumHighTo}`,

        highRange:
          `${record.highFrom} - ${record.highTo}`,

        statusLabel:
          record.status ===
            'active'
            ? 'Active'
            : 'InActive',

        createdOnLabel:
          this.formatDateTime(
            record.createdAt,
          ),
      }),
    );
  }


  // ==================================================
  // DATE
  // ==================================================

  protected formatDateTime(
    value:
      string,
  ): string {

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