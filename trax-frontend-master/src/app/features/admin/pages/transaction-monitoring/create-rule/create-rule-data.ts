// ==================================================
// TYPES
// ==================================================

export type RuleStatus =
  | 'all'
  | 'active'
  | 'inactive';


export type RuleType =
  | 'transaction-wise'
  | 'profile-rules';


export type EditRuleTypeFilter =
  | 'all'
  | RuleType;


export type SearchRuleType =
  | 'all'
  | 'transaction-wise'
  | 'profile-rules';


export type RuleProfileRisk =
  | 'all'
  | 'individual'
  | 'corporate';


export interface RuleOption {
  value: string;

  label: string;
}


// ==================================================
// SERVICES
// ==================================================

export const serviceOptions:
  RuleOption[] = [

    {
      value: 'all',
      label: 'All',
    },

    {
      value: 'inward-remittances',
      label: 'Inward Remittances',
    },

    {
      value: 'outward-remittances',
      label: 'Outward Remittances',
    },

    {
      value: 'inward-outward-remittances',
      label: 'Inward/Outward Remittances',
    },

    {
      value: 'fcy',
      label: 'FCY',
    },

    {
      value: 'inward-fc',
      label: 'Inward/FC',
    },

    {
      value: 'outward-fc',
      label: 'Outward/FC',
    },

  ];


// ==================================================
// SEARCH SERVICES
//
// Search screen includes "-Select-" first.
// ==================================================

export const serviceSearchOptions:
  RuleOption[] = [

    {
      value: '',
      label: '-Select-',
    },

    ...serviceOptions,

  ];


// ==================================================
// EDIT RULE TYPE
// ==================================================

export const editRuleTypeOptions:
  RuleOption[] = [

    {
      value: 'all',
      label: 'All',
    },

    {
      value: 'transaction-wise',
      label: 'TransactionWise Rule',
    },

    {
      value: 'profile-rules',
      label: 'Profile Rules',
    },

  ];


// ==================================================
// SEARCH RULE TYPE
// ==================================================

export const searchRuleTypeOptions:
  RuleOption[] = [

    {
      value: 'all',
      label: 'All',
    },

    {
      value: 'transaction-wise',
      label: 'TransactionWise',
    },

    {
      value: 'profile-rules',
      label: 'Profile Risk',
    },

  ];


// ==================================================
// RULE CATEGORY
// ==================================================

export const ruleCategoryOptions:
  RuleOption[] = [

    {
      value: 'all',
      label: 'All',
    },

  ];


// ==================================================
// RULE STATUS
// ==================================================

export const ruleStatusOptions:
  RuleOption[] = [

    {
      value: 'all',
      label: 'All',
    },

    {
      value: 'active',
      label: 'Active',
    },

    {
      value: 'inactive',
      label: 'InActive',
    },

  ];


// ==================================================
// PROFILE RISK
// ==================================================

export const profileRiskOptions:
  RuleOption[] = [

    {
      value: '',
      label: '-Select-',
    },

    {
      value: 'all',
      label: 'All',
    },

    {
      value: 'individual',
      label: 'Individual',
    },

    {
      value: 'corporate',
      label: 'Corporate',
    },

  ];


// ==================================================
// RECORD
// ==================================================

export interface RuleRecord {
  id: number;

  ruleNumber: string;

  ruleName: string;

  active: boolean;

  ruleDescription: string;

  block: boolean;

  ruleLogic: string;

  services: string;

  realTime: boolean;

  reportViolation: boolean;

  ruleCategory: string;

  ruleThreshold: string;

  ruleConditions: string;

  ruleType: RuleType;

  profileRisk:
    RuleProfileRisk;

  createdBy: string;

  createdAt: string;

  modifiedBy: string;

  modifiedAt: string;
}


// ==================================================
// ADD / EDIT FORM
// ==================================================

export interface RuleForm {
  ruleNumber: string;

  ruleName: string;

  active: boolean;

  ruleDescription: string;

  block: boolean;

  ruleLogic: string;

  services: string;

  realTime: boolean;

  reportViolation: boolean;

  ruleCategory: string;

  ruleThreshold: string;

  ruleConditions: string;

  ruleType: RuleType;

  profileRisk:
    RuleProfileRisk;
}


// ==================================================
// SEARCH FORM
// ==================================================

export interface RuleSearchForm {
  createdRule: string;

  ruleNumber: string;

  services: string;

  status:
    RuleStatus;

  ruleType:
    SearchRuleType;

  profileRisk:
    string;
}


// ==================================================
// DUMMY RECORDS
// ==================================================

