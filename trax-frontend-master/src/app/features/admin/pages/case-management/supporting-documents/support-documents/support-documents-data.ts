// ==================================================
// OPTION
// ==================================================

export interface SupportDocumentOption {
  value: string;
  label: string;
}


// ==================================================
// VIOLATION TYPE
// ==================================================

export type SupportViolationType =
  | 'blacklist'
  | 'rule'
  | 'case';


// ==================================================
// BRANCH OPTIONS
// ==================================================

export const supportBranchOptions:
  SupportDocumentOption[] = [

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
// TRANSACTION TYPE OPTIONS
//
// Kept consistent with Transaction Monitoring.
// ==================================================

export const supportTransactionTypeOptions:
  SupportDocumentOption[] = [

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

export interface SupportDocumentFilters {
  branch: string;

  referenceNumber: string;

  fromDate: string;

  toDate: string;

  transactionType: string;

  violationType:
    SupportViolationType;
}


// ==================================================
// RECORD
// ==================================================

export interface SupportDocumentRecord {
  id: number;

  referenceNumber: string;

  membershipNumber: string;

  customerName: string;

  branch: string;

  transactionType: string;

  violationType:
    SupportViolationType;

  transactionReference: string;

  violationDate: string;

  documentName: string;

  remarks: string;

  status:
    'pending'
    | 'submitted'
    | 'reviewed';
}


// ==================================================
// MOCK DATA
// ==================================================

export const supportDocumentRecords:
  SupportDocumentRecord[] = [

    {
      id: 1,

      referenceNumber:
        'REF-20260824-001',

      membershipNumber:
        'MEM-100021',

      customerName:
        'Ahmed Hassan Ali',

      branch:
        'head-office',

      transactionType:
        '62',

      violationType:
        'blacklist',

      transactionReference:
        'TRN-26100130000140',

      violationDate:
        '2026-08-24',

      documentName:
        'customer-identification.pdf',

      remarks:
        'Supporting document received for blacklist review.',

      status:
        'submitted',
    },


    {
      id: 2,

      referenceNumber:
        'REF-20260824-002',

      membershipNumber:
        'MEM-100024',

      customerName:
        'Omar Khalid Saeed',

      branch:
        'deira-branch',

      transactionType:
        '12',

      violationType:
        'rule',

      transactionReference:
        'TRN-26100130000141',

      violationDate:
        '2026-08-24',

      documentName:
        'source-of-funds.pdf',

      remarks:
        'Documents attached against transaction rule violation.',

      status:
        'pending',
    },


    {
      id: 3,

      referenceNumber:
        'REF-20260823-003',

      membershipNumber:
        'MEM-100031',

      customerName:
        'Mohammed Raza Khan',

      branch:
        'head-office',

      transactionType:
        '40',

      violationType:
        'case',

      transactionReference:
        'TRN-26100130000150',

      violationDate:
        '2026-08-23',

      documentName:
        'case-review-document.pdf',

      remarks:
        'Case supporting evidence uploaded.',

      status:
        'reviewed',
    },


    {
      id: 4,

      referenceNumber:
        'REF-20260822-004',

      membershipNumber:
        'MEM-200040',

      customerName:
        'Global Trading LLC',

      branch:
        'deira-branch',

      transactionType:
        '301',

      violationType:
        'blacklist',

      transactionReference:
        'TRN-26100130000162',

      violationDate:
        '2026-08-22',

      documentName:
        'company-screening.pdf',

      remarks:
        'Corporate screening documentation.',

      status:
        'submitted',
    },


    {
      id: 5,

      referenceNumber:
        'REF-20260821-005',

      membershipNumber:
        'MEM-100044',

      customerName:
        'Sara Abdullah Ahmed',

      branch:
        'al-ain-branch',

      transactionType:
        '303',

      violationType:
        'rule',

      transactionReference:
        'TRN-26100130000170',

      violationDate:
        '2026-08-21',

      documentName:
        'transaction-evidence.pdf',

      remarks:
        'Transaction evidence submitted.',

      status:
        'pending',
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
// DEFAULT FILTER
// ==================================================

export function createSupportDocumentFilters():
  SupportDocumentFilters {

  const today =
    todayForInput();


  return {

    branch:
      'all',

    referenceNumber:
      '',

    fromDate:
      today,

    toDate:
      today,

    transactionType:
      'all',

    /*
     * Screenshot defaults to
     * Black List Violation.
     */
    violationType:
      'blacklist',
  };
}