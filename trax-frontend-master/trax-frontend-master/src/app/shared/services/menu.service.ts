import {
  Injectable,
} from '@angular/core';

import {
  LucideChartNoAxesColumnIncreasing,
  LucideChartPie,
  LucideCircle,
  LucideCopy,
  LucideInbox,
  LucideLayers3,
  LucideLifeBuoy,
} from '@lucide/angular';

import {
  UserType,
} from '../enums/shared.enums';

import {
  SidebarMenuItem,
} from '../interfaces/shared.interfaces';


@Injectable({
  providedIn: 'root',
})
export class MenuService {

  // ==================================================
  // MENU
  // ==================================================

  private readonly allMenuItems:
    SidebarMenuItem[] = [

      // ==================================================
      // DASHBOARD
      // ==================================================

      {
        id: 'dashboard',

        label: 'Dashboard',

        icon:
          LucideChartNoAxesColumnIncreasing,

        route:
          '/admin/dashboard',

        roles: [
          UserType.ADMIN,
          UserType.MANAGER,
          UserType.USER,
        ],

        children: [

          this.node(
            'dashboard-home',
            'Dashboard',
            [],
            '/admin/dashboard',
          ),

          this.node(
            'service-monitor',
            'Service Monitor',
            [],
            '/admin/service-monitor',
          ),

        ],
      },


      // ==================================================
      // SCREENING
      // ==================================================

      {
        id: 'screening',

        label: 'Screening',

        icon:
          LucideInbox,

        route:
          '/admin/screening',

        roles: [
          UserType.ADMIN,
          UserType.MANAGER,
        ],

        children: [

          // ================================================
          // NAME SCREENING
          // ================================================

          this.node(
            'name-screening',
            'Name Screening',
            [],
            '/admin/screening',
          ),


          // ================================================
          // TRANSACTION SCREENING
          // ================================================

          this.node(
            'transaction-screening',
            'Transaction Screening',
            [],
            '/admin/transaction-screening',
          ),


          // ================================================
          // LIST MANAGEMENT
          // ================================================

          this.node(
            'list-management',
            'List Management',

            [

              this.node(
                'list',
                'List',
                [],
                '/admin/list-management/list',
              ),

              this.node(
                'entry-to-list',
                'Entry To List',
                [],
                '/admin/list-management/entry-to-list',
              ),

              this.node(
                'entry-to-list-approve',
                'Entry To List Approve',
                [],
                '/admin/list-management/entry-to-list-approve',
              ),

              this.node(
                'white-list',
                'White List',
                [],
                '/admin/list-management/white-list',
              ),

              this.node(
                'white-list-approve',
                'White List Approve',
                [],
                '/admin/list-management/white-list-approve',
              ),

              this.node(
                'noise-master',
                'Noise Master',
                [],
                '/admin/list-management/noise-master',
              ),

            ],

            '/admin/list-management/list',
          ),

        ],
      },


      // ==================================================
      // TRANSACTION MONITORING
      // ==================================================

      {
        id:
          'transaction-monitoring',

        label:
          'Transaction Monitoring',

        icon:
          LucideLayers3,

        route:
          '/admin/transaction-monitoring/create-rule',

        roles: [
          UserType.ADMIN,
          UserType.MANAGER,
        ],

        children: [

          this.node(
            'create-rule',
            'Create Rule',
            [],
            '/admin/transaction-monitoring/create-rule',
          ),

          this.node(
            'daily-rule-violation',
            'Daily Rule Violation',
            [],
            '/admin/transaction-monitoring/daily-rule-violation',
          ),

          this.node(
            'clear-violation',
            'Clear Violation',
            [],
            '/admin/transaction-monitoring/clear-violation',
          ),

        ],
      },


      // ==================================================
      // RISK MANAGEMENT
      // ==================================================

      {
        id:
          'risk-management',

        label:
          'Risk Management',

        icon:
          LucideCopy,

        route:
          '/admin/risk-management/customer-risk/risk-score-settings',

        roles: [
          UserType.ADMIN,
          UserType.MANAGER,
        ],

        children: [

          // ================================================
          // CUSTOMER RISK
          // ================================================

          this.node(
            'customer-risk',
            'Customer Risk',

            [

              this.node(
                'risk-score-settings',
                'Risk Score Settings',
                [],
                '/admin/risk-management/customer-risk/risk-score-settings',
              ),

              this.node(
                'individual-risk-rating',
                'Individual Risk Rating',
                [],
                '/admin/risk-management/customer-risk/individual-risk-rating',
              ),

              this.node(
                'corporate-risk-rating',
                'Corporate Risk Rating',
                [],
                '/admin/risk-management/customer-risk/corporate-risk-rating',
              ),

              this.node(
                'customer-risk-verification',
                'Customer Risk Verification',
                [],
                '/admin/risk-management/customer-risk/customer-risk-verification',
              ),

            ],

            '/admin/risk-management/customer-risk/risk-score-settings',
          ),


          // ================================================
          // VENDOR RISK
          // ================================================

          this.node(
            'vendor-risk',
            'Vendor Risk',
          ),

        ],
      },


      // ==================================================
      // CASE MANAGEMENT
      // ==================================================

      {
        id:
          'case-management',

        label:
          'Case Management',

        icon:
          LucideChartPie,

        route:
          '/admin/case-management/case-creation',

        roles: [
          UserType.ADMIN,
          UserType.MANAGER,
        ],

        children: [

          // ================================================
          // CASE CREATION
          // ================================================

          this.node(
            'case-creation',
            'Case Creation',
            [],
            '/admin/case-management/case-creation',
          ),


          // ================================================
          // SUPPORTING DOCUMENTS
          // ================================================

          this.node(
            'supporting-documents',
            'Supporting Documents',

            [

              this.node(
                'support-documents',
                'Support Documents',
                [],
                '/admin/case-management/supporting-documents/support-documents',
              ),

              this.node(
                'followup-support-documents',
                'Followup Support Documents',
                [],
                '/admin/case-management/supporting-documents/followup-support-documents',
              ),

              this.node(
                'view-by-membership-number',
                'View By Membership Number',
                [],
                '/admin/case-management/supporting-documents/view-by-membership-number',
              ),

            ],

            '/admin/case-management/supporting-documents/support-documents',
          ),

        ],
      },


      // ==================================================
      // ESCALATION
      // ==================================================

      {
        id:
          'escalation',

        label:
          'Escalation',

        icon:
          LucideLifeBuoy,

        route:
          '/admin/escalation/escalation-hierarchy',

        roles: [
          UserType.ADMIN,
          UserType.MANAGER,
        ],

        children: [

          this.node(
            'escalation-hierarchy',
            'Escalation Hierarchy',
            [],
            '/admin/escalation/escalation-hierarchy',
          ),

          this.node(
            'escalated-alerts',
            'Escalated Alerts',
            [],
            '/admin/escalation/escalated-alerts',
          ),

        ],
      },


      // ==================================================
      // ADMINISTRATION
      // ==================================================

      {
        id:
          'administration',

        label:
          'Administration',

        icon:
          LucideLifeBuoy,

        /*
         * Clicking the main Administration sidebar
         * item opens the first User Management page.
         */
        route:
          '/admin/administration/user-management/department',

        roles: [
          UserType.ADMIN,
        ],

        children: [

          // ================================================
          // USER MANAGEMENT
          // ================================================

          this.node(
            'user-management',
            'User Management',

            [

              // ============================================
              // DEPARTMENT
              // ============================================

              this.node(
                'department',
                'Department',
                [],
                '/admin/administration/user-management/department',
              ),


              // ============================================
              // DESIGNATION
              // ============================================

              this.node(
                'designation',
                'Designation',
                [],
                '/admin/administration/user-management/designation',
              ),


              // ============================================
              // ROLE
              // ============================================

              this.node(
                'role',
                'Role',
                [],
                '/admin/administration/user-management/role',
              ),


              // ============================================
              // USER
              // ============================================

            this.node(
              'user',
              'User',
              [],
              '/admin/administration/user-management/user',
            ),


              // ============================================
              // PRIVILEGE
              // ============================================

              this.node(
                'privilege',
                'Privilege',
                [],
                '/admin/administration/user-management/privilege',
              ),

              // ============================================
              // USER PRIVILEGE
              // ============================================

              this.node(
                'user-privilege',
                'User Privilege',
                [],
                '/admin/administration/user-management/user-privilege',
              ),


              // ============================================
              // CHANGE PASSWORD
              // ============================================

              this.node(
                'change-password',
                'Change Password',
                [],
                '/admin/administration/user-management/change-password',
              ),

              this.node(
                'reset-user-password',
                'Reset User Password',
                [],
                '/admin/administration/user-management/reset-user-password',
              ),

            ],

            '/admin/administration/user-management/department',
          ),


          // ================================================
          // CONFIGURATIONS
          // ================================================

this.node(
  'configurations',
  'Configurations',

  [
    this.node(
      'scheduler',
      'Scheduler',
      [],
      '/admin/administration/configurations/scheduler',
    ),

      this.node(
        'score-weightage-setting',
        'Score Weightage Setting',
        [],
        '/admin/administration/configurations/score-weightage-settings',
      ),

      this.node(
        'param-master',
        'Param Master',
        [],
        '/admin/administration/configurations/param-master',
      ),
  ],

  '/admin/administration/configurations/scheduler',
),


          // ================================================
          // MASTER DATA
          // ================================================

// ================================================
// MASTER DATA
// ================================================

this.node(
  'master-data',
  'Master Data',

  [
    // ============================================
    // EMPLOYEE
    // ============================================

    this.node(
      'employee',
      'Employee',
      [],
      '/admin/administration/master-data/employee',
    ),


    // ============================================
    // BENEFICIARY
    // ============================================

    this.node(
      'beneficiary',
      'Beneficiary',
      [],
      '/admin/administration/master-data/beneficiary',
    ),


    // ============================================
    // REPRESENTATIVE
    // ============================================

      this.node(
        'representative',
        'Representative',
        [],
        '/admin/administration/master-data/representative',
      ),


    // ============================================
    // EXCHANGE BRANCHES
    // ============================================

        this.node(
          'exchange-branches',
          'Exchange Branches',
          [],
          '/admin/administration/master-data/exchange-branches',
        ),

    // ============================================
    // ID TYPES
    // ============================================

      this.node(
        'id-types',
        'ID Types',
        [],
        '/admin/administration/master-data/id-types',
      ),




    // ============================================
    // REMITTANCE PURPOSE
    // ============================================

      this.node(
        'remittance-purpose',
        'Remittance Purpose',
        [],
        '/admin/administration/master-data/remittance-purpose',
      ),

    // ============================================
    // SOURCE OF INCOME
    // ============================================

      this.node(
        'source-of-income',
        'Source Of Income',
        [],
        '/admin/administration/master-data/source-of-income',
      ),


    // ============================================
    // BANKS / AGENTS
    // ============================================

      this.node(
        'banks-agents',
        'Banks / Agents',
        [],
        '/admin/administration/master-data/banks-agents',
      ),


    // ============================================
    // BENEFICIARY BANKS / AGENTS
    // ============================================

      this.node(
        'beneficiary-banks-agents',
        'Beneficiary Banks / Agents',
        [],
        '/admin/administration/master-data/beneficiary-banks-agents',
      ),


    // ============================================
    // CURRENCY
    // ============================================

      this.node(
        'currency',
        'Currency',
        [],
        '/admin/administration/master-data/currency',
      ),


    // ============================================
    // SUSPICIOUS WORDS
    // ============================================

      this.node(
        'suspicious-words',
        'Suspicious Words',
        [],
        '/admin/administration/master-data/suspicious-words',
      ),


    // ============================================
    // GEOGRAPHIC GROUPS
    // ============================================

      this.node(
        'geographic-groups',
        'Geographic Groups',
        [],
        '/admin/administration/master-data/geographic-groups',
      ),


    // ============================================
    // DRUG TRAFFICKING COUNTRIES
    // ============================================

    this.node(
      'drug-trafficking-countries',
      'Drug Trafficking Countries',
      [],
      '/admin/administration/master-data/drug-trafficking-countries',
    ),

    // ============================================
    // EMBARGOED COUNTRIES
    // ============================================

      this.node(
        'embargoed-countries',
        'Embargoed Countries',
        [],
        '/admin/administration/master-data/embargoed-countries',
       ),


    // ============================================
    // GOOD LISTS
    // ============================================

      this.node(
        'goods-list',
        'Goods List',
        [],
        '/admin/administration/master-data/goods-list',
      ),
  ],

  /*
   * IMPORTANT:
   *
   * Clicking Master Data itself
   * opens Employee.
   */
  '/admin/administration/master-data/employee',
),


          // ================================================
          // RISK MASTERS
          // ================================================

          this.node(
            'risk-masters',
            'Risk Masters',

            [

              this.node(
                'company-type-risk',
                'Company Type Risks',
                [],
                '/admin/administration/risk-masters/company-type-risk',
              ),

              this.node(
                'company-sub-type-risk',
                'Company Sub Type Risks',
                [],
                '/admin/administration/risk-masters/company-sub-type-risk',
              ),

              this.node(
                'nature-of-business-risk',
                'Nature of Business Risk',
                [],
                '/admin/administration/risk-masters/nature-of-business-risk',
              ),

              this.node(
                'occupation-risk',
                'Occupation Risk',
                [],
                '/admin/administration/risk-masters/occupation-risk',
              ),

              this.node(
                'profile-risk',
                'Profile Risk',
                [],
                '/admin/administration/risk-masters/profile-risk',
              ),

                this.node(
                  'risk-transaction-frequency',
                  'Risk Transaction Frequency',
                  [],
                  '/admin/administration/risk-masters/risk-transaction-frequency',
                ),
                this.node(
                  'transaction-amount-risk-score',
                  'Transaction Amount Risk Score',
                  [],
                  '/admin/administration/risk-masters/transaction-amount-risk-score',
                ),
                this.node(
                  'transaction-types',
                  'Transaction Types',
                  [],
                  '/admin/administration/risk-masters/transaction-type',
                ),

                this.node(
                  'remitter-type-risk-score',
                  'Remitter Type Risk Score',
                  [],
                  '/admin/administration/risk-masters/remitter-type-risk-score',
                ),

                this.node(
                  'country-risk',
                  'Country',
                  [],
                  '/admin/administration/risk-masters/country',
                ),

                  this.node(
                    'service-type-risk',
                    'Service Type / Counterparty Risk',
                    [],
                    '/admin/administration/risk-masters/service-type',
                  ),

                  this.node(
                    'delivery-channel',
                    'Delivery Channel',
                    [],
                    '/admin/administration/risk-masters/delivery-channel',
                  ),

            ],
             '/admin/administration/risk-masters/company-type-risk',
          ),

        ],
      },


      // ==================================================
      // REPORTS
      // ==================================================

      {
        id:
          'reports',

        label:
          'Reports',

        icon:
          LucideChartPie,

        roles: [
          UserType.ADMIN,
          UserType.MANAGER,
        ],

        children: [

          // ================================================
          // TRANSACTION REPORTS
          // ================================================

          this.node(
            'transaction-reports',
            'Transaction Reports',

            [

              this.node(
                'transaction-summary-report',
                'Transaction Summary Report',
              ),

              this.node(
                'transaction-register',
                'Transaction Register',
              ),

              this.node(
                'transaction-wise-member-report',
                'Transaction Wise Member Report',
              ),

              this.node(
                'top-customer-sending-transaction',
                'Top Cust. Sending Tran.',
              ),

              this.node(
                'top-beneficiary-receiving-transaction',
                'Top Benef. Receiving Tran.',
              ),

              this.node(
                'fx-transaction-report',
                'FX Transaction Report',
              ),

              this.node(
                'combined-transaction-report',
                'Combined Transaction Report',
              ),

              this.node(
                'customer-risk-based-transaction-report',
                'Customer Risk based Transaction Report',
              ),

              this.node(
                'single-transaction-report',
                'Single Transaction Report',
              ),

              this.node(
                'transaction-type-activity-report',
                'Transaction Type Activity Report',
              ),

              this.node(
                'audit-report-transactions',
                'Audit Report - Transactions',
              ),

            ],
          ),


          // ================================================
          // VIOLATION REPORTS
          // ================================================

          this.node(
            'violation-reports',
            'Violation Reports',

            [

              this.node(
                'rule-violation-report',
                'Rule Violation Report',
              ),

              this.node(
                'case-violation-report',
                'Case Violation Report',
              ),

              this.node(
                'risk-violation-report',
                'Risk Violation Report',
              ),

              this.node(
                'violation-report',
                'Violation Reports',
              ),

              this.node(
                'blacklist-violation-report',
                'Blacklist Violation Report',
              ),

              this.node(
                'followup-violation-report',
                'Followup Violation Report',
              ),

              this.node(
                'case-expiry-report',
                'Case Expiry Report',
              ),

            ],
          ),


          // ================================================
          // STR / ISTR REPORTS
          // ================================================

          this.node(
            'str-istr-reports',
            'STR/ISTR Reports',

            [

              this.node(
                'suspicious-word-report',
                'Suspicious Word Report',
              ),

              this.node(
                'str-submitted-report',
                'STR Submitted Report',
              ),

            ],
          ),


          // ================================================
          // WATCHLIST REPORTS
          // ================================================

          this.node(
            'watchlist-reports',
            'Watchlist Reports',

            [

              this.node(
                'entry-to-list-report',
                'Entry To List Report',
              ),

              this.node(
                'watchlist-updated-report',
                'WatchList Updated Report',
              ),

              this.node(
                'customer-watchlist-report',
                'Customer Watchlist Report',
              ),

              this.node(
                'pep-log-report',
                'PEP Log Report',
              ),

            ],
          ),


          // ================================================
          // OTHER REPORTS
          // ================================================

          this.node(
            'other-reports',
            'Other Reports',

            [

              this.node(
                'master-report',
                'Master Report',
              ),

              this.node(
                'member-report',
                'Member Report',
              ),

              this.node(
                'status-report',
                'Status Report',
              ),

              this.node(
                'cid-cdd-edd-report',
                'CID/CDD/EDD Report',
              ),

              this.node(
                'remittance-volume-report',
                'Remittance Volume Report',
              ),

              this.node(
                'above-threshold',
                'Above Threshold',
              ),

              this.node(
                'single-sender-multiple-beneficiary',
                'Single Sender To Multiple Benef.',
              ),

              this.node(
                'inward-remittance-report',
                'Inward Remittance Report',
              ),

              this.node(
                'activity-report-correspondent',
                'Activity Report Correspondent',
              ),

              this.node(
                'search-referral-list',
                'Search Referral List',
              ),

              this.node(
                'audit-report',
                'Audit Report',
              ),

              this.node(
                'error-log-report',
                'Error Log Report',
              ),

              this.node(
                'risk-movement-report',
                'Risk Movement Report',
              ),

            ],
          ),


          // ================================================
          // ANALYSIS REPORTS
          // ================================================

          this.node(
            'analysis-reports',
            'Analysis Reports',

            [

              this.node(
                'analysis-blacklist-violation',
                'Black List Violation',
              ),

              this.node(
                'analysis-rule-violation',
                'Rule Violation',
              ),

              this.node(
                'monthly-rule-violation',
                'Monthly Rule Violation',
              ),

              this.node(
                'branch-wise-rule-violation',
                'Branch Wise Rule Violation',
              ),

              this.node(
                'customer-wise-rule-violation',
                'Customer Wise Rule Violation',
              ),

              this.node(
                'analysis-risk-violation',
                'Risk Violation',
              ),

              this.node(
                'analysis-case-violation',
                'Case Violation',
              ),

            ],
          ),

        ],
      },

    ];


