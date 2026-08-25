// ==================================================
// OPTIONS
// ==================================================

export interface CustomerRiskOption {
  value: string;
  label: string;
}


// ==================================================
// GENDER
// ==================================================

export const genderOptions:
  CustomerRiskOption[] = [

    {
      value: 'all',
      label: 'All',
    },

    {
      value: 'male',
      label: 'Male',
    },

    {
      value: 'female',
      label: 'Female',
    },

  ];


// ==================================================
// CUSTOMER TYPE
// ==================================================

export const customerTypeOptions:
  CustomerRiskOption[] = [

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
// CURRENT RISK RATING
// ==================================================

export const riskRatingOptions:
  CustomerRiskOption[] = [

    {
      value: 'all',
      label: 'All',
    },

    {
      value: 'low',
      label: 'LOW',
    },

    {
      value: 'medium',
      label: 'MEDIUM',
    },

    {
      value: 'medium-high',
      label: 'MEDIUM HIGH',
    },

    {
      value: 'high',
      label: 'HIGH',
    },

  ];


// ==================================================
// RESIDENT STATUS
// ==================================================

export const residentStatusOptions:
  CustomerRiskOption[] = [

    {
      value: 'all',
      label: 'All',
    },

    {
      value: 'resident',
      label: 'Resident',
    },

    {
      value: 'non-resident',
      label: 'Non Resident',
    },

  ];


// ==================================================
// COUNTRY / NATIONALITY
//
// You can later move this to a common shared data file
// and reuse it in Entry To List as well.
// ==================================================

export const countryOptions:
  CustomerRiskOption[] = [

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
      value: 'BH',
      label: 'BH - Bahrain',
    },

    {
      value: 'BD',
      label: 'BD - Bangladesh',
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
      value: 'FR',
      label: 'FR - France',
    },

    {
      value: 'DE',
      label: 'DE - Germany',
    },

    {
      value: 'IN',
      label: 'IN - India',
    },

    {
      value: 'ID',
      label: 'ID - Indonesia',
    },

    {
      value: 'IT',
      label: 'IT - Italy',
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
      value: 'MY',
      label: 'MY - Malaysia',
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
      value: 'GB',
      label: 'GB - United Kingdom',
    },

    {
      value: 'US',
      label: 'US - United States',
    },

  ];


export const nationalityOptions =
  countryOptions;


// ==================================================
// FILTERS
// ==================================================

export interface CustomerRiskVerificationFilters {
  firstName: string;

  middleName: string;

  lastName: string;

  shortName: string;

  fullName: string;

  gender: string;

  dob: string;

  birthPlace: string;

  mobileNumber: string;

  residentTelephone: string;

  email: string;

  idNumber: string;

  state: string;

  country: string;

  nationality: string;

  membershipNumber: string;

  membershipOpenedDate: string;

  customerType: string;

  currentRiskRating: string;

  residentStatus: string;

  manualRisk: boolean;

  watchList: boolean;
}


// ==================================================
// CUSTOMER RECORD
// ==================================================

export interface CustomerRiskVerificationRecord {
  id: number;

  firstName: string;

  middleName: string;

  lastName: string;

  shortName: string;

  fullName: string;

  gender:
    'male'
    | 'female';

  dob: string;

  birthPlace: string;

  mobileNumber: string;

  residentTelephone: string;

  email: string;

  idNumber: string;

  state: string;

  country: string;

  nationality: string;

  membershipNumber: string;

  membershipOpenedDate: string;

  customerType:
    'individual'
    | 'corporate';

  currentRiskRating:
    'low'
    | 'medium'
    | 'medium-high'
    | 'high';

  residentStatus:
    'resident'
    | 'non-resident';

  manualRisk: boolean;

  watchList: boolean;
}


// ==================================================
// MOCK DATA
// ==================================================

