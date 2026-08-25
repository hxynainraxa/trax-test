import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  computed,
  signal,
} from '@angular/core';

import {
  CommonModule,
} from '@angular/common';

import {
  FormsModule,
} from '@angular/forms';

import {
  LucideCheckCircle2,
  LucideDynamicIcon,
  LucideRotateCcw,
  LucideSave,
  LucideSearch,
  LucideTriangleAlert,
  LucideX,
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
  EntryStatus,
  EntryToListRecord,
  nationalityOptions,
  relationshipOptions,
  requestTypeOptions,
} from './entry-to-list-data';

import {
  EntryToListStoreService,
} from './entry-to-list-store.service';


// ==================================================
// TAB
// ==================================================

type EntryTab =
  | 'add'
  | 'edit'
  | 'search';


// ==================================================
// REQUIRED FIELD
// ==================================================

type RequiredField =
  | 'list'
  | 'name'
  | 'country'
  | 'nationality'
  | 'relationship';


// ==================================================
// FORM
// ==================================================

interface EntryForm {
  type:
    EntryPersonType;

  listId:
    number
    | 'all'
    | null;

  unifiedNo: string;

  membershipNo: string;

  name: string;

  dob: string;

  placeOfBirth: string;

  address: string;

  country: string;

  nationality: string;

  iemsNo: string;

  accountNumber: string;

  requestType: string;

  passportIdDetails: string;

  designation: string;

  additionalIdNo: string;

  additionalIdType: string;

  lowQualityAka: string;

  goodQualityAka: string;

  mobileNo: string;

  relationship: string;

  remark: string;

  active: boolean;

  blacklistFileName: string;

  fromDate: string;

  toDate: string;

  status:
    EntryStatus;
}


// ==================================================
// TABLE ROW
// ==================================================

interface EntryTableRow
  extends EntryToListRecord {

  slNo: number;

  statusLabel: string;

  typeLabel: string;
}


// ==================================================
// TOAST
// ==================================================

interface ToastState {
  type:
    | 'success'
    | 'error';

  message: string;
}


