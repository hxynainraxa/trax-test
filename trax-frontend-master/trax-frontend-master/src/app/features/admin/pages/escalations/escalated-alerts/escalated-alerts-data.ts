// ==================================================
// OPTION
// ==================================================

export interface EscalatedAlertOption {
  value: string;
  label: string;
}


// ==================================================
// MODULE OPTIONS
// ==================================================

export const escalatedAlertModuleOptions:
  EscalatedAlertOption[] = [

    {
      value: '',
      label: '--Select--',
    },

    {
      value: 'rule-violation',
      label: 'Rule Violation',
    },

    {
      value: 'customer-violation',
      label: 'Customer Violation',
    },

    {
      value: 'blacklist-sdn-violations',
      label: 'Black list/SDN violations',
    },

    {
      value: 'case-violation',
      label: 'Case Violation',
    },

    {
      value: 'risk-violation',
      label: 'Risk Violation',
    },

  ];


// ==================================================
// TRANSACTION TYPES
// ==================================================

export const escalatedAlertTransactionTypeOptions:
  EscalatedAlertOption[] = [

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
// FILTERS
// ==================================================

export interface EscalatedAlertFilters {
  module: string;

  transactionType: string;

  periodFrom: string;

  periodTo: string;

  referenceNumber: string;
}


// ==================================================
// RECORD
// ==================================================

export interface EscalatedAlertRecord {
  id: number;

  referenceNumber: string;

  module: string;

  transactionType: string;

  membershipNumber: string;

  customerName: string;

  branch: string;

  escalationLevel: string;

  escalatedTo: string;

  escalatedDate: string;

  status:
    | 'pending'
    | 'reviewed'
    | 'closed';
}


// ==================================================
// MOCK RECORDS
// ==================================================

export const escalatedAlertRecords:
  EscalatedAlertRecord[] = [

    {
      id: 1,

      referenceNumber:
        'ESC-20260824-001',

      module:
        'rule-violation',

      transactionType:
        '62',

      membershipNumber:
        'MEM-100021',

      customerName:
        'Ahmed Hassan Ali',

      branch:
        'Head Office',

      escalationLevel:
        'Level 1',

      escalatedTo:
        'AML Manager',

      escalatedDate:
        '2026-08-24',

      status:
        'pending',
    },

    {
      id: 2,

      referenceNumber:
        'ESC-20260823-002',

      module:
        'blacklist-sdn-violations',

      transactionType:
        '12',

      membershipNumber:
        'MEM-100024',

      customerName:
        'Omar Khalid Saeed',

      branch:
        'Deira Branch',

      escalationLevel:
        'Level 2',

      escalatedTo:
        'Compliance Manager',

      escalatedDate:
        '2026-08-23',

      status:
        'reviewed',
    },

    {
      id: 3,

      referenceNumber:
        'ESC-20260820-003',

      module:
        'case-violation',

      transactionType:
        '301',

      membershipNumber:
        'MEM-100044',

      customerName:
        'Mohammed Raza Khan',

      branch:
        'Al Ain Branch',

      escalationLevel:
        'Level 1',

      escalatedTo:
        'AML Manager',

      escalatedDate:
        '2026-08-20',

      status:
        'pending',
    },

    {
      id: 4,

      referenceNumber:
        'ESC-20260815-004',

      module:
        'risk-violation',

      transactionType:
        '40',

      membershipNumber:
        'MEM-200040',

      customerName:
        'Global Trading LLC',

      branch:
        'Head Office',

      escalationLevel:
        'Level 3',

      escalatedTo:
        'Head of Compliance',

      escalatedDate:
        '2026-08-15',

      status:
        'reviewed',
    },

    {
      id: 5,

      referenceNumber:
        'ESC-20260802-005',

      module:
        'customer-violation',

      transactionType:
        '303',

      membershipNumber:
        'MEM-100052',

      customerName:
        'Sara Abdullah Ahmed',

      branch:
        'Deira Branch',

      escalationLevel:
        'Level 2',

      escalatedTo:
        'Compliance Manager',

      escalatedDate:
        '2026-08-02',

      status:
        'closed',
    },

  ];


// ==================================================
// DATE HELPERS
// ==================================================

function toInputDate(
  date:
    Date,
): string {

  const year =
    date.getFullYear();

  const month =
    String(
      date.getMonth() + 1,
    ).padStart(
      2,
      '0',
    );

  const day =
    String(
      date.getDate(),
    ).padStart(
      2,
      '0',
    );


  return `${year}-${month}-${day}`;
}


// ==================================================
// DEFAULT FILTERS
//
// Screenshot:
//
// Period From = one month before today
// Period To   = today
// ==================================================

export function createEscalatedAlertFilters():
  EscalatedAlertFilters {

  const today =
    new Date();

  const monthAgo =
    new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate(),
    );


  return {

    module:
      '',

    transactionType:
      'all',

    periodFrom:
      toInputDate(
        monthAgo,
      ),

    periodTo:
      toInputDate(
        today,
      ),

    referenceNumber:
      '',
  };
}