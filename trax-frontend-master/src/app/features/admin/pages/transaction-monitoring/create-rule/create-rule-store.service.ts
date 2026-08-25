import {
  Injectable,
  signal,
} from '@angular/core';

import {
  initialRuleRecords,
  RuleForm,
  RuleRecord,
} from './create-rule-data';


@Injectable({
  providedIn: 'root',
})
export class CreateRuleStoreService {

  private readonly storageKey =
    'traxTransactionMonitoringRules';


  private readonly recordsSignal =
    signal<RuleRecord[]>(
      this.loadRecords(),
    );


  readonly records =
    this.recordsSignal
      .asReadonly();


  // ==================================================
  // ADD
  // ==================================================

  add(
    form: RuleForm,
  ): {
    success: boolean;
    message: string;
    record?: RuleRecord;
  } {

    const ruleNumber =
      form.ruleNumber
        .trim()
        .toUpperCase();


    const ruleName =
      form.ruleName
        .trim();


    if (
      !ruleNumber ||
      !ruleName
    ) {

      return {
        success: false,

        message:
          'Rule Number and Rule Name are required.',
      };
    }


    const duplicate =
      this.recordsSignal()
        .some(
          record =>
            record.ruleNumber
              .toLowerCase() ===
            ruleNumber
              .toLowerCase(),
        );


    if (duplicate) {

      return {
        success: false,

        message:
          'A rule with this Rule Number already exists.',
      };
    }


    const now =
      new Date()
        .toISOString();


    const record:
      RuleRecord = {

        id:
          this.nextId(),

        ruleNumber,

        ruleName,

        active:
          form.active,

        ruleDescription:
          form.ruleDescription
            .trim(),

        block:
          form.block,

        ruleLogic:
          form.ruleLogic
            .trim(),

        services:
          form.services,

        realTime:
          form.realTime,

        reportViolation:
          form.reportViolation,

        ruleCategory:
          form.ruleCategory,

        ruleThreshold:
          form.ruleThreshold
            .trim(),

        ruleConditions:
          form.ruleConditions
            .trim(),

        ruleType:
          form.ruleType,

        profileRisk:
          form.profileRisk,

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
        'Rule has been created successfully.',

      record,
    };
  }


  // ==================================================
  // UPDATE
  // ==================================================

  update(
    id: number,

    form: RuleForm,
  ): {
    success: boolean;
    message: string;
  } {

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
          'Rule could not be found.',
      };
    }


    const ruleNumber =
      form.ruleNumber
        .trim()
        .toUpperCase();


    const ruleName =
      form.ruleName
        .trim();


    if (
      !ruleNumber ||
      !ruleName
    ) {

      return {
        success: false,

        message:
          'Rule Number and Rule Name are required.',
      };
    }


    const duplicate =
      this.recordsSignal()
        .some(
          record =>
            record.id !== id &&
            record.ruleNumber
              .toLowerCase() ===
            ruleNumber
              .toLowerCase(),
        );


    if (duplicate) {

      return {
        success: false,

        message:
          'Another rule already uses this Rule Number.',
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

              ruleNumber,

              ruleName,

              active:
                form.active,

              ruleDescription:
                form.ruleDescription
                  .trim(),

              block:
                form.block,

              ruleLogic:
                form.ruleLogic
                  .trim(),

              services:
                form.services,

              realTime:
                form.realTime,

              reportViolation:
                form.reportViolation,

              ruleCategory:
                form.ruleCategory,

              ruleThreshold:
                form.ruleThreshold
                  .trim(),

              ruleConditions:
                form.ruleConditions
                  .trim(),

              ruleType:
                form.ruleType,

              profileRisk:
                form.profileRisk,

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
        'Rule has been updated successfully.',
    };
  }


  // ==================================================
  // DELETE
  // ==================================================

  delete(
    id: number,
  ): {
    success: boolean;
    message: string;
  } {

    const exists =
      this.recordsSignal()
        .some(
          record =>
            record.id === id,
        );


    if (!exists) {

      return {
        success: false,

        message:
          'Rule could not be found.',
      };
    }


    this.recordsSignal.update(
      records =>
        records.filter(
          record =>
            record.id !== id,
        ),
    );


    this.persist();


    return {
      success: true,

      message:
        'Rule has been deleted successfully.',
    };
  }


  // ==================================================
  // SEARCH
  // ==================================================

  search(
    predicate:
      (
        record:
          RuleRecord,
      ) => boolean,
  ): RuleRecord[] {

    return this.recordsSignal()
      .filter(
        predicate,
      );
  }


  // ==================================================
  // NEXT ID
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

  private loadRecords():
    RuleRecord[] {

    if (
      typeof localStorage ===
      'undefined'
    ) {

      return [
        ...initialRuleRecords,
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
            initialRuleRecords,
          ),
        );


        return [
          ...initialRuleRecords,
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
            ...initialRuleRecords,
          ];

    } catch {

      return [
        ...initialRuleRecords,
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