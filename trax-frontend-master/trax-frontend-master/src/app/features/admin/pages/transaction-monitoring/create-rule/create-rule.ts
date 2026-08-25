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
  createDefaultRuleForm,
  createDefaultRuleSearchForm,
  EditRuleTypeFilter,
  editRuleTypeOptions,
  profileRiskOptions,
  RuleForm,
  RuleRecord,
  RuleSearchForm,
  ruleCategoryOptions,
  ruleStatusOptions,
  searchRuleTypeOptions,
  serviceOptions,
  serviceSearchOptions,
} from './create-rule-data';

import {
  CreateRuleStoreService,
} from './create-rule-store.service';


type CreateRuleTab =
  | 'add'
  | 'edit'
  | 'search';


type RequiredField =
  | 'ruleNumber'
  | 'ruleName';


interface RuleTableRow
  extends RuleRecord {

  slNo: number;

  statusLabel: string;

  serviceLabel: string;

  realTimeLabel: string;

  reportViolationLabel: string;

  ruleTypeLabel: string;
}


interface ToastState {
  type:
    | 'success'
    | 'error';

  message:
    string;
}


@Component({
  selector:
    'app-create-rule',

  standalone:
    true,

  imports: [
    CommonModule,
    FormsModule,
    LucideDynamicIcon,
    SharedTableComponent,
  ],

  templateUrl:
    './create-rule.html',

  styleUrl:
    './create-rule.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class CreateRule
  extends BasePage
  implements OnDestroy
{

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
  // DROPDOWN OPTIONS
  // ==================================================

  protected readonly services =
    serviceOptions;


  protected readonly searchServices =
    serviceSearchOptions;


  protected readonly editRuleTypes =
    editRuleTypeOptions;


  protected readonly searchRuleTypes =
    searchRuleTypeOptions;


  protected readonly ruleStatuses =
    ruleStatusOptions;


  protected readonly ruleCategories =
    ruleCategoryOptions;


  protected readonly profileRisks =
    profileRiskOptions;


  // ==================================================
  // ACTIVE TAB
  // ==================================================

  protected readonly activeTab =
    signal<CreateRuleTab>(
      'add',
    );


  // ==================================================
  // ADD / EDIT FORM
  // ==================================================

  protected form:
    RuleForm =
      createDefaultRuleForm();


  // ==================================================
  // SEARCH FORM
  // ==================================================

  protected searchForm:
    RuleSearchForm =
      createDefaultRuleSearchForm();


  // ==================================================
  // EDIT RULE TYPE FILTER
  // ==================================================

  protected readonly editRuleType =
    signal<EditRuleTypeFilter>(
      'transaction-wise',
    );


  // ==================================================
  // SELECTED EDIT RULE
  // ==================================================

  protected selectedEditRuleId:
    number | null = null;


  // ==================================================
  // EDIT RULE DROPDOWN
  // ==================================================

  protected readonly editRuleOptions =
    computed(
      () => {

        const selectedType =
          this.editRuleType();


        return this.ruleStore
          .records()
          .filter(
            rule =>
              selectedType ===
                'all' ||
              rule.ruleType ===
                selectedType,
          )
          .map(
            rule => ({

              id:
                rule.id,

              label:
                `${rule.ruleNumber} - ${rule.ruleName}`,
            }),
          );
      },
    );


  // ==================================================
  // VALIDATION
  // ==================================================

  protected readonly fieldErrors =
    signal<
      Partial<
        Record<
          RequiredField,
          string
        >
      >
    >({});


  // ==================================================
  // RESULTS
  // ==================================================

  protected results:
    RuleTableRow[] = [];


  protected hasSearched =
    false;


  // ==================================================
  // TOAST
  // ==================================================

  protected readonly toast =
    signal<ToastState | null>(
      null,
    );


  private toastTimer:
    ReturnType<
      typeof setTimeout
    > | null = null;


  // ==================================================
  // TABLE
  // ==================================================

  protected readonly columns:
    SharedTableColumn<
      RuleTableRow
    >[] = [

      {
        key: 'slNo',
        header: 'Sl.No',
        width: '6%',
      },

      {
        key: 'ruleNumber',
        header: 'Rule Number',
        width: '12%',
        sortable: true,
      },

      {
        key: 'ruleName',
        header: 'Rule Name',
        width: '22%',
        sortable: true,
      },

      {
        key: 'statusLabel',
        header: 'Status',
        width: '9%',
        sortable: true,
      },

      {
        key: 'serviceLabel',
        header: 'Services',
        width: '15%',
      },

      {
        key: 'ruleTypeLabel',
        header: 'Rule Type',
        width: '14%',
      },

      {
        key: 'realTimeLabel',
        header: 'Real Time',
        width: '10%',
      },

      {
        key: 'reportViolationLabel',
        header: 'Report Violation',
        width: '12%',
      },

    ];


  constructor(
    private readonly ruleStore:
      CreateRuleStoreService,
  ) {
    super();
  }


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
    tab:
      CreateRuleTab,
  ): void {

    this.activeTab.set(
      tab,
    );


    this.form =
      createDefaultRuleForm();


    this.searchForm =
      createDefaultRuleSearchForm();


    this.editRuleType.set(
      'transaction-wise',
    );


    this.selectedEditRuleId =
      null;


    this.fieldErrors.set(
      {},
    );


    this.results =
      [];


    this.hasSearched =
      false;
  }


  // ==================================================
  // SAVE
  // ==================================================

  protected save():
    void {

    if (
      !this.validateRule()
    ) {

      this.showToast(
        'error',

        'Rule Number and Rule Name are required.',
      );

      return;
    }


    const result =
      this.ruleStore.add(
        this.form,
      );


    if (!result.success) {

      this.showToast(
        'error',

        result.message,
      );

      return;
    }


    this.showToast(
      'success',

      result.message,
    );


    this.form =
      createDefaultRuleForm();


    this.fieldErrors.set(
      {},
    );
  }


  // ==================================================
  // EDIT TYPE CHANGE
  // ==================================================

  protected onEditRuleTypeChange(
    value:
      EditRuleTypeFilter,
  ): void {

    this.editRuleType.set(
      value,
    );


    this.selectedEditRuleId =
      null;


    this.form =
      createDefaultRuleForm();


    /*
     * Keep actual rule type aligned
     * when a specific type is selected.
     */
    if (
      value !== 'all'
    ) {

      this.form.ruleType =
        value;
    }


    this.fieldErrors.set(
      {},
    );
  }


  // ==================================================
  // EDIT RULE CHANGE
  // ==================================================

  protected onEditRuleSelected(
    value:
      number | null,
  ): void {

    this.selectedEditRuleId =
      value;


    this.fieldErrors.set(
      {},
    );


    if (
      value === null
    ) {

      this.form =
        createDefaultRuleForm();

      return;
    }


    const rule =
      this.ruleStore
        .records()
        .find(
          item =>
            item.id ===
            value,
        );


    if (!rule) {
      return;
    }


    this.form =
      this.recordToForm(
        rule,
      );
  }


  // ==================================================
  // UPDATE
  // ==================================================

  protected update():
    void {

    if (
      this.selectedEditRuleId ===
      null
    ) {

      this.showToast(
        'error',

        'Select a rule before updating.',
      );

      return;
    }


    if (
      !this.validateRule()
    ) {

      this.showToast(
        'error',

        'Rule Number and Rule Name are required.',
      );

      return;
    }


    const result =
      this.ruleStore.update(
        this.selectedEditRuleId,

        this.form,
      );


    if (!result.success) {

      this.showToast(
        'error',

        result.message,
      );

      return;
    }


    this.showToast(
      'success',

      result.message,
    );


    this.selectedEditRuleId =
      null;


    this.form =
      createDefaultRuleForm();


    this.editRuleType.set(
      'transaction-wise',
    );


    this.fieldErrors.set(
      {},
    );
  }


  // ==================================================
  // DELETE
  // ==================================================

  protected deleteRule():
    void {

    if (
      this.selectedEditRuleId ===
      null
    ) {

      this.showToast(
        'error',

        'Select a rule before deleting.',
      );

      return;
    }


    const result =
      this.ruleStore.delete(
        this.selectedEditRuleId,
      );


    if (!result.success) {

      this.showToast(
        'error',

        result.message,
      );

      return;
    }


    this.showToast(
      'success',

      result.message,
    );


    this.selectedEditRuleId =
      null;


    this.form =
      createDefaultRuleForm();


    this.results =
      [];


    this.hasSearched =
      false;
  }


  // ==================================================
  // SEARCH
  // ==================================================

  protected search():
    void {

    const records =
      this.ruleStore.search(
        record =>
          this.matchesSearch(
            record,
          ),
      );


    this.results =
      this.toRows(
        records,
      );


    this.hasSearched =
      true;
  }


  // ==================================================
  // RESET
  // ==================================================

  protected reset():
    void {

    this.fieldErrors.set(
      {},
    );


    this.results =
      [];


    this.hasSearched =
      false;


    if (
      this.activeTab() ===
      'edit'
    ) {

      this.selectedEditRuleId =
        null;


      this.editRuleType.set(
        'transaction-wise',
      );


      this.form =
        createDefaultRuleForm();

      return;
    }


    if (
      this.activeTab() ===
      'search'
    ) {

      this.searchForm =
        createDefaultRuleSearchForm();

      return;
    }


    this.form =
      createDefaultRuleForm();
  }


  // ==================================================
  // VALIDATE
  // ==================================================

  private validateRule():
    boolean {

    const errors:
      Partial<
        Record<
          RequiredField,
          string
        >
      > = {};


    if (
      !this.form.ruleNumber
        .trim()
    ) {

      errors.ruleNumber =
        'Rule Number is required.';
    }


    if (
      !this.form.ruleName
        .trim()
    ) {

      errors.ruleName =
        'Rule Name is required.';
    }


    this.fieldErrors.set(
      errors,
    );


    return (
      Object.keys(
        errors,
      ).length === 0
    );
  }


  protected getFieldError(
    field:
      RequiredField,
  ): string {

    return (
      this.fieldErrors()[
        field
      ] ?? ''
    );
  }


  protected clearFieldError(
    field:
      RequiredField,
  ): void {

    this.fieldErrors.update(
      current => {

        const next = {
          ...current,
        };


        delete next[field];


        return next;
      },
    );
  }


  // ==================================================
  // SEARCH FILTER
  // ==================================================

  private matchesSearch(
    record:
      RuleRecord,
  ): boolean {

    const contains =
      (
        source:
          string,

        value:
          string,
      ) => {

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


    if (
      !contains(
        record.ruleName,

        this.searchForm.createdRule,
      )
    ) {
      return false;
    }


    if (
      !contains(
        record.ruleNumber,

        this.searchForm.ruleNumber,
      )
    ) {
      return false;
    }


    // SERVICES
    if (
      this.searchForm.services &&
      this.searchForm.services !==
        'all' &&
      record.services !==
        this.searchForm.services
    ) {
      return false;
    }


    // STATUS
    if (
      this.searchForm.status ===
        'active' &&
      !record.active
    ) {
      return false;
    }


    if (
      this.searchForm.status ===
        'inactive' &&
      record.active
    ) {
      return false;
    }


    // RULE TYPE
    if (
      this.searchForm.ruleType !==
        'all' &&
      record.ruleType !==
        this.searchForm.ruleType
    ) {
      return false;
    }


    // PROFILE RISK
    if (
      this.searchForm.profileRisk &&
      this.searchForm.profileRisk !==
        'all' &&
      record.profileRisk !==
        this.searchForm.profileRisk
    ) {
      return false;
    }


    return true;
  }


  // ==================================================
  // RECORD TO FORM
  // ==================================================

  private recordToForm(
    record:
      RuleRecord,
  ): RuleForm {

    return {

      ruleNumber:
        record.ruleNumber,

      ruleName:
        record.ruleName,

      active:
        record.active,

      ruleDescription:
        record.ruleDescription,

      block:
        record.block,

      ruleLogic:
        record.ruleLogic,

      services:
        record.services,

      realTime:
        record.realTime,

      reportViolation:
        record.reportViolation,

      ruleCategory:
        record.ruleCategory,

      ruleThreshold:
        record.ruleThreshold,

      ruleConditions:
        record.ruleConditions,

      ruleType:
        record.ruleType,

      profileRisk:
        record.profileRisk,
    };
  }


  // ==================================================
  // TABLE
  // ==================================================

  private toRows(
    records:
      RuleRecord[],
  ): RuleTableRow[] {

    return records.map(
      (
        record,
        index,
      ) => {

        const service =
          serviceOptions.find(
            option =>
              option.value ===
              record.services,
          );


        return {

          ...record,

          slNo:
            index + 1,

          statusLabel:
            record.active
              ? 'Active'
              : 'InActive',

          serviceLabel:
            service?.label ??
            record.services,

          realTimeLabel:
            record.realTime
              ? 'Yes'
              : 'No',

          reportViolationLabel:
            record.reportViolation
              ? 'Yes'
              : 'No',

          ruleTypeLabel:
            record.ruleType ===
              'transaction-wise'
              ? 'TransactionWise Rule'
              : 'Profile Rules',
        };
      },
    );
  }


  // ==================================================
  // TOAST
  // ==================================================

  private showToast(
    type:
      'success'
      | 'error',

    message:
      string,
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