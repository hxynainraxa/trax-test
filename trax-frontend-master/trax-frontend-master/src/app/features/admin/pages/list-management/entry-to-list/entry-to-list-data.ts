// ==================================================
// TYPES
// ==================================================

export type EntryPersonType =
  | 'all'
  | 'individual'
  | 'corporate';


export type EntryStatus =
  | 'all'
  | 'active'
  | 'inactive';


export interface SelectOption {
  value: string;

  label: string;
}


export interface CountryOption {
  code: string;

  name: string;

  label: string;
}


// ==================================================
// REQUEST TYPES
// ==================================================

export const requestTypeOptions:
  SelectOption[] = [

    {
      value: 'all',
      label: 'All',
    },

    {
      value:
        'account-review-analysis-report',

      label:
        'Account review and analysis Report',
    },

    {
      value: 'confiscation',
      label: 'Confiscation',
    },

    {
      value: 'continue-to-freeze',
      label: 'Continue to Freeze',
    },

    {
      value: 'continue-to-search',
      label: 'Continue to Search',
    },

    {
      value:
        'prohibition-transfers-deposits',

      label:
        'Prohibition of transfers and deposits to others',
    },

    {
      value:
        'search-freeze-all-fls',

      label:
        'Search and Freeze to all Fls',
    },

    {
      value:
        'search-freeze-specific-fls',

      label:
        'Search and Freeze to Specific Fls',
    },

    {
      value:
        'search-all-fls',

      label:
        'Search to all Fls',
    },

    {
      value:
        'search-specific-fls',

      label:
        'Search to Specific Fls',
    },

    {
      value:
        'unfreeze-all-fls',

      label:
        'Unfreeze to all Fls',
    },

  ];


// ==================================================
// RELATIONSHIP
//
// Only these two values.
// ==================================================

export const relationshipOptions:
  SelectOption[] = [

    {
      value: 'customer',

      label: 'Customer',
    },

    {
      value: 'non-customer',

      label: 'Non Customer',
    },

  ];


// ==================================================
// ADDITIONAL ID TYPES
// ==================================================

export const additionalIdTypeOptions:
  SelectOption[] = [

    {
      value: '',
      label: 'Select ID Type',
    },

    {
      value: 'passport',
      label: 'Passport',
    },

    {
      value: 'national-id',
      label: 'National ID',
    },

    {
      value: 'emirates-id',
      label: 'Emirates ID',
    },

    {
      value: 'driving-license',
      label: 'Driving License',
    },

    {
      value:
        'company-registration',

      label:
        'Company Registration',
    },

    {
      value: 'other',
      label: 'Other',
    },

  ];


// ==================================================
// COUNTRIES
// ==================================================

