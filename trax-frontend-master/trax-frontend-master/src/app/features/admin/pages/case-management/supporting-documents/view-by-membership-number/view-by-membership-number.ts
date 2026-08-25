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
  createMembershipDocumentFilters,
  MembershipDocumentFilters,
  MembershipDocumentRecord,
  membershipDocumentRecords,
} from './view-by-membership-number-data';


interface MembershipDocumentTableRow
  extends MembershipDocumentRecord {

  slNo: number;

  dateLabel: string;
}


@Component({
  selector:
    'app-view-by-membership-number',

  standalone:
    true,

  imports: [
    CommonModule,
    FormsModule,
    LucideDynamicIcon,
    SharedTableComponent,
  ],

  templateUrl:
    './view-by-membership-number.html',

  styleUrl:
    './view-by-membership-number.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class ViewByMembershipNumber
  extends BasePage
{

  protected readonly searchIcon =
    LucideSearch;

  protected readonly resetIcon =
    LucideRotateCcw;


  protected filters:
    MembershipDocumentFilters =
      createMembershipDocumentFilters();


  protected results:
    MembershipDocumentTableRow[] =
      [];


  protected hasSearched =
    false;


  protected dateError =
    '';


  protected readonly columns:
    SharedTableColumn<
      MembershipDocumentTableRow
    >[] = [

      {
        key: 'slNo',
        header: 'Sl.No',
        width: '5%',
      },

      {
        key: 'membershipNumber',
        header: 'Membership No.',
        width: '14%',
        sortable: true,
      },

      {
        key: 'name',
        header: 'Name',
        width: '18%',
        sortable: true,
      },

      {
        key: 'referenceNumber',
        header: 'Reference No.',
        width: '14%',
        sortable: true,
      },

      {
        key: 'violationType',
        header: 'Violation Type',
        width: '15%',
      },

      {
        key: 'transactionReference',
        header: 'Transaction Ref.',
        width: '16%',
      },

      {
        key: 'branch',
        header: 'Branch',
        width: '12%',
      },

      {
        key: 'documentName',
        header: 'Document',
        width: '16%',
      },

      {
        key: 'dateLabel',
        header: 'Date',
        width: '11%',
      },

      {
        key: 'status',
        header: 'Status',
        width: '10%',
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
      membershipDocumentRecords
        .filter(
          record =>
            this.matchesFilters(
              record,
            ),
        );


    this.results =
      records.map(
        (
          record,
          index,
        ) => ({

          ...record,

          slNo:
            index + 1,

          dateLabel:
            this.formatDate(
              record.date,
            ),
        }),
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
      createMembershipDocumentFilters();


    this.results =
      [];


    this.hasSearched =
      false;


    this.dateError =
      '';
  }


  // ==================================================
  // FILTER
  // ==================================================

  private matchesFilters(
    record:
      MembershipDocumentRecord,
  ): boolean {

    const contains =
      (
        source:
          string,

        filter:
          string,
      ): boolean => {

        if (
          !filter.trim()
        ) {
          return true;
        }


        return source
          .toLowerCase()
          .includes(
            filter
              .trim()
              .toLowerCase(),
          );
      };


    if (
      !contains(
        record.membershipNumber,
        this.filters.membershipNumber,
      )
    ) {
      return false;
    }


    if (
      !contains(
        record.name,
        this.filters.name,
      )
    ) {
      return false;
    }


    if (
      this.filters.fromDate &&
      record.date <
        this.filters.fromDate
    ) {
      return false;
    }


    if (
      this.filters.toDate &&
      record.date >
        this.filters.toDate
    ) {
      return false;
    }


    return true;
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
}