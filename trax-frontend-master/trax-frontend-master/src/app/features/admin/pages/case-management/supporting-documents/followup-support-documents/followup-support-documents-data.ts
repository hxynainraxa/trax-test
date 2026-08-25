// ==================================================
// OPTION
// ==================================================

export interface FollowupSupportOption {
  value: string;
  label: string;
}


// ==================================================
// VIOLATION TYPE
// ==================================================

export type FollowupViolationType =
  | 'blacklist'
  | 'rule'
  | 'case';


// ==================================================
// BRANCH
// ==================================================

export const followupBranchOptions:
  FollowupSupportOption[] = [

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
// NATIONALITY
// ==================================================

export const followupNationalityOptions:
  FollowupSupportOption[] = [

    {
      value: 'all',
      label: 'All',
    },

    {
      value: 'AE',
      label: 'AE - United Arab Emirates',
    },

    {
      value: 'AF',
      label: 'AF - Afghanistan',
    },

    {
      value: 'AU',
      label: 'AU - Australia',
    },

    {
      value: 'BD',
      label: 'BD - Bangladesh',
    },

    {
      value: 'BH',
      label: 'BH - Bahrain',
    },

    {
      value: 'CA',
      label: 'CA - Canada',
    },

    {
      value: 'CN',
      label: 'CN - China',
    },

    {
      value: 'EG',
      label: 'EG - Egypt',
    },

    {
      value: 'GB',
      label: 'GB - United Kingdom',
    },

    {
      value: 'IN',
      label: 'IN - India',
    },

    {
      value: 'JO',
      label: 'JO - Jordan',
    },

    {
      value: 'KW',
      label: 'KW - Kuwait',
    },

    {
      value: 'NP',
      label: 'NP - Nepal',
    },

    {
      value: 'OM',
      label: 'OM - Oman',
    },

    {
      value: 'PK',
      label: 'PK - Pakistan',
    },

    {
      value: 'PH',
      label: 'PH - Philippines',
    },

    {
      value: 'QA',
      label: 'QA - Qatar',
    },

    {
      value: 'SA',
      label: 'SA - Saudi Arabia',
    },

    {
      value: 'LK',
      label: 'LK - Sri Lanka',
    },

    {
      value: 'US',
      label: 'US - United States',
    },

  ];


// ==================================================
// TRANSACTION TYPE
// ==================================================

export const followupTransactionTypeOptions:
  FollowupSupportOption[] = [

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

export interface FollowupSupportFilters {
  branch: string;

  referenceNumber: string;

  membershipCard: string;

  memberId: string;

  nationality: string;

  fromDate: string;

  toDate: string;

  useValueDate: boolean;

  transactionType: string;

  violationType:
    FollowupViolationType;
}


// ==================================================
// RECORD
// ==================================================

export interface FollowupSupportRecord {
  id: number;

  branch: string;

  referenceNumber: string;

  membershipCard: string;

  memberId: string;

  customerName: string;

  nationality: string;

  transactionType: string;

  violationType:
    FollowupViolationType;

  violationDate: string;

  valueDate: string;

  followupDate: string;

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

export const followupSupportRecords:
  FollowupSupportRecord[] = [

    {
      id: 1,

      branch:
        'head-office',

      referenceNumber:
        'REF-20260824-001',

      membershipCard:
        'MEM-100021',

      memberId:
        'MID-100021',

      customerName:
        'Ahmed Hassan Ali',

      nationality:
        'AE',

      transactionType:
        '62',

      violationType:
        'blacklist',

      violationDate:
        '2026-08-24',

      valueDate:
        '2026-08-24',

      followupDate:
        '2026-08-24',

      documentName:
        'followup-screening.pdf',

      remarks:
        'Followup document received for blacklist review.',

      status:
        'submitted',
    },

    {
      id: 2,

      branch:
        'deira-branch',

      referenceNumber:
        'REF-20260824-002',

      membershipCard:
        'MEM-100024',

      memberId:
        'MID-100024',

      customerName:
        'Omar Khalid Saeed',

      nationality:
        'OM',

      transactionType:
        '12',

      violationType:
        'rule',

      violationDate:
        '2026-08-24',

      valueDate:
        '2026-08-25',

      followupDate:
        '2026-08-24',

      documentName:
        'source-of-funds-followup.pdf',

      remarks:
        'Followup evidence requested for transaction violation.',

      status:
        'pending',
    },

    {
      id: 3,

      branch:
        'al-ain-branch',

      referenceNumber:
        'REF-20260823-003',

      membershipCard:
        'MEM-100044',

      memberId:
        'MID-100044',

      customerName:
        'Mohammed Raza Khan',

      nationality:
        'PK',

      transactionType:
        '301',

      violationType:
        'case',

      violationDate:
        '2026-08-23',

      valueDate:
        '2026-08-24',

      followupDate:
        '2026-08-24',

      documentName:
        'case-followup.pdf',

      remarks:
        'Followup supporting documents reviewed.',

      status:
        'reviewed',
    },

    {
      id: 4,

      branch:
        'head-office',

      referenceNumber:
        'REF-20260820-004',

      membershipCard:
        'MEM-100052',

      memberId:
        'MID-100052',

      customerName:
        'Sara Abdullah Ahmed',

      nationality:
        'AE',

      transactionType:
        '40',

      violationType:
        'rule',

      violationDate:
        '2026-08-20',

      valueDate:
        '2026-08-21',

      followupDate:
        '2026-08-22',

      documentName:
        'transaction-followup.pdf',

      remarks:
        'Additional transaction clarification received.',

      status:
        'submitted',
    },

    {
      id: 5,

      branch:
        'deira-branch',

      referenceNumber:
        'REF-20260818-005',

      membershipCard:
        'MEM-200040',

      memberId:
        'MID-200040',

      customerName:
        'Global Trading LLC',

      nationality:
        'AE',

      transactionType:
        '303',

      violationType:
        'blacklist',

      violationDate:
        '2026-08-18',

      valueDate:
        '2026-08-19',

      followupDate:
        '2026-08-20',

      documentName:
        'corporate-followup.pdf',

      remarks:
        'Corporate screening followup documentation.',

      status:
        'pending',
    },

  ];


// ==================================================
// TODAY
// ==================================================

function getToday():
  string {

  const date =
    new Date();


  return [
    date.getFullYear(),

    String(
      date.getMonth() + 1,
    ).padStart(
      2,
      '0',
    ),

    String(
      date.getDate(),
    ).padStart(
      2,
      '0',
    ),
  ].join('-');
}


// ==================================================
// DEFAULT FILTER
// ==================================================

export function createFollowupSupportFilters():
  FollowupSupportFilters {

  const today =
    getToday();


  return {

    branch:
      'all',

    referenceNumber:
      '',

    membershipCard:
      '',

    memberId:
      '',

    nationality:
      'all',

    fromDate:
      today,

    toDate:
      today,

    useValueDate:
      false,

    transactionType:
      'all',

    violationType:
      'blacklist',
  };
}