const countries:
  Array<[string, string]> = [

    ['AF', 'AFGHANISTAN'],
    ['AX', 'ALAND ISLANDS'],
    ['AL', 'ALBANIA'],
    ['DZ', 'ALGERIA'],
    ['AS', 'AMERICAN SAMOA'],
    ['AD', 'ANDORRA'],
    ['AO', 'ANGOLA'],
    ['AI', 'ANGUILLA'],
    ['AQ', 'ANTARCTICA'],
    ['AG', 'ANTIGUA AND BARBUDA'],
    ['AR', 'ARGENTINA'],
    ['AM', 'ARMENIA'],
    ['AW', 'ARUBA'],
    ['AU', 'AUSTRALIA'],
    ['AT', 'AUSTRIA'],
    ['AZ', 'AZERBAIJAN'],

    ['BS', 'BAHAMAS'],
    ['BH', 'BAHRAIN'],
    ['BD', 'BANGLADESH'],
    ['BB', 'BARBADOS'],
    ['BY', 'BELARUS'],
    ['BE', 'BELGIUM'],
    ['BZ', 'BELIZE'],
    ['BJ', 'BENIN'],
    ['BM', 'BERMUDA'],
    ['BT', 'BHUTAN'],
    ['BO', 'BOLIVIA'],
    ['BA', 'BOSNIA AND HERZEGOVINA'],
    ['BW', 'BOTSWANA'],
    ['BR', 'BRAZIL'],
    ['BN', 'BRUNEI'],
    ['BG', 'BULGARIA'],
    ['BF', 'BURKINA FASO'],
    ['BI', 'BURUNDI'],

    ['CV', 'CABO VERDE'],
    ['KH', 'CAMBODIA'],
    ['CM', 'CAMEROON'],
    ['CA', 'CANADA'],
    ['KY', 'CAYMAN ISLANDS'],
    ['CF', 'CENTRAL AFRICAN REPUBLIC'],
    ['TD', 'CHAD'],
    ['CL', 'CHILE'],
    ['CN', 'CHINA'],
    ['CO', 'COLOMBIA'],
    ['KM', 'COMOROS'],
    ['CG', 'CONGO'],
    ['CD', 'CONGO, DEMOCRATIC REPUBLIC'],
    ['CR', 'COSTA RICA'],
    ['CI', 'COTE D IVOIRE'],
    ['HR', 'CROATIA'],
    ['CU', 'CUBA'],
    ['CY', 'CYPRUS'],
    ['CZ', 'CZECHIA'],

    ['DK', 'DENMARK'],
    ['DJ', 'DJIBOUTI'],
    ['DM', 'DOMINICA'],
    ['DO', 'DOMINICAN REPUBLIC'],

    ['EC', 'ECUADOR'],
    ['EG', 'EGYPT'],
    ['SV', 'EL SALVADOR'],
    ['GQ', 'EQUATORIAL GUINEA'],
    ['ER', 'ERITREA'],
    ['EE', 'ESTONIA'],
    ['SZ', 'ESWATINI'],
    ['ET', 'ETHIOPIA'],

    ['FJ', 'FIJI'],
    ['FI', 'FINLAND'],
    ['FR', 'FRANCE'],

    ['GA', 'GABON'],
    ['GM', 'GAMBIA'],
    ['GE', 'GEORGIA'],
    ['DE', 'GERMANY'],
    ['GH', 'GHANA'],
    ['GR', 'GREECE'],
    ['GD', 'GRENADA'],
    ['GT', 'GUATEMALA'],
    ['GN', 'GUINEA'],
    ['GW', 'GUINEA-BISSAU'],
    ['GY', 'GUYANA'],

    ['HT', 'HAITI'],
    ['HN', 'HONDURAS'],
    ['HK', 'HONG KONG'],
    ['HU', 'HUNGARY'],

    ['IS', 'ICELAND'],
    ['IN', 'INDIA'],
    ['ID', 'INDONESIA'],
    ['IR', 'IRAN'],
    ['IQ', 'IRAQ'],
    ['IE', 'IRELAND'],
    ['IL', 'ISRAEL'],
    ['IT', 'ITALY'],

    ['JM', 'JAMAICA'],
    ['JP', 'JAPAN'],
    ['JO', 'JORDAN'],

    ['KZ', 'KAZAKHSTAN'],
    ['KE', 'KENYA'],
    ['KW', 'KUWAIT'],
    ['KG', 'KYRGYZSTAN'],

    ['LA', 'LAOS'],
    ['LV', 'LATVIA'],
    ['LB', 'LEBANON'],
    ['LS', 'LESOTHO'],
    ['LR', 'LIBERIA'],
    ['LY', 'LIBYA'],
    ['LI', 'LIECHTENSTEIN'],
    ['LT', 'LITHUANIA'],
    ['LU', 'LUXEMBOURG'],

    ['MY', 'MALAYSIA'],
    ['MV', 'MALDIVES'],
    ['ML', 'MALI'],
    ['MT', 'MALTA'],
    ['MR', 'MAURITANIA'],
    ['MU', 'MAURITIUS'],
    ['MX', 'MEXICO'],
    ['MD', 'MOLDOVA'],
    ['MC', 'MONACO'],
    ['MN', 'MONGOLIA'],
    ['ME', 'MONTENEGRO'],
    ['MA', 'MOROCCO'],
    ['MZ', 'MOZAMBIQUE'],
    ['MM', 'MYANMAR'],

    ['NA', 'NAMIBIA'],
    ['NP', 'NEPAL'],
    ['NL', 'NETHERLANDS'],
    ['NZ', 'NEW ZEALAND'],
    ['NI', 'NICARAGUA'],
    ['NE', 'NIGER'],
    ['NG', 'NIGERIA'],
    ['MK', 'NORTH MACEDONIA'],
    ['NO', 'NORWAY'],

    ['OM', 'OMAN'],

    ['PK', 'PAKISTAN'],
    ['PS', 'PALESTINE'],
    ['PA', 'PANAMA'],
    ['PG', 'PAPUA NEW GUINEA'],
    ['PY', 'PARAGUAY'],
    ['PE', 'PERU'],
    ['PH', 'PHILIPPINES'],
    ['PL', 'POLAND'],
    ['PT', 'PORTUGAL'],

    ['QA', 'QATAR'],

    ['RO', 'ROMANIA'],
    ['RU', 'RUSSIA'],
    ['RW', 'RWANDA'],

    ['SA', 'SAUDI ARABIA'],
    ['SN', 'SENEGAL'],
    ['RS', 'SERBIA'],
    ['SC', 'SEYCHELLES'],
    ['SL', 'SIERRA LEONE'],
    ['SG', 'SINGAPORE'],
    ['SK', 'SLOVAKIA'],
    ['SI', 'SLOVENIA'],
    ['SO', 'SOMALIA'],
    ['ZA', 'SOUTH AFRICA'],
    ['SS', 'SOUTH SUDAN'],
    ['ES', 'SPAIN'],
    ['LK', 'SRI LANKA'],
    ['SD', 'SUDAN'],
    ['SR', 'SURINAME'],
    ['SE', 'SWEDEN'],
    ['CH', 'SWITZERLAND'],
    ['SY', 'SYRIA'],

    ['TW', 'TAIWAN'],
    ['TJ', 'TAJIKISTAN'],
    ['TZ', 'TANZANIA'],
    ['TH', 'THAILAND'],
    ['TG', 'TOGO'],
    ['TN', 'TUNISIA'],
    ['TR', 'TURKEY'],
    ['TM', 'TURKMENISTAN'],

    ['UG', 'UGANDA'],
    ['UA', 'UKRAINE'],
    ['AE', 'UNITED ARAB EMIRATES'],
    ['GB', 'UNITED KINGDOM'],
    ['US', 'UNITED STATES'],
    ['UY', 'URUGUAY'],
    ['UZ', 'UZBEKISTAN'],

    ['VE', 'VENEZUELA'],
    ['VN', 'VIETNAM'],

    ['YE', 'YEMEN'],

    ['ZM', 'ZAMBIA'],
    ['ZW', 'ZIMBABWE'],

  ];


