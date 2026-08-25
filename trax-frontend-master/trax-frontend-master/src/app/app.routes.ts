import { Routes } from '@angular/router';

import { AccountBlocked } from './auth/account-blocked/account-blocked';

import { Login } from './auth/login/login';

import { AdminComponent } from './features/admin/admin-page.component';

import { Authenticator } from './auth/auth-process/authenticator/authenticator';

import { GoogleAuthenticator } from './auth/auth-process/google-authenticator/google-authenticator';

import { OtpAuthenticator } from './auth/auth-process/otp-authenticator/otp-authenticator';

import { Dashboard } from './features/admin/pages/dashboard/dashboard';

import { Screening } from './features/admin/pages/screening/screening';

import { ServiceMonitor } from './features/admin/pages/service-monitor/service-monitor';

import { TransactionScreening } from './features/admin/pages/transaction-screening/transaction-screening';

import { ListManagementList } from './features/admin/pages/list-management/list/list';

import { EntryToList } from './features/admin/pages/list-management/entry-to-list/entry-to-list';

import { EntryToListApprove } from './features/admin/pages/list-management/entry-to-list-approve/entry-to-list-approve';

import { WhiteList } from './features/admin/pages/list-management/white-list/white-list';

import { WhiteListApprove } from './features/admin/pages/list-management/white-list-approve/white-list-approve';

import { NoiseMaster } from './features/admin/pages/list-management/noise-master/noise-master';
import { CreateRule } from './features/admin/pages/transaction-monitoring/create-rule/create-rule';
import { DailyRuleViolation } from './features/admin/pages/transaction-monitoring/daily-rule-violation/daily-rule-violation';
import { ClearViolation } from './features/admin/pages/transaction-monitoring/clear-violation/clear-violation';
import { RiskScoreSettings } from './features/admin/pages/risk-management/customer-risk/risk-score-settings/risk-score-settings';
import { IndividualRiskRating } from './features/admin/pages/risk-management/customer-risk/individual-risk-rating/individual-risk-rating';
import { CorporateRiskRating } from './features/admin/pages/risk-management/customer-risk/corporate-risk-rating/corporate-risk-rating';
import { CustomerRiskVerification } from './features/admin/pages/risk-management/customer-risk/customer-risk-verification/customer-risk-verification';
import { CaseCreation } from './features/admin/pages/case-management/case-creation/case-creation';
import { SupportDocuments } from './features/admin/pages/case-management/supporting-documents/support-documents/support-documents';
import { ViewByMembershipNumber } from './features/admin/pages/case-management/supporting-documents/view-by-membership-number/view-by-membership-number';
import { FollowupSupportDocuments } from './features/admin/pages/case-management/supporting-documents/followup-support-documents/followup-support-documents';
import { EscalationHierarchy } from './features/admin/pages/escalations/escalation-hierarchy/escalation-hierarchy';
import { EscalatedAlerts } from './features/admin/pages/escalations/escalated-alerts/escalated-alerts';
import { Department } from './features/admin/pages/administration/user-management/department/department';
import { Designation } from './features/admin/pages/administration/user-management/designation/designation';
import { Role } from './features/admin/pages/administration/user-management/role/role';
import { User } from './features/admin/pages/administration/user-management/user/user';
import { Privilege } from './features/admin/pages/administration/user-management/privilege/privilege';
import { UserPrivilege } from './features/admin/pages/administration/user-management/user-privilege/user-privilege';
import { ResetUserPassword } from './features/admin/pages/administration/user-management/reset-user-password/reset-user-password';
import { ChangePassword } from './features/admin/pages/administration/user-management/change-password/change-password';
import { Scheduler } from './features/admin/pages/administration/configurations/scheduler/scheduler';
import { ScoreWeightageSettings } from './features/admin/pages/administration/configurations/score-weightage-settings/score-weightage-settings';
import { ParamMaster } from './features/admin/pages/administration/configurations/param-masters/param-master';
import { Employee } from './features/admin/pages/administration/master-data/employee/employee';
import { Beneficiary } from './features/admin/pages/administration/master-data/beneficiary/beneficiary';
import { Representative } from './features/admin/pages/administration/master-data/representative/representative';
import { ExchangeBranches } from './features/admin/pages/administration/master-data/exchange-branches/exchange-branches';
import { RemittancePurpose } from './features/admin/pages/administration/master-data/remittance-purpose/remittance-purpose';
import { IdType } from './features/admin/pages/administration/master-data/id-type/id-type';
import { SourceOfIncome } from './features/admin/pages/administration/master-data/source-of-income/source-of-income';
import { BanksAgents } from './features/admin/pages/administration/master-data/banks-agents/banks-agents';
import { Currency } from './features/admin/pages/administration/master-data/currency/currency';
import { BeneficiaryBanksAgents } from './features/admin/pages/administration/master-data/beneficiary-banks-agents/beneficiary-banks-agents';
import { SuspiciousWords } from './features/admin/pages/administration/master-data/suspicious-words/suspicious-words';
import { GeographicGroups } from './features/admin/pages/administration/master-data/geographic-groups/geographic-groups';
import { DrugTraffickingCountries } from './features/admin/pages/administration/master-data/drug-trafficking-countries/drug-trafficking-countries';
import { EmbargoedCountries } from './features/admin/pages/administration/master-data/embargoed-countries/embargoed-countries';
import { GoodsList } from './features/admin/pages/administration/master-data/goods-list/goods-list';
import { CompanyTypeRisk } from './features/admin/pages/administration/risk-masters/company-type-risk/company-type-risk';
import { CompanySubTypeRisk } from './features/admin/pages/administration/risk-masters/company-sub-type-risk/company-sub-type-risk';
import { NatureOfBusinessRisk } from './features/admin/pages/administration/risk-masters/nature-of-business-risk/nature-of-business-risk';
import { OccupationRisk } from './features/admin/pages/administration/risk-masters/occupation-risk/occupation-risk';
import { ProfileRisk } from './features/admin/pages/administration/risk-masters/profile-risk/profile-risk';
import { RiskTransactionFrequency } from './features/admin/pages/administration/risk-masters/risk-transaction-frequency/risk-transaction-frequency';
import { TransactionAmountRiskScore } from './features/admin/pages/administration/risk-masters/transaction-amount-risk-score/transaction-amount-risk-score';
import { TransactionType } from './features/admin/pages/administration/risk-masters/transaction-type/transaction-type';
import { RemitterTypeRiskScore } from './features/admin/pages/administration/risk-masters/remitter-type-risk-score/remitter-type-risk-score';
import { CountryRisk } from './features/admin/pages/administration/risk-masters/country/country';
import { DeliveryChannelRisk } from './features/admin/pages/administration/risk-masters/delivery-channel/delivery-channel';
import { ServiceTypeRisk } from './features/admin/pages/administration/risk-masters/service-type/service-type';

