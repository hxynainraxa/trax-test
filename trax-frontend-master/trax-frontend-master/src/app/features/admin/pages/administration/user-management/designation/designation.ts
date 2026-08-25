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
  createDefaultDesignationForm,
  createDefaultDesignationSearchFilters,
  DesignationDepartmentOption,
  DesignationForm,
  DesignationRecord,
  DesignationSearchFilters,
  initialDesignationRecords,
} from './designation-data';


// ==================================================
// TAB
// ==================================================

type DesignationTab =
  | 'add'
  | 'edit'
  | 'search';


// ==================================================
// DEPARTMENT STORAGE RECORD
//
// Matches the Department component storage.
// ==================================================

interface StoredDepartment {
  id: number;

  code: string;

  name: string;

  description?: string;
}


// ==================================================
// TOAST
// ==================================================

interface DesignationToast {
  type:
    | 'success'
    | 'error';

  message:
    string;
}


// ==================================================
// TABLE ROW
// ==================================================

interface DesignationTableRow
  extends DesignationRecord {

  slNo:
    number;

  createdOnLabel:
    string;

  modifiedOnLabel:
    string;
}


@Component({
  selector:
    'app-designation',

  standalone:
    true,

  imports: [
    CommonModule,
    FormsModule,
    LucideDynamicIcon,
    SharedTableComponent,
  ],

  templateUrl:
    './designation.html',

  styleUrl:
    './designation.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class Designation
  extends BasePage
  implements OnDestroy
{

  // ==================================================
  // STORAGE
  // ==================================================

  private readonly storageKey =
    'traxDesignations';

  private readonly departmentStorageKey =
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
  // ACTIVE TAB
  // ==================================================

  protected readonly activeTab =
    signal<DesignationTab>(
      'add',
    );


  // ==================================================
  // DEPARTMENTS
  // ==================================================

  protected readonly departments =
    signal<
      DesignationDepartmentOption[]
    >(
      this.loadDepartments(),
    );


  // ==================================================
  // DESIGNATIONS
  // ==================================================

  protected readonly records =
    signal<DesignationRecord[]>(
      this.loadRecords(),
    );


  // ==================================================
  // ADD FORM
  // ==================================================

  protected addForm:
    DesignationForm =
      createDefaultDesignationForm();


  // ==================================================
  // EDIT FORM
  // ==================================================

  protected selectedDesignationId:
    number | null =
      null;


  protected editForm:
    DesignationForm =
      createDefaultDesignationForm();


  // ==================================================
  // SEARCH
  // ==================================================

  protected searchFilters:
    DesignationSearchFilters =
      createDefaultDesignationSearchFilters();


  protected results:
    DesignationTableRow[] =
      [];


  protected hasSearched =
    false;


  // ==================================================
  // DESIGNATION OPTIONS
  // ==================================================

  protected readonly designationOptions =
    computed(
      () =>
        this.records()
          .map(
            designation => ({
              value:
                designation.id,

              label:
                designation.code,
            }),
          ),
    );


  // ==================================================
  // TOAST
  // ==================================================

  protected readonly toast =
    signal<
      DesignationToast | null
    >(
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
      DesignationTableRow
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
          'code',

        header:
          'Designation Code',

        width:
          '16%',

        sortable:
          true,
      },

      {
        key:
          'name',

        header:
          'Designation Name',

        width:
          '20%',

        sortable:
          true,
      },

      {
        key:
          'departmentName',

        header:
          'Department',

        width:
          '20%',

        sortable:
          true,
      },

      {
        key:
          'description',

        header:
          'Description',

        width:
          '24%',
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
      DesignationTab,
  ): void {

    this.activeTab.set(
      tab,
    );


    /*
     * Reload departments every time
     * a tab is opened.
     *
     * Therefore departments created on
     * Department screen are always fresh.
     */
    this.departments.set(
      this.loadDepartments(),
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


    const departmentCode =
      this.addForm
        .departmentCode
        .trim();


    if (
      !code
    ) {

      this.showToast(
        'error',
        'Designation Code is required.',
      );

      return;
    }


    if (
      !name
    ) {

      this.showToast(
        'error',
        'Designation Name is required.',
      );

      return;
    }


    if (
      !departmentCode
    ) {

      this.showToast(
        'error',
        'Department is required.',
      );

      return;
    }


    // ==================================================
    // DUPLICATE CODE
    // ==================================================

    const duplicate =
      this.records()
        .some(
          designation =>
            designation.code
              .toLowerCase() ===
            code.toLowerCase(),
        );


    if (
      duplicate
    ) {

      this.showToast(
        'error',
        'Designation Code already exists.',
      );

      return;
    }


    // ==================================================
    // DEPARTMENT
    // ==================================================

    const department =
      this.departments()
        .find(
          item =>
            item.value ===
              departmentCode,
        );


    if (
      !department
    ) {

      this.showToast(
        'error',
        'Selected Department could not be found.',
      );

      return;
    }


    // ==================================================
    // NEXT ID
    // ==================================================

    const current =
      this.records();


    const nextId =
      current.length
        ? Math.max(
            ...current.map(
              item =>
                item.id,
            ),
          ) + 1
        : 1;


    const record:
      DesignationRecord = {

      id:
        nextId,

      code:
        code.toUpperCase(),

      name,

      departmentCode,

      departmentName:
        department.label,

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
      'Designation has been created successfully.',
    );


    this.clearAdd();
  }


  // ==================================================
  // CLEAR ADD
  // ==================================================

  protected clearAdd():
    void {

    this.addForm =
      createDefaultDesignationForm();
  }


  // ==================================================
  // SELECT DESIGNATION
  // ==================================================

  protected onDesignationSelected(
    id:
      number | null,
  ): void {

    this.selectedDesignationId =
      id;


    if (
      id === null
    ) {

      this.editForm =
        createDefaultDesignationForm();

      return;
    }


    const designation =
      this.records()
        .find(
          item =>
            item.id === id,
        );


    if (
      !designation
    ) {

      this.editForm =
        createDefaultDesignationForm();

      return;
    }


    this.editForm = {

      code:
        designation.code,

      name:
        designation.name,

      departmentCode:
        designation.departmentCode,

      description:
        designation.description,
    };
  }


  // ==================================================
  // UPDATE
  // ==================================================

  protected update():
    void {

    if (
      this.selectedDesignationId ===
      null
    ) {

      this.showToast(
        'error',
        'Select a Designation Code before updating.',
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


    const departmentCode =
      this.editForm
        .departmentCode
        .trim();


    if (
      !code ||
      !name ||
      !departmentCode
    ) {

      this.showToast(
        'error',
        'Designation Code, Designation Name and Department are required.',
      );

      return;
    }


    const duplicate =
      this.records()
        .some(
          designation =>
            designation.id !==
              this.selectedDesignationId &&
            designation.code
              .toLowerCase() ===
              code.toLowerCase(),
        );


    if (
      duplicate
    ) {

      this.showToast(
        'error',
        'Another designation already uses this Designation Code.',
      );

      return;
    }


    const department =
      this.departments()
        .find(
          item =>
            item.value ===
              departmentCode,
        );


    if (
      !department
    ) {

      this.showToast(
        'error',
        'Selected Department could not be found.',
      );

      return;
    }


    const updated =
      this.records()
        .map(
          designation => {

            if (
              designation.id !==
              this.selectedDesignationId
            ) {

              return designation;
            }


            return {

              ...designation,

              /*
               * Keep code fixed to the
               * selected designation.
               */
              code:
                designation.code,

              name,

              departmentCode,

              departmentName:
                department.label,

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
      'Designation has been updated successfully.',
    );


    this.clearEdit();
  }


  // ==================================================
  // DELETE
  // ==================================================

  protected deleteDesignation():
    void {

    if (
      this.selectedDesignationId ===
      null
    ) {

      this.showToast(
        'error',
        'Select a Designation Code before deleting.',
      );

      return;
    }


    const designation =
      this.records()
        .find(
          item =>
            item.id ===
              this.selectedDesignationId,
        );


    if (
      !designation
    ) {

      this.showToast(
        'error',
        'Selected designation could not be found.',
      );

      return;
    }


    const updated =
      this.records()
        .filter(
          item =>
            item.id !==
              this.selectedDesignationId,
        );


    this.records.set(
      updated,
    );


    this.persist(
      updated,
    );


    this.showToast(
      'success',
      `${designation.name} has been deleted successfully.`,
    );


    this.clearEdit();
  }


  // ==================================================
  // CLEAR EDIT
  // ==================================================

  protected clearEdit():
    void {

    this.selectedDesignationId =
      null;


    this.editForm =
      createDefaultDesignationForm();
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


    const departmentCode =
      this.searchFilters
        .departmentCode;


    const records =
      this.records()
        .filter(
          designation => {

            if (
              code &&
              !designation.code
                .toLowerCase()
                .includes(
                  code,
                )
            ) {

              return false;
            }


            if (
              name &&
              !designation.name
                .toLowerCase()
                .includes(
                  name,
                )
            ) {

              return false;
            }


            if (
              departmentCode !==
                'all' &&
              designation.departmentCode !==
                departmentCode
            ) {

              return false;
            }


            if (
              description &&
              !designation.description
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
      createDefaultDesignationSearchFilters();


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
      DesignationRecord[],
  ): DesignationTableRow[] {

    return records.map(
      (
        designation,
        index,
      ) => ({

        ...designation,

        slNo:
          index + 1,

        createdOnLabel:
          this.formatDateTime(
            designation.createdAt,
          ),

        modifiedOnLabel:
          designation.modifiedAt
            ? this.formatDateTime(
                designation.modifiedAt,
              )
            : '—',
      }),
    );
  }


  // ==================================================
  // DATE
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
  // LOAD DEPARTMENTS
  //
  // Reads departments created in Department screen.
  // ==================================================

  private loadDepartments():
    DesignationDepartmentOption[] {

    const fallback:
      DesignationDepartmentOption[] = [

        {
          value:
            'AML',

          label:
            'AML DEPARTMENT',
        },

        {
          value:
            'CMP',

          label:
            'COMPLIANCE DEPARTMENT',
        },

        {
          value:
            'OPS',

          label:
            'OPERATIONS DEPARTMENT',
        },

      ];


    if (
      typeof localStorage ===
      'undefined'
    ) {

      return fallback;
    }


    try {

      const stored =
        localStorage.getItem(
          this.departmentStorageKey,
        );


      if (
        !stored
      ) {

        return fallback;
      }


      const departments =
        JSON.parse(
          stored,
        ) as StoredDepartment[];


      if (
        !Array.isArray(
          departments,
        ) ||
        departments.length === 0
      ) {

        return fallback;
      }


      return departments.map(
        department => ({

          value:
            department.code,

          label:
            department.name,
        }),
      );

    } catch {

      return fallback;
    }
  }


  // ==================================================
  // STORAGE
  // ==================================================

  private persist(
    records:
      DesignationRecord[],
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
    DesignationRecord[] {

    if (
      typeof localStorage ===
      'undefined'
    ) {

      return initialDesignationRecords
        .map(
          item => ({
            ...item,
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

        return initialDesignationRecords
          .map(
            item => ({
              ...item,
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

        return initialDesignationRecords
          .map(
            item => ({
              ...item,
            }),
          );
      }


      return parsed;

    } catch {

      return initialDesignationRecords
        .map(
          item => ({
            ...item,
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