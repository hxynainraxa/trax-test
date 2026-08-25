// ==================================================
// STATUS
// ==================================================

export type CaseStatus =
  | 'active'
  | 'inactive';

export type CaseSearchStatus =
  | 'all'
  | CaseStatus;


// ==================================================
// OPTION
// ==================================================

export interface CaseOption {
  value: string;
  label: string;
}


// ==================================================
// STATUS OPTIONS
// ==================================================

export const caseStatusOptions:
  CaseOption[] = [

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
      label: 'Inactive',
    },

  ];


// ==================================================
// CASE RECORD
// ==================================================

export interface CaseRecord {
  id: number;

  caseCode: string;

  description: string;

  customerName: string;

  customerIdNo: string;

  membershipCard: string;

  mobileNumber: string;

  supportDocumentName: string;

  supportDocumentComments: string;

  beneficiaryName: string;

  beneficiaryIdNo: string;

  transactionLimit: string;

  activeFrom: string;

  activeTo: string;

  remark: string;

  status: CaseStatus;

  createdBy: string;

  createdAt: string;

  modifiedBy: string;

  modifiedAt: string;
}


// ==================================================
// ADD / EDIT FORM
// ==================================================

export interface CaseForm {
  caseCode: string;

  description: string;

  customerName: string;

  customerIdNo: string;

  membershipCard: string;

  mobileNumber: string;

  supportDocumentName: string;

  supportDocumentComments: string;

  beneficiaryName: string;

  beneficiaryIdNo: string;

  transactionLimit: string;

  activeFrom: string;

  activeTo: string;

  remark: string;

  status: CaseStatus;
}


// ==================================================
// SEARCH FILTER
// ==================================================

export interface CaseSearchFilters {
  caseCode: string;

  membershipCard: string;

  mobileNumber: string;

  customerName: string;

  customerIdNo: string;

  transactionLimit: string;

  beneficiaryName: string;

  beneficiaryIdNo: string;

  createdBy: string;

  createdDate: string;

  modifiedBy: string;

  modifiedDate: string;

  status: CaseSearchStatus;
}


// ==================================================
// EXISTING CASE
//
// Because CASE0000000001 already exists,
// the next generated code becomes CASE0000000002.
// ==================================================

export const initialCaseRecords:
  CaseRecord[] = [

    {
      id: 1,

      caseCode:
        'CASE0000000001',

      description:
        'Existing customer monitoring case.',

      customerName:
        'Ahmed Hassan Ali',

      customerIdNo:
        '784-1988-1234567-1',

      membershipCard:
        'MEM-100021',

      mobileNumber:
        '0501234567',

      supportDocumentName:
        'customer-review.pdf',

      supportDocumentComments:
        'Initial supporting documents.',

      beneficiaryName:
        'Mohammed Saeed',

      beneficiaryIdNo:
        'BEN-100021',

      transactionLimit:
        '50000',

      activeFrom:
        '2026-08-20',

      activeTo:
        '2026-09-20',

      remark:
        'Customer monitoring case.',

      status:
        'active',

      createdBy:
        'Admin',

      createdAt:
        '2026-08-20T10:00:00',

      modifiedBy:
        '',

      modifiedAt:
        '',
    },

  ];


// ==================================================
// DEFAULT FORM
// ==================================================

export function createDefaultCaseForm(
  caseCode = '',
): CaseForm {

  return {

    caseCode,

    description: '',

    customerName: '',

    customerIdNo: '',

    membershipCard: '',

    mobileNumber: '',

    supportDocumentName: '',

    supportDocumentComments: '',

    beneficiaryName: '',

    beneficiaryIdNo: '',

    transactionLimit: '',

    activeFrom: '',

    activeTo: '',

    remark: '',

    status: 'active',
  };
}


// ==================================================
// DEFAULT SEARCH
// ==================================================

export function createDefaultCaseSearchFilters():
  CaseSearchFilters {

  return {

    caseCode: '',

    membershipCard: '',

    mobileNumber: '',

    customerName: '',

    customerIdNo: '',

    transactionLimit: '',

    beneficiaryName: '',

    beneficiaryIdNo: '',

    createdBy: '',

    createdDate: '',

    modifiedBy: '',

    modifiedDate: '',

    status: 'all',
  };
}