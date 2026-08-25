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
  createNoiseMasterAddForm,
  createNoiseMasterSearchForm,
  NoiseMasterForm,
  NoiseMasterRecord,
} from './noise-master-data';

import {
  NoiseMasterStoreService,
} from './noise-master-store.service';


// ==================================================
// TAB
// ==================================================

type NoiseMasterTab =
  | 'add'
  | 'edit'
  | 'search';


// ==================================================
// REQUIRED FIELD
// ==================================================

type RequiredField =
  | 'noiseCode'
  | 'description';


// ==================================================
// TABLE ROW
// ==================================================

interface NoiseMasterTableRow
  extends NoiseMasterRecord {

  slNo: number;

  statusLabel: string;

  createdDateLabel: string;

  modifiedDateLabel: string;
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
    'app-noise-master',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    LucideDynamicIcon,
    SharedTableComponent,
  ],

  templateUrl:
    './noise-master.html',

  styleUrl:
    './noise-master.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class NoiseMaster
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
  // TAB
  // ==================================================

  protected readonly activeTab =
    signal<NoiseMasterTab>(
      'add',
    );


  // ==================================================
  // FORM
  // ==================================================

  protected form:
    NoiseMasterForm =
      createNoiseMasterAddForm();


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
    NoiseMasterTableRow[] = [];


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
  // TABLE
  // ==================================================

  protected readonly columns:
    SharedTableColumn<
      NoiseMasterTableRow
    >[] = [

      {
        key: 'slNo',

        header: 'Sl.No',

        width: '7%',
      },

      {
        key: 'noiseCode',

        header: 'Noise Code',

        width: '14%',

        sortable: true,
      },

      {
        key: 'description',

        header: 'Description',

        width: '27%',

        sortable: true,
      },

      {
        key: 'statusLabel',

        header: 'Status',

        width: '10%',

        sortable: true,
      },

      {
        key: 'createdBy',

        header: 'Created By',

        width: '10%',

        sortable: true,
      },

      {
        key: 'createdDateLabel',

        header: 'Created Date',

        width: '13%',

        sortable: true,
      },

      {
        key: 'modifiedBy',

        header: 'Modified By',

        width: '9%',
      },

      {
        key: 'modifiedDateLabel',

        header: 'Modified Date',

        width: '10%',
      },

    ];


  // ==================================================
  // CONSTRUCTOR
  // ==================================================

  constructor(
    private readonly noiseStore:
      NoiseMasterStoreService,
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
      NoiseMasterTab,
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
        ? createNoiseMasterAddForm()
        : createNoiseMasterSearchForm();
  }


  // ==================================================
  // SAVE
  // ==================================================

  protected save():
    void {

    if (
      !this.validateRequired()
    ) {

      this.showToast(
        'error',

        'Noise Code and Description are required.',
      );

      return;
    }


    const result =
      this.noiseStore.add({

        noiseCode:
          this.form.noiseCode,

        description:
          this.form.description,

        status:
          this.form.status,
      });


    if (
      !result.success
    ) {

      this.showToast(
        'error',

        result.message,
      );

      return;
    }


    this.showToast(
      'success',

      result.message,
    );


    this.form =
      createNoiseMasterAddForm();


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
      this.noiseStore.search(
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
    // LOAD AUTOMATICALLY IF ONE MATCH
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

        'Search for a Noise Master before updating.',
      );

      return;
    }


    if (
      !this.validateRequired()
    ) {

      this.showToast(
        'error',

        'Noise Code and Description are required.',
      );

      return;
    }


    const result =
      this.noiseStore.update(
        this.editingId,

        {
          noiseCode:
            this.form.noiseCode,

          description:
            this.form.description,

          status:
            this.form.status,
        },
      );


    if (
      !result.success
    ) {

      this.showToast(
        'error',

        result.message,
      );

      return;
    }


    this.showToast(
      'success',

      result.message,
    );


    this.editingId =
      null;


    this.results =
      [];


    this.hasSearched =
      false;


    this.form =
      createNoiseMasterSearchForm();


    this.fieldErrors.set(
      {},
    );
  }


  // ==================================================
  // RESET / CLEAR
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
        ? createNoiseMasterAddForm()
        : createNoiseMasterSearchForm();
  }


  // ==================================================
  // VALIDATION
  // ==================================================

  private validateRequired():
    boolean {

    const errors:
      Partial<
        Record<
          RequiredField,
          string
        >
      > = {};


    if (
      !this.form.noiseCode
        .trim()
    ) {

      errors.noiseCode =
        'Noise Code is required.';
    }


    if (
      !this.form.description
        .trim()
    ) {

      errors.description =
        'Description is required.';
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
  // FIELD ERROR
  // ==================================================

  protected getFieldError(
    field:
      RequiredField,
  ): string {

    return (
      this.fieldErrors()[
        field
      ] ?? ''
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
  // FILTER
  // ==================================================

  private matchesFilters(
    record:
      NoiseMasterRecord,
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


    // NOISE CODE
    if (
      !contains(
        record.noiseCode,
        this.form.noiseCode,
      )
    ) {
      return false;
    }


    // DESCRIPTION
    if (
      !contains(
        record.description,
        this.form.description,
      )
    ) {
      return false;
    }


    // STATUS
    if (
      record.status !==
      this.form.status
    ) {
      return false;
    }


    // CREATED BY
    if (
      !contains(
        record.createdBy,
        this.form.createdBy,
      )
    ) {
      return false;
    }


    // CREATED DATE
    if (
      this.form.createdDate &&
      record.createdAt
        .slice(
          0,
          10,
        ) !==
        this.form.createdDate
    ) {
      return false;
    }


    // MODIFIED BY
    if (
      !contains(
        record.modifiedBy,
        this.form.modifiedBy,
      )
    ) {
      return false;
    }


    // MODIFIED DATE
    if (
      this.form.modifiedDate &&
      record.modifiedAt
        .slice(
          0,
          10,
        ) !==
        this.form.modifiedDate
    ) {
      return false;
    }


    return true;
  }


  // ==================================================
  // LOAD EDIT
  // ==================================================

  private loadForEdit(
    record:
      NoiseMasterRecord,
  ): void {

    this.editingId =
      record.id;


    this.form = {

      noiseCode:
        record.noiseCode,

      description:
        record.description,

      status:
        record.status,

      createdBy:
        record.createdBy,

      createdDate:
        record.createdAt
          ? record.createdAt
              .slice(
                0,
                10,
              )
          : '',

      modifiedBy:
        record.modifiedBy,

      modifiedDate:
        record.modifiedAt
          ? record.modifiedAt
              .slice(
                0,
                10,
              )
          : '',
    };


    this.fieldErrors.set(
      {},
    );
  }


  // ==================================================
  // TABLE ROWS
  // ==================================================

  private toRows(
    records:
      NoiseMasterRecord[],
  ): NoiseMasterTableRow[] {

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

        createdDateLabel:
          this.formatDate(
            record.createdAt,
          ),

        modifiedDateLabel:
          record.modifiedAt
            ? this.formatDate(
                record.modifiedAt,
              )
            : '—',

        modifiedBy:
          record.modifiedBy ||
          '—',
      }),
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