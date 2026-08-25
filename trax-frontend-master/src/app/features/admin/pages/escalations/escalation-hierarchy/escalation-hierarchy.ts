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
  createEscalationHierarchySearchFilters,
  EscalationHierarchyOption,
  EscalationHierarchyRecord,
  EscalationHierarchySearchFilters,
  escalationDepartmentOptions,
  escalationModuleOptions,
  initialEscalationHierarchyRecords,
} from './escalation-hierarchy-data';


// ==================================================
// TAB
// ==================================================

type EscalationHierarchyTab =
  | 'add'
  | 'search';


// ==================================================
// TOAST
// ==================================================

interface EscalationToast {
  type:
    | 'success'
    | 'error';

  message: string;
}


// ==================================================
// TABLE ROW
// ==================================================

interface EscalationHierarchyTableRow
  extends EscalationHierarchyRecord {

  slNo: number;

  departmentLabel: string;

  moduleLabel: string;

  createdOnLabel: string;
}


@Component({
  selector: 'app-escalation-hierarchy',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    LucideDynamicIcon,
    SharedTableComponent,
  ],

  templateUrl:
    './escalation-hierarchy.html',

  styleUrl:
    './escalation-hierarchy.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class EscalationHierarchy
  extends BasePage
  implements OnDestroy
{

  // ==================================================
  // STORAGE
  // ==================================================

  private readonly storageKey =
    'traxEscalationHierarchy';


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
  // OPTIONS
  // ==================================================

  protected readonly departments =
    escalationDepartmentOptions;

  protected readonly modules =
    escalationModuleOptions;


  // ==================================================
  // ACTIVE TAB
  // ==================================================

  protected readonly activeTab =
    signal<EscalationHierarchyTab>(
      'add',
    );


  // ==================================================
  // ADD FORM
  // ==================================================

  protected addForm = {
    department:
      'aml-department',

    module:
      '',
  };


  // ==================================================
  // SEARCH
  // ==================================================

  protected searchFilters:
    EscalationHierarchySearchFilters =
      createEscalationHierarchySearchFilters();


  protected results:
    EscalationHierarchyTableRow[] =
      [];


  protected hasSearched =
    false;


  // ==================================================
  // RECORDS
  // ==================================================

  protected readonly records =
    signal<
      EscalationHierarchyRecord[]
    >(
      this.loadRecords(),
    );


  // ==================================================
  // TOAST
  // ==================================================

  protected readonly toast =
    signal<
      EscalationToast | null
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
      EscalationHierarchyTableRow
    >[] = [

      {
        key: 'slNo',
        header: 'Sl.No',
        width: '8%',
      },

      {
        key: 'departmentLabel',
        header: 'Department',
        width: '30%',
        sortable: true,
      },

      {
        key: 'moduleLabel',
        header: 'Module',
        width: '30%',
        sortable: true,
      },

      {
        key: 'createdBy',
        header: 'Created By',
        width: '14%',
      },

      {
        key: 'createdOnLabel',
        header: 'Created On',
        width: '18%',
        sortable: true,
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
      EscalationHierarchyTab,
  ): void {

    this.activeTab.set(
      tab,
    );


    this.hasSearched =
      false;


    this.results =
      [];


    if (
      tab === 'add'
    ) {

      this.clearAdd();
    }


    if (
      tab === 'search'
    ) {

      this.clearSearch();
    }
  }


  // ==================================================
  // SAVE
  // ==================================================

  protected save():
    void {

    if (
      !this.addForm.department
    ) {

      this.showToast(
        'error',
        'Department is required.',
      );

      return;
    }


    if (
      !this.addForm.module
    ) {

      this.showToast(
        'error',
        'Module is required.',
      );

      return;
    }


    const duplicate =
      this.records()
        .some(
          record =>
            record.department ===
              this.addForm.department &&
            record.module ===
              this.addForm.module,
        );


    if (
      duplicate
    ) {

      this.showToast(
        'error',
        'This escalation hierarchy already exists.',
      );

      return;
    }


    const currentRecords =
      this.records();


    const nextId =
      currentRecords.length
        ? Math.max(
            ...currentRecords.map(
              item =>
                item.id,
            ),
          ) + 1
        : 1;


    const record:
      EscalationHierarchyRecord = {

      id:
        nextId,

      department:
        this.addForm.department,

      module:
        this.addForm.module,

      createdBy:
        'Admin',

      createdAt:
        new Date()
          .toISOString(),
    };


    const updated = [
      ...currentRecords,
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
      'Escalation hierarchy has been saved successfully.',
    );


    this.clearAdd();
  }


  // ==================================================
  // DELETE
  //
  // Removes selected department/module hierarchy.
  // ==================================================

  protected deleteHierarchy():
    void {

    if (
      !this.addForm.department ||
      !this.addForm.module
    ) {

      this.showToast(
        'error',
        'Select Department and Module before deleting.',
      );

      return;
    }


    const existing =
      this.records()
        .find(
          record =>
            record.department ===
              this.addForm.department &&
            record.module ===
              this.addForm.module,
        );


    if (
      !existing
    ) {

      this.showToast(
        'error',
        'No matching escalation hierarchy was found.',
      );

      return;
    }


    const updated =
      this.records()
        .filter(
          record =>
            record.id !==
              existing.id,
        );


    this.records.set(
      updated,
    );


    this.persist(
      updated,
    );


    this.showToast(
      'success',
      'Escalation hierarchy has been deleted successfully.',
    );


    this.clearAdd();
  }


  // ==================================================
  // CLEAR ADD
  // ==================================================

  protected clearAdd():
    void {

    this.addForm = {
      department:
        'aml-department',

      module:
        '',
    };
  }


  // ==================================================
  // SEARCH
  // ==================================================

  protected search():
    void {

    if (
      !this.searchFilters.department
    ) {

      this.showToast(
        'error',
        'Department is required.',
      );

      return;
    }


    if (
      !this.searchFilters.module
    ) {

      this.showToast(
        'error',
        'Module is required.',
      );

      return;
    }


    const records =
      this.records()
        .filter(
          record =>
            record.department ===
              this.searchFilters.department &&
            record.module ===
              this.searchFilters.module,
        );


    this.results =
      this.toRows(
        records,
      );


    this.hasSearched =
      true;
  }


  // ==================================================
  // CLEAR SEARCH
  // ==================================================

  protected clearSearch():
    void {

    this.searchFilters =
      createEscalationHierarchySearchFilters();


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
      EscalationHierarchyRecord[],
  ): EscalationHierarchyTableRow[] {

    return records.map(
      (
        record,
        index,
      ) => ({

        ...record,

        slNo:
          index + 1,

        departmentLabel:
          this.getOptionLabel(
            escalationDepartmentOptions,
            record.department,
          ),

        moduleLabel:
          this.getOptionLabel(
            escalationModuleOptions,
            record.module,
          ),

        createdOnLabel:
          this.formatDateTime(
            record.createdAt,
          ),
      }),
    );
  }


  // ==================================================
  // OPTION LABEL
  // ==================================================

  private getOptionLabel(
    options:
      EscalationHierarchyOption[],

    value:
      string,
  ): string {

    return (
      options.find(
        option =>
          option.value === value,
      )?.label ??
      value
    );
  }


  // ==================================================
  // DATE
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


  // ==================================================
  // STORAGE
  // ==================================================

  private persist(
    records:
      EscalationHierarchyRecord[],
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
    EscalationHierarchyRecord[] {

    if (
      typeof localStorage ===
      'undefined'
    ) {

      return initialEscalationHierarchyRecords
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


      if (!stored) {

        return initialEscalationHierarchyRecords
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


      return Array.isArray(
        parsed,
      )
        ? parsed
        : initialEscalationHierarchyRecords;

    } catch {

      return initialEscalationHierarchyRecords
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