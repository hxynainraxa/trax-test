// ==================================================
// FILTER
// ==================================================

export interface MembershipDocumentFilters {
  membershipNumber: string;

  name: string;

  fromDate: string;

  toDate: string;
}


// ==================================================
// RECORD
// ==================================================

export interface MembershipDocumentRecord {
  id: number;

  membershipNumber: string;

  name: string;

  referenceNumber: string;

  branch: string;

  violationType: string;

  transactionReference: string;

  documentName: string;

  date: string;

  status: string;
}


// ==================================================
// MOCK DATA
// ==================================================

export const membershipDocumentRecords:
  MembershipDocumentRecord[] = [

    {
      id: 1,

      membershipNumber:
        'MEM-100021',

      name:
        'Ahmed Hassan Ali',

      referenceNumber:
        'REF-20260824-001',

      branch:
        'Head Office',

      violationType:
        'Black List Violation',

      transactionReference:
        'TRN-26100130000140',

      documentName:
        'customer-identification.pdf',

      date:
        '2026-08-24',

      status:
        'Submitted',
    },

    {
      id: 2,

      membershipNumber:
        'MEM-100024',

      name:
        'Omar Khalid Saeed',

      referenceNumber:
        'REF-20260824-002',

      branch:
        'Deira Branch',

      violationType:
        'Rule Violation',

      transactionReference:
        'TRN-26100130000141',

      documentName:
        'source-of-funds.pdf',

      date:
        '2026-08-24',

      status:
        'Pending',
    },

    {
      id: 3,

      membershipNumber:
        'MEM-100044',

      name:
        'Mohammed Raza Khan',

      referenceNumber:
        'REF-20260823-003',

      branch:
        'Al Ain Branch',

      violationType:
        'Case Violation',

      transactionReference:
        'TRN-26100130000150',

      documentName:
        'case-followup.pdf',

      date:
        '2026-08-23',

      status:
        'Reviewed',
    },

    {
      id: 4,

      membershipNumber:
        'MEM-100052',

      name:
        'Sara Abdullah Ahmed',

      referenceNumber:
        'REF-20260822-004',

      branch:
        'Head Office',

      violationType:
        'Rule Violation',

      transactionReference:
        'TRN-26100130000162',

      documentName:
        'transaction-followup.pdf',

      date:
        '2026-08-22',

      status:
        'Submitted',
    },

    {
      id: 5,

      membershipNumber:
        'MEM-200040',

      name:
        'Global Trading LLC',

      referenceNumber:
        'REF-20260820-005',

      branch:
        'Deira Branch',

      violationType:
        'Black List Violation',

      transactionReference:
        'TRN-26100130000170',

      documentName:
        'corporate-review.pdf',

      date:
        '2026-08-20',

      status:
        'Pending',
    },

  ];


// ==================================================
// TODAY
// ==================================================

function todayForInput():
  string {

  const date =
    new Date();


  return [
    date.getFullYear(),

    String(
      date.getMonth() + 1,
    )
      .padStart(
        2,
        '0',
      ),

    String(
      date.getDate(),
    )
      .padStart(
        2,
        '0',
      ),
  ].join('-');
}


// ==================================================
// DEFAULT FILTER
// ==================================================

export function createMembershipDocumentFilters():
  MembershipDocumentFilters {

  const today =
    todayForInput();


  return {

    membershipNumber:
      '',

    name:
      '',

    fromDate:
      today,

    toDate:
      today,
  };
}