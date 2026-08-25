import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
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
  caseStatusOptions,
  CaseForm,
  CaseRecord,
  CaseSearchFilters,
  createDefaultCaseForm,
  createDefaultCaseSearchFilters,
} from './case-creation-data';

import {
  CaseCreationStoreService,
} from './case-creation-store.service';


// ==================================================
// TAB
// ==================================================

type CaseCreationTab =
  | 'add'
  | 'edit'
  | 'search';


// ==================================================
// TOAST
// ==================================================

interface CaseToast {
  type:
    | 'success'
    | 'error';

  message:
    string;
}


// ==================================================
// TABLE ROW
// ==================================================

interface CaseTableRow
  extends CaseRecord {

  slNo:
    number;

  statusLabel:
    string;

  activePeriod:
    string;

  createdOnLabel:
    string;

  modifiedOnLabel:
    string;
}


@Component({
  selector:
    'app-case-creation',

  standalone:
    true,

  imports: [
    CommonModule,
    FormsModule,
    LucideDynamicIcon,
    SharedTableComponent,
  ],

  templateUrl:
    './case-creation.html',

  styleUrl:
    './case-creation.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class CaseCreation
  extends BasePage
  implements OnDestroy
{

  // ==================================================
  // FILE INPUT
  // ==================================================

  @ViewChild(
    'supportFileInput',
  )
  private supportFileInput?:
    ElementRef<HTMLInputElement>;


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
  // TAB
  // ==================================================

  protected readonly activeTab =
    signal<CaseCreationTab>(
      'add',
    );


  // ==================================================
  // STATUS OPTIONS
  // ==================================================

  protected readonly statusOptions =
    caseStatusOptions;


  // ==================================================
  // ADD FORM
  // ==================================================

  protected addForm:
    CaseForm;


  // ==================================================
  // EDIT FORM
  // ==================================================

  protected editForm:
    CaseForm;


  protected selectedCaseId:
    number | null =
      null;


  // ==================================================
  // SEARCH
  // ==================================================

  protected searchFilters:
    CaseSearchFilters =
      createDefaultCaseSearchFilters();


  protected results:
    CaseTableRow[] = [];


  protected hasSearched =
    false;


  // ==================================================
  // CASE DROPDOWN
  // ==================================================

  protected readonly caseOptions =
    computed(
      () =>
        this.caseStore
          .records()
          .map(
            item => ({
              value:
                item.id,

              label:
                item.caseCode,
            }),
          ),
    );


  // ==================================================
  // TOAST
  // ==================================================

  protected readonly toast =
    signal<CaseToast | null>(
      null,
    );


  private toastTimer:
    ReturnType<
      typeof setTimeout
    > | null =
      null;


  // ==================================================
  // TABLE
  // ==================================================

  protected readonly columns:
    SharedTableColumn<
      CaseTableRow
    >[] = [

      {
        key: 'slNo',
        header: 'Sl.No',
        width: '5%',
      },

      {
        key: 'caseCode',
        header: 'Case Code',
        width: '14%',
        sortable: true,
      },

      {
        key: 'customerName',
        header: 'Customer Name',
        width: '16%',
        sortable: true,
      },

      {
        key: 'customerIdNo',
        header: 'Customer ID No.',
        width: '13%',
      },

      {
        key: 'membershipCard',
        header: 'Membership Card #',
        width: '13%',
        sortable: true,
      },

      {
        key: 'beneficiaryName',
        header: 'Beneficiary',
        width: '14%',
      },

      {
        key: 'transactionLimit',
        header: 'Transaction Limit',
        width: '11%',
      },

      {
        key: 'activePeriod',
        header: 'Active Period',
        width: '16%',
      },

      {
        key: 'statusLabel',
        header: 'Status',
        width: '9%',
        sortable: true,
      },

      {
        key: 'createdBy',
        header: 'Created By',
        width: '10%',
      },

      {
        key: 'createdOnLabel',
        header: 'Created On',
        width: '14%',
      },

    ];


  // ==================================================
  // CONSTRUCTOR
  // ==================================================

constructor(
  protected readonly caseStore:
    CaseCreationStoreService,
) {

    super();


    this.addForm =
      createDefaultCaseForm(
        this.caseStore
          .getNextCaseCode(),
      );


    this.editForm =
      createDefaultCaseForm();
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
      CaseCreationTab,
  ): void {

    this.activeTab.set(
      tab,
    );


    this.results =
      [];


    this.hasSearched =
      false;


    if (
      tab === 'add'
    ) {

      this.resetAddForm();
    }


    if (
      tab === 'edit'
    ) {

      this.resetEditForm();
    }


    if (
      tab === 'search'
    ) {

      this.searchFilters =
        createDefaultCaseSearchFilters();
    }
  }


  // ==================================================
  // FILE
  // ==================================================

  protected onSupportDocumentSelected(
    event:
      Event,
  ): void {

    const input =
      event.target as
        HTMLInputElement;


    const file =
      input.files?.[0];


    this.addForm
      .supportDocumentName =
        file?.name ?? '';
  }


  // ==================================================
  // SAVE
  // ==================================================

  protected save():
    void {

    const created =
      this.caseStore.add(
        this.addForm,
      );


    this.showToast(
      'success',

      `Case ${created.caseCode} has been created successfully.`,
    );


    this.resetAddForm();
  }


  // ==================================================
  // CASE SELECTED FOR EDIT
  // ==================================================

  protected onCaseSelected(
    value:
      number | null,
  ): void {

    this.selectedCaseId =
      value;


    if (
      value === null
    ) {

      this.editForm =
        createDefaultCaseForm();

      return;
    }


    const record =
      this.caseStore
        .findById(
          value,
        );


    if (!record) {

      this.editForm =
        createDefaultCaseForm();

      return;
    }


    this.editForm =
      this.recordToForm(
        record,
      );
  }


  // ==================================================
  // UPDATE
  // ==================================================

  protected update():
    void {

    if (
      this.selectedCaseId ===
      null
    ) {

      this.showToast(
        'error',

        'Select a Case Code before updating.',
      );


      return;
    }


    const caseCode =
      this.editForm
        .caseCode;


    const updated =
      this.caseStore.update(
        this.selectedCaseId,

        this.editForm,
      );


    if (!updated) {

      this.showToast(
        'error',

        'Unable to update the selected case.',
      );


      return;
    }


    this.showToast(
      'success',

      `Case ${caseCode} has been updated successfully.`,
    );


    this.resetEditForm();
  }


  // ==================================================
  // SEARCH
  // ==================================================

  protected search():
    void {

    const records =
      this.caseStore.search(
        record =>
          this.matchesSearch(
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
  // RESET SEARCH
  // ==================================================

  protected resetSearch():
    void {

    this.searchFilters =
      createDefaultCaseSearchFilters();


    this.results =
      [];


    this.hasSearched =
      false;
  }


  // ==================================================
  // RESET ADD
  // ==================================================

  protected resetAddForm():
    void {

    this.addForm =
      createDefaultCaseForm(
        this.caseStore
          .getNextCaseCode(),
      );


    if (
      this.supportFileInput
    ) {

      this.supportFileInput
        .nativeElement
        .value =
          '';
    }
  }


  // ==================================================
  // RESET EDIT
  // ==================================================

  protected resetEditForm():
    void {

    this.selectedCaseId =
      null;


    this.editForm =
      createDefaultCaseForm();
  }


  // ==================================================
  // SEARCH MATCH
  // ==================================================

  private matchesSearch(
    record:
      CaseRecord,
  ): boolean {

    const contains =
      (
        source:
          string,

        value:
          string,
      ): boolean => {

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


    if (
      !contains(
        record.caseCode,
        this.searchFilters.caseCode,
      )
    ) {
      return false;
    }


    if (
      !contains(
        record.membershipCard,
        this.searchFilters.membershipCard,
      )
    ) {
      return false;
    }


    if (
      !contains(
        record.mobileNumber,
        this.searchFilters.mobileNumber,
      )
    ) {
      return false;
    }


    if (
      !contains(
        record.customerName,
        this.searchFilters.customerName,
      )
    ) {
      return false;
    }


    if (
      !contains(
        record.customerIdNo,
        this.searchFilters.customerIdNo,
      )
    ) {
      return false;
    }


    if (
      !contains(
        record.transactionLimit,
        this.searchFilters.transactionLimit,
      )
    ) {
      return false;
    }


    if (
      !contains(
        record.beneficiaryName,
        this.searchFilters.beneficiaryName,
      )
    ) {
      return false;
    }


    if (
      !contains(
        record.beneficiaryIdNo,
        this.searchFilters.beneficiaryIdNo,
      )
    ) {
      return false;
    }


    if (
      !contains(
        record.createdBy,
        this.searchFilters.createdBy,
      )
    ) {
      return false;
    }


    if (
      !contains(
        record.modifiedBy,
        this.searchFilters.modifiedBy,
      )
    ) {
      return false;
    }


    if (
      this.searchFilters.status !==
        'all' &&
      record.status !==
        this.searchFilters.status
    ) {
      return false;
    }


    if (
      this.searchFilters.createdDate &&
      record.createdAt.slice(
        0,
        10,
      ) !==
        this.searchFilters.createdDate
    ) {
      return false;
    }


    if (
      this.searchFilters.modifiedDate
    ) {

      if (
        !record.modifiedAt
      ) {
        return false;
      }


      if (
        record.modifiedAt.slice(
          0,
          10,
        ) !==
          this.searchFilters.modifiedDate
      ) {
        return false;
      }
    }


    return true;
  }


  // ==================================================
  // RECORD TO FORM
  // ==================================================

  private recordToForm(
    record:
      CaseRecord,
  ): CaseForm {

    return {

      caseCode:
        record.caseCode,

      description:
        record.description,

      customerName:
        record.customerName,

      customerIdNo:
        record.customerIdNo,

      membershipCard:
        record.membershipCard,

      mobileNumber:
        record.mobileNumber,

      supportDocumentName:
        record.supportDocumentName,

      supportDocumentComments:
        record.supportDocumentComments,

      beneficiaryName:
        record.beneficiaryName,

      beneficiaryIdNo:
        record.beneficiaryIdNo,

      transactionLimit:
        record.transactionLimit,

      activeFrom:
        record.activeFrom,

      activeTo:
        record.activeTo,

      remark:
        record.remark,

      status:
        record.status,
    };
  }


  // ==================================================
  // TABLE
  // ==================================================

  private toRows(
    records:
      CaseRecord[],
  ): CaseTableRow[] {

    return records.map(
      (
        record,
        index,
      ) => ({

        ...record,

        slNo:
          index + 1,

        statusLabel:
          record.status ===
            'active'
            ? 'Active'
            : 'Inactive',

        activePeriod:
          `${this.formatDate(
            record.activeFrom,
          )} - ${this.formatDate(
            record.activeTo,
          )}`,

        createdOnLabel:
          this.formatDateTime(
            record.createdAt,
          ),

        modifiedOnLabel:
          record.modifiedAt
            ? this.formatDateTime(
                record.modifiedAt,
              )
            : '—',
      }),
    );
  }


  // ==================================================
  // DATE
  // ==================================================

  protected formatDate(
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


  protected formatDateTime(
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