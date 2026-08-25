// ==================================================
// REMITTER TYPE
// ==================================================

export type RemitterType =
  | 'all'
  | 'individual'
  | 'corporate';


// ==================================================
// BRANCH
// ==================================================

export type ViolationBranch =
  | 'all'
  | 'head-office'
  | 'deira-branch'
  | 'al-ain-branch';


// ==================================================
// OPTION
// ==================================================

export interface DailyViolationOption {
  value: string;

  label: string;
}


// ==================================================
// REMITTER TYPE OPTIONS
// ==================================================

export const remitterTypeOptions:
  DailyViolationOption[] = [

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
// BRANCH OPTIONS
// ==================================================

export const branchOptions:
  DailyViolationOption[] = [

    {
      value: 'all',
      label: 'All',
    },

    {
      value: 'head-office',
      label: 'Head Office',
    },

    {
      value: 'deira-branch',
      label: 'Deira Branch',
    },

    {
      value: 'al-ain-branch',
      label: 'Al Ain Branch',
    },

  ];


// ==================================================
// FILTERS
// ==================================================

export interface DailyRuleViolationFilters {
  ruleId:
    number
    | 'all';

  fromDate:
    string;

  toDate:
    string;

  remitterType:
    RemitterType;

  branch:
    ViolationBranch;
}


// ==================================================
// VIOLATION RECORD
//
// ruleId references the SAME rule created from
// Create Rule.
// ==================================================

export interface DailyRuleViolationRecord {
  id: number;

  ruleId: number;

  violationReference: string;

  membershipNo: string;

  customerName: string;

  remitterType:
    Exclude<
      RemitterType,
      'all'
    >;

  branch:
    Exclude<
      ViolationBranch,
      'all'
    >;

  transactionReference: string;

  transactionAmount: number;

  currency: string;

  violationDate: string;

  remarks: string;

  status:
    'open'
    | 'cleared';
}


// ==================================================
// MOCK VIOLATIONS
//
// These reference the default Create Rule IDs.
//
// Newly created rules will automatically appear
// in the Rule dropdown. Until a real violation/API
// exists for them, searching those new rules will
// correctly return zero results.
// ==================================================

export const dailyRuleViolationData:
  DailyRuleViolationRecord[] = [

    {
      id: 1,

      ruleId: 1,

      violationReference:
        'VIO-20260824-001',

      membershipNo:
        'MEM-100021',

      customerName:
        'Ahmed Hassan Ali',

      remitterType:
        'individual',

      branch:
        'head-office',

      transactionReference:
        'TRN-26100130000140',

      transactionAmount:
        85000,

      currency:
        'AED',

      violationDate:
        '2026-08-24T09:15:00',

      remarks:
        'Transaction amount exceeded configured rule threshold.',

      status:
        'open',
    },


    {
      id: 2,

      ruleId: 1,

      violationReference:
        'VIO-20260824-002',

      membershipNo:
        'MEM-100024',

      customerName:
        'Omar Khalid Saeed',

      remitterType:
        'individual',

      branch:
        'deira-branch',

      transactionReference:
        'TRN-26100130000141',

      transactionAmount:
        72000,

      currency:
        'AED',

      violationDate:
        '2026-08-24T10:42:00',

      remarks:
        'High value transaction rule violated.',

      status:
        'open',
    },


    {
      id: 3,

      ruleId: 2,

      violationReference:
        'VIO-20260824-003',

      membershipNo:
        'MEM-100025',

      customerName:
        'North Star Holdings',

      remitterType:
        'corporate',

      branch:
        'al-ain-branch',

      transactionReference:
        'TRN-26100130000145',

      transactionAmount:
        43500,

      currency:
        'AED',

      violationDate:
        '2026-08-24T11:30:00',

      remarks:
        'Daily transaction count exceeded configured threshold.',

      status:
        'open',
    },


    {
      id: 4,

      ruleId: 3,

      violationReference:
        'VIO-20260823-001',

      membershipNo:
        'MEM-100031',

      customerName:
        'Al Noor Exchange Customer',

      remitterType:
        'individual',

      branch:
        'head-office',

      transactionReference:
        'TRN-26100130000150',

      transactionAmount:
        31000,

      currency:
        'USD',

      violationDate:
        '2026-08-23T14:20:00',

      remarks:
        'FCY transaction monitoring condition matched.',

      status:
        'cleared',
    },


    {
      id: 5,

      ruleId: 4,

      violationReference:
        'VIO-20260822-001',

      membershipNo:
        'MEM-100040',

      customerName:
        'Global Trading LLC',

      remitterType:
        'corporate',

      branch:
        'deira-branch',

      transactionReference:
        'TRN-26100130000162',

      transactionAmount:
        135000,

      currency:
        'AED',

      violationDate:
        '2026-08-22T16:40:00',

      remarks:
        'Corporate profile transaction threshold exceeded.',

      status:
        'open',
    },


    {
      id: 6,

      ruleId: 5,

      violationReference:
        'VIO-20260821-001',

      membershipNo:
        'MEM-100044',

      customerName:
        'Mohammed Raza Khan',

      remitterType:
        'individual',

      branch:
        'al-ain-branch',

      transactionReference:
        'TRN-26100130000170',

      transactionAmount:
        22500,

      currency:
        'AED',

      violationDate:
        '2026-08-21T12:10:00',

      remarks:
        'Individual profile monitoring criteria matched.',

      status:
        'open',
    },


    {
      id: 7,

      ruleId: 1,

      violationReference:
        'VIO-20260820-001',

      membershipNo:
        'MEM-100052',

      customerName:
        'Saeed Ahmed',

      remitterType:
        'individual',

      branch:
        'head-office',

      transactionReference:
        'TRN-26100130000179',

      transactionAmount:
        90000,

      currency:
        'AED',

      violationDate:
        '2026-08-20T08:55:00',

      remarks:
        'High value transaction detected.',

      status:
        'cleared',
    },

  ];


// ==================================================
// DEFAULT FILTERS
// ==================================================

export function createDailyRuleViolationFilters():
  DailyRuleViolationFilters {

  /*
   * Current screen/date:
   * 24-Aug-2026.
   *
   * Keeping the initial page aligned with the
   * supplied design and mock violation records.
   */
  return {

    ruleId:
      'all',

    fromDate:
      '2026-08-24',

    toDate:
      '2026-08-24',

    remitterType:
      'all',

    branch:
      'all',
  };
}