// ==================================================
// COUNTRY OPTIONS
// ==================================================

export const countryOptions:
  CountryOption[] =
    countries.map(
      ([code, name]) => ({

        code,

        name,

        label:
          `${name} ${code}`,
      }),
    );


// ==================================================
// NATIONALITY OPTIONS
// ==================================================

export const nationalityOptions:
  CountryOption[] =
    countryOptions;


// ==================================================
// ENTRY RECORD
// ==================================================

export interface EntryToListRecord {
  id: number;

  type:
    'individual'
    | 'corporate';

  listId: number;

  listCode: string;

  listName: string;

  unifiedNo: string;

  membershipNo: string;

  name: string;

  dob: string;

  placeOfBirth: string;

  address: string;

  country: string;

  nationality: string;

  iemsNo: string;

  accountNumber: string;

  requestType: string;

  passportIdDetails: string;

  designation: string;

  additionalIdNo: string;

  additionalIdType: string;

  lowQualityAka: string;

  goodQualityAka: string;

  mobileNo: string;

  relationship: string;

  remark: string;

  active: boolean;

  blacklistFileName: string;

  createdAt: string;

  updatedAt: string;
}


// ==================================================
// DUMMY RECORDS
// ==================================================

export const initialEntryToListRecords:
  EntryToListRecord[] = [

    {
      id: 1,

      type:
        'individual',

      listId: 1,

      listCode:
        'CB',

      listName:
        'Central Bank List',

      unifiedNo:
        'UNI-100001',

      membershipNo:
        'MEM-100001',

      name:
        'Ahmed Hassan Ali',

      dob:
        '1984-02-15',

      placeOfBirth:
        'Dubai',

      address:
        'Dubai, UAE',

      country:
        'AE',

      nationality:
        'AE',

      iemsNo:
        'IEMS-1001',

      accountNumber:
        'ACC-001928',

      requestType:
        'account-review-analysis-report',

      passportIdDetails:
        'P7841235',

      designation:
        'Director',

      additionalIdNo:
        '784-1984-1234567-1',

      additionalIdType:
        'emirates-id',

      lowQualityAka:
        'Ahmed H Ali',

      goodQualityAka:
        'Ahmed Hassan',

      mobileNo:
        '+971501234567',

      relationship:
        'customer',

      remark:
        'Existing Central Bank entry.',

      active:
        true,

      blacklistFileName:
        '',

      createdAt:
        '2026-08-10T09:15:00',

      updatedAt:
        '2026-08-10T09:15:00',
    },


    {
      id: 2,

      type:
        'corporate',

      listId: 2,

      listCode:
        'INT',

      listName:
        'Internal List',

      unifiedNo:
        'UNI-100002',

      membershipNo:
        'MEM-100002',

      name:
        'Global Trading LLC',

      dob: '',

      placeOfBirth: '',

      address:
        'Abu Dhabi, UAE',

      country:
        'AE',

      nationality:
        'AE',

      iemsNo:
        'IEMS-1002',

      accountNumber:
        'ACC-008282',

      requestType:
        'continue-to-search',

      passportIdDetails: '',

      designation: '',

      additionalIdNo:
        'CN-338200',

      additionalIdType:
        'company-registration',

      lowQualityAka:
        'Global Trading',

      goodQualityAka:
        'Global Trading LLC',

      mobileNo:
        '+971521114444',

      relationship:
        'non-customer',

      remark:
        'Internal monitoring entry.',

      active:
        true,

      blacklistFileName:
        '',

      createdAt:
        '2026-08-11T10:00:00',

      updatedAt:
        '2026-08-11T10:00:00',
    },


    {
      id: 3,

      type:
        'individual',

      listId: 1,

      listCode:
        'CB',

      listName:
        'Central Bank List',

      unifiedNo:
        'UNI-100003',

      membershipNo:
        'MEM-100003',

      name:
        'Mohammed Raza Khan',

      dob:
        '1978-08-21',

      placeOfBirth:
        'Karachi',

      address:
        'Sharjah, UAE',

      country:
        'PK',

      nationality:
        'PK',

      iemsNo:
        'IEMS-1003',

      accountNumber:
        'ACC-002431',

      requestType:
        'search-freeze-all-fls',

      passportIdDetails:
        'PK883120',

      designation:
        'Manager',

      additionalIdNo:
        '35202-1234567-1',

      additionalIdType:
        'national-id',

      lowQualityAka:
        'M R Khan',

      goodQualityAka:
        'Mohammed Khan',

      mobileNo:
        '+971555550333',

      relationship:
        'customer',

      remark: '',

      active:
        true,

      blacklistFileName:
        '',

      createdAt:
        '2026-08-12T11:20:00',

      updatedAt:
        '2026-08-12T11:20:00',
    },


    {
      id: 4,

      type:
        'individual',

      listId: 2,

      listCode:
        'INT',

      listName:
        'Internal List',

      unifiedNo:
        'UNI-100004',

      membershipNo:
        'MEM-100004',

      name:
        'Omar Khalid Saeed',

      dob:
        '1988-11-03',

      placeOfBirth:
        'Beirut',

      address:
        'Dubai, UAE',

      country:
        'LB',

      nationality:
        'LB',

      iemsNo:
        'IEMS-1004',

      accountNumber:
        'ACC-003127',

      requestType:
        'search-specific-fls',

      passportIdDetails:
        'LB821044',

      designation:
        'Consultant',

      additionalIdNo:
        '',

      additionalIdType:
        '',

      lowQualityAka:
        'Omar Saeed',

      goodQualityAka:
        'Omar Khalid Saeed',

      mobileNo:
        '+971507779991',

      relationship:
        'customer',

      remark:
        'Manual internal review.',

      active:
        false,

      blacklistFileName:
        '',

      createdAt:
        '2026-08-13T12:00:00',

      updatedAt:
        '2026-08-13T12:00:00',
    },


    {
      id: 5,

      type:
        'corporate',

      listId: 1,

      listCode:
        'CB',

      listName:
        'Central Bank List',

      unifiedNo:
        'UNI-100005',

      membershipNo:
        'MEM-100005',

      name:
        'North Star Holdings',

      dob: '',

      placeOfBirth: '',

      address:
        'Dubai, UAE',

      country:
        'AE',

      nationality:
        'AE',

      iemsNo:
        'IEMS-1005',

      accountNumber:
        'ACC-009245',

      requestType:
        'confiscation',

      passportIdDetails:
        '',

      designation:
        '',

      additionalIdNo:
        'CN-985122',

      additionalIdType:
        'company-registration',

      lowQualityAka:
        'North Star',

      goodQualityAka:
        'North Star Holdings',

      mobileNo:
        '+971509998812',

      relationship:
        'non-customer',

      remark:
        'Corporate list entry.',

      active:
        true,

      blacklistFileName:
        '',

      createdAt:
        '2026-08-15T13:15:00',

      updatedAt:
        '2026-08-15T13:15:00',
    },

  ];