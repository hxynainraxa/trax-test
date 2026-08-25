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
  LucideTrash2,
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
  createDefaultDepartmentForm,
  createDefaultDepartmentSearchFilters,
  DepartmentForm,
  DepartmentRecord,
  DepartmentSearchFilters,
  initialDepartmentRecords,
} from './department-data';


// ==================================================
// TAB
// ==================================================

type DepartmentTab =
  | 'add'
  | 'edit'
  | 'search';


// ==================================================
// TOAST
// ==================================================

interface DepartmentToast {
  type:
    | 'success'
    | 'error';

  message:
    string;
}


// ==================================================
// TABLE ROW
// ==================================================

interface DepartmentTableRow
  extends DepartmentRecord {

  slNo:
    number;

  createdOnLabel:
    string;

  modifiedOnLabel:
    string;
}


@Component({
  selector:
    'app-department',

  standalone:
    true,

  imports: [
    CommonModule,
    FormsModule,
    LucideDynamicIcon,
    SharedTableComponent,
  ],

  templateUrl:
    './department.html',

  styleUrl:
    './department.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class Department
  extends BasePage
  implements OnDestroy
{

  // ==================================================
  // STORAGE
  // ==================================================

  private readonly storageKey =
    'traxDepartments';


  // ==================================================
  // ICONS
  // ==================================================

  protected readonly saveIcon =
    LucideSave;

  protected readonly searchIcon =
    LucideSearch;

  protected readonly resetIcon =
    LucideRotateCcw;

  protected readonly deleteIcon =
    LucideTrash2;

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
    signal<DepartmentTab>(
      'add',
    );


  // ==================================================
  // RECORDS
  // ==================================================

  protected readonly records =
    signal<DepartmentRecord[]>(
      this.loadRecords(),
    );


  // ==================================================
  // ADD FORM
  // ==================================================

  protected addForm:
    DepartmentForm =
      createDefaultDepartmentForm();


  // ==================================================
  // EDIT
  // ==================================================

  protected selectedDepartmentId:
    number | null =
      null;


  protected editForm:
    DepartmentForm =
      createDefaultDepartmentForm();


  // ==================================================
  // DROPDOWN
  // ==================================================

  protected readonly departmentOptions =
    computed(
      () =>
        this.records()
          .map(
            department => ({
              value:
                department.id,

              label:
                `${department.code} - ${department.name}`,
            }),
          ),
    );


  // ==================================================
  // SEARCH
  // ==================================================

  protected searchFilters:
    DepartmentSearchFilters =
      createDefaultDepartmentSearchFilters();


  protected results:
    DepartmentTableRow[] =
      [];


  protected hasSearched =
    false;


  // ==================================================
  // TOAST
  // ==================================================

  protected readonly toast =
    signal<DepartmentToast | null>(
      null,
    );


  private toastTimer:
    ReturnType<
      typeof setTimeout
    > | null =
      null;


  // ==================================================
  // TABLE COLUMNS
  // ==================================================

  protected readonly columns:
    SharedTableColumn<
      DepartmentTableRow
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
          'code',

        header:
          'Department Code',

        width:
          '18%',

        sortable:
          true,
      },

      {
        key:
          'name',

        header:
          'Department Name',

        width:
          '25%',

        sortable:
          true,
      },

      {
        key:
          'description',

        header:
          'Description',

        width:
          '28%',
      },

      {
        key:
          'createdBy',

        header:
          'Created By',

        width:
          '11%',
      },

      {
        key:
          'createdOnLabel',

        header:
          'Created On',

        width:
          '16%',
      },

      {
        key:
          'modifiedBy',

        header:
          'Modified By',

        width:
          '11%',
      },

      {
        key:
          'modifiedOnLabel',

        header:
          'Modified On',

        width:
          '16%',
      },

    ];


  constructor() {
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
      DepartmentTab,
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

      this.clearAdd();
    }


    if (
      tab === 'edit'
    ) {

      this.clearEdit();
    }


    if (
      tab === 'search'
    ) {

      this.resetSearch();
    }
  }


  // ==================================================
  // SAVE
  // ==================================================

  protected save():
    void {

    const code =
      this.addForm
        .code
        .trim();


    const name =
      this.addForm
        .name
        .trim();


    if (
      !code
    ) {

      this.showToast(
        'error',
        'Department Code is required.',
      );

      return;
    }


    if (
      !name
    ) {

      this.showToast(
        'error',
        'Department Name is required.',
      );

      return;
    }


    const duplicateCode =
      this.records()
        .some(
          department =>
            department.code
              .toLowerCase() ===
            code.toLowerCase(),
        );


    if (
      duplicateCode
    ) {

      this.showToast(
        'error',
        'Department Code already exists.',
      );

      return;
    }


    const current =
      this.records();


    const nextId =
      current.length
        ? Math.max(
            ...current.map(
              department =>
                department.id,
            ),
          ) + 1
        : 1;


    const record:
      DepartmentRecord = {

      id:
        nextId,

      code:
        code.toUpperCase(),

      name,

      description:
        this.addForm
          .description
          .trim(),

      createdBy:
        'Admin',

      createdAt:
        new Date()
          .toISOString(),

      modifiedBy:
        '',

      modifiedAt:
        '',
    };


    const updated = [
      ...current,
      record,
    ];


    this.records.set(
      updated,
    );


    this.persist(
      updated,
    );


    this.showToast(
      'success',
      'Department has been created successfully.',
    );


    this.clearAdd();
  }


  // ==================================================
  // CLEAR ADD
  // ==================================================

  protected clearAdd():
    void {

    this.addForm =
      createDefaultDepartmentForm();
  }


  // ==================================================
  // SELECT EDIT DEPARTMENT
  // ==================================================

  protected onDepartmentSelected(
    value:
      number | null,
  ): void {

    this.selectedDepartmentId =
      value;


    if (
      value === null
    ) {

      this.editForm =
        createDefaultDepartmentForm();

      return;
    }


    const department =
      this.records()
        .find(
          item =>
            item.id === value,
        );


    if (
      !department
    ) {

      this.editForm =
        createDefaultDepartmentForm();

      return;
    }


    this.editForm = {

      code:
        department.code,

      name:
        department.name,

      description:
        department.description,
    };
  }


  // ==================================================
  // UPDATE
  // ==================================================

  protected update():
    void {

    if (
      this.selectedDepartmentId ===
      null
    ) {

      this.showToast(
        'error',
        'Select a department before updating.',
      );

      return;
    }


    const code =
      this.editForm
        .code
        .trim();


    const name =
      this.editForm
        .name
        .trim();


    if (
      !code ||
      !name
    ) {

      this.showToast(
        'error',
        'Department Code and Department Name are required.',
      );

      return;
    }


    const duplicate =
      this.records()
        .some(
          department =>
            department.id !==
              this.selectedDepartmentId &&
            department.code
              .toLowerCase() ===
              code.toLowerCase(),
        );


    if (
      duplicate
    ) {

      this.showToast(
        'error',
        'Another department already uses this Department Code.',
      );

      return;
    }


    const updated =
      this.records()
        .map(
          department => {

            if (
              department.id !==
              this.selectedDepartmentId
            ) {

              return department;
            }


            return {

              ...department,

              code:
                code.toUpperCase(),

              name,

              description:
                this.editForm
                  .description
                  .trim(),

              modifiedBy:
                'Admin',

              modifiedAt:
                new Date()
                  .toISOString(),
            };
          },
        );


    this.records.set(
      updated,
    );


    this.persist(
      updated,
    );


    this.showToast(
      'success',
      'Department has been updated successfully.',
    );


    this.clearEdit();
  }


  // ==================================================
  // DELETE
  // ==================================================

  protected deleteDepartment():
    void {

    if (
      this.selectedDepartmentId ===
      null
    ) {

      this.showToast(
        'error',
        'Select a department before deleting.',
      );

      return;
    }


    const department =
      this.records()
        .find(
          item =>
            item.id ===
              this.selectedDepartmentId,
        );


    if (
      !department
    ) {

      this.showToast(
        'error',
        'Selected department could not be found.',
      );

      return;
    }


    const updated =
      this.records()
        .filter(
          item =>
            item.id !==
              this.selectedDepartmentId,
        );


    this.records.set(
      updated,
    );


    this.persist(
      updated,
    );


    this.showToast(
      'success',
      `${department.name} has been deleted successfully.`,
    );


    this.clearEdit();
  }


  // ==================================================
  // CLEAR EDIT
  // ==================================================

  protected clearEdit():
    void {

    this.selectedDepartmentId =
      null;


    this.editForm =
      createDefaultDepartmentForm();
  }


  // ==================================================
  // SEARCH
  // ==================================================

  protected search():
    void {

    const code =
      this.searchFilters
        .code
        .trim()
        .toLowerCase();


    const name =
      this.searchFilters
        .name
        .trim()
        .toLowerCase();


    const description =
      this.searchFilters
        .description
        .trim()
        .toLowerCase();


    const matching =
      this.records()
        .filter(
          department => {

            if (
              code &&
              !department.code
                .toLowerCase()
                .includes(
                  code,
                )
            ) {

              return false;
            }


            if (
              name &&
              !department.name
                .toLowerCase()
                .includes(
                  name,
                )
            ) {

              return false;
            }


            if (
              description &&
              !department.description
                .toLowerCase()
                .includes(
                  description,
                )
            ) {

              return false;
            }


            return true;
          },
        );


    this.results =
      this.toRows(
        matching,
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
      createDefaultDepartmentSearchFilters();


    this.results =
      [];


    this.hasSearched =
      false;
  }


  // ==================================================
  // TABLE ROW
  // ==================================================

  private toRows(
    records:
      DepartmentRecord[],
  ): DepartmentTableRow[] {

    return records.map(
      (
        department,
        index,
      ) => ({

        ...department,

        slNo:
          index + 1,

        createdOnLabel:
          this.formatDateTime(
            department.createdAt,
          ),

        modifiedOnLabel:
          department.modifiedAt
            ? this.formatDateTime(
                department.modifiedAt,
              )
            : '—',
      }),
    );
  }


  // ==================================================
  // FORMAT DATE
  // ==================================================

  private formatDateTime(
    value:
      string,
  ): string {

    if (
      !value
    ) {

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
  // STORAGE
  // ==================================================

  private persist(
    records:
      DepartmentRecord[],
  ): void {

    if (
      typeof localStorage ===
      'undefined'
    ) {

      return;
    }


    localStorage.setItem(
      this.storageKey,
      JSON.stringify(
        records,
      ),
    );
  }


  private loadRecords():
    DepartmentRecord[] {

    if (
      typeof localStorage ===
      'undefined'
    ) {

      return initialDepartmentRecords
        .map(
          department => ({
            ...department,
          }),
        );
    }


    try {

      const stored =
        localStorage.getItem(
          this.storageKey,
        );


      if (
        !stored
      ) {

        return initialDepartmentRecords
          .map(
            department => ({
              ...department,
            }),
          );
      }


      const parsed =
        JSON.parse(
          stored,
        );


      if (
        !Array.isArray(
          parsed,
        )
      ) {

        return initialDepartmentRecords
          .map(
            department => ({
              ...department,
            }),
          );
      }


      return parsed;

    } catch {

      return initialDepartmentRecords
        .map(
          department => ({
            ...department,
          }),
        );
    }
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