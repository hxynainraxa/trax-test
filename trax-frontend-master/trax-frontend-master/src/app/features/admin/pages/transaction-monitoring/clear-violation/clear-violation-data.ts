// ==================================================
// MODULE
// ==================================================

export type ClearViolationModule =
  | ''
  | 'all'
  | 'blacklist'
  | 'rule'
  | 'case'
  | 'risk';


// ==================================================
// REMITTER TYPE
// ==================================================

export type ClearViolationRemitterType =
  | 'all'
  | 'individual'
  | 'corporate';


// ==================================================
// BRANCH
// ==================================================

export type ClearViolationBranch =
  | 'all'
  | 'head-office'
  | 'deira-branch'
  | 'al-ain-branch';


// ==================================================
// OPTION
// ==================================================

export interface ClearViolationOption {
  value: string;
  label: string;
}


// ==================================================
// MODULE OPTIONS
// ==================================================

export const moduleOptions:
  ClearViolationOption[] = [

    {
      value: '',
      label: '--Select--',
    },

    {
      value: 'all',
      label: 'All',
    },

    {
      value: 'blacklist',
      label: 'Black list Violations',
    },

    {
      value: 'rule',
      label: 'Rule Violation',
    },

    {
      value: 'case',
      label: 'Case Violation',
    },

    {
      value: 'risk',
      label: 'Risk Violation',
    },

  ];


// ==================================================
// TRANSACTION TYPE OPTIONS
// ==================================================

export const transactionTypeOptions:
  ClearViolationOption[] = [

    {
      value: 'all',
      label: 'All',
    },

    {
      value: '11',
      label: '11 - DRAFT APPLICATION',
    },

    {
      value: '12',
      label: '12 - SWIFT TRANSFER',
    },

    {
      value: '13',
      label: '13 - TELEX TRANSFER',
    },

    {
      value: '14',
      label: '14 - FAX TRANSFER',
    },

    {
      value: '40',
      label: '40 - FC PURCHASE/SALE',
    },

    {
      value: '41',
      label: '41 - FC PURCHASE',
    },

    {
      value: '42',
      label: '42 - FC SALES',
    },

    {
      value: '43',
      label: '43 - F/C DELIVERY - INTER BRANCH',
    },

    {
      value: '46',
      label: '46 - FC WHOLESALE',
    },

    {
      value: '62',
      label: '62 - INWARD REMITTANCE',
    },

    {
      value: '64',
      label: '64 - INWARD REMITTANCE SETTLEMENT',
    },

    {
      value: '301',
      label: '301 - XPRESS MONEY SEND',
    },

    {
      value: '303',
      label: '303 - XPRESS MONEY RCVE',
    },

  ];


// ==================================================
// REMITTER TYPE OPTIONS
// ==================================================

export const remitterTypeOptions:
  ClearViolationOption[] = [

    {
      value: 'all',
      label: 'All',
    },

    {
      value: 'individual',
      label: 'INDIVIDUAL',
    },

    {
      value: 'corporate',
      label: 'CORPORATE',
    },

  ];


// ==================================================
// BRANCH OPTIONS
// ==================================================

