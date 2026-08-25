import {
  Injectable,
  signal,
} from '@angular/core';

import {
  CaseForm,
  CaseRecord,
  initialCaseRecords,
} from './case-creation-data';


@Injectable({
  providedIn: 'root',
})
export class CaseCreationStoreService {

  // ==================================================
  // STORAGE
  // ==================================================

  private readonly storageKey =
    'traxCaseCreationRecords';


  // ==================================================
  // RECORDS
  // ==================================================

  readonly records =
    signal<CaseRecord[]>(
      this.loadRecords(),
    );


  // ==================================================
  // NEXT CASE CODE
  // ==================================================

  getNextCaseCode():
    string {

    const highestNumber =
      this.records()
        .reduce(
          (
            highest,
            item,
          ) => {

            const numericPart =
              Number(
                item.caseCode
                  .replace(
                    /^CASE/,
                    '',
                  ),
              );


            if (
              Number.isNaN(
                numericPart,
              )
            ) {
              return highest;
            }


            return Math.max(
              highest,
              numericPart,
            );

          },
          0,
        );


    const nextNumber =
      highestNumber + 1;


    return (
      `CASE${String(
        nextNumber,
      ).padStart(
        10,
        '0',
      )}`
    );
  }


  // ==================================================
  // ADD
  // ==================================================

  add(
    form:
      CaseForm,
  ): CaseRecord {

    const records =
      this.records();


    const nextId =
      records.length > 0
        ? Math.max(
            ...records.map(
              item =>
                item.id,
            ),
          ) + 1
        : 1;


    const now =
      new Date()
        .toISOString();


    const record:
      CaseRecord = {

      id:
        nextId,

      ...form,

      /*
       * Always generate from store.
       * Do not trust anything supplied
       * by the form.
       */
      caseCode:
        this.getNextCaseCode(),

      createdBy:
        'Admin',

      createdAt:
        now,

      modifiedBy:
        '',

      modifiedAt:
        '',
    };


    const updated = [
      ...records,
      record,
    ];


    this.records.set(
      updated,
    );


    this.persist(
      updated,
    );


    return record;
  }


  // ==================================================
  // UPDATE
  // ==================================================

  update(
    id:
      number,

    form:
      CaseForm,
  ): boolean {

    const existing =
      this.records()
        .find(
          item =>
            item.id === id,
        );


    if (!existing) {
      return false;
    }


    const updated =
      this.records()
        .map(
          item => {

            if (
              item.id !== id
            ) {
              return item;
            }


            return {

              ...item,

              ...form,

              /*
               * Case code can NEVER
               * change during editing.
               */
              caseCode:
                existing.caseCode,

              createdBy:
                existing.createdBy,

              createdAt:
                existing.createdAt,

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


    return true;
  }


  // ==================================================
  // FIND
  // ==================================================

  findById(
    id:
      number,
  ): CaseRecord | undefined {

    return this.records()
      .find(
        item =>
          item.id === id,
      );
  }


  // ==================================================
  // SEARCH
  // ==================================================

  search(
    predicate:
      (
        record:
          CaseRecord,
      ) => boolean,
  ): CaseRecord[] {

    return this.records()
      .filter(
        predicate,
      );
  }


  // ==================================================
  // STORAGE
  // ==================================================

  private persist(
    records:
      CaseRecord[],
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
    CaseRecord[] {

    if (
      typeof localStorage ===
      'undefined'
    ) {

      return [
        ...initialCaseRecords,
      ];
    }


    try {

      const stored =
        localStorage.getItem(
          this.storageKey,
        );


      if (!stored) {

        return initialCaseRecords
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

        return initialCaseRecords
          .map(
            item => ({
              ...item,
            }),
          );
      }


      return parsed;

    } catch {

      return initialCaseRecords
        .map(
          item => ({
            ...item,
          }),
        );
    }
  }
}