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
  createDefaultRoleForm,
  createDefaultRoleSearchFilters,
  initialRoleRecords,
  RoleForm,
  RoleRecord,
  RoleSearchFilters,
} from './role-data';


// ==================================================
// TAB
// ==================================================

type RoleTab =
  | 'add'
  | 'edit'
  | 'search';


// ==================================================
// TOAST
// ==================================================

interface RoleToast {
  type:
    | 'success'
    | 'error';

  message: string;
}


// ==================================================
// TABLE ROW
// ==================================================

interface RoleTableRow
  extends RoleRecord {

  slNo: number;

  createdOnLabel: string;

  modifiedOnLabel: string;
}


@Component({
  selector: 'app-role',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    LucideDynamicIcon,
    SharedTableComponent,
  ],

  templateUrl:
    './role.html',

  styleUrl:
    './role.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class Role
  extends BasePage
  implements OnDestroy
{

  // ==================================================
  // STORAGE
  // ==================================================

  private readonly storageKey =
    'traxRoles';


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
    signal<RoleTab>(
      'add',
    );


  // ==================================================
  // RECORDS
  // ==================================================

  protected readonly records =
    signal<RoleRecord[]>(
      this.loadRecords(),
    );


  // ==================================================
  // ADD
  // ==================================================

  protected addForm:
    RoleForm =
      createDefaultRoleForm();


  // ==================================================
  // EDIT
  // ==================================================

  protected selectedRoleId:
    number | null =
      null;


  protected editForm:
    RoleForm =
      createDefaultRoleForm();


  // ==================================================
  // ROLE OPTIONS
  // ==================================================

  protected readonly roleOptions =
    computed(
      () =>
        this.records()
          .map(
            role => ({
              value:
                role.id,

              label:
                role.role,
            }),
          ),
    );


  // ==================================================
  // SEARCH
  // ==================================================

  protected searchFilters:
    RoleSearchFilters =
      createDefaultRoleSearchFilters();


  protected results:
    RoleTableRow[] = [];


  protected hasSearched =
    false;


  // ==================================================
  // TOAST
  // ==================================================

  protected readonly toast =
    signal<RoleToast | null>(
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
      RoleTableRow
    >[] = [

      {
        key: 'slNo',
        header: 'Sl.No',
        width: '8%',
      },

      {
        key: 'role',
        header: 'Role',
        width: '22%',
        sortable: true,
      },

      {
        key: 'description',
        header: 'Description',
        width: '34%',
      },

      {
        key: 'createdBy',
        header: 'Created By',
        width: '12%',
      },

      {
        key: 'createdOnLabel',
        header: 'Created On',
        width: '16%',
        sortable: true,
      },

      {
        key: 'modifiedBy',
        header: 'Modified By',
        width: '12%',
      },

      {
        key: 'modifiedOnLabel',
        header: 'Modified On',
        width: '16%',
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
  // CHANGE TAB
  // ==================================================

  protected setTab(
    tab: RoleTab,
  ): void {

    this.activeTab.set(
      tab,
    );


    this.results = [];

    this.hasSearched = false;


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

    const roleName =
      this.addForm
        .role
        .trim();


    if (
      !roleName
    ) {

      this.showToast(
        'error',
        'Role is required.',
      );

      return;
    }


    // ==================================================
    // DUPLICATE
    // ==================================================

    const duplicate =
      this.records()
        .some(
          item =>
            item.role
              .toLowerCase() ===
            roleName.toLowerCase(),
        );


    if (
      duplicate
    ) {

      this.showToast(
        'error',
        'Role already exists.',
      );

      return;
    }


    // ==================================================
    // CREATE
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
      RoleRecord = {

      id: nextId,

      role: roleName,

      description:
        this.addForm
          .description
          .trim(),

      createdBy:
        'Admin',

      createdAt:
        new Date()
          .toISOString(),

      modifiedBy: '',

      modifiedAt: '',
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
      'Role has been created successfully.',
    );


    this.clearAdd();
  }


  // ==================================================
  // CLEAR ADD
  // ==================================================

  protected clearAdd():
    void {

    this.addForm =
      createDefaultRoleForm();
  }


  // ==================================================
  // SELECT ROLE FOR EDIT
  // ==================================================

  protected onRoleSelected(
    id:
      number | null,
  ): void {

    this.selectedRoleId =
      id;


    if (
      id === null
    ) {

      this.editForm =
        createDefaultRoleForm();

      return;
    }


    const record =
      this.records()
        .find(
          item =>
            item.id === id,
        );


    if (
      !record
    ) {

      this.editForm =
        createDefaultRoleForm();

      return;
    }


    this.editForm = {

      role:
        record.role,

      description:
        record.description,
    };
  }


  // ==================================================
  // UPDATE
  // ==================================================

  protected update():
    void {

    if (
      this.selectedRoleId ===
      null
    ) {

      this.showToast(
        'error',
        'Select a role before updating.',
      );

      return;
    }


    const roleName =
      this.editForm
        .role
        .trim();


    if (
      !roleName
    ) {

      this.showToast(
        'error',
        'Role is required.',
      );

      return;
    }


    // ==================================================
    // DUPLICATE
    // ==================================================

    const duplicate =
      this.records()
        .some(
          item =>
            item.id !==
              this.selectedRoleId &&
            item.role
              .toLowerCase() ===
              roleName.toLowerCase(),
        );


    if (
      duplicate
    ) {

      this.showToast(
        'error',
        'Another role already uses this name.',
      );

      return;
    }


    // ==================================================
    // UPDATE
    // ==================================================

    const updated =
      this.records()
        .map(
          item => {

            if (
              item.id !==
              this.selectedRoleId
            ) {

              return item;
            }


            return {

              ...item,

              role:
                roleName,

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
      'Role has been updated successfully.',
    );


    this.clearEdit();
  }


  // ==================================================
  // DELETE
  // ==================================================

  protected deleteRole():
    void {

    if (
      this.selectedRoleId ===
      null
    ) {

      this.showToast(
        'error',
        'Select a role before deleting.',
      );

      return;
    }


    const record =
      this.records()
        .find(
          item =>
            item.id ===
              this.selectedRoleId,
        );


    if (
      !record
    ) {

      this.showToast(
        'error',
        'Selected role could not be found.',
      );

      return;
    }


    const updated =
      this.records()
        .filter(
          item =>
            item.id !==
              this.selectedRoleId,
        );


    this.records.set(
      updated,
    );


    this.persist(
      updated,
    );


    this.showToast(
      'success',
      `${record.role} has been deleted successfully.`,
    );


    this.clearEdit();
  }


  // ==================================================
  // CLEAR EDIT
  // ==================================================

  protected clearEdit():
    void {

    this.selectedRoleId =
      null;


    this.editForm =
      createDefaultRoleForm();
  }


  // ==================================================
  // SEARCH
  // ==================================================

  protected search():
    void {

    const role =
      this.searchFilters
        .role
        .trim()
        .toLowerCase();


    const description =
      this.searchFilters
        .description
        .trim()
        .toLowerCase();


    const records =
      this.records()
        .filter(
          item => {

            if (
              role &&
              !item.role
                .toLowerCase()
                .includes(
                  role,
                )
            ) {

              return false;
            }


            if (
              description &&
              !item.description
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
      createDefaultRoleSearchFilters();


    this.results = [];

    this.hasSearched = false;
  }


  // ==================================================
  // TABLE ROWS
  // ==================================================

  private toRows(
    records:
      RoleRecord[],
  ): RoleTableRow[] {

    return records.map(
      (
        record,
        index,
      ) => ({

        ...record,

        slNo:
          index + 1,

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

  private formatDateTime(
    value: string,
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
  // PERSIST
  // ==================================================

  private persist(
    records:
      RoleRecord[],
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


  // ==================================================
  // LOAD
  // ==================================================

  private loadRecords():
    RoleRecord[] {

    if (
      typeof localStorage ===
      'undefined'
    ) {

      return initialRoleRecords
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

        return initialRoleRecords
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

        return initialRoleRecords
          .map(
            item => ({
              ...item,
            }),
          );
      }


      return parsed;

    } catch {

      return initialRoleRecords
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

    message: string,
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