@Component({
  selector:
    'app-entry-to-list',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    LucideDynamicIcon,
    SharedTableComponent,
  ],

  templateUrl:
    './entry-to-list.html',

  styleUrl:
    './entry-to-list.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class EntryToList
  extends BasePage
  implements OnDestroy
{

  // ==================================================
  // ICONS
  // ==================================================

  protected readonly saveIcon =
    LucideSave;

  protected readonly searchIcon =
    LucideSearch;

  protected readonly resetIcon =
    LucideRotateCcw;

  protected readonly successIcon =
    LucideCheckCircle2;

  protected readonly errorIcon =
    LucideTriangleAlert;

  protected readonly closeIcon =
    LucideX;


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
  // Lists created in List component
  // automatically appear here.
  // ==================================================

  protected readonly listOptions =
    computed(
      () =>
        this.listStore
          .listOptions(),
    );


  // ==================================================
  // TAB
  // ==================================================

  protected readonly activeTab =
    signal<EntryTab>(
      'add',
    );


  // ==================================================
  // FORM
  // ==================================================

  protected form =
    this.createAddForm();


  // ==================================================
  // VALIDATION
  // ==================================================

  protected readonly fieldErrors =
    signal<
      Partial<
        Record<
          RequiredField,
          string
        >
      >
    >({});


  // ==================================================
  // RESULTS
  // ==================================================

  protected results:
    EntryTableRow[] = [];


  protected hasSearched =
    false;


  // ==================================================
  // EDIT
  // ==================================================

  protected editingId:
    number | null = null;


  // ==================================================
  // TOAST
  // ==================================================

  protected readonly toast =
    signal<
      ToastState | null
    >(
      null,
    );


  private toastTimer:
    ReturnType<
      typeof setTimeout
    > | null = null;


  // ==================================================
  // TABLE
  // ==================================================

  protected readonly columns:
    SharedTableColumn<
      EntryTableRow
    >[] = [

      {
        key: 'slNo',
        header: 'Sl.No',
        width: '6%',
      },

      {
        key: 'name',
        header: 'Name',
        width: '18%',
        sortable: true,
      },

      {
        key: 'listCode',
        header: 'List',
        width: '8%',
        sortable: true,
      },

      {
        key: 'typeLabel',
        header: 'Type',
        width: '10%',
        sortable: true,
      },

      {
        key: 'unifiedNo',
        header: 'Unified No.',
        width: '14%',
        sortable: true,
      },

      {
        key: 'membershipNo',
        header: 'Membership No.',
        width: '14%',
        sortable: true,
      },

      {
        key: 'country',
        header: 'Country',
        width: '8%',
      },

      {
        key: 'statusLabel',
        header: 'Status',
        width: '9%',
      },

      {
        key: 'updatedAt',
        header: 'Updated',
        width: '13%',
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
  // DESTROY
  // ==================================================

  ngOnDestroy(): void {

    if (
      this.toastTimer
    ) {
      clearTimeout(
        this.toastTimer,
      );
    }
  }


  // ==================================================
  // TAB
  // ==================================================

  protected setTab(
    tab:
      EntryTab,
  ): void {

    this.activeTab.set(
      tab,
    );


    this.fieldErrors.set(
      {},
    );


    this.results =
      [];


    this.hasSearched =
      false;


    this.editingId =
      null;


    this.form =
      tab === 'add'
        ? this.createAddForm()
        : this.createSearchForm();
  }


  // ==================================================
  // FIELD ERROR
  // ==================================================

  protected getFieldError(
    field:
      RequiredField,
  ): string {

    return (
      this.fieldErrors()[
        field
      ] ??
      ''
    );
  }


  // ==================================================
  // CLEAR ERROR
  // ==================================================

  protected clearFieldError(
    field:
      RequiredField,
  ): void {

    this.fieldErrors.update(
      current => {

        if (
          !current[field]
        ) {
          return current;
        }


        const next = {
          ...current,
        };


        delete next[field];


        return next;
      },
    );
  }


  // ==================================================
  // SAVE
  // ==================================================

  protected save():
    void {

    if (
      !this.validateRequiredFields()
    ) {

      this.showToast(
        'error',

        'List, Name, Country, Nationality and Relationship are required.',
      );

      return;
    }


    const selectedList =
      this.listOptions()
        .find(
          item =>
            item.value ===
            this.form.listId,
        );


    if (!selectedList) {

      this.showToast(
        'error',

        'Selected list could not be found.',
      );

      return;
    }


    this.entryStore.add({

      type:
        this.form.type ===
        'corporate'
          ? 'corporate'
          : 'individual',

      listId:
        selectedList.value,

      listCode:
        selectedList.code,

      listName:
        selectedList.label,

      unifiedNo:
        this.form.unifiedNo.trim(),

      membershipNo:
        this.form.membershipNo.trim(),

      name:
        this.form.name.trim(),

      dob:
        this.form.dob,

      placeOfBirth:
        this.form.placeOfBirth.trim(),

      address:
        this.form.address.trim(),

      country:
        this.form.country,

      nationality:
        this.form.nationality,

      iemsNo:
        this.form.iemsNo.trim(),

      accountNumber:
        this.form.accountNumber.trim(),

      requestType:
        this.form.requestType,

      passportIdDetails:
        this.form.passportIdDetails.trim(),

      designation:
        this.form.designation.trim(),

      additionalIdNo:
        this.form.additionalIdNo.trim(),

      additionalIdType:
        this.form.additionalIdType,

      lowQualityAka:
        this.form.lowQualityAka.trim(),

      goodQualityAka:
        this.form.goodQualityAka.trim(),

      mobileNo:
        this.form.mobileNo.trim(),

      relationship:
        this.form.relationship,

      remark:
        this.form.remark.trim(),

      active:
        this.form.active,

      blacklistFileName:
        this.form.blacklistFileName,
    });


    this.showToast(
      'success',

      'Entry has been created successfully.',
    );


    this.form =
      this.createAddForm();


    this.fieldErrors.set(
      {},
    );
  }


  // ==================================================
  // SEARCH
  // ==================================================

  protected search():
    void {

    this.fieldErrors.set(
      {},
    );


    const records =
      this.entryStore.search(
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


    // ================================================
    // EDIT:
    // LOAD EXACT RESULT
    // ================================================

    if (
      this.activeTab() ===
        'edit' &&
      records.length === 1
    ) {

      this.loadForEdit(
        records[0],
      );
    }
  }


  // ==================================================
  // UPDATE
  // ==================================================

  protected update():
    void {

    if (
      this.editingId ===
      null
    ) {

      this.showToast(
        'error',

        'Search for an entry before updating.',
      );

      return;
    }


    if (
      !this.validateRequiredFields()
    ) {

      this.showToast(
        'error',

        'List, Name, Country, Nationality and Relationship are required.',
      );

      return;
    }


    const selectedList =
      typeof this.form.listId ===
        'number'
        ? this.listOptions()
            .find(
              item =>
                item.value ===
                this.form.listId,
            )
        : null;


    if (!selectedList) {

      this.showToast(
        'error',

        'Selected list could not be found.',
      );

      return;
    }


    const success =
      this.entryStore.update(
        this.editingId,

        {
          type:
            this.form.type ===
            'corporate'
              ? 'corporate'
              : 'individual',

          listId:
            selectedList.value,

          listCode:
            selectedList.code,

          listName:
            selectedList.label,

          unifiedNo:
            this.form.unifiedNo.trim(),

          membershipNo:
            this.form.membershipNo.trim(),

          name:
            this.form.name.trim(),

          dob:
            this.form.dob,

          placeOfBirth:
            this.form.placeOfBirth.trim(),

          address:
            this.form.address.trim(),

          country:
            this.form.country,

          nationality:
            this.form.nationality,

          iemsNo:
            this.form.iemsNo.trim(),

          accountNumber:
            this.form.accountNumber.trim(),

          requestType:
            this.form.requestType,

          passportIdDetails:
            this.form.passportIdDetails.trim(),

          designation:
            this.form.designation.trim(),

          additionalIdNo:
            this.form.additionalIdNo.trim(),

          additionalIdType:
            this.form.additionalIdType,

          lowQualityAka:
            this.form.lowQualityAka.trim(),

          goodQualityAka:
            this.form.goodQualityAka.trim(),

          mobileNo:
            this.form.mobileNo.trim(),

          relationship:
            this.form.relationship,

          remark:
            this.form.remark.trim(),

          active:
            this.form.active,
        },
      );


    if (!success) {

      this.showToast(
        'error',

        'Entry could not be updated.',
      );

      return;
    }


    this.showToast(
      'success',

      'Entry has been updated successfully.',
    );


    this.editingId =
      null;


    this.form =
      this.createSearchForm();


    this.results =
      [];


    this.hasSearched =
      false;


    this.fieldErrors.set(
      {},
    );
  }


  // ==================================================
  // REQUIRED VALIDATION
  //
  // Used only during Save / Update.
  // Search remains optional.
  // ==================================================

  private validateRequiredFields():
    boolean {

    const errors:
      Partial<
        Record<
          RequiredField,
          string
        >
      > = {};


    // LIST
    if (
      this.form.listId ===
        null ||
      this.form.listId ===
        'all'
    ) {

      errors.list =
        'List is required.';
    }


    // NAME
    if (
      !this.form.name.trim()
    ) {

      errors.name =
        'Name is required.';
    }


    // COUNTRY
    if (
      !this.form.country
    ) {

      errors.country =
        'Country is required.';
    }


    // NATIONALITY
    if (
      !this.form.nationality
    ) {

      errors.nationality =
        'Nationality is required.';
    }


    // RELATIONSHIP
    if (
      !this.form.relationship
    ) {

      errors.relationship =
        'Relationship is required.';
    }


    this.fieldErrors.set(
      errors,
    );


    return (
      Object.keys(
        errors,
      ).length === 0
    );
  }


  // ==================================================
  // RESET
  // ==================================================

  protected reset():
    void {

    this.editingId =
      null;


    this.results =
      [];


    this.hasSearched =
      false;


    this.fieldErrors.set(
      {},
    );


    this.form =
      this.activeTab() ===
        'add'
        ? this.createAddForm()
        : this.createSearchForm();
  }


  // ==================================================
  // FILE
  // ==================================================

  protected onFileSelected(
    event: Event,
  ): void {

    const input =
      event.target as
        HTMLInputElement;


    const file =
      input.files?.[0];


    this.form.blacklistFileName =
      file?.name ??
      '';
  }


  // ==================================================
  // LOAD EDIT
  // ==================================================

  private loadForEdit(
    record:
      EntryToListRecord,
  ): void {

    this.editingId =
      record.id;


    this.fieldErrors.set(
      {},
    );


    this.form = {

      type:
        record.type,

      listId:
        record.listId,

      unifiedNo:
        record.unifiedNo,

      membershipNo:
        record.membershipNo,

      name:
        record.name,

      dob:
        record.dob,

      placeOfBirth:
        record.placeOfBirth,

      address:
        record.address,

      country:
        record.country,

      nationality:
        record.nationality,

      iemsNo:
        record.iemsNo,

      accountNumber:
        record.accountNumber,

      requestType:
        record.requestType,

      passportIdDetails:
        record.passportIdDetails,

      designation:
        record.designation,

      additionalIdNo:
        record.additionalIdNo,

      additionalIdType:
        record.additionalIdType,

      lowQualityAka:
        record.lowQualityAka,

      goodQualityAka:
        record.goodQualityAka,

      mobileNo:
        record.mobileNo,

      relationship:
        record.relationship,

      remark:
        record.remark,

      active:
        record.active,

      blacklistFileName:
        record.blacklistFileName,

      fromDate:
        '',

      toDate:
        '',

      status:
        record.active
          ? 'active'
          : 'inactive',
    };
  }


  // ==================================================
  // SEARCH MATCHING
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
      ) => {

        if (
          !value.trim()
        ) {
          return true;
        }


        return source
          .toLowerCase()
          .includes(
            value
              .trim()
              .toLowerCase(),
          );
      };


    // TYPE
    if (
      this.form.type !==
        'all' &&
      record.type !==
        this.form.type
    ) {
      return false;
    }


    // LIST
    if (
      this.form.listId !==
        'all' &&
      this.form.listId !==
        null &&
      record.listId !==
        this.form.listId
    ) {
      return false;
    }


    // TEXT FIELDS
    if (
      !contains(
        record.unifiedNo,
        this.form.unifiedNo,
      ) ||

      !contains(
        record.membershipNo,
        this.form.membershipNo,
      ) ||

      !contains(
        record.name,
        this.form.name,
      ) ||

      !contains(
        record.iemsNo,
        this.form.iemsNo,
      ) ||

      !contains(
        record.accountNumber,
        this.form.accountNumber,
      ) ||

      !contains(
        record.passportIdDetails,
        this.form.passportIdDetails,
      ) ||

      !contains(
        record.designation,
        this.form.designation,
      ) ||

      !contains(
        record.additionalIdNo,
        this.form.additionalIdNo,
      ) ||

      !contains(
        record.lowQualityAka,
        this.form.lowQualityAka,
      ) ||

      !contains(
        record.goodQualityAka,
        this.form.goodQualityAka,
      ) ||

      !contains(
        record.mobileNo,
        this.form.mobileNo,
      ) ||

      !contains(
        record.remark,
        this.form.remark,
      )
    ) {
      return false;
    }


    // DOB
    if (
      this.form.dob &&
      record.dob !==
        this.form.dob
    ) {
      return false;
    }


    // COUNTRY
    if (
      this.form.country &&
      record.country !==
        this.form.country
    ) {
      return false;
    }


    // NATIONALITY
    if (
      this.form.nationality &&
      record.nationality !==
        this.form.nationality
    ) {
      return false;
    }


    // REQUEST TYPE
    if (
      this.form.requestType !==
        'all' &&
      record.requestType !==
        this.form.requestType
    ) {
      return false;
    }


    // RELATIONSHIP
    if (
      this.form.relationship &&
      record.relationship !==
        this.form.relationship
    ) {
      return false;
    }


    // STATUS
    if (
      this.form.status ===
        'active' &&
      !record.active
    ) {
      return false;
    }


    if (
      this.form.status ===
        'inactive' &&
      record.active
    ) {
      return false;
    }


    // FROM
    if (
      this.form.fromDate &&
      record.createdAt
        .slice(
          0,
          10,
        ) <
        this.form.fromDate
    ) {
      return false;
    }


    // TO
    if (
      this.form.toDate &&
      record.createdAt
        .slice(
          0,
          10,
        ) >
        this.form.toDate
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
      EntryToListRecord[],
  ): EntryTableRow[] {

    return records.map(
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
      }),
    );
  }


  // ==================================================
  // ADD FORM
  // ==================================================

  private createAddForm():
    EntryForm {

    return {

      type:
        'individual',

      listId:
        null,

      unifiedNo:
        '',

      membershipNo:
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

      active:
        true,

      blacklistFileName:
        '',

      fromDate:
        '',

      toDate:
        '',

      status:
        'active',
    };
  }


  // ==================================================
  // SEARCH FORM
  // ==================================================

  private createSearchForm():
    EntryForm {

    return {

      ...this.createAddForm(),

      type:
        'all',

      listId:
        'all',

      status:
        'all',

      relationship:
        '',

      active:
        true,
    };
  }


  // ==================================================
  // TOAST
  // ==================================================

  private showToast(
    type:
      'success'
      | 'error',

    message:
      string,
  ): void {

    if (
      this.toastTimer
    ) {
      clearTimeout(
        this.toastTimer,
      );
    }


    this.toast.set({
      type,
      message,
    });


    this.toastTimer =
      setTimeout(
        () => {

          this.toast.set(
            null,
          );


          this.toastTimer =
            null;

        },
        5000,
      );
  }


  // ==================================================
  // CLOSE TOAST
  // ==================================================

  protected closeToast():
    void {

    if (
      this.toastTimer
    ) {

      clearTimeout(
        this.toastTimer,
      );


      this.toastTimer =
        null;
    }


    this.toast.set(
      null,
    );
  }
}