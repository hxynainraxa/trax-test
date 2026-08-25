import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  signal,
} from '@angular/core';

import {
  FormsModule,
} from '@angular/forms';

import {
  BasePage,
} from '@app/core/base/base-page';

import {
  privilegeGroups,
} from '../privilege/privilege-data';


// ==================================================
// TYPES
// ==================================================

interface UserOption {
  value: number;
  label: string;
  roleName?: string;
}

interface RoleOption {
  value: string;
  label: string;
}

interface StoredUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  roleName?: string;
}

interface StoredRole {
  id: number;
  role: string;
}

interface UserPrivilegeRecord {
  role: string;
  privileges: string[];
}


@Component({
  selector: 'app-user-privilege',

  standalone: true,

  imports: [
    FormsModule,
  ],

  templateUrl:
    './user-privilege.html',

  styleUrl:
    './user-privilege.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class UserPrivilege
  extends BasePage
  implements OnDestroy
{
  // ==================================================
  // DATA
  // ==================================================

  protected readonly groups =
    privilegeGroups;

  protected readonly users =
    this.loadUsers();

  protected readonly roles =
    this.loadRoles();


  // ==================================================
  // FORM
  // ==================================================

  protected selectedUser:
    number | null =
      null;

  protected copyFromUser:
    number | null =
      null;

  protected selectedRole = '';

  protected selected =
    new Set<string>();


  // ==================================================
  // MESSAGE
  // ==================================================

  protected readonly message =
    signal<{
      type: 'success' | 'error';
      text: string;
    } | null>(null);

  private timer:
    ReturnType<typeof setTimeout> | null =
      null;


  // ==================================================
  // STORAGE
  // ==================================================

  private readonly storageKey =
    'traxUserPrivileges';

  private readonly rolePrivilegeStorageKey =
    'traxRolePrivileges';


  // ==================================================
  // USER CHANGED
  // ==================================================

  protected userChanged(): void {
    this.selected =
      new Set();

    this.copyFromUser =
      null;

    if (
      this.selectedUser ===
      null
    ) {
      this.selectedRole = '';
      return;
    }

    const user =
      this.users.find(
        item =>
          item.value ===
          this.selectedUser,
      );

    const saved =
      this.getStoredUserPrivileges();

    const record =
      saved[String(
        this.selectedUser,
      )];

    /*
     * Existing user-specific privilege.
     */
    if (record) {
      this.selectedRole =
        record.role;

      this.selected =
        new Set(
          record.privileges,
        );

      return;
    }

    /*
     * Otherwise show user's existing role.
     */
    this.selectedRole =
      user?.roleName ?? '';

    this.loadRolePrivileges();
  }


  // ==================================================
  // COPY FROM USER
  // ==================================================

  protected copyUserChanged(): void {
    if (
      this.copyFromUser ===
      null
    ) {
      return;
    }

    const saved =
      this.getStoredUserPrivileges();

    const source =
      saved[String(
        this.copyFromUser,
      )];

    if (!source) {
      this.showMessage(
        'error',
        'The selected user has no saved privileges.',
      );

      return;
    }

    this.selectedRole =
      source.role;

    this.selected =
      new Set(
        source.privileges,
      );

    this.showMessage(
      'success',
      'Privileges copied successfully.',
    );
  }


  // ==================================================
  // ROLE
  // ==================================================

  protected roleChanged(): void {
    this.loadRolePrivileges();
  }


  private loadRolePrivileges(): void {
    this.selected =
      new Set();

    if (!this.selectedRole) {
      return;
    }

    try {
      const stored =
        JSON.parse(
          localStorage.getItem(
            this.rolePrivilegeStorageKey,
          ) ?? '{}',
        );

      const privileges =
        stored[this.selectedRole] ?? [];

      this.selected =
        new Set(
          privileges,
        );

    } catch {
      this.selected =
        new Set();
    }
  }


  // ==================================================
  // ITEM
  // ==================================================

  protected isSelected(
    id: string,
  ): boolean {
    return this.selected.has(id);
  }


  protected toggleItem(
    id: string,
    checked: boolean,
  ): void {
    checked
      ? this.selected.add(id)
      : this.selected.delete(id);

    this.refreshSelection();
  }


  // ==================================================
  // GROUP
  // ==================================================

  protected isGroupSelected(
    index: number,
  ): boolean {
    return this.groups[index]
      .items
      .every(
        item =>
          this.selected.has(
            item.id,
          ),
      );
  }


  protected isGroupPartial(
    index: number,
  ): boolean {
    const items =
      this.groups[index].items;

    const selectedCount =
      items.filter(
        item =>
          this.selected.has(
            item.id,
          ),
      ).length;

    return (
      selectedCount > 0 &&
      selectedCount < items.length
    );
  }


  protected toggleGroup(
    index: number,
    checked: boolean,
  ): void {
    this.groups[index]
      .items
      .forEach(
        item => {
          checked
            ? this.selected.add(
                item.id,
              )
            : this.selected.delete(
                item.id,
              );
        },
      );

    this.refreshSelection();
  }


  private refreshSelection():
    void {
    this.selected =
      new Set(
        this.selected,
      );
  }


  // ==================================================
  // SAVE
  // ==================================================

  protected save(): void {
    if (
      this.selectedUser ===
      null
    ) {
      this.showMessage(
        'error',
        'Please select a user.',
      );

      return;
    }

    if (!this.selectedRole) {
      this.showMessage(
        'error',
        'Please select a role.',
      );

      return;
    }

    const stored =
      this.getStoredUserPrivileges();

    stored[String(
      this.selectedUser,
    )] = {
      role:
        this.selectedRole,

      privileges:
        [...this.selected],
    };

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(stored),
    );

    this.showMessage(
      'success',
      'User privileges saved successfully.',
    );
  }


  // ==================================================
  // DELETE
  // ==================================================

  protected deletePrivileges():
    void {
    if (
      this.selectedUser ===
      null
    ) {
      this.showMessage(
        'error',
        'Please select a user.',
      );

      return;
    }

    const stored =
      this.getStoredUserPrivileges();

    delete stored[
      String(
        this.selectedUser,
      )
    ];

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(stored),
    );

    this.selected =
      new Set();

    this.selectedRole = '';

    this.copyFromUser =
      null;

    this.showMessage(
      'success',
      'User privileges deleted successfully.',
    );
  }


  // ==================================================
  // CLEAR
  // ==================================================

  protected clear(): void {
    this.selectedUser =
      null;

    this.copyFromUser =
      null;

    this.selectedRole =
      '';

    this.selected =
      new Set();
  }


  // ==================================================
  // USERS
  // ==================================================

  private loadUsers():
    UserOption[] {
    const fallback:
      UserOption[] = [
        {
          value: 1,
          label:
            'Ahmed Ali (ahmed.ali)',
          roleName:
            'AML Manager',
        },
        {
          value: 2,
          label:
            'Sara Khan (sara.khan)',
          roleName:
            'AML Officer',
        },
      ];

    try {
      const users =
        JSON.parse(
          localStorage.getItem(
            'traxUsers',
          ) ?? '[]',
        ) as StoredUser[];

      if (
        !Array.isArray(users) ||
        users.length === 0
      ) {
        return fallback;
      }

      return users.map(
        user => ({
          value:
            user.id,

          label:
            `${user.firstName} ${user.lastName} (${user.username})`,

          roleName:
            user.roleName,
        }),
      );

    } catch {
      return fallback;
    }
  }


  // ==================================================
  // ROLES
  // ==================================================

  private loadRoles():
    RoleOption[] {
    const roleNames =
      new Set<string>([
        'AML Manager',
        'AML Officer',
      ]);

    try {
      const roles =
        JSON.parse(
          localStorage.getItem(
            'traxRoles',
          ) ?? '[]',
        ) as StoredRole[];

      roles.forEach(
        role => {
          if (role.role) {
            roleNames.add(
              role.role,
            );
          }
        },
      );
    } catch {
      // Use defaults.
    }

    return [
      ...roleNames,
    ].map(
      role => ({
        value: role,
        label: role,
      }),
    );
  }


  // ==================================================
  // STORAGE
  // ==================================================

  private getStoredUserPrivileges():
    Record<
      string,
      UserPrivilegeRecord
    > {
    try {
      return JSON.parse(
        localStorage.getItem(
          this.storageKey,
        ) ?? '{}',
      );
    } catch {
      return {};
    }
  }


  // ==================================================
  // MESSAGE
  // ==================================================

  private showMessage(
    type:
      'success' | 'error',

    text: string,
  ): void {
    if (this.timer) {
      clearTimeout(
        this.timer,
      );
    }

    this.message.set({
      type,
      text,
    });

    this.timer =
      setTimeout(
        () =>
          this.message.set(
            null,
          ),
        5000,
      );
  }


  ngOnDestroy(): void {
    if (this.timer) {
      clearTimeout(
        this.timer,
      );
    }
  }
}