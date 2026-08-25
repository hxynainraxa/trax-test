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
  createDefaultUserForm,
  createDefaultUserSearchFilters,
  initialUserRecords,
  UserForm,
  UserOption,
  UserRecord,
  UserSearchFilters,
  UserStatus,
  userBranchOptions,
  userStatusOptions,
} from './user-data';


// ==================================================
// TAB
// ==================================================

type UserTab =
  | 'add'
  | 'edit'
  | 'search';


// ==================================================
// TOAST
// ==================================================

interface UserToast {
  type:
    | 'success'
    | 'error';

  message: string;
}


// ==================================================
// DEPARTMENT STORAGE MODEL
// ==================================================

interface StoredDepartment {
  id: number;

  code: string;

  name: string;
}


// ==================================================
// DESIGNATION STORAGE MODEL
// ==================================================

interface StoredDesignation {
  id: number;

  code: string;

  name: string;

  departmentCode: string;
}


// ==================================================
// ROLE STORAGE MODEL
// ==================================================

interface StoredRole {
  id: number;

  role: string;
}


// ==================================================
// TABLE ROW
// ==================================================

interface UserTableRow
  extends UserRecord {

  slNo: number;

  fullName: string;

  statusLabel: string;

  branchLabel: string;

  createdOnLabel: string;

  modifiedOnLabel: string;
}


