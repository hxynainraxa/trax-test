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
  ListStoreService,
} from '../list-store.service';

import {
  additionalIdTypeOptions,
  countryOptions,
  EntryPersonType,
  EntryToListRecord,
  nationalityOptions,
  relationshipOptions,
  requestTypeOptions,
} from '../entry-to-list/entry-to-list-data';

import {
  EntryToListStoreService,
} from '../entry-to-list/entry-to-list-store.service';


// ==================================================
// APPROVE SEARCH FORM
// ==================================================

interface EntryApproveFilters {
  type:
    EntryPersonType;

  listId:
    number
    | 'all';

  unifiedNo:
    string;

  name:
    string;

  dob:
    string;

  placeOfBirth:
    string;

  address:
    string;

  country:
    string;

  nationality:
    string;

  iemsNo:
    string;

  accountNumber:
    string;

  requestType:
    string;

  passportIdDetails:
    string;

  designation:
    string;

  additionalIdNo:
    string;

  additionalIdType:
    string;

  lowQualityAka:
    string;

  goodQualityAka:
    string;

  mobileNo:
    string;

  relationship:
    string;

  remark:
    string;
}


// ==================================================
// TABLE ROW
// ==================================================

interface EntryApproveTableRow
  extends EntryToListRecord {

  slNo:
    number;

  typeLabel:
    string;

  statusLabel:
    string;

  createdBy:
    string;

  createdOn:
    string;

  modifiedBy:
    string;

  modifiedOn:
    string;
}


