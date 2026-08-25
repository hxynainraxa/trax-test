// ==================================================
// TYPES
// ==================================================

export type TransactionScanType =
  | 'Name Checker'
  | 'Rule Check'
  | 'Case Check';


export type TransactionScreeningStatus =
  | 'Clear'
  | 'Potential Match'
  | 'Review Required';


export interface TransactionScreeningFilters {
  referenceNumber: string;

  scanTypes: {
    nameChecker: boolean;
    ruleCheck: boolean;
    caseCheck: boolean;
  };
}


export interface TransactionScreeningRecord {
  id: number;

  referenceNumber: string;

  customerName: string;

  transactionType: string;

  scanType: TransactionScanType;

  amount: number;

  currency: string;

  status: TransactionScreeningStatus;

  screeningDate: string;
}


// ==================================================
// DEFAULT FILTERS
// ==================================================

export function createDefaultTransactionFilters():
  TransactionScreeningFilters {

  return {
    referenceNumber: '',

    scanTypes: {
      nameChecker: true,
      ruleCheck: false,
      caseCheck: false,
    },
  };
}


// ==================================================
// DUMMY DATA
// ==================================================

export const transactionScreeningData:
  TransactionScreeningRecord[] = [

    {
      id: 1,

      referenceNumber:
        'TRX-26100130000140',

      customerName:
        'Ahmed Hassan Ali',

      transactionType:
        'International Transfer',

      scanType:
        'Name Checker',

      amount: 12500,

      currency: 'AED',

      status:
        'Potential Match',

      screeningDate:
        '8/17/2026 12:11:58 PM',
    },


    {
      id: 2,

      referenceNumber:
        'TRX-26100130000134',

      customerName:
        'Mohammed Raza Khan',

      transactionType:
        'International Transfer',

      scanType:
        'Rule Check',

      amount: 8400,

      currency: 'AED',

      status:
        'Review Required',

      screeningDate:
        '8/17/2026 10:42:24 AM',
    },


    {
      id: 3,

      referenceNumber:
        'TRX-26100130000123',

      customerName:
        'Ali Hassan Mahmoud',

      transactionType:
        'Cash Remittance',

      scanType:
        'Case Check',

      amount: 4200,

      currency: 'USD',

      status:
        'Clear',

      screeningDate:
        '8/13/2026 3:45:26 PM',
    },


    {
      id: 4,

      referenceNumber:
        'TRX-26100130000121',

      customerName:
        'Omar Khalid Saeed',

      transactionType:
        'Bank Transfer',

      scanType:
        'Name Checker',

      amount: 18250,

      currency: 'AED',

      status:
        'Potential Match',

      screeningDate:
        '8/13/2026 3:45:14 PM',
    },


    {
      id: 5,

      referenceNumber:
        'TRX-26080700000423',

      customerName:
        'Ibrahim Ahmed Saleh',

      transactionType:
        'Exchange Transaction',

      scanType:
        'Rule Check',

      amount: 6300,

      currency: 'AED',

      status:
        'Clear',

      screeningDate:
        '8/7/2026 4:23:02 PM',
    },

  ];


// ==================================================
// SEARCH
// ==================================================

export function searchTransactions(
  filters: TransactionScreeningFilters,
): TransactionScreeningRecord[] {

  const reference =
    filters.referenceNumber
      .trim()
      .toLowerCase();


  // ==================================================
  // SELECTED SCAN TYPES
  // ==================================================

  const selectedScanTypes:
    TransactionScanType[] = [];


  if (
    filters.scanTypes.nameChecker
  ) {
    selectedScanTypes.push(
      'Name Checker',
    );
  }


  if (
    filters.scanTypes.ruleCheck
  ) {
    selectedScanTypes.push(
      'Rule Check',
    );
  }


  if (
    filters.scanTypes.caseCheck
  ) {
    selectedScanTypes.push(
      'Case Check',
    );
  }


  // ==================================================
  // FILTER DATA
  // ==================================================

  return transactionScreeningData.filter(
    record => {

      // ================================================
      // REFERENCE NUMBER
      // ================================================

      if (
        reference &&
        !record.referenceNumber
          .toLowerCase()
          .includes(reference)
      ) {
        return false;
      }


      // ================================================
      // SCAN TYPE
      // ================================================

      if (
        selectedScanTypes.length > 0 &&
        !selectedScanTypes.includes(
          record.scanType,
        )
      ) {
        return false;
      }


      return true;
    },
  );
}