import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
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
  nationalityOptions,
} from '../entry-to-list/entry-to-list-data';

import {
  createDefaultWhiteListAddForm,
  createDefaultWhiteListSearchForm,
  WhiteListForm,
  WhiteListRecord,
} from './white-list-data';

import {
  WhiteListStoreService,
} from './white-list-store.service';


// ==================================================
// TAB
// ==================================================

type WhiteListTab =
  | 'add'
  | 'edit'
  | 'search';


// ==================================================
// REQUIRED FIELD
// ==================================================

type RequiredField =
  | 'name'
  | 'nationality'
  | 'includeFrom'
  | 'includeTo';


// ==================================================
// TABLE ROW
// ==================================================

interface WhiteListTableRow
  extends WhiteListRecord {

  slNo:
    number;

  nameTypeLabel:
    string;

  nationalityLabel:
    string;

  statusLabel:
    string;
}


// ==================================================
// TOAST
// ==================================================

interface ToastState {
  type:
    | 'success'
    | 'error';

  message:
    string;
}


@Component({
  selector:
    'app-white-list',

  standalone:
    true,

  imports: [
    CommonModule,
    FormsModule,
    LucideDynamicIcon,
    SharedTableComponent,
  ],

  templateUrl:
    './white-list.html',

  styleUrl:
    './white-list.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class WhiteList
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

  protected readonly nationalities =
    nationalityOptions;


  // ==================================================
  // TAB
  // ==================================================

  protected readonly activeTab =
    signal<WhiteListTab>(
      'add',
    );


  // ==================================================
  // FORM
  // ==================================================

  protected form:
    WhiteListForm =
      createDefaultWhiteListAddForm();


  // ==================================================
  // EDIT
  // ==================================================

  protected editingId:
    number | null = null;


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
    WhiteListTableRow[] = [];


  protected hasSearched =
    false;


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
  // TABLE COLUMNS
  // ==================================================

  protected readonly columns:
    SharedTableColumn<
      WhiteListTableRow
    >[] = [

      {
        key:
          'slNo',

        header:
          'Sl.No',

        width:
          '7%',
      },


      {
        key:
          'membershipNo',

        header:
          'Membership No.',

        width:
          '16%',

        sortable:
          true,
      },


      {
        key:
          'name',

        header:
          'Name',

        width:
          '20%',

        sortable:
          true,
      },


      {
        key:
          'nameTypeLabel',

        header:
          'Name Type',

        width:
          '13%',

        sortable:
          true,
      },


      {
        key:
          'nationalityLabel',

        header:
          'Nationality',

        width:
          '16%',

        sortable:
          true,
      },


      {
        key:
          'includeFrom',

        header:
          'Include From',

        width:
          '11%',

        sortable:
          true,
      },


      {
        key:
          'includeTo',

        header:
          'Include To',

        width:
          '11%',

        sortable:
          true,
      },


      {
        key:
          'statusLabel',

        header:
          'Status',

        width:
          '6%',
      },

    ];


  // ==================================================
  // CONSTRUCTOR
  // ==================================================

  constructor(
    private readonly whiteListStore:
      WhiteListStoreService,
  ) {
    super();
  }


  // ==================================================
  // DESTROY
  // ==================================================

  ngOnDestroy():
    void {

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
      WhiteListTab,
  ): void {

    this.activeTab.set(
      tab,
    );


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
      tab === 'add'
        ? createDefaultWhiteListAddForm()
        : createDefaultWhiteListSearchForm();
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

        'Name, Nationality, Include From and Include To are required.',
      );

      return;
    }


    if (
      !this.validateDates()
    ) {
      return;
    }


    this.whiteListStore.add({

      nameType:
        this.form.nameType ===
          'corporate'
          ? 'corporate'
          : 'individual',

      membershipNo:
        this.form.membershipNo
          .trim(),

      name:
        this.form.name
          .trim(),

      nationality:
        this.form.nationality,

      includeFrom:
        this.form.includeFrom,

      includeTo:
        this.form.includeTo,

      remarks:
        this.form.remarks
          .trim(),

      active:
        this.form.active,
    });


    this.showToast(
      'success',

      'White list entry has been created successfully.',
    );


    this.form =
      createDefaultWhiteListAddForm();


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
      this.whiteListStore.search(
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


    /*
     * EDIT FLOW:
     *
     * If exactly one record matches,
     * populate the edit form.
     */
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

        'Search for a white list entry before updating.',
      );

      return;
    }


    if (
      !this.validateRequiredFields()
    ) {

      this.showToast(
        'error',

        'Name, Nationality, Include From and Include To are required.',
      );

      return;
    }


    if (
      !this.validateDates()
    ) {
      return;
    }


    const success =
      this.whiteListStore.update(
        this.editingId,

        {
          nameType:
            this.form.nameType ===
              'corporate'
              ? 'corporate'
              : 'individual',

          membershipNo:
            this.form.membershipNo
              .trim(),

          name:
            this.form.name
              .trim(),

          nationality:
            this.form.nationality,

          includeFrom:
            this.form.includeFrom,

          includeTo:
            this.form.includeTo,

          remarks:
            this.form.remarks
              .trim(),

          active:
            this.form.active,
        },
      );


    if (!success) {

      this.showToast(
        'error',

        'White list entry could not be updated.',
      );

      return;
    }


    this.showToast(
      'success',

      'White list entry has been updated successfully.',
    );


    this.editingId =
      null;


    this.form =
      createDefaultWhiteListSearchForm();


    this.results =
      [];


    this.hasSearched =
      false;


    this.fieldErrors.set(
      {},
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
        ? createDefaultWhiteListAddForm()
        : createDefaultWhiteListSearchForm();
  }


  // ==================================================
  // REQUIRED VALIDATION
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


    if (
      !this.form.name.trim()
    ) {

      errors.name =
        'Name is required.';
    }


    if (
      !this.form.nationality
    ) {

      errors.nationality =
        'Nationality is required.';
    }


    if (
      !this.form.includeFrom
    ) {

      errors.includeFrom =
        'Include From is required.';
    }


    if (
      !this.form.includeTo
    ) {

      errors.includeTo =
        'Include To is required.';
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
  // DATE VALIDATION
  // ==================================================

  private validateDates():
    boolean {

    if (
      this.form.includeFrom &&
      this.form.includeTo &&
      this.form.includeTo <
        this.form.includeFrom
    ) {

      this.fieldErrors.update(
        current => ({
          ...current,

          includeTo:
            'Include To must be after Include From.',
        }),
      );


      this.showToast(
        'error',

        'Include To date cannot be earlier than Include From date.',
      );


      return false;
    }


    return true;
  }


  // ==================================================
  // ERROR
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
  // LOAD EDIT
  // ==================================================

  private loadForEdit(
    record:
      WhiteListRecord,
  ): void {

    this.editingId =
      record.id;


    this.form = {

      nameType:
        record.nameType,

      membershipNo:
        record.membershipNo,

      name:
        record.name,

      nationality:
        record.nationality,

      includeFrom:
        record.includeFrom,

      includeTo:
        record.includeTo,

      remarks:
        record.remarks,

      status:
        record.active
          ? 'active'
          : 'inactive',

      active:
        record.active,
    };


    this.fieldErrors.set(
      {},
    );
  }


  // ==================================================
  // FILTER
  // ==================================================

  private matchesFilters(
    record:
      WhiteListRecord,
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


        return source
          .toLowerCase()
          .includes(
            query,
          );
      };


    // NAME TYPE
    if (
      this.form.nameType !==
        'all' &&
      record.nameType !==
        this.form.nameType
    ) {
      return false;
    }


    // MEMBERSHIP
    if (
      !contains(
        record.membershipNo,
        this.form.membershipNo,
      )
    ) {
      return false;
    }


    // NAME
    if (
      !contains(
        record.name,
        this.form.name,
      )
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


    // INCLUDE FROM
    if (
      this.form.includeFrom &&
      record.includeFrom <
        this.form.includeFrom
    ) {
      return false;
    }


    // INCLUDE TO
    if (
      this.form.includeTo &&
      record.includeTo >
        this.form.includeTo
    ) {
      return false;
    }


    // REMARK
    if (
      !contains(
        record.remarks,
        this.form.remarks,
      )
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


    return true;
  }


  // ==================================================
  // TABLE ROWS
  // ==================================================

  private toRows(
    records:
      WhiteListRecord[],
  ): WhiteListTableRow[] {

    return records.map(
      (
        record,
        index,
      ) => {

        const nationality =
          this.nationalities
            .find(
              option =>
                option.code ===
                record.nationality,
            );


        return {

          ...record,

          slNo:
            index + 1,

          nameTypeLabel:
            record.nameType ===
              'corporate'
              ? 'Corporate'
              : 'Individual',

          nationalityLabel:
            nationality?.name ??
            record.nationality,

          statusLabel:
            record.active
              ? 'Active'
              : 'Inactive',
        };
      },
    );
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