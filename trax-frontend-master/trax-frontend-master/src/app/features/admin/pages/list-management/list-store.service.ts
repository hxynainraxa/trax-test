import {
  computed,
  Injectable,
  signal,
} from '@angular/core';

import {
  initialManagedLists,
  ListFormData,
  ManagedList,
  ManagedListOption,
} from './list-data';


@Injectable({
  providedIn: 'root',
})
export class ListStoreService {

  // ==================================================
  // STORAGE
  // ==================================================

  private readonly storageKey =
    'traxManagedLists';


  // ==================================================
  // STATE
  // ==================================================

  private readonly managedLists =
    signal<ManagedList[]>(
      this.loadLists(),
    );


  // ==================================================
  // PUBLIC LISTS
  // ==================================================

  readonly lists =
    this.managedLists.asReadonly();


  // ==================================================
  // FUTURE ENTRY-TO-LIST OPTIONS
  //
  // Entry To List will use this directly.
  // ==================================================

  readonly listOptions =
    computed<ManagedListOption[]>(
      () =>
        this.managedLists()
          .map(list => ({
            value: list.id,

            code: list.code,

            label: list.name,
          }))
          .sort(
            (a, b) =>
              a.label.localeCompare(
                b.label,
              ),
          ),
    );


  // ==================================================
  // ADD LIST
  // ==================================================

  addList(
    form: ListFormData,
  ): {
    success: boolean;
    message: string;
    list?: ManagedList;
  } {

    const code =
      this.normalizeCode(
        form.code,
      );


    const name =
      form.name.trim();


    // ================================================
    // REQUIRED
    // ================================================

    if (
      !code ||
      !name
    ) {
      return {
        success: false,

        message:
          'List Code and List Name are required.',
      };
    }


    // ================================================
    // DUPLICATE CODE
    // ================================================

    const duplicate =
      this.managedLists()
        .some(
          list =>
            this.normalizeCode(
              list.code,
            ) === code,
        );


    if (duplicate) {
      return {
        success: false,

        message:
          'A list with this List Code already exists.',
      };
    }


    // ================================================
    // CREATE
    // ================================================

    const now =
      new Date()
        .toISOString();


    const list:
      ManagedList = {

        id:
          this.getNextId(),

        code,

        name,

        createdAt: now,

        updatedAt: now,
      };


    this.managedLists.update(
      lists => [
        ...lists,
        list,
      ],
    );


    this.persist();


    return {
      success: true,

      message:
        'List has been created successfully.',

      list,
    };
  }


  // ==================================================
  // UPDATE
  // ==================================================

  updateList(
    id: number,
    form: ListFormData,
  ): {
    success: boolean;
    message: string;
  } {

    const code =
      this.normalizeCode(
        form.code,
      );


    const name =
      form.name.trim();


    if (
      !code ||
      !name
    ) {
      return {
        success: false,

        message:
          'List Code and List Name are required.',
      };
    }


    const existing =
      this.managedLists()
        .find(
          item =>
            item.id === id,
        );


    if (!existing) {
      return {
        success: false,

        message:
          'List could not be found.',
      };
    }


    const duplicate =
      this.managedLists()
        .some(
          item =>
            item.id !== id &&
            this.normalizeCode(
              item.code,
            ) === code,
        );


    if (duplicate) {
      return {
        success: false,

        message:
          'A list with this List Code already exists.',
      };
    }


    this.managedLists.update(
      lists =>
        lists.map(
          item => {

            if (
              item.id !== id
            ) {
              return item;
            }


            return {
              ...item,

              code,

              name,

              updatedAt:
                new Date()
                  .toISOString(),
            };
          },
        ),
    );


    this.persist();


    return {
      success: true,

      message:
        'List has been updated successfully.',
    };
  }


  // ==================================================
  // FIND EXACT CODE
  // ==================================================

  findByCode(
    code: string,
  ): ManagedList | null {

    const normalized =
      this.normalizeCode(
        code,
      );


    if (!normalized) {
      return null;
    }


    return (
      this.managedLists()
        .find(
          item =>
            this.normalizeCode(
              item.code,
            ) === normalized,
        ) ??
      null
    );
  }


  // ==================================================
  // SEARCH
  // ==================================================

  search(
    code: string,
  ): ManagedList[] {

    const normalized =
      this.normalizeCode(
        code,
      );


    /*
     * Empty search returns all records.
     */
    if (!normalized) {
      return [
        ...this.managedLists(),
      ];
    }


    return this.managedLists()
      .filter(
        item =>
          this.normalizeCode(
            item.code,
          )
            .includes(
              normalized,
            ),
      );
  }


  // ==================================================
  // NEXT ID
  // ==================================================

  private getNextId():
    number {

    const lists =
      this.managedLists();


    if (
      lists.length === 0
    ) {
      return 1;
    }


    return (
      Math.max(
        ...lists.map(
          item => item.id,
        ),
      ) + 1
    );
  }


  // ==================================================
  // NORMALIZE CODE
  // ==================================================

  private normalizeCode(
    value: string,
  ): string {

    return value
      .trim()
      .toUpperCase();
  }


  // ==================================================
  // LOAD
  // ==================================================

  private loadLists():
    ManagedList[] {

    if (
      typeof localStorage ===
      'undefined'
    ) {
      return [
        ...initialManagedLists,
      ];
    }


    try {

      const stored =
        localStorage.getItem(
          this.storageKey,
        );


      if (!stored) {

        localStorage.setItem(
          this.storageKey,

          JSON.stringify(
            initialManagedLists,
          ),
        );


        return [
          ...initialManagedLists,
        ];
      }


      const parsed =
        JSON.parse(
          stored,
        );


      if (
        !Array.isArray(parsed)
      ) {
        return [
          ...initialManagedLists,
        ];
      }


      return parsed as
        ManagedList[];

    } catch {

      return [
        ...initialManagedLists,
      ];
    }
  }


  // ==================================================
  // SAVE
  // ==================================================

  private persist(): void {

    if (
      typeof localStorage ===
      'undefined'
    ) {
      return;
    }


    localStorage.setItem(
      this.storageKey,

      JSON.stringify(
        this.managedLists(),
      ),
    );
  }
}