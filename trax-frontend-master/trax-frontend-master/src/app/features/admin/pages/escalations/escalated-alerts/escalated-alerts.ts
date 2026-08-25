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
  LucideDynamicIcon,
  LucideSearch,
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
  createEscalatedAlertFilters,
  EscalatedAlertFilters,
  EscalatedAlertOption,
  EscalatedAlertRecord,
  escalatedAlertModuleOptions,
  escalatedAlertRecords,
  escalatedAlertTransactionTypeOptions,
} from './escalated-alerts-data';


// ==================================================
// TABLE ROW
// ==================================================

interface EscalatedAlertTableRow
  extends EscalatedAlertRecord {

  slNo: number;

  moduleLabel: string;

  transactionTypeLabel: string;

  escalatedDateLabel: string;

  statusLabel: string;
}


// ==================================================
// TOAST
// ==================================================

interface EscalatedAlertToast {
  type:
    'error';

  message:
    string;
}


@Component({
  selector:
    'app-escalated-alerts',

  standalone:
    true,

  imports: [
    CommonModule,
    FormsModule,
    LucideDynamicIcon,
    SharedTableComponent,
  ],

  templateUrl:
    './escalated-alerts.html',

  styleUrl:
    './escalated-alerts.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class EscalatedAlerts
  extends BasePage
  implements OnDestroy
{

  // ==================================================
  // ICONS
  // ==================================================

  protected readonly searchIcon =
    LucideSearch;

  protected readonly errorIcon =
    LucideTriangleAlert;

  protected readonly closeIcon =
    LucideX;


  // ==================================================
  // OPTIONS
  // ==================================================

  protected readonly modules =
    escalatedAlertModuleOptions;

  protected readonly transactionTypes =
    escalatedAlertTransactionTypeOptions;


  // ==================================================
  // FILTER
  // ==================================================

  protected filters:
    EscalatedAlertFilters =
      createEscalatedAlertFilters();


  // ==================================================
  // RESULTS
  // ==================================================

  protected results:
    EscalatedAlertTableRow[] = [];


  protected hasSearched =
    false;


  // ==================================================
  // ERRORS
  // ==================================================

  protected dateError =
    '';


  // ==================================================
  // TOAST
  // ==================================================

  protected readonly toast =
    signal<
      EscalatedAlertToast | null
    >(
      null,
    );


  private toastTimer:
    ReturnType<
      typeof setTimeout
    > | null =
      null;


  // ==================================================
  // TABLE
  // ==================================================

  protected readonly columns:
    SharedTableColumn<
      EscalatedAlertTableRow
    >[] = [

      {
        key:
          'slNo',

        header:
          'Sl.No',

        width:
          '5%',
      },

      {
        key:
          'referenceNumber',

        header:
          'Reference No.',

        width:
          '13%',

        sortable:
          true,
      },

      {
        key:
          'moduleLabel',

        header:
          'Module',

        width:
          '16%',

        sortable:
          true,
      },

      {
        key:
          'transactionTypeLabel',

        header:
          'Transaction Type',

        width:
          '18%',
      },

      {
        key:
          'membershipNumber',

        header:
          'Membership No.',

        width:
          '12%',

        sortable:
          true,
      },

      {
        key:
          'customerName',

        header:
          'Customer Name',

        width:
          '16%',

        sortable:
          true,
      },

      {
        key:
          'branch',

        header:
          'Branch',

        width:
          '11%',
      },

      {
        key:
          'escalationLevel',

        header:
          'Level',

        width:
          '9%',
      },

      {
        key:
          'escalatedTo',

        header:
          'Escalated To',

        width:
          '13%',
      },

      {
        key:
          'escalatedDateLabel',

        header:
          'Escalated Date',

        width:
          '12%',

        sortable:
          true,
      },

      {
        key:
          'statusLabel',

        header:
          'Status',

        width:
          '9%',

        sortable:
          true,
      },

    ];


  constructor() {
    super();
  }


  // ==================================================
  // DESTROY
  // ==================================================

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
  // SEARCH
  // ==================================================

  protected search():
    void {

    this.dateError =
      '';


    // ================================================
    // MODULE REQUIRED
    // ================================================

    if (
      !this.filters.module
    ) {

      this.showError(
        'Module is required.',
      );

      return;
    }


    // ================================================
    // DATE VALIDATION
    // ================================================

    if (
      this.filters.periodFrom &&
      this.filters.periodTo &&
      this.filters.periodFrom >
        this.filters.periodTo
    ) {

      this.dateError =
        'Period To cannot be earlier than Period From.';


      this.results =
        [];


      this.hasSearched =
        false;


      return;
    }


    // ================================================
    // FILTER
    // ================================================

    const filtered =
      escalatedAlertRecords
        .filter(
          record =>
            this.matchesFilters(
              record,
            ),
        );


    this.results =
      this.toRows(
        filtered,
      );


    this.hasSearched =
      true;
  }


  // ==================================================
  // FILTER RECORD
  // ==================================================

  private matchesFilters(
    record:
      EscalatedAlertRecord,
  ): boolean {

    // ================================================
    // MODULE
    // ================================================

    if (
      record.module !==
        this.filters.module
    ) {

      return false;
    }


    // ================================================
    // TRANSACTION TYPE
    // ================================================

    if (
      this.filters.transactionType !==
        'all' &&
      record.transactionType !==
        this.filters.transactionType
    ) {

      return false;
    }


    // ================================================
    // REFERENCE NUMBER
    // ================================================

    const reference =
      this.filters
        .referenceNumber
        .trim()
        .toLowerCase();


    if (
      reference &&
      !record
        .referenceNumber
        .toLowerCase()
        .includes(
          reference,
        )
    ) {

      return false;
    }


    // ================================================
    // PERIOD FROM
    // ================================================

    if (
      this.filters.periodFrom &&
      record.escalatedDate <
        this.filters.periodFrom
    ) {

      return false;
    }


    // ================================================
    // PERIOD TO
    // ================================================

    if (
      this.filters.periodTo &&
      record.escalatedDate >
        this.filters.periodTo
    ) {

      return false;
    }


    return true;
  }


  // ==================================================
  // TABLE ROWS
  // ==================================================

  private toRows(
    records:
      EscalatedAlertRecord[],
  ): EscalatedAlertTableRow[] {

    return records.map(
      (
        record,
        index,
      ) => ({

        ...record,

        slNo:
          index + 1,

        moduleLabel:
          this.getOptionLabel(
            escalatedAlertModuleOptions,
            record.module,
          ),

        transactionTypeLabel:
          this.getOptionLabel(
            escalatedAlertTransactionTypeOptions,
            record.transactionType,
          ),

        escalatedDateLabel:
          this.formatDate(
            record.escalatedDate,
          ),

        statusLabel:
          this.getStatusLabel(
            record.status,
          ),
      }),
    );
  }


  // ==================================================
  // OPTION LABEL
  // ==================================================

  private getOptionLabel(
    options:
      EscalatedAlertOption[],

    value:
      string,
  ): string {

    return (
      options.find(
        option =>
          option.value ===
          value,
      )?.label ??
      value
    );
  }


  // ==================================================
  // STATUS
  // ==================================================

  private getStatusLabel(
    status:
      EscalatedAlertRecord[
        'status'
      ],
  ): string {

    switch (
      status
    ) {

      case 'pending':
        return 'Pending';

      case 'reviewed':
        return 'Reviewed';

      case 'closed':
        return 'Closed';

      default:
        return status;
    }
  }


  // ==================================================
  // DATE
  // ==================================================

  private formatDate(
    value:
      string,
  ): string {

    if (!value) {
      return '—';
    }


    const date =
      new Date(
        `${value}T00:00:00`,
      );


    if (
      Number.isNaN(
        date.getTime(),
      )
    ) {

      return value;
    }


    return date
      .toLocaleDateString(
        'en-GB',
        {
          day:
            '2-digit',

          month:
            'short',

          year:
            'numeric',
        },
      );
  }


  // ==================================================
  // ERROR TOAST
  // ==================================================

  private showError(
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
      type:
        'error',

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


  // ==================================================
  // CLOSE TOAST
  // ==================================================

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