@Component({
  selector:
    'app-entry-to-list-approve',

  standalone:
    true,

  imports: [
    CommonModule,
    FormsModule,
    LucideDynamicIcon,
    SharedTableComponent,
  ],

  templateUrl:
    './entry-to-list-approve.html',

  styleUrl:
    './entry-to-list-approve.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class EntryToListApprove
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

  protected readonly countries =
    countryOptions;

  protected readonly nationalities =
    nationalityOptions;

  protected readonly requestTypes =
    requestTypeOptions;

  protected readonly relationships =
    relationshipOptions;

  protected readonly additionalIdTypes =
    additionalIdTypeOptions;


  // ==================================================
  // LIVE LIST OPTIONS
  //
  // Any list created from List Management
  // automatically becomes available here.
  // ==================================================

  protected readonly listOptions =
    computed(
      () =>
        this.listStore
          .listOptions(),
    );


  // ==================================================
  // FILTERS
  // ==================================================

  protected filters:
    EntryApproveFilters =
      this.createDefaultFilters();


  // ==================================================
  // RESULTS
  // ==================================================

  protected results:
    EntryApproveTableRow[] = [];


  protected hasSearched =
    false;


  // ==================================================
  // TABLE
  // ==================================================

  protected readonly columns:
    SharedTableColumn<
      EntryApproveTableRow
    >[] = [

      {
        key:
          'slNo',

        header:
          'Sl No.',

        width:
          '5%',
      },


      {
        key:
          'unifiedNo',

        header:
          'Unified No.',

        width:
          '10%',

        sortable:
          true,
      },


      {
        key:
          'listCode',

        header:
          'List',

        width:
          '6%',

        sortable:
          true,
      },


      {
        key:
          'name',

        header:
          'Name',

        width:
          '13%',

        sortable:
          true,
      },


      {
        key:
          'dob',

        header:
          'DOB',

        width:
          '9%',
      },


      {
        key:
          'address',

        header:
          'Address',

        width:
          '13%',
      },


      {
        key:
          'country',

        header:
          'Country',

        width:
          '7%',
      },


      {
        key:
          'nationality',

        header:
          'Nationality',

        width:
          '8%',
      },


      {
        key:
          'mobileNo',

        header:
          'Mobile No.',

        width:
          '10%',
      },


      {
        key:
          'passportIdDetails',

        header:
          'Passport/ID',

        width:
          '10%',
      },


      {
        key:
          'createdBy',

        header:
          'Created By',

        width:
          '8%',
      },


      {
        key:
          'createdOn',

        header:
          'Created On',

        width:
          '11%',
      },

    ];


  // ==================================================
  // CONSTRUCTOR
  // ==================================================

  constructor(
    private readonly listStore:
      ListStoreService,

    private readonly entryStore:
      EntryToListStoreService,
  ) {
    super();
  }


  // ==================================================
  // SEARCH
  // ==================================================

  protected onSearch():
    void {

    const matched =
      this.entryStore.search(
        record =>
          this.matchesFilters(
            record,
          ),
      );


    this.results =
      matched.map(
        (
          record,
          index,
        ) => ({

          ...record,

          slNo:
            index + 1,

          typeLabel:
            record.type ===
              'corporate'
              ? 'Corporate'
              : 'Individual',

          statusLabel:
            record.active
              ? 'Active'
              : 'Inactive',

          /*
           * Temporary UI values.
           * Replace with API user data later.
           */
          createdBy:
            'Admin',

          createdOn:
            this.formatDateTime(
              record.createdAt,
            ),

          modifiedBy:
            record.updatedAt !==
              record.createdAt
              ? 'Admin'
              : '—',

          modifiedOn:
            record.updatedAt !==
              record.createdAt
              ? this.formatDateTime(
                  record.updatedAt,
                )
              : '—',
        }),
      );


    this.hasSearched =
      true;
  }


  // ==================================================
  // RESET
  // ==================================================

  protected onReset():
    void {

    this.filters =
      this.createDefaultFilters();


    this.results =
      [];


    this.hasSearched =
      false;
  }


  // ==================================================
  // MATCH SEARCH FILTERS
  // ==================================================

  private matchesFilters(
    record:
      EntryToListRecord,
  ): boolean {

    const contains =
      (
        source:
          string,

        value:
          string,
      ): boolean => {

        const query =
          value
            .trim()
            .toLowerCase();


        if (!query) {
          return true;
        }


        return (
          source ?? ''
        )
          .toLowerCase()
          .includes(
            query,
          );
      };


    // ==================================================
    // TYPE
    // ==================================================

    if (
      this.filters.type !==
        'all' &&
      record.type !==
        this.filters.type
    ) {
      return false;
    }


    // ==================================================
    // LIST
    // ==================================================

    if (
      this.filters.listId !==
        'all' &&
      record.listId !==
        this.filters.listId
    ) {
      return false;
    }


    // ==================================================
    // BASIC TEXT
    // ==================================================

    if (
      !contains(
        record.unifiedNo,
        this.filters.unifiedNo,
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
      !contains(
        record.placeOfBirth,
        this.filters.placeOfBirth,
      )
    ) {
      return false;
    }


    if (
      !contains(
        record.address,
        this.filters.address,
      )
    ) {
      return false;
    }


    if (
      !contains(
        record.iemsNo,
        this.filters.iemsNo,
      )
    ) {
      return false;
    }


    if (
      !contains(
        record.accountNumber,
        this.filters.accountNumber,
      )
    ) {
      return false;
    }


    if (
      !contains(
        record.passportIdDetails,
        this.filters.passportIdDetails,
      )
    ) {
      return false;
    }


    if (
      !contains(
        record.designation,
        this.filters.designation,
      )
    ) {
      return false;
    }


    if (
      !contains(
        record.additionalIdNo,
        this.filters.additionalIdNo,
      )
    ) {
      return false;
    }


    if (
      !contains(
        record.lowQualityAka,
        this.filters.lowQualityAka,
      )
    ) {
      return false;
    }


    if (
      !contains(
        record.goodQualityAka,
        this.filters.goodQualityAka,
      )
    ) {
      return false;
    }


    if (
      !contains(
        record.mobileNo,
        this.filters.mobileNo,
      )
    ) {
      return false;
    }


    if (
      !contains(
        record.remark,
        this.filters.remark,
      )
    ) {
      return false;
    }


    // ==================================================
    // DOB
    // ==================================================

    if (
      this.filters.dob &&
      record.dob !==
        this.filters.dob
    ) {
      return false;
    }


    // ==================================================
    // COUNTRY
    // ==================================================

    if (
      this.filters.country &&
      record.country !==
        this.filters.country
    ) {
      return false;
    }


    // ==================================================
    // NATIONALITY
    // ==================================================

    if (
      this.filters.nationality &&
      record.nationality !==
        this.filters.nationality
    ) {
      return false;
    }


    // ==================================================
    // REQUEST TYPE
    // ==================================================

    if (
      this.filters.requestType !==
        'all' &&
      record.requestType !==
        this.filters.requestType
    ) {
      return false;
    }


    // ==================================================
    // ADDITIONAL ID TYPE
    // ==================================================

    if (
      this.filters.additionalIdType &&
      record.additionalIdType !==
        this.filters.additionalIdType
    ) {
      return false;
    }


    // ==================================================
    // RELATIONSHIP
    // ==================================================

    if (
      this.filters.relationship &&
      record.relationship !==
        this.filters.relationship
    ) {
      return false;
    }


    return true;
  }


  // ==================================================
  // DEFAULT FILTERS
  // ==================================================

  private createDefaultFilters():
    EntryApproveFilters {

    return {

      type:
        'all',

      listId:
        'all',

      unifiedNo:
        '',

      name:
        '',

      dob:
        '',

      placeOfBirth:
        '',

      address:
        '',

      country:
        '',

      nationality:
        '',

      iemsNo:
        '',

      accountNumber:
        '',

      requestType:
        'all',

      passportIdDetails:
        '',

      designation:
        '',

      additionalIdNo:
        '',

      additionalIdType:
        '',

      lowQualityAka:
        '',

      goodQualityAka:
        '',

      mobileNo:
        '',

      relationship:
        '',

      remark:
        '',
    };
  }


  // ==================================================
  // DATE FORMAT
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