export const routes: Routes = [
  // ==================================================
  // DEFAULT
  // ==================================================

  {
    path: '',

    redirectTo: '/login',

    pathMatch: 'full',
  },

  // ==================================================
  // AUTH
  // ==================================================

  {
    path: 'login',

    component: Login,
  },

  {
    path: 'account-blocked',

    component: AccountBlocked,
  },

  {
    path: 'auth-process/authenticator',

    component: Authenticator,
  },

  {
    path: 'auth-process/otp-authenticator',

    component: OtpAuthenticator,
  },

  {
    path: 'auth-process/google-authenticator',

    component: GoogleAuthenticator,
  },

  // ==================================================
  // ADMIN
  // ==================================================

  {
    path: 'admin',

    component: AdminComponent,

    children: [
      // ==============================================
      // DEFAULT ADMIN
      // ==============================================

      {
        path: '',

        redirectTo: 'dashboard',

        pathMatch: 'full',
      },

      // ==============================================
      // DASHBOARD
      // ==============================================

      {
        path: 'dashboard',

        component: Dashboard,
      },

      // ==============================================
      // SERVICE MONITOR
      // ==============================================

      {
        path: 'service-monitor',

        component: ServiceMonitor,
      },

      // ==============================================
      // SCREENING
      // ==============================================

      {
        path: 'screening',

        component: Screening,
      },

      // ==============================================
      // TRANSACTION SCREENING
      // ==============================================

      {
        path: 'transaction-screening',

        component: TransactionScreening,
      },

      // ==============================================
      // LIST MANAGEMENT
      // ==============================================

      {
        path: 'list-management/list',

        component: ListManagementList,
      },

      {
        path: 'list-management/entry-to-list',

        component: EntryToList,
      },

      {
        path: 'list-management/entry-to-list-approve',

        component: EntryToListApprove,
      },

      {
        path: 'list-management/white-list',

        component: WhiteList,
      },

      {
        path: 'list-management/white-list-approve',

        component: WhiteListApprove,
      },

      {
        path: 'list-management/noise-master',

        component: NoiseMaster,
      },

      // ==============================================
      // TRANSACTION MONITORING DEFAULT
      // ==============================================

      {
        path: 'transaction-monitoring',

        redirectTo: 'transaction-monitoring/create-rule',

        pathMatch: 'full',
      },

      // ==============================================
      // CREATE RULE
      // ==============================================

      {
        path: 'transaction-monitoring/create-rule',

        component: CreateRule,
      },
      // ==============================================
      // DAILY RULE VIOLATION
      // ==============================================

      {
        path: 'transaction-monitoring/daily-rule-violation',
        component: DailyRuleViolation,
      },

      {
        path: 'transaction-monitoring/clear-violation',

        component: ClearViolation,
      },
      // ==============================================
      // RISK MANAGEMENT DEFAULT
      // ==============================================

      {
        path: 'risk-management',

        redirectTo: 'risk-management/customer-risk/risk-score-settings',

        pathMatch: 'full',
      },

      // ==============================================
      // CUSTOMER RISK DEFAULT
      // ==============================================

      {
        path: 'risk-management/customer-risk',

        redirectTo: 'risk-management/customer-risk/risk-score-settings',

        pathMatch: 'full',
      },

      // ==============================================
      // RISK SCORE SETTINGS
      // ==============================================

      {
        path: 'risk-management/customer-risk/risk-score-settings',

        component: RiskScoreSettings,
      },

      {
        path: 'risk-management/customer-risk/individual-risk-rating',

        component: IndividualRiskRating,
      },
      {
        path: 'risk-management/customer-risk/corporate-risk-rating',

        component: CorporateRiskRating,
      },
      {
        path: 'risk-management/customer-risk/customer-risk-verification',

        component: CustomerRiskVerification,
      },
      // ==============================================
      // CASE MANAGEMENT DEFAULT
      // ==============================================

      {
        path: 'case-management',

        redirectTo: 'case-management/case-creation',

        pathMatch: 'full',
      },

      // ==============================================
      // CASE CREATION
      // ==============================================

      {
        path: 'case-management/case-creation',

        component: CaseCreation,
      },

      // ==============================================
      // SUPPORT DOCUMENTS
      // ==============================================

      {
        path: 'case-management/supporting-documents/support-documents',

        component: SupportDocuments,
      },

      // ==============================================
      // FOLLOWUP SUPPORT DOCUMENTS
      // ==============================================

      {
        path: 'case-management/supporting-documents/followup-support-documents',

        component: FollowupSupportDocuments,
      },

      // ==============================================
      // VIEW BY MEMBERSHIP NUMBER
      // ==============================================

      {
        path: 'case-management/supporting-documents/view-by-membership-number',

        component: ViewByMembershipNumber,
      },

      // ==============================================
      // ESCALATION DEFAULT
      // ==============================================

      {
        path: 'escalation',

        redirectTo: 'escalation/escalation-hierarchy',

        pathMatch: 'full',
      },

      // ==============================================
      // ESCALATION HIERARCHY
      // ==============================================

      {
        path: 'escalation/escalation-hierarchy',

        component: EscalationHierarchy,
      },
      // ==============================================
      // ESCALATED ALERTS
      // ==============================================

      {
        path: 'escalation/escalated-alerts',

        component: EscalatedAlerts,
      },

      // ==============================================
      // ADMINISTRATION DEFAULT
      // ==============================================

      {
        path: 'administration',

        redirectTo: 'administration/user-management/department',

        pathMatch: 'full',
      },

      // ==============================================
      // USER MANAGEMENT DEFAULT
      // ==============================================

      {
        path: 'administration/user-management',

        redirectTo: 'administration/user-management/department',

        pathMatch: 'full',
      },

      // ==============================================
      // DEPARTMENT
      // ==============================================

      {
        path: 'administration/user-management/department',

        component: Department,
      },
      {
        path: 'administration/user-management/designation',

        component: Designation,
      },
      {
        path: 'administration/user-management/role',

        component: Role,
      },
      {
        path: 'administration/user-management/user',

        component: User,
      },
      {
        path: 'administration/user-management/privilege',

        component: Privilege,
      },
      {
        path: 'administration/user-management/user-privilege',

        component: UserPrivilege,
      },
      {
        path: 'administration/user-management/change-password',

        component: ChangePassword,
      },

      {
        path: 'administration/user-management/reset-user-password',

        component: ResetUserPassword,
      },
      {
        path: 'administration/configurations/scheduler',

        component: Scheduler,
      },
      {
        path: 'administration/configurations/score-weightage-settings',

        component: ScoreWeightageSettings,
      },
      {
        path: 'administration/configurations/param-master',

        component: ParamMaster,
      },
      {
        path: 'administration/master-data/employee',

        component: Employee,
      },
      {
        path: 'administration/master-data/beneficiary',

        component: Beneficiary,
      },
      {
        path: 'administration/master-data/representative',

        component: Representative,
      },
      {
        path: 'administration/master-data/exchange-branches',

        component: ExchangeBranches,
      },
      {
        path: 'administration/master-data/id-types',

        component: IdType,
      },

      {
        path: 'administration/master-data/remittance-purpose',

        component: RemittancePurpose,
      },
      {
        path: 'administration/master-data/source-of-income',

        component: SourceOfIncome,
      },
      {
        path: 'administration/master-data/banks-agents',

        component: BanksAgents,
      },
      {
        path: 'administration/master-data/beneficiary-banks-agents',

        component: BeneficiaryBanksAgents,
      },

      {
        path: 'administration/master-data/currency',

        component: Currency,
      },
      {
        path: 'administration/master-data/suspicious-words',

        component: SuspiciousWords,
      },
      {
        path: 'administration/master-data/geographic-groups',

        component: GeographicGroups,
      },
      {
        path: 'administration/master-data/drug-trafficking-countries',

        component: DrugTraffickingCountries,
      },
      {
        path: 'administration/master-data/embargoed-countries',

        component: EmbargoedCountries,
      },
      {
        path: 'administration/master-data/goods-list',

        component: GoodsList,
      },
      {
        path: 'administration/risk-masters/company-type-risk',

        component: CompanyTypeRisk,
      },

      {
        path: 'administration/risk-masters/company-sub-type-risk',

        component: CompanySubTypeRisk,
      },

      {
        path: 'administration/risk-masters/nature-of-business-risk',

        component: NatureOfBusinessRisk,
      },
      {
        path: 'administration/risk-masters/occupation-risk',

        component: OccupationRisk,
      },
      {
        path: 'administration/risk-masters/profile-risk',

        component: ProfileRisk,
      },
      {
        path: 'administration/risk-masters/risk-transaction-frequency',

        component: RiskTransactionFrequency,
      },
      {
        path:
          'administration/risk-masters/transaction-amount-risk-score',

        component:
          TransactionAmountRiskScore,
      },
      {
        path:
          'administration/risk-masters/transaction-type',

        component:
          TransactionType,
      },
      {
        path:
          'administration/risk-masters/remitter-type-risk-score',

        component:
          RemitterTypeRiskScore,
      },
      {
        path:
          'administration/risk-masters/country',

        component:
          CountryRisk,
      },
        {
        path:
          'administration/risk-masters/service-type',

        component:
          ServiceTypeRisk,
      },

      {
        path:
          'administration/risk-masters/delivery-channel',

        component:
          DeliveryChannelRisk,
      },
    ],
  },

  // ==================================================
  // FALLBACK
  // ==================================================

  {
    path: '**',

    redirectTo: '/admin/dashboard',
  },
];
