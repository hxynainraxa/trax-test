import {
  Injectable,
  signal,
} from '@angular/core';

import {
  EntryToListRecord,
  initialEntryToListRecords,
} from './entry-to-list-data';


@Injectable({
  providedIn: 'root',
})
export class EntryToListStoreService {

  private readonly storageKey =
    'traxEntryToListRecords';


  private readonly recordsSignal =
    signal<EntryToListRecord[]>(
      this.load(),
    );


  readonly records =
    this.recordsSignal.asReadonly();


  // ==================================================
  // ADD
  // ==================================================

  add(
    record:
      Omit<
        EntryToListRecord,
        'id'
        | 'createdAt'
        | 'updatedAt'
      >,
  ): EntryToListRecord {

    const now =
      new Date()
        .toISOString();


    const newRecord:
      EntryToListRecord = {

        ...record,

        id:
          this.nextId(),

        createdAt: now,

        updatedAt: now,
      };


    this.recordsSignal.update(
      records => [
        ...records,
        newRecord,
      ],
    );


    this.persist();


    return newRecord;
  }


  // ==================================================
  // UPDATE
  // ==================================================

  update(
    id: number,

    changes:
      Partial<EntryToListRecord>,
  ): boolean {

    const exists =
      this.recordsSignal()
        .some(
          record =>
            record.id === id,
        );


    if (!exists) {
      return false;
    }


    this.recordsSignal.update(
      records =>
        records.map(
          record => {

            if (
              record.id !== id
            ) {
              return record;
            }


            return {
              ...record,

              ...changes,

              id:
                record.id,

              createdAt:
                record.createdAt,

              updatedAt:
                new Date()
                  .toISOString(),
            };
          },
        ),
    );


    this.persist();


    return true;
  }


  // ==================================================
  // SEARCH
  // ==================================================

  search(
    predicate:
      (
        record:
          EntryToListRecord,
      ) => boolean,
  ): EntryToListRecord[] {

    return this.recordsSignal()
      .filter(
        predicate,
      );
  }


  // ==================================================
  // ID
  // ==================================================

  private nextId():
    number {

    const records =
      this.recordsSignal();


    if (
      records.length === 0
    ) {
      return 1;
    }


    return (
      Math.max(
        ...records.map(
          record =>
            record.id,
        ),
      ) + 1
    );
  }


  // ==================================================
  // LOAD
  // ==================================================

  private load():
    EntryToListRecord[] {

    if (
      typeof localStorage ===
      'undefined'
    ) {
      return [
        ...initialEntryToListRecords,
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
            initialEntryToListRecords,
          ),
        );


        return [
          ...initialEntryToListRecords,
        ];
      }


      const parsed =
        JSON.parse(
          stored,
        );


      return Array.isArray(
        parsed,
      )
        ? parsed
        : [
            ...initialEntryToListRecords,
          ];

    } catch {

      return [
        ...initialEntryToListRecords,
      ];
    }
  }


  // ==================================================
  // PERSIST
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
        this.recordsSignal(),
      ),
    );
  }
}