import {
  Injectable,
  signal,
} from '@angular/core';

import {
  initialWhiteListRecords,
  WhiteListRecord,
} from './white-list-data';


@Injectable({
  providedIn: 'root',
})
export class WhiteListStoreService {

  // ==================================================
  // STORAGE
  // ==================================================

  private readonly storageKey =
    'traxWhiteListRecords';


  // ==================================================
  // STATE
  // ==================================================

  private readonly recordsSignal =
    signal<WhiteListRecord[]>(
      this.loadRecords(),
    );


  readonly records =
    this.recordsSignal
      .asReadonly();


  // ==================================================
  // ADD
  // ==================================================

  add(
    record:
      Omit<
        WhiteListRecord,
        | 'id'
        | 'createdAt'
        | 'updatedAt'
      >,
  ): WhiteListRecord {

    const now =
      new Date()
        .toISOString();


    const newRecord:
      WhiteListRecord = {

        ...record,

        id:
          this.getNextId(),

        createdAt:
          now,

        updatedAt:
          now,
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
      Partial<
        WhiteListRecord
      >,
  ): boolean {

    const exists =
      this.recordsSignal()
        .some(
          record =>
            record.id ===
            id,
        );


    if (!exists) {
      return false;
    }


    this.recordsSignal.update(
      records =>
        records.map(
          record => {

            if (
              record.id !==
              id
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
          WhiteListRecord,
      ) => boolean,
  ): WhiteListRecord[] {

    return this.recordsSignal()
      .filter(
        predicate,
      );
  }


  // ==================================================
  // NEXT ID
  // ==================================================

  private getNextId():
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

  private loadRecords():
    WhiteListRecord[] {

    if (
      typeof localStorage ===
      'undefined'
    ) {

      return [
        ...initialWhiteListRecords,
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
            initialWhiteListRecords,
          ),
        );


        return [
          ...initialWhiteListRecords,
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
            ...initialWhiteListRecords,
          ];

    } catch {

      return [
        ...initialWhiteListRecords,
      ];
    }
  }


  // ==================================================
  // PERSIST
  // ==================================================

  private persist():
    void {

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