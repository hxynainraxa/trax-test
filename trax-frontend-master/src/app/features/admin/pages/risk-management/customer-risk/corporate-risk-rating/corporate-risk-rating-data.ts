// ==================================================
// SECTION
// ==================================================

export type CorporateRiskSection =
  | 'total'
  | 'onboarding'
  | 'transaction'
  | 'profile';


// ==================================================
// TOTAL AML RISK
// ==================================================

export interface CorporateTotalRiskRow {
  id: number;

  parameter: string;

  weightage: number;
}


// ==================================================
// ONBOARDING RISK
// ==================================================

export interface CorporateOnboardingRiskRow {
  id: number;

  parameter: string;

  rating: string;

  weightage: number;

  reference?: boolean;
}


// ==================================================
// TRANSACTION RISK
// ==================================================

export interface CorporateTransactionRiskRow {
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

export interface CorporateProfileRiskRow {
  id: number;

  parameter: string;

  rule: string;

  rating: string;

  weightage: number;
}


// ==================================================
// COMPLETE CONFIGURATION
// ==================================================

export interface CorporateRiskRatingConfiguration {
  total:
    CorporateTotalRiskRow[];

  onboarding:
    CorporateOnboardingRiskRow[];

  transaction:
    CorporateTransactionRiskRow[];

  profile:
    CorporateProfileRiskRow[];
}


// ==================================================
// TOTAL AML RISK RATING
// ==================================================

export const defaultCorporateTotalRiskRows:
  CorporateTotalRiskRow[] = [

    {
      id: 1,

      parameter:
        'Onboarding Risk',

      weightage:
        35,
    },

    {
      id: 2,

      parameter:
        'Transaction Risk',

      weightage:
        30,
    },

    {
      id: 3,

      parameter:
        'Profile Risk',

      weightage:
        35,
    },

  ];


// ==================================================
// ONBOARDING BUSINESS INTELLIGENCE RISK
// ==================================================

export const defaultCorporateOnboardingRiskRows:
  CorporateOnboardingRiskRow[] = [

    {
      id: 1,

      parameter:
        'Company Type',

      rating:
        'Ref. Company Types',

      weightage:
        10,

      reference:
        true,
    },

    {
      id: 2,

      parameter:
        'Mainland/Freezone',

      rating:
        'Mainland Then 1.00; Freezone Then 10.00',

      weightage:
        0,
    },

    {
      id: 3,

      parameter:
        'Number of Years in Business',

      rating:
        '<=1 Then 10.00; <=2 Then 5.00; >=3 Then 1.00',

      weightage:
        10,
    },

    {
      id: 4,

      parameter:
        'Nature of Business',

      rating:
        'Ref. Business Types',

      weightage:
        10,

      reference:
        true,
    },

    {
      id: 5,

      parameter:
        'Nature of Business Sub type',

      rating:
        'Ref. Business Types',

      weightage:
        10,

      reference:
        true,
    },

    {
      id: 6,

      parameter:
        'KYC Document Docket',

      rating:
        'Ref. KYC Document Docket',

      weightage:
        10,

      reference:
        true,
    },

    {
      id: 7,

      parameter:
        "Owner/Partner's Nationality",

      rating:
        'Ref. Country List',

      weightage:
        10,

      reference:
        true,
    },

    {
      id: 8,

      parameter:
        "Representative's Nationality",

      rating:
        'Ref. Country List',

      weightage:
        10,

      reference:
        true,
    },

    {
      id: 9,

      parameter:
        'Tenure of relationship',

      rating:
        '<=1 Then 10.00; <=5 Then 5.00; >5 Then 1.00',

      weightage:
        10,
    },

    {
      id: 10,

      parameter:
        'Country of Registration',

      rating:
        'Ref. Country List',

      weightage:
        10,

      reference:
        true,
    },

    {
      id: 11,

      parameter:
        'Screening Docket',

      rating:
        'Ref. Company Screening',

      weightage:
        5,

      reference:
        true,
    },

    {
      id: 12,

      parameter:
        'Sanction',

      rating:
        'Sanction',

      weightage:
        5,
    },

  ];


// ==================================================
// TRANSACTION RISK
// ==================================================

export const defaultCorporateTransactionRiskRows:
  CorporateTransactionRiskRow[] = [

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
        'IN/OUT/FC',

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
        'IN/OUT/FC',

      reference:
        true,
    },

    {
      id: 4,

      parameter:
        'Sender Nationality',

      rating:
        'Ref. Country List',

      weightage:
        11,

      type:
        'IN/OUT/FC',

      reference:
        true,
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
        'IN/OUT/FC',

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
        'IN/OUT/FC',

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

export const defaultCorporateProfileRiskRows:
  CorporateProfileRiskRow[] = [

    {
      id: 1,

      parameter:
        'New Beneficiary',

      rule:
        '>=3 in Month',

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

      rating:
        '3000< : 5, 3000-10000 : 8, >10000 : 10',

      weightage:
        8,
    },

  ];


// ==================================================
// DEFAULT CONFIGURATION
// ==================================================

export function createDefaultCorporateRiskConfiguration():
  CorporateRiskRatingConfiguration {

  return {

    total:
      defaultCorporateTotalRiskRows
        .map(
          row => ({
            ...row,
          }),
        ),

    onboarding:
      defaultCorporateOnboardingRiskRows
        .map(
          row => ({
            ...row,
          }),
        ),

    transaction:
      defaultCorporateTransactionRiskRows
        .map(
          row => ({
            ...row,
          }),
        ),

    profile:
      defaultCorporateProfileRiskRows
        .map(
          row => ({
            ...row,
          }),
        ),
  };
}