export const branchOptions:
  ClearViolationOption[] = [

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

export interface ClearViolationFilters {
  module:
    ClearViolationModule;

  transactionType:
    string;

  remitterType:
    ClearViolationRemitterType;

  fromDate:
    string;

  toDate:
    string;

  membershipNumber:
    string;

  branch:
    ClearViolationBranch;

  useValueDate:
    boolean;
}


// ==================================================
// RECORD
// ==================================================

export interface ClearViolationRecord {
  id: number;

  violationReference: string;

  module:
    Exclude<
      ClearViolationModule,
      '' | 'all'
    >;

  transactionType:
    string;

  membershipNumber:
    string;

  customerName:
    string;

  remitterType:
    Exclude<
      ClearViolationRemitterType,
      'all'
    >;

  branch:
    Exclude<
      ClearViolationBranch,
      'all'
    >;

  transactionReference:
    string;

  amount:
    number;

  currency:
    string;

  violationDate:
    string;

  valueDate:
    string;

  status:
    'open'
    | 'cleared';

  remarks:
    string;
}


// ==================================================
// MOCK DATA
// ==================================================

export const clearViolationData:
  ClearViolationRecord[] = [

    {
      id: 1,

      violationReference:
        'VIO-20260824-001',

      module:
        'rule',

      transactionType:
        '62',

      membershipNumber:
        'MEM-100021',

      customerName:
        'Ahmed Hassan Ali',

      remitterType:
        'individual',

      branch:
        'head-office',

      transactionReference:
        'TRN-26100130000140',

      amount:
        85000,

      currency:
        'AED',

      violationDate:
        '2026-08-24T09:15:00',

      valueDate:
        '2026-08-24',

      status:
        'open',

      remarks:
        'High value rule violation detected.',
    },


    {
      id: 2,

      violationReference:
        'VIO-20260824-002',

      module:
        'blacklist',

      transactionType:
        '12',

      membershipNumber:
        'MEM-100024',

      customerName:
        'Omar Khalid Saeed',

      remitterType:
        'individual',

      branch:
        'deira-branch',

      transactionReference:
        'TRN-26100130000141',

      amount:
        45000,

      currency:
        'AED',

      violationDate:
        '2026-08-24T10:42:00',

      valueDate:
        '2026-08-24',

      status:
        'open',

      remarks:
        'Customer matched configured blacklist screening criteria.',
    },


    {
      id: 3,

      violationReference:
        'VIO-20260824-003',

      module:
        'risk',

      transactionType:
        '301',

      membershipNumber:
        'MEM-100025',

      customerName:
        'North Star Holdings',

      remitterType:
        'corporate',

      branch:
        'al-ain-branch',

      transactionReference:
        'TRN-26100130000145',

      amount:
        125000,

      currency:
        'AED',

      violationDate:
        '2026-08-24T11:30:00',

      valueDate:
        '2026-08-25',

      status:
        'open',

      remarks:
        'Customer transaction exceeded configured risk threshold.',
    },


    {
      id: 4,

      violationReference:
        'VIO-20260823-001',

      module:
        'case',

      transactionType:
        '40',

      membershipNumber:
        'MEM-100031',

      customerName:
        'Mohammed Raza Khan',

      remitterType:
        'individual',

      branch:
        'head-office',

      transactionReference:
        'TRN-26100130000150',

      amount:
        32000,

      currency:
        'USD',

      violationDate:
        '2026-08-23T14:20:00',

      valueDate:
        '2026-08-24',

      status:
        'open',

      remarks:
        'Case monitoring condition matched.',
    },


    {
      id: 5,

      violationReference:
        'VIO-20260822-001',

      module:
        'rule',

      transactionType:
        '303',

      membershipNumber:
        'MEM-100040',

      customerName:
        'Global Trading LLC',

      remitterType:
        'corporate',

      branch:
        'deira-branch',

      transactionReference:
        'TRN-26100130000162',

      amount:
        95000,

      currency:
        'AED',

      violationDate:
        '2026-08-22T16:40:00',

      valueDate:
        '2026-08-23',

      status:
        'cleared',

      remarks:
        'Transaction rule violation previously cleared.',
    },

  ];


// ==================================================
// TODAY
// ==================================================

function todayForInput():
  string {

  const date =
    new Date();


  const year =
    date.getFullYear();


  const month =
    String(
      date.getMonth() + 1,
    )
      .padStart(
        2,
        '0',
      );


  const day =
    String(
      date.getDate(),
    )
      .padStart(
        2,
        '0',
      );


  return `${year}-${month}-${day}`;
}


// ==================================================
// DEFAULT FILTERS
// ==================================================

export function createClearViolationFilters():
  ClearViolationFilters {

  const today =
    todayForInput();


  return {

    module:
      'all',

    transactionType:
      'all',

    remitterType:
      'all',

    fromDate:
      today,

    toDate:
      today,

    membershipNumber:
      '',

    branch:
      'all',

    useValueDate:
      false,
  };
}