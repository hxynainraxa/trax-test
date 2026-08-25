import {
  Injectable,
  signal,
} from '@angular/core';

import {
  initialNoiseMasterRecords,
  NoiseMasterRecord,
} from './noise-master-data';


@Injectable({
  providedIn: 'root',
})
export class NoiseMasterStoreService {

  // ==================================================
  // STORAGE
  // ==================================================

  private readonly storageKey =
    'traxNoiseMasterRecords';


  // ==================================================
  // STATE
  // ==================================================

  private readonly recordsSignal =
    signal<NoiseMasterRecord[]>(
      this.loadRecords(),
    );


  readonly records =
    this.recordsSignal
      .asReadonly();


  // ==================================================
  // ADD
  // ==================================================

  add(
    data: {
      noiseCode: string;
      description: string;
      status:
        'active'
        | 'inactive';
    },
  ): {
    success: boolean;
    message: string;
  } {

    const noiseCode =
      data.noiseCode
        .trim()
        .toUpperCase();


    const description =
      data.description
        .trim();


    // ================================================
    // VALIDATION
    // ================================================

    if (
      !noiseCode ||
      !description
    ) {

      return {
        success: false,

        message:
          'Noise Code and Description are required.',
      };
    }


    // ================================================
    // DUPLICATE CODE
    // ================================================

    const duplicate =
      this.recordsSignal()
        .some(
          record =>
            record.noiseCode
              .toLowerCase() ===
            noiseCode
              .toLowerCase(),
        );


    if (duplicate) {

      return {
        success: false,

        message:
          'A Noise Master with this Noise Code already exists.',
      };
    }


    // ================================================
    // CREATE
    // ================================================

    const now =
      new Date()
        .toISOString();


    const record:
      NoiseMasterRecord = {

        id:
          this.getNextId(),

        noiseCode,

        description,

        status:
          data.status,

        createdBy:
          'Admin',

        createdAt:
          now,

        modifiedBy:
          '',

        modifiedAt:
          '',
      };


    this.recordsSignal.update(
      records => [
        ...records,
        record,
      ],
    );


    this.persist();


    return {
      success: true,

      message:
        'Noise Master has been created successfully.',
    };
  }


  // ==================================================
  // UPDATE
  // ==================================================

  update(
    id: number,

    data: {
      noiseCode: string;
      description: string;
      status:
        'active'
        | 'inactive';
    },
  ): {
    success: boolean;
    message: string;
  } {

    const noiseCode =
      data.noiseCode
        .trim()
        .toUpperCase();


    const description =
      data.description
        .trim();


    if (
      !noiseCode ||
      !description
    ) {

      return {
        success: false,

        message:
          'Noise Code and Description are required.',
      };
    }


    const existing =
      this.recordsSignal()
        .find(
          record =>
            record.id === id,
        );


    if (!existing) {

      return {
        success: false,

        message:
          'Noise Master could not be found.',
      };
    }


    const duplicate =
      this.recordsSignal()
        .some(
          record =>
            record.id !== id &&
            record.noiseCode
              .toLowerCase() ===
            noiseCode
              .toLowerCase(),
        );


    if (duplicate) {

      return {
        success: false,

        message:
          'Another Noise Master already uses this Noise Code.',
      };
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

              noiseCode,

              description,

              status:
                data.status,

              modifiedBy:
                'Admin',

              modifiedAt:
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
        'Noise Master has been updated successfully.',
    };
  }


  // ==================================================
  // SEARCH
  // ==================================================

  search(
    predicate:
      (
        record:
          NoiseMasterRecord,
      ) => boolean,
  ): NoiseMasterRecord[] {

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
    NoiseMasterRecord[] {

    if (
      typeof localStorage ===
      'undefined'
    ) {

      return [
        ...initialNoiseMasterRecords,
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
            initialNoiseMasterRecords,
          ),
        );


        return [
          ...initialNoiseMasterRecords,
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
            ...initialNoiseMasterRecords,
          ];

    } catch {

      return [
        ...initialNoiseMasterRecords,
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