  // ==================================================
  // NESTED MENU HELPER
  // ==================================================

  private node(
    id:
      string,

    label:
      string,

    children:
      SidebarMenuItem[] = [],

    route?:
      string,
  ): SidebarMenuItem {

    const item:
      SidebarMenuItem = {

      id,

      label,

      /*
       * Your nested sidebar HTML does not render
       * this icon anymore, but SidebarMenuItem
       * still expects an icon.
       */
      icon:
        LucideCircle,
    };


    if (
      route
    ) {

      item.route =
        route;
    }


    if (
      children.length > 0
    ) {

      item.children =
        children;
    }


    return item;
  }


  // ==================================================
  // GET MENU
  // ==================================================

  getMenu(
    role:
      UserType | string,
  ): SidebarMenuItem[] {

    if (
      !role
    ) {

      return [];
    }


    return this.filterMenuByRole(
      this.allMenuItems,
      role,
    );
  }


  // ==================================================
  // FILTER MENU BY ROLE
  // ==================================================

  private filterMenuByRole(
    items:
      SidebarMenuItem[],

    role:
      UserType | string,
  ): SidebarMenuItem[] {

    const filtered:
      SidebarMenuItem[] = [];


    for (
      const item of items
    ) {

      if (
        !this.hasRoleAccess(
          item,
          role,
        )
      ) {

        continue;
      }


      let filteredChildren:
        SidebarMenuItem[] = [];


      if (
        item.children &&
        item.children.length > 0
      ) {

        filteredChildren =
          this.filterMenuByRole(
            item.children,
            role,
          );
      }


      filtered.push({

        ...item,

        children:
          filteredChildren.length > 0
            ? filteredChildren
            : [],
      });
    }


    return filtered;
  }


  // ==================================================
  // ROLE ACCESS
  // ==================================================

  private hasRoleAccess(
    item:
      SidebarMenuItem,

    role:
      UserType | string,
  ): boolean {

    if (
      !item.roles ||
      item.roles.length === 0
    ) {

      return true;
    }


    return item.roles.includes(
      role as UserType,
    );
  }
}