@Component({
  selector: 'app-user',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    LucideDynamicIcon,
    SharedTableComponent,
  ],

  templateUrl: './user.html',

  styleUrl: './user.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class User
  extends BasePage
  implements OnDestroy
{

  // ==================================================
  // STORAGE
  // ==================================================

  private readonly userStorageKey =
    'traxUsers';

  private readonly departmentStorageKey =
    'traxDepartments';

  private readonly designationStorageKey =
    'traxDesignations';

  private readonly roleStorageKey =
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
    signal<UserTab>(
      'add',
    );


  // ==================================================
  // MASTER DATA
  // ==================================================

  protected readonly departments =
    signal<UserOption[]>(
      this.loadDepartments(),
    );


  protected readonly designations =
    signal<
      (
        UserOption & {
          departmentCode: string;
        }
      )[]
    >(
      this.loadDesignations(),
    );


  protected readonly roles =
    signal<UserOption<number>[]>(
      this.loadRoles(),
    );


  protected readonly branches =
    userBranchOptions;


  protected readonly statuses =
    userStatusOptions;


  // ==================================================
  // USERS
  // ==================================================

  protected readonly records =
    signal<UserRecord[]>(
      this.loadUsers(),
    );


  // ==================================================
  // ADD
  // ==================================================

  protected addForm:
    UserForm =
      createDefaultUserForm();


  // ==================================================
  // EDIT
  // ==================================================

  protected selectedUserId:
    number | null =
      null;


  protected editForm:
    UserForm =
      createDefaultUserForm();


  protected readonly userOptions =
    computed(
      () =>
        this.records()
          .map(
            user => ({
              value: user.id,

              label:
                `${user.username} - ${user.firstName} ${user.lastName}`,
            }),
          ),
    );


  // ==================================================
  // SEARCH
  // ==================================================

  protected searchFilters:
    UserSearchFilters =
      createDefaultUserSearchFilters();


  protected results:
    UserTableRow[] = [];


  protected hasSearched =
    false;


  // ==================================================
  // TOAST
  // ==================================================

  protected readonly toast =
    signal<UserToast | null>(
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
      UserTableRow
    >[] = [

      {
        key: 'slNo',
        header: 'Sl.No',
        width: '5%',
      },

      {
        key: 'username',
        header: 'User Name',
        width: '12%',
        sortable: true,
      },

      {
        key: 'fullName',
        header: 'Name',
        width: '15%',
        sortable: true,
      },

      {
        key: 'email',
        header: 'Email',
        width: '17%',
        sortable: true,
      },

      {
        key: 'departmentName',
        header: 'Department',
        width: '15%',
      },

      {
        key: 'designationName',
        header: 'Designation',
        width: '14%',
      },

      {
        key: 'roleName',
        header: 'Role',
        width: '12%',
      },

      {
        key: 'branchLabel',
        header: 'Branch',
        width: '12%',
      },

      {
        key: 'statusLabel',
        header: 'Status',
        width: '12%',
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
        width: '15%',
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
    tab: UserTab,
  ): void {

    this.activeTab.set(
      tab,
    );


    /*
     * Refresh previous Administration
     * master data.
     */
    this.reloadMasterData();


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
  // DESIGNATIONS BY DEPARTMENT
  // ==================================================

  protected designationOptionsFor(
    departmentCode: string,
  ): (
    UserOption & {
      departmentCode: string;
    }
  )[] {

    if (
      !departmentCode ||
      departmentCode === 'all'
    ) {

      return this.designations();
    }


    return this.designations()
      .filter(
        designation =>
          designation.departmentCode ===
          departmentCode,
      );
  }


  // ==================================================
  // DEPARTMENT CHANGED
  // ==================================================

  protected onAddDepartmentChange():
    void {

    this.addForm.designationCode =
      '';
  }


  protected onEditDepartmentChange():
    void {

    this.editForm.designationCode =
      '';
  }


  protected onSearchDepartmentChange():
    void {

    this.searchFilters.designationCode =
      'all';
  }


  // ==================================================
  // SAVE
  // ==================================================

  protected save():
    void {

    const validation =
      this.validateForm(
        this.addForm,
        true,
      );


    if (
      validation
    ) {

      this.showToast(
        'error',
        validation,
      );

      return;
    }


    const username =
      this.addForm
        .username
        .trim();


    const duplicateUsername =
      this.records()
        .some(
          user =>
            user.username
              .toLowerCase() ===
            username.toLowerCase(),
        );


    if (
      duplicateUsername
    ) {

      this.showToast(
        'error',
        'User Name already exists.',
      );

      return;
    }


    const duplicateEmail =
      this.records()
        .some(
          user =>
            user.email
              .toLowerCase() ===
            this.addForm.email
              .trim()
              .toLowerCase(),
        );


    if (
      duplicateEmail
    ) {

      this.showToast(
        'error',
        'Email Id already exists.',
      );

      return;
    }


    const department =
      this.departments()
        .find(
          item =>
            item.value ===
            this.addForm.departmentCode,
        );


    const designation =
      this.designations()
        .find(
          item =>
            item.value ===
            this.addForm.designationCode,
        );


    const role =
      this.roles()
        .find(
          item =>
            item.value ===
            this.addForm.roleId,
        );


    const current =
      this.records();


    const nextId =
      current.length
        ? Math.max(
            ...current.map(
              user =>
                user.id,
            ),
          ) + 1
        : 1;


    const user:
      UserRecord = {

      id: nextId,

      firstName:
        this.addForm.firstName.trim(),

      lastName:
        this.addForm.lastName.trim(),

      username,

      /*
       * Mock frontend only.
       * Backend should handle password securely later.
       */
      password:
        this.addForm.password,

      email:
        this.addForm.email.trim(),

      departmentCode:
        this.addForm.departmentCode,

      departmentName:
        department?.label ?? '',

      designationCode:
        this.addForm.designationCode,

      designationName:
        designation?.label ?? '',

      roleId:
        this.addForm.roleId,

      roleName:
        role?.label ?? '',

      status:
        this.addForm.status,

      branch:
        this.addForm.branch,

      description:
        this.addForm.description.trim(),

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
      user,
    ];


    this.records.set(
      updated,
    );


    this.persistUsers(
      updated,
    );


    this.showToast(
      'success',
      'User has been created successfully.',
    );


    this.clearAdd();
  }


  // ==================================================
  // VALIDATE
  // ==================================================

  private validateForm(
    form: UserForm,
    passwordRequired: boolean,
  ): string | null {

    if (
      !form.firstName.trim()
    ) {

      return 'First Name is required.';
    }


    if (
      !form.lastName.trim()
    ) {

      return 'Last Name is required.';
    }


    if (
      !form.username.trim()
    ) {

      return 'User Name is required.';
    }


    if (
      passwordRequired &&
      !form.password
    ) {

      return 'Password is required.';
    }


    if (
      passwordRequired &&
      form.password !==
        form.confirmPassword
    ) {

      return 'Password and Re type Password must match.';
    }


    if (
      !form.email.trim()
    ) {

      return 'Email Id is required.';
    }


    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (
      !emailPattern.test(
        form.email.trim(),
      )
    ) {

      return 'Enter a valid Email Id.';
    }


    if (
      !form.departmentCode
    ) {

      return 'Department is required.';
    }


    if (
      !form.designationCode
    ) {

      return 'Designation is required.';
    }


    if (
      form.roleId === null
    ) {

      return 'Role is required.';
    }


    if (
      !form.branch
    ) {

      return 'Branch is required.';
    }


    return null;
  }


  // ==================================================
  // CLEAR ADD
  // ==================================================

  protected clearAdd():
    void {

    this.addForm =
      createDefaultUserForm();
  }


  // ==================================================
  // SELECT USER FOR EDIT
  // ==================================================

  protected onUserSelected(
    id: number | null,
  ): void {

    this.selectedUserId =
      id;


    if (
      id === null
    ) {

      this.editForm =
        createDefaultUserForm();

      return;
    }


    const user =
      this.records()
        .find(
          item =>
            item.id === id,
        );


    if (
      !user
    ) {

      this.editForm =
        createDefaultUserForm();

      return;
    }


    this.editForm = {

      firstName:
        user.firstName,

      lastName:
        user.lastName,

      username:
        user.username,

      /*
       * Do not expose existing password
       * in edit UI.
       */
      password: '',

      confirmPassword: '',

      email:
        user.email,

      departmentCode:
        user.departmentCode,

      designationCode:
        user.designationCode,

      roleId:
        user.roleId,

      status:
        user.status,

      branch:
        user.branch,

      description:
        user.description,
    };
  }


  // ==================================================
  // UPDATE
  // ==================================================

  protected update():
    void {

    if (
      this.selectedUserId === null
    ) {

      this.showToast(
        'error',
        'Select a user before updating.',
      );

      return;
    }


    const validation =
      this.validateForm(
        this.editForm,
        false,
      );


    if (
      validation
    ) {

      this.showToast(
        'error',
        validation,
      );

      return;
    }


    if (
      this.editForm.password ||
      this.editForm.confirmPassword
    ) {

      if (
        this.editForm.password !==
        this.editForm.confirmPassword
      ) {

        this.showToast(
          'error',
          'Password and Re type Password must match.',
        );

        return;
      }
    }


    const duplicateUsername =
      this.records()
        .some(
          user =>
            user.id !==
              this.selectedUserId &&
            user.username
              .toLowerCase() ===
              this.editForm.username
                .trim()
                .toLowerCase(),
        );


    if (
      duplicateUsername
    ) {

      this.showToast(
        'error',
        'Another user already uses this User Name.',
      );

      return;
    }


    const department =
      this.departments()
        .find(
          item =>
            item.value ===
            this.editForm.departmentCode,
        );


    const designation =
      this.designations()
        .find(
          item =>
            item.value ===
            this.editForm.designationCode,
        );


    const role =
      this.roles()
        .find(
          item =>
            item.value ===
            this.editForm.roleId,
        );


    const updated =
      this.records()
        .map(
          user => {

            if (
              user.id !==
              this.selectedUserId
            ) {

              return user;
            }


            return {

              ...user,

              firstName:
                this.editForm
                  .firstName
                  .trim(),

              lastName:
                this.editForm
                  .lastName
                  .trim(),

              username:
                this.editForm
                  .username
                  .trim(),

              /*
               * Only replace password when
               * a new one was entered.
               */
              password:
                this.editForm.password
                  ? this.editForm.password
                  : user.password,

              email:
                this.editForm
                  .email
                  .trim(),

              departmentCode:
                this.editForm
                  .departmentCode,

              departmentName:
                department?.label ?? '',

              designationCode:
                this.editForm
                  .designationCode,

              designationName:
                designation?.label ?? '',

              roleId:
                this.editForm
                  .roleId,

              roleName:
                role?.label ?? '',

              status:
                this.editForm.status,

              branch:
                this.editForm.branch,

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


    this.persistUsers(
      updated,
    );


    this.showToast(
      'success',
      'User has been updated successfully.',
    );


    this.clearEdit();
  }


  // ==================================================
  // DELETE
  // ==================================================

  protected deleteUser():
    void {

    if (
      this.selectedUserId ===
      null
    ) {

      this.showToast(
        'error',
        'Select a user before deleting.',
      );

      return;
    }


    const user =
      this.records()
        .find(
          item =>
            item.id ===
            this.selectedUserId,
        );


    if (
      !user
    ) {

      this.showToast(
        'error',
        'Selected user could not be found.',
      );

      return;
    }


    const updated =
      this.records()
        .filter(
          item =>
            item.id !==
              this.selectedUserId,
        );


    this.records.set(
      updated,
    );


    this.persistUsers(
      updated,
    );


    this.showToast(
      'success',
      `${user.username} has been deleted successfully.`,
    );


    this.clearEdit();
  }


  // ==================================================
  // CLEAR EDIT
  // ==================================================

  protected clearEdit():
    void {

    this.selectedUserId =
      null;


    this.editForm =
      createDefaultUserForm();
  }


  // ==================================================
  // SEARCH
  // ==================================================

  protected search():
    void {

    const filters =
      this.searchFilters;


    const contains =
      (
        source: string,
        value: string,
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


    const records =
      this.records()
        .filter(
          user => {

            if (
              !contains(
                user.firstName,
                filters.firstName,
              )
            ) {
              return false;
            }


            if (
              !contains(
                user.lastName,
                filters.lastName,
              )
            ) {
              return false;
            }


            if (
              !contains(
                user.username,
                filters.username,
              )
            ) {
              return false;
            }


            if (
              !contains(
                user.email,
                filters.email,
              )
            ) {
              return false;
            }


            if (
              !contains(
                user.description,
                filters.description,
              )
            ) {
              return false;
            }


            if (
              filters.departmentCode !==
                'all' &&
              user.departmentCode !==
                filters.departmentCode
            ) {
              return false;
            }


            if (
              filters.designationCode !==
                'all' &&
              user.designationCode !==
                filters.designationCode
            ) {
              return false;
            }


            if (
              filters.roleId !== null &&
              user.roleId !==
                filters.roleId
            ) {
              return false;
            }


            if (
              filters.status !==
                'all' &&
              user.status !==
                filters.status
            ) {
              return false;
            }


            if (
              filters.branch !==
                'all' &&
              user.branch !==
                filters.branch
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
      createDefaultUserSearchFilters();


    this.results = [];

    this.hasSearched = false;
  }


  // ==================================================
  // TABLE ROW
  // ==================================================

  private toRows(
    records: UserRecord[],
  ): UserTableRow[] {

    return records.map(
      (
        user,
        index,
      ) => ({

        ...user,

        slNo:
          index + 1,

        fullName:
          `${user.firstName} ${user.lastName}`,

        statusLabel:
          this.getStatusLabel(
            user.status,
          ),

        branchLabel:
          this.getOptionLabel(
            userBranchOptions,
            user.branch,
          ),

        createdOnLabel:
          this.formatDateTime(
            user.createdAt,
          ),

        modifiedOnLabel:
          user.modifiedAt
            ? this.formatDateTime(
                user.modifiedAt,
              )
            : '—',
      }),
    );
  }


  // ==================================================
  // LABELS
  // ==================================================

  private getStatusLabel(
    status: UserStatus,
  ): string {

    return (
      userStatusOptions.find(
        item =>
          item.value === status,
      )?.label ??
      status
    );
  }


  private getOptionLabel(
    options: UserOption[],
    value: string,
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
  // MASTER DATA
  // ==================================================

  private reloadMasterData():
    void {

    this.departments.set(
      this.loadDepartments(),
    );


    this.designations.set(
      this.loadDesignations(),
    );


    this.roles.set(
      this.loadRoles(),
    );
  }


  // ==================================================
  // LOAD DEPARTMENTS
  // ==================================================

  private loadDepartments():
    UserOption[] {

    const fallback:
      UserOption[] = [

        {
          value: 'AML',
          label: 'AML DEPARTMENT',
        },

        {
          value: 'CMP',
          label: 'COMPLIANCE DEPARTMENT',
        },

        {
          value: 'OPS',
          label: 'OPERATIONS DEPARTMENT',
        },

      ];


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


      const parsed =
        JSON.parse(
          stored,
        ) as StoredDepartment[];


      if (
        !Array.isArray(
          parsed,
        ) ||
        parsed.length === 0
      ) {

        return fallback;
      }


      return parsed.map(
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
  // LOAD DESIGNATIONS
  // ==================================================

  private loadDesignations():
    (
      UserOption & {
        departmentCode: string;
      }
    )[] {

    const fallback = [

      {
        value: 'AML-MGR',

        label: 'AML Manager',

        departmentCode: 'AML',
      },

      {
        value: 'AML-OFC',

        label: 'AML Officer',

        departmentCode: 'AML',
      },

      {
        value: 'CMP-MGR',

        label: 'Compliance Manager',

        departmentCode: 'CMP',
      },

    ];


    try {

      const stored =
        localStorage.getItem(
          this.designationStorageKey,
        );


      if (
        !stored
      ) {

        return fallback;
      }


      const parsed =
        JSON.parse(
          stored,
        ) as StoredDesignation[];


      if (
        !Array.isArray(
          parsed,
        ) ||
        parsed.length === 0
      ) {

        return fallback;
      }


      return parsed.map(
        designation => ({

          value:
            designation.code,

          label:
            designation.name,

          departmentCode:
            designation.departmentCode,
        }),
      );

    } catch {

      return fallback;
    }
  }


  // ==================================================
  // LOAD ROLES
  // ==================================================

  private loadRoles():
    UserOption<number>[] {

    const fallback:
      UserOption<number>[] = [

        {
          value: 1,
          label: 'Administrator',
        },

        {
          value: 2,
          label: 'AML Manager',
        },

        {
          value: 3,
          label: 'AML Officer',
        },

      ];


    try {

      const stored =
        localStorage.getItem(
          this.roleStorageKey,
        );


      if (
        !stored
      ) {

        return fallback;
      }


      const parsed =
        JSON.parse(
          stored,
        ) as StoredRole[];


      if (
        !Array.isArray(
          parsed,
        ) ||
        parsed.length === 0
      ) {

        return fallback;
      }


      return parsed.map(
        role => ({

          value:
            role.id,

          label:
            role.role,
        }),
      );

    } catch {

      return fallback;
    }
  }


  // ==================================================
  // USERS STORAGE
  // ==================================================

  private persistUsers(
    users: UserRecord[],
  ): void {

    localStorage.setItem(
      this.userStorageKey,

      JSON.stringify(
        users,
      ),
    );
  }


  private loadUsers():
    UserRecord[] {

    try {

      const stored =
        localStorage.getItem(
          this.userStorageKey,
        );


      if (
        !stored
      ) {

        return initialUserRecords.map(
          user => ({
            ...user,
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
        : initialUserRecords;

    } catch {

      return initialUserRecords.map(
        user => ({
          ...user,
        }),
      );
    }
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