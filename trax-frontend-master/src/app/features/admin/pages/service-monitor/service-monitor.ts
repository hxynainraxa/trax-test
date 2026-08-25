import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

import {
  CommonModule,
} from '@angular/common';

import {
  LucideDynamicIcon,
  LucidePower,
  LucideRefreshCw,
  LucideSettings,
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


// ==================================================
// SERVICE STATUS
// ==================================================

interface ServiceStatusItem {
  id: string;
  name: string;
  isUp: boolean;
}


// ==================================================
// LOG ROW
// ==================================================

interface ServiceLogRow {
  id: number;
  slNo: number;
  error: string;
  date: string;
}


@Component({
  selector: 'app-service-monitor',

  standalone: true,

  imports: [
    CommonModule,
    LucideDynamicIcon,
    SharedTableComponent,
  ],

  templateUrl:
    './service-monitor.html',

  /*
   * IMPORTANT:
   *
   * Existing Dashboard SCSS is intentionally
   * reused here.
   *
   * This gives us the same:
   * - heading
   * - table card
   * - title
   * - refresh button
   *
   * without redesigning those components.
   */
  styleUrls: [
    '../dashboard/dashboard.scss',
    './service-monitor.scss',
  ],

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class ServiceMonitor
  extends BasePage
{
  // ==================================================
  // ICONS
  // ==================================================

  protected readonly serviceIcon =
    LucideSettings;

  protected readonly powerIcon =
    LucidePower;

  protected readonly refreshIcon =
    LucideRefreshCw;


  // ==================================================
  // SERVICES
  // ==================================================

  protected services:
    ServiceStatusItem[] = [

      {
        id: 'aml',
        name: 'AML Service',
        isUp: true,
      },

      {
        id: 'blacklist',
        name: 'Blacklist Service',
        isUp: true,
      },

      {
        id: 'apache',
        name: 'Apache Service',
        isUp: true,
      },

      {
        id: 'solr',
        name: 'Solr Service',
        isUp: true,
      },

    ];


  // ==================================================
  // LOG TABLE COLUMNS
  // ==================================================

  protected readonly logColumns:
    SharedTableColumn<ServiceLogRow>[] = [

      {
        key: 'slNo',
        header: 'Sl.No',
        width: '9%',
        searchable: false,
      },

      {
        key: 'error',
        header: 'Error',
        width: '68%',
      },

      {
        key: 'date',
        header: 'Date',
        width: '23%',
        searchable: false,
      },

    ];


  // ==================================================
  // AML SERVICE LOG
  // ==================================================

  protected readonly amlServiceLogs:
    ServiceLogRow[] = [

      {
        id: 1,
        slNo: 1,

        error:
          'Error in creation of Risk violation with ref : 26100130000140Message : Previous transaction risk not calculated',

        date:
          '8/17/2026 12:11:58 PM',
      },

      {
        id: 2,
        slNo: 2,

        error:
          'Error in creation of Risk violation with ref : 26100130000134Message : Previous transaction risk not calculated',

        date:
          '8/17/2026 10:42:24 AM',
      },

      {
        id: 3,
        slNo: 3,

        error:
          'Error in creation of Risk violation with ref : 26100130000123Message : Previous transaction risk not calculated',

        date:
          '8/13/2026 3:45:26 PM',
      },

      {
        id: 4,
        slNo: 4,

        error:
          'Error in creation of Risk violation with ref : 26100130000121Message : Previous transaction risk not calculated',

        date:
          '8/13/2026 3:45:14 PM',
      },

      {
        id: 5,
        slNo: 5,

        error:
          'AML_interfaceId : 0 - System.NullReferenceException: Object reference not set to an instance of an object. at MessageBox.Show(String Ex, String CmdText) at TransactionSP.FetchTransactionForScreening() at SymexAMLService.SymexTraxExecutor.UploadInterface()',

        date:
          '8/7/2026 4:23:02 PM',
      },

      {
        id: 6,
        slNo: 6,

        error:
          'AML_interfaceId : 0 - System.NullReferenceException: Object reference not set to an instance of an object. at MessageBox.Show(String Ex, String CmdText) at TransactionSP.FetchTransactionForScreening() at SymexAMLService.SymexTraxExecutor.UploadInterface()',

        date:
          '4/24/2026 10:06:04 PM',
      },

      {
        id: 7,
        slNo: 7,

        error:
          'AML_interfaceId : 0 - System.NullReferenceException: Object reference not set to an instance of an object. at MessageBox.Show(String Ex, String CmdText) at TransactionSP.FetchTransactionForScreening() at SymexAMLService.SymexTraxExecutor.UploadInterface()',

        date:
          '4/3/2026 4:21:53 PM',
      },

      {
        id: 8,
        slNo: 8,

        error:
          'AML_interfaceId : 0 - System.NullReferenceException: Object reference not set to an instance of an object. at MessageBox.Show(String Ex, String CmdText) at TransactionSP.FetchTransactionForScreening() at SymexAMLService.SymexTraxExecutor.UploadInterface()',

        date:
          '3/6/2026 4:22:09 PM',
      },

      {
        id: 9,
        slNo: 9,

        error:
          'AML_interfaceId : 0 - System.NullReferenceException: Object reference not set to an instance of an object. at MessageBox.Show(String Ex, String CmdText) at TransactionSP.FetchTransactionForScreening() at SymexAMLService.SymexTraxExecutor.UploadInterface()',

        date:
          '11/1/2025 5:31:07 AM',
      },

      {
        id: 10,
        slNo: 10,

        error:
          'Error in creation of Risk violation with ref : 25103050000007Message : Previous transaction risk not calculated',

        date:
          '10/10/2025 5:18:25 PM',
      },

    ];


  // ==================================================
  // BLACKLIST LOG
  //
  // Empty intentionally for now.
  // ==================================================

  protected readonly blacklistServiceLogs:
    ServiceLogRow[] = [];


  // ==================================================
  // TOGGLE SERVICE
  // ==================================================

  protected toggleService(
    service: ServiceStatusItem,
  ): void {

    service.isUp =
      !service.isUp;
  }


  // ==================================================
  // REFRESH AML LOG
  // ==================================================

  protected refreshAmlLogs(): void {
    /*
     * UI only for now.
     *
     * Later:
     * call AML service-log API here.
     */
  }


  // ==================================================
  // REFRESH BLACKLIST LOG
  // ==================================================

  protected refreshBlacklistLogs(): void {
    /*
     * UI only for now.
     *
     * Later:
     * call Blacklist service-log API here.
     */
  }
}