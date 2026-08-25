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
  LucideArrowLeft,
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
  SharedTablePageEvent,
} from '@shared/interfaces/shared-table.types';

import {
  BlacklistEntry,
  createDefaultScreeningFilters,
  listOptions,
  matchingStyleOptions,
  mockScreeningResponse,
  ScreeningFilters,
  statusOptions,
} from './screening-data';


@Component({
  selector: 'app-screening',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    LucideDynamicIcon,
    SharedTableComponent,
  ],

  templateUrl:
    './screening.html',

  styleUrl:
    './screening.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class Screening
  extends BasePage
{
  // ==================================================
  // ICONS
  // ==================================================

  protected readonly searchIcon =
    LucideSearch;

  protected readonly resetIcon =
    LucideRotateCcw;

  protected readonly backIcon =
    LucideArrowLeft;


  // ==================================================
  // OPTIONS
  // ==================================================

  protected readonly statusOptions =
    statusOptions;

  protected readonly listOptions =
    listOptions;

  protected readonly matchingStyleOptions =
    matchingStyleOptions;


  // ==================================================
  // VIEW STATE
  // ==================================================

  protected hasSearched =
    false;


  // ==================================================
  // FILTERS
  // ==================================================

  protected filters:
    ScreeningFilters =
      createDefaultScreeningFilters();


  // ==================================================
  // RESULTS
  // ==================================================

  protected results:
    BlacklistEntry[] = [];

  protected total = 0;

  protected page = 1;

  protected limit = 10;


  // ==================================================
  // TABLE COLUMNS
  // ==================================================

  protected readonly tableColumns:
    SharedTableColumn<BlacklistEntry>[] = [

      {
        key: 'name',
        header: 'Name',
        width: '22%',
        sortable: true,
      },

      {
        key: 'listLabel',
        header: 'List',
        width: '25%',
        sortable: true,
      },

      {
        key: 'status',
        header: 'Status',
        width: '9%',
        sortable: true,
      },

      {
        key: 'idNumber',
        header: 'ID Number',
        width: '14%',
        sortable: true,
      },

      {
        key: 'nationality',
        header: 'Nationality',
        width: '11%',
        sortable: true,
      },

      {
        key: 'dob',
        header: 'DOB',
        width: '12%',
        sortable: true,
        hideOnMobile: true,
      },

      {
        key: 'matchScore',
        header: 'Match',
        width: '7%',
        sortable: true,

        formatter: value =>
          `${Number(value)}%`,
      },
    ];


  // ==================================================
  // SEARCH
  // ==================================================

  protected onSearch(): void {
    /*
     * Any new search always starts
     * from page 1.
     */
    this.page = 1;

    this.loadResults();

    /*
     * After Search:
     *
     * FILTER UI disappears
     * RESULT UI appears.
     */
    this.hasSearched = true;
  }


  // ==================================================
  // LOAD RESULTS
  // ==================================================

  private loadResults(): void {
    const response =
      mockScreeningResponse(
        this.filters,
        this.page,
        this.limit,
      );

    this.results =
      response.data;

    this.total =
      response.total;
  }


  // ==================================================
  // MODIFY FILTERS
  // ==================================================

  protected showFilters(): void {
    /*
     * IMPORTANT:
     * Filters are NOT cleared.
     *
     * User goes back and sees exactly
     * what they searched with.
     */
    this.hasSearched = false;

    this.page = 1;
  }


  // ==================================================
  // RESET
  // ==================================================

  protected onReset(): void {
    this.filters =
      createDefaultScreeningFilters();

    this.results = [];

    this.total = 0;

    this.page = 1;

    /*
     * Stay on the filter form.
     */
    this.hasSearched = false;
  }


  // ==================================================
  // TABLE PAGINATION
  // ==================================================

  protected onPageChange(
    event: SharedTablePageEvent,
  ): void {
    this.page =
      event.page;

    this.limit =
      event.pageSize;

    this.loadResults();
  }
}