export const customerRiskVerificationData:
  CustomerRiskVerificationRecord[] = [

    {
      id: 1,

      firstName:
        'Ahmed',

      middleName:
        'Hassan',

      lastName:
        'Ali',

      shortName:
        'Ahmed Ali',

      fullName:
        'Ahmed Hassan Ali',

      gender:
        'male',

      dob:
        '1988-04-12',

      birthPlace:
        'Dubai',

      mobileNumber:
        '0501234567',

      residentTelephone:
        '043456789',

      email:
        'ahmed.ali@example.com',

      idNumber:
        '784-1988-1234567-1',

      state:
        'Dubai',

      country:
        'AE',

      nationality:
        'AE',

      membershipNumber:
        'MEM-100021',

      membershipOpenedDate:
        '2022-04-10',

      customerType:
        'individual',

      currentRiskRating:
        'low',

      residentStatus:
        'resident',

      manualRisk:
        false,

      watchList:
        false,
    },


    {
      id: 2,

      firstName:
        'Mohammed',

      middleName:
        'Raza',

      lastName:
        'Khan',

      shortName:
        'Mohammed Khan',

      fullName:
        'Mohammed Raza Khan',

      gender:
        'male',

      dob:
        '1983-08-21',

      birthPlace:
        'Karachi',

      mobileNumber:
        '0509988776',

      residentTelephone:
        '043332211',

      email:
        'mohammed.khan@example.com',

      idNumber:
        '784-1983-2234567-2',

      state:
        'Dubai',

      country:
        'AE',

      nationality:
        'PK',

      membershipNumber:
        'MEM-100044',

      membershipOpenedDate:
        '2020-11-20',

      customerType:
        'individual',

      currentRiskRating:
        'medium',

      residentStatus:
        'resident',

      manualRisk:
        false,

      watchList:
        false,
    },


    {
      id: 3,

      firstName:
        'Sara',

      middleName:
        'Abdullah',

      lastName:
        'Ahmed',

      shortName:
        'Sara Ahmed',

      fullName:
        'Sara Abdullah Ahmed',

      gender:
        'female',

      dob:
        '1991-01-15',

      birthPlace:
        'Abu Dhabi',

      mobileNumber:
        '0521112233',

      residentTelephone:
        '026665544',

      email:
        'sara.ahmed@example.com',

      idNumber:
        '784-1991-3234567-3',

      state:
        'Abu Dhabi',

      country:
        'AE',

      nationality:
        'AE',

      membershipNumber:
        'MEM-100052',

      membershipOpenedDate:
        '2024-02-15',

      customerType:
        'individual',

      currentRiskRating:
        'medium-high',

      residentStatus:
        'resident',

      manualRisk:
        true,

      watchList:
        false,
    },


    {
      id: 4,

      firstName:
        'Global',

      middleName:
        '',

      lastName:
        'Trading LLC',

      shortName:
        'Global Trading',

      fullName:
        'Global Trading LLC',

      gender:
        'male',

      dob:
        '2012-01-01',

      birthPlace:
        'Dubai',

      mobileNumber:
        '0554443332',

      residentTelephone:
        '043449988',

      email:
        'accounts@globaltrading.example',

      idNumber:
        'CN-988727',

      state:
        'Dubai',

      country:
        'AE',

      nationality:
        'AE',

      membershipNumber:
        'MEM-200040',

      membershipOpenedDate:
        '2019-08-08',

      customerType:
        'corporate',

      currentRiskRating:
        'high',

      residentStatus:
        'resident',

      manualRisk:
        true,

      watchList:
        true,
    },


    {
      id: 5,

      firstName:
        'Omar',

      middleName:
        'Khalid',

      lastName:
        'Saeed',

      shortName:
        'Omar Saeed',

      fullName:
        'Omar Khalid Saeed',

      gender:
        'male',

      dob:
        '1979-06-22',

      birthPlace:
        'Muscat',

      mobileNumber:
        '0506565656',

      residentTelephone:
        '043111999',

      email:
        'omar.saeed@example.com',

      idNumber:
        '784-1979-5234567-5',

      state:
        'Sharjah',

      country:
        'AE',

      nationality:
        'OM',

      membershipNumber:
        'MEM-100024',

      membershipOpenedDate:
        '2021-06-30',

      customerType:
        'individual',

      currentRiskRating:
        'high',

      residentStatus:
        'non-resident',

      manualRisk:
        false,

      watchList:
        true,
    },

  ];


// ==================================================
// DEFAULT FILTERS
// ==================================================

export function createCustomerRiskVerificationFilters():
  CustomerRiskVerificationFilters {

  return {

    firstName: '',

    middleName: '',

    lastName: '',

    shortName: '',

    fullName: '',

    gender:
      'all',

    dob: '',

    birthPlace: '',

    mobileNumber: '',

    residentTelephone: '',

    email: '',

    idNumber: '',

    state: '',

    country:
      'all',

    nationality:
      'all',

    membershipNumber: '',

    membershipOpenedDate: '',

    customerType:
      'all',

    currentRiskRating:
      'all',

    residentStatus:
      'all',

    manualRisk:
      false,

    watchList:
      false,
  };
}