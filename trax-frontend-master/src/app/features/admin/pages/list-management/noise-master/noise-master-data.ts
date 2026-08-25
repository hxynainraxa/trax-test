// ==================================================
// STATUS
// ==================================================

export type NoiseMasterStatus =
  | 'active'
  | 'inactive';


// ==================================================
// RECORD
// ==================================================

export interface NoiseMasterRecord {
  id: number;

  noiseCode: string;

  description: string;

  status:
    NoiseMasterStatus;

  createdBy: string;

  createdAt: string;

  modifiedBy: string;

  modifiedAt: string;
}


// ==================================================
// FORM
// ==================================================

export interface NoiseMasterForm {
  noiseCode: string;

  description: string;

  status:
    NoiseMasterStatus;

  createdBy: string;

  createdDate: string;

  modifiedBy: string;

  modifiedDate: string;
}


// ==================================================
// DUMMY DATA
// ==================================================

export const initialNoiseMasterRecords:
  NoiseMasterRecord[] = [

    {
      id: 1,

      noiseCode:
        'NM-001',

      description:
        'Common title and salutation words',

      status:
        'active',

      createdBy:
        'Admin',

      createdAt:
        '2026-08-01T09:20:00',

      modifiedBy:
        '',

      modifiedAt:
        '',
    },

    {
      id: 2,

      noiseCode:
        'NM-002',

      description:
        'Generic company suffixes',

      status:
        'active',

      createdBy:
        'Admin',

      createdAt:
        '2026-08-03T11:15:00',

      modifiedBy:
        'Admin',

      modifiedAt:
        '2026-08-10T10:30:00',
    },

    {
      id: 3,

      noiseCode:
        'NM-003',

      description:
        'Frequently ignored name particles',

      status:
        'inactive',

      createdBy:
        'Admin',

      createdAt:
        '2026-07-21T08:45:00',

      modifiedBy:
        'Admin',

      modifiedAt:
        '2026-08-05T14:10:00',
    },

    {
      id: 4,

      noiseCode:
        'NM-004',

      description:
        'Common business terminology',

      status:
        'active',

      createdBy:
        'Admin',

      createdAt:
        '2026-08-11T13:35:00',

      modifiedBy:
        '',

      modifiedAt:
        '',
    },

    {
      id: 5,

      noiseCode:
        'NM-005',

      description:
        'Ignored formatting keywords',

      status:
        'active',

      createdBy:
        'Admin',

      createdAt:
        '2026-08-15T15:40:00',

      modifiedBy:
        '',

      modifiedAt:
        '',
    },

  ];


// ==================================================
// DEFAULT ADD FORM
// ==================================================

export function createNoiseMasterAddForm():
  NoiseMasterForm {

  return {
    noiseCode: '',

    description: '',

    status:
      'active',

    createdBy: '',

    createdDate: '',

    modifiedBy: '',

    modifiedDate: '',
  };
}


// ==================================================
// DEFAULT SEARCH FORM
// ==================================================

export function createNoiseMasterSearchForm():
  NoiseMasterForm {

  return {
    noiseCode: '',

    description: '',

    status:
      'active',

    createdBy: '',

    createdDate: '',

    modifiedBy: '',

    modifiedDate: '',
  };
}