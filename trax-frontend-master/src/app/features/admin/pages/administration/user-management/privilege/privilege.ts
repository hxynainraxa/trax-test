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
  LucideCheck,
  LucideDynamicIcon,
  LucideX,
} from '@lucide/angular';

import {
  BasePage,
} from '@app/core/base/base-page';

import {
  privilegeGroups,
  privilegeRoles,
} from './privilege-data';


@Component({
  selector: 'app-privilege',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    LucideDynamicIcon,
  ],

  templateUrl: './privilege.html',
  styleUrl: './privilege.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class Privilege
  extends BasePage
  implements OnDestroy
{
  protected readonly groups =
    privilegeGroups;

  protected readonly roles =
    privilegeRoles;

  protected readonly checkIcon =
    LucideCheck;

  protected readonly xIcon =
    LucideX;

  protected selectedRole = '';

  protected selected =
    new Set<string>();

  protected readonly message =
    signal<{
      type: 'success' | 'error';
      text: string;
    } | null>(null);

  private timer:
    ReturnType<typeof setTimeout> | null =
      null;

  private readonly storageKey =
    'traxRolePrivileges';


  // ==================================================
  // ROLE
  // ==================================================

  protected roleChanged(): void {
    this.selected.clear();

    if (!this.selectedRole) {
      return;
    }

    const saved =
      this.getStoredPrivileges();

    (
      saved[this.selectedRole] ?? []
    ).forEach(id =>
      this.selected.add(id),
    );

    this.selected =
      new Set(this.selected);
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

    this.selected =
      new Set(this.selected);
  }


  // ==================================================
  // GROUP
  // ==================================================

  protected isGroupSelected(
    groupIndex: number,
  ): boolean {
    return this.groups[groupIndex]
      .items
      .every(item =>
        this.selected.has(item.id),
      );
  }


  protected isGroupPartial(
    groupIndex: number,
  ): boolean {
    const group =
      this.groups[groupIndex];

    const count =
      group.items.filter(item =>
        this.selected.has(item.id),
      ).length;

    return (
      count > 0 &&
      count < group.items.length
    );
  }


  protected toggleGroup(
    groupIndex: number,
    checked: boolean,
  ): void {
    this.groups[groupIndex]
      .items
      .forEach(item => {
        checked
          ? this.selected.add(item.id)
          : this.selected.delete(item.id);
      });

    this.selected =
      new Set(this.selected);
  }


  // ==================================================
  // SELECT ALL / NONE
  // ==================================================

  protected selectAll(): void {
    this.selected =
      new Set(
        this.groups.flatMap(
          group =>
            group.items.map(
              item => item.id,
            ),
        ),
      );
  }


  protected selectNone(): void {
    this.selected =
      new Set();
  }


  // ==================================================
  // SAVE
  // ==================================================

  protected save(): void {
    if (!this.selectedRole) {
      this.showMessage(
        'error',
        'Please select a role.',
      );

      return;
    }

    const saved =
      this.getStoredPrivileges();

    saved[this.selectedRole] =
      [...this.selected];

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(saved),
    );

    this.showMessage(
      'success',
      'Privileges saved successfully.',
    );
  }


  // ==================================================
  // DELETE
  // ==================================================

  protected deletePrivileges(): void {
    if (!this.selectedRole) {
      this.showMessage(
        'error',
        'Please select a role.',
      );

      return;
    }

    const saved =
      this.getStoredPrivileges();

    delete saved[this.selectedRole];

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(saved),
    );

    this.selected =
      new Set();

    this.showMessage(
      'success',
      'Role privileges deleted.',
    );
  }


  // ==================================================
  // CLEAR
  // ==================================================

  protected clear(): void {
    this.selectedRole = '';
    this.selected = new Set();
  }


  // ==================================================
  // STORAGE
  // ==================================================

  private getStoredPrivileges():
    Record<string, string[]> {
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
    type: 'success' | 'error',
    text: string,
  ): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.message.set({
      type,
      text,
    });

    this.timer =
      setTimeout(
        () =>
          this.message.set(null),
        5000,
      );
  }


  ngOnDestroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}