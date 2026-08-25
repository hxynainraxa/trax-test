import { TemplateRef } from '@angular/core';

export type SharedTableAlign = 'left' | 'center' | 'right';

export type SharedTableSortDirection = 'asc' | 'desc' | null;

export interface SharedTableColumn<T> {
  /**
   * Property name or nested property path.
   *
   * Examples:
   * "name"
   * "customer.name"
   */
  key: keyof T | string;

  /**
   * Column heading.
   */
  header: string;

  /**
   * Optional fixed or minimum column width.
   *
   * Examples:
   * "120px"
   * "18rem"
   * "20%"
   */
  width?: string;

  /**
   * Cell alignment.
   */
  align?: SharedTableAlign;

  /**
   * Whether this column can be sorted.
   */
  sortable?: boolean;

  /**
   * Whether this column should be included in client-side search.
   */
  searchable?: boolean;

  /**
   * Whether this column should be hidden on smaller screens.
   */
  hideOnMobile?: boolean;

  /**
   * Fallback value when the cell is empty.
   */
  emptyValue?: string;

  /**
   * Custom value accessor.
   */
  valueGetter?: (row: T) => unknown;

  /**
   * Custom display formatter.
   */
  formatter?: (value: unknown, row: T) => string;

  /**
   * Custom Angular template.
   */
  template?: TemplateRef<SharedTableCellContext<T>>;
}

export interface SharedTableCellContext<T> {
  $implicit: T;
  row: T;
  value: unknown;
  column: SharedTableColumn<T>;
}

export interface SharedTableAction<T> {
  /**
   * Unique action identifier.
   *
   * Examples:
   * "view"
   * "edit"
   * "delete"
   */
  id: string;

  /**
   * Text displayed inside the action menu.
   */
  label: string;

  /**
   * Optional CSS class for an action.
   */
  className?: string;

  /**
   * Marks the action as destructive.
   */
  danger?: boolean;

  /**
   * Determines whether the action is visible for a row.
   */
  visible?: (row: T) => boolean;

  /**
   * Determines whether the action is disabled for a row.
   */
  disabled?: (row: T) => boolean;
}

export interface SharedTableActionEvent<T> {
  action: SharedTableAction<T>;
  row: T;
}

export interface SharedTableSortEvent<T> {
  column: SharedTableColumn<T>;
  direction: SharedTableSortDirection;
}

export interface SharedTablePageEvent {
  page: number;
  pageSize: number;
}
