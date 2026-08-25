// ==================================================
// SECTION
// ==================================================

export type IndividualRiskSection =
  | 'total'
  | 'onboarding'
  | 'transaction'
  | 'profile';


// ==================================================
// TOTAL AML RISK
// ==================================================

export interface TotalRiskRow {
  id: number;

  parameter: string;

  weightage: number;
}


// ==================================================
// ONBOARDING RISK
// ==================================================

export interface OnboardingRiskRow {
  id: number;

  parameter: string;

  rating: string;

  weightage: number;

  reference?: boolean;
}


// ==================================================
// TRANSACTION RISK
// ==================================================

export interface TransactionRiskRow {
  id: number;

  parameter: string;

  rating: string;

  weightage: number;

  type: string;

  reference?: boolean;
}


// ==================================================
// PROFILE RISK
// ==================================================

export interface ProfileRiskRow {
  id: number;

  parameter: string;

  rule: string;

  type: string;

  rating: string;

  weightage: number;
}


// ==================================================
// COMPLETE CONFIGURATION
// ==================================================

export interface IndividualRiskRatingConfiguration {
  total:
    TotalRiskRow[];

  onboarding:
    OnboardingRiskRow[];

  transaction:
    TransactionRiskRow[];

  profile:
    ProfileRiskRow[];
}


// ==================================================
// TOTAL AML RISK RATING - INDIVIDUAL
// ==================================================

export const defaultTotalRiskRows:
  TotalRiskRow[] = [

    {
      id: 1,
      parameter: 'Onboarding Risk',
      weightage: 35,
    },

    {
      id: 2,
      parameter: 'Transaction Risk',
      weightage: 30,
    },

    {
      id: 3,
      parameter: 'Profile Risk',
      weightage: 35,
    },

  ];


// ==================================================
// ONBOARDING (BUSINESS INTELLIGENCE) RISK
// ==================================================

export const defaultOnboardingRiskRows:
  OnboardingRiskRow[] = [

    {
      id: 1,

      parameter:
        'Nationality',

      rating:
        'Ref. Nationality',

      weightage:
        20,

      reference:
        true,
    },

    {
      id: 2,

      parameter:
        'Country of Birth',

      rating:
        'Ref. Country',

      weightage:
        15,

      reference:
        true,
    },

    {
      id: 3,

      parameter:
        'Occupation',

      rating:
        'Ref. Occupation',

      weightage:
        10,

      reference:
        true,
    },

    {
      id: 4,

      parameter:
        'Nature of Business',

      rating:
        'Ref. Business',

      weightage:
        10,

      reference:
        true,
    },

    {
      id: 5,

      parameter:
        'Resident Status',

      rating:
        'Non Resident=10 Resident=1',

      weightage:
        15,
    },

    {
      id: 6,

      parameter:
        'PEP/Adverse Media',

      rating:
        'Y=10 N=1',

      weightage:
        20,
    },

    {
      id: 7,

      parameter:
        'Sanction',

      rating:
        'Sanction',

      weightage:
        10,
    },

  ];


// ==================================================
// TRANSACTION RISK
// ==================================================

export const defaultTransactionRiskRows:
  TransactionRiskRow[] = [

    {
      id: 1,

      parameter:
        'Product Risk',

      rating:
        'Ref. Product list',

      weightage:
        11,

      type:
        'IN/OUT/FC',

      reference:
        true,
    },

    {
      id: 2,

      parameter:
        'Destination Country',

      rating:
        'Ref. Country List',

      weightage:
        11,

      type:
        'IN/OUT',

      reference:
        true,
    },

    {
      id: 3,

      parameter:
        'Beneficiary Nationality',

      rating:
        'Ref. Country List',

      weightage:
        11,

      type:
        'IN/OUT',

      reference:
        true,
    },

    {
      id: 4,

      parameter:
        'Face to face/ Non-face to face',

      rating:
        'Y=1 N=10',

      weightage:
        11,

      type:
        'IN/OUT/FC',
    },

    {
      id: 5,

      parameter:
        'Amount Risk',

      rating:
        'Ref. Amount Slab',

      weightage:
        11,

      type:
        'IN/OUT/FC',

      reference:
        true,
    },

    {
      id: 6,

      parameter:
        'Frequency Risk',

      rating:
        'Ref. Frequency Slab',

      weightage:
        11,

      type:
        'IN/OUT/FC',

      reference:
        true,
    },

    {
      id: 7,

      parameter:
        'Service Type Risk',

      rating:
        'Ref. Service Types',

      weightage:
        11,

      type:
        'IN/OUT',

      reference:
        true,
    },

    {
      id: 8,

      parameter:
        'Delivery Channel',

      rating:
        'Ref. Delivery Channel',

      weightage:
        11,

      type:
        'IN/OUT',

      reference:
        true,
    },

    {
      id: 9,

      parameter:
        'Payment Mode',

      rating:
        'Cash Then 10.00; Non-Cash Then 5.00',

      weightage:
        12,

      type:
        'IN/OUT/FC',
    },

  ];