export const initialRuleRecords:
  RuleRecord[] = [

    {
      id: 1,

      ruleNumber:
        'TRX-001',

      ruleName:
        'High Value Transaction',

      active:
        true,

      ruleDescription:
        'Monitor high value inward remittance transactions.',

      block:
        false,

      ruleLogic:
        'Transaction amount exceeds configured threshold.',

      services:
        'inward-remittances',

      realTime:
        true,

      reportViolation:
        true,

      ruleCategory:
        'all',

      ruleThreshold:
        '50000',

      ruleConditions:
        'Transaction Amount >= 50000',

      ruleType:
        'transaction-wise',

      profileRisk:
        'individual',

      createdBy:
        'Admin',

      createdAt:
        '2026-08-10T09:15:00',

      modifiedBy:
        '',

      modifiedAt:
        '',
    },


    {
      id: 2,

      ruleNumber:
        'TRX-002',

      ruleName:
        'Repeated Outward Transactions',

      active:
        true,

      ruleDescription:
        'Detect repeated outward transactions.',

      block:
        false,

      ruleLogic:
        'Count outward transactions during the monitoring period.',

      services:
        'outward-remittances',

      realTime:
        false,

      reportViolation:
        true,

      ruleCategory:
        'all',

      ruleThreshold:
        '10',

      ruleConditions:
        'Daily Transaction Count >= 10',

      ruleType:
        'transaction-wise',

      profileRisk:
        'individual',

      createdBy:
        'Admin',

      createdAt:
        '2026-08-11T10:30:00',

      modifiedBy:
        'Admin',

      modifiedAt:
        '2026-08-15T13:20:00',
    },


    {
      id: 3,

      ruleNumber:
        'TRX-003',

      ruleName:
        'FCY Transaction Rule',

      active:
        true,

      ruleDescription:
        'Monitor foreign currency transactions.',

      block:
        false,

      ruleLogic:
        'Monitor transactions using configured FCY criteria.',

      services:
        'fcy',

      realTime:
        true,

      reportViolation:
        false,

      ruleCategory:
        'all',

      ruleThreshold:
        '25000',

      ruleConditions:
        'FCY Transaction Amount >= 25000',

      ruleType:
        'transaction-wise',

      profileRisk:
        'corporate',

      createdBy:
        'Admin',

      createdAt:
        '2026-08-12T11:00:00',

      modifiedBy:
        '',

      modifiedAt:
        '',
    },


    {
      id: 4,

      ruleNumber:
        'PRF-001',

      ruleName:
        'Corporate Profile Rule',

      active:
        false,

      ruleDescription:
        'Corporate profile based transaction rule.',

      block:
        true,

      ruleLogic:
        'Evaluate corporate profile against transaction conditions.',

      services:
        'inward-outward-remittances',

      realTime:
        true,

      reportViolation:
        true,

      ruleCategory:
        'all',

      ruleThreshold:
        '100000',

      ruleConditions:
        'Corporate Transaction Amount >= 100000',

      ruleType:
        'profile-rules',

      profileRisk:
        'corporate',

      createdBy:
        'Admin',

      createdAt:
        '2026-08-13T08:30:00',

      modifiedBy:
        'Admin',

      modifiedAt:
        '2026-08-18T09:45:00',
    },


    {
      id: 5,

      ruleNumber:
        'PRF-002',

      ruleName:
        'Individual Profile Monitoring',

      active:
        true,

      ruleDescription:
        'Individual profile transaction monitoring rule.',

      block:
        false,

      ruleLogic:
        'Evaluate individual profile risk against transaction values.',

      services:
        'outward-fc',

      realTime:
        false,

      reportViolation:
        true,

      ruleCategory:
        'all',

      ruleThreshold:
        '15000',

      ruleConditions:
        'Individual transaction amount >= 15000',

      ruleType:
        'profile-rules',

      profileRisk:
        'individual',

      createdBy:
        'Admin',

      createdAt:
        '2026-08-19T14:00:00',

      modifiedBy:
        '',

      modifiedAt:
        '',
    },

  ];


// ==================================================
// DEFAULT ADD FORM
// ==================================================

export function createDefaultRuleForm():
  RuleForm {

  return {

    ruleNumber: '',

    ruleName: '',

    active: true,

    ruleDescription: '',

    block: false,

    ruleLogic: '',

    /*
     * Add screen screenshot
     * defaults Services to ALL.
     */
    services: 'all',

    realTime: false,

    reportViolation: false,

    ruleCategory: 'all',

    ruleThreshold: '',

    ruleConditions: '',

    ruleType:
      'transaction-wise',

    profileRisk:
      'all',
  };
}


// ==================================================
// DEFAULT SEARCH FORM
// ==================================================

export function createDefaultRuleSearchForm():
  RuleSearchForm {

  return {

    createdRule: '',

    ruleNumber: '',

    /*
     * Search screenshot uses -Select-.
     */
    services: '',

    status: 'all',

    ruleType: 'all',

    profileRisk: '',
  };
}