// ==================================================
// PROFILE RISK
// ==================================================

export const defaultProfileRiskRows:
  ProfileRiskRow[] = [

    {
      id: 1,

      parameter:
        'New Beneficiary',

      rule:
        '>=3 in Month',

      type:
        'OUT',

      rating:
        '10',

      weightage:
        8,
    },

    {
      id: 2,

      parameter:
        'High risk currencies',

      rule:
        '75000',

      type:
        'IN/OUT',

      rating:
        '10',

      weightage:
        8,
    },

    {
      id: 3,

      parameter:
        'Availing another product',

      rule:
        '>1',

      type:
        'OUT',

      rating:
        '10',

      weightage:
        8,
    },

    {
      id: 4,

      parameter:
        'Sending to high risk country frequency',

      rule:
        '>=3 Month',

      type:
        'OUT',

      rating:
        '10',

      weightage:
        10,
    },

    {
      id: 5,

      parameter:
        'New Customer carrying out large transaction',

      rule:
        'once in a quarter',

      type:
        'IN/OUT/FC',

      rating:
        '10',

      weightage:
        10,
    },

    {
      id: 6,

      parameter:
        'Number of cancelled transactions',

      rule:
        '>=3',

      type:
        'IN/OUT',

      rating:
        '10',

      weightage:
        8,
    },

    {
      id: 7,

      parameter:
        'Customer sending to many beneficiaries',

      rule:
        'Month',

      type:
        'IN/OUT',

      rating:
        '3< : 5, 3-4 : 8, >4 : 10',

      weightage:
        8,
    },

    {
      id: 8,

      parameter:
        'Customer receiving from high risk country',

      rule:
        'Month',

      type:
        'IN',

      rating:
        '3< : 5, 3-4 : 8, >4 : 10',

      weightage:
        8,
    },

    {
      id: 9,

      parameter:
        'Customer sending to multiple countries – outward',

      rule:
        'Month',

      type:
        'OUT',

      rating:
        '3< : 5, 3-4 : 8, >4 : 10',

      weightage:
        8,
    },

    {
      id: 10,

      parameter:
        'Customer receiving from multiple countries – inward',

      rule:
        'Month',

      type:
        'IN',

      rating:
        '3< : 5, 3-4 : 8, >4 : 10',

      weightage:
        8,
    },

    {
      id: 11,

      parameter:
        'Exchange of currency',

      rule:
        'No of currencies',

      type:
        'FC',

      rating:
        '3< : 5, 3-4 : 8, >4 : 10',

      weightage:
        8,
    },

    {
      id: 12,

      parameter:
        'Customer Volume',

      rule:
        'Average monthly value of FC/Remittance',

      type:
        'OUT/FC',

      rating:
        '3000< : 5, 3000-10000 : 8, >10000 : 10',

      weightage:
        8,
    },

  ];


// ==================================================
// DEFAULT CONFIGURATION
// ==================================================

export function createDefaultIndividualRiskConfiguration():
  IndividualRiskRatingConfiguration {

  return {

    total:
      defaultTotalRiskRows
        .map(
          row => ({
            ...row,
          }),
        ),

    onboarding:
      defaultOnboardingRiskRows
        .map(
          row => ({
            ...row,
          }),
        ),

    transaction:
      defaultTransactionRiskRows
        .map(
          row => ({
            ...row,
          }),
        ),

    profile:
      defaultProfileRiskRows
        .map(
          row => ({
            ...row,
          }),
        ),
  };
}