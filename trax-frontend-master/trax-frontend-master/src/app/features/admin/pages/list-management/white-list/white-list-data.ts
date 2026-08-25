// ==================================================
// NAME TYPE
// ==================================================

export type WhiteListNameType =
  | 'all'
  | 'individual'
  | 'corporate';


// ==================================================
// STATUS
// ==================================================

export type WhiteListStatus =
  | 'all'
  | 'active'
  | 'inactive';


// ==================================================
// RECORD
// ==================================================

export interface WhiteListRecord {
  id: number;

  nameType:
    'individual'
    | 'corporate';

  membershipNo: string;

  name: string;

  nationality: string;

  includeFrom: string;

  includeTo: string;

  remarks: string;

  active: boolean;

  createdAt: string;

  updatedAt: string;
}


// ==================================================
// FORM
// ==================================================

export interface WhiteListForm {
  nameType:
    WhiteListNameType;

  membershipNo: string;

  name: string;

  nationality: string;

  includeFrom: string;

  includeTo: string;

  remarks: string;

  status:
    WhiteListStatus;

  active: boolean;
}


// ==================================================
// INITIAL DUMMY DATA
// ==================================================

export const initialWhiteListRecords:
  WhiteListRecord[] = [

    {
      id: 1,

      nameType:
        'individual',

      membershipNo:
        'MEM-100021',

      name:
        'Ahmed Hassan Ali',

      nationality:
        'AE',

      includeFrom:
        '2026-08-20',

      includeTo:
        '2026-08-27',

      remarks:
        'Temporary whitelist approval.',

      active:
        true,

      createdAt:
        '2026-08-20T10:10:00',

      updatedAt:
        '2026-08-20T10:10:00',
    },


    {
      id: 2,

      nameType:
        'corporate',

      membershipNo:
        'MEM-100022',

      name:
        'Al Noor Trading LLC',

      nationality:
        'AE',

      includeFrom:
        '2026-08-18',

      includeTo:
        '2026-09-18',

      remarks:
        'Approved corporate exception.',

      active:
        true,

      createdAt:
        '2026-08-18T09:30:00',

      updatedAt:
        '2026-08-18T09:30:00',
    },


    {
      id: 3,

      nameType:
        'individual',

      membershipNo:
        'MEM-100023',

      name:
        'Mohammed Raza Khan',

      nationality:
        'PK',

      includeFrom:
        '2026-08-01',

      includeTo:
        '2026-08-31',

      remarks:
        'Manual whitelist entry.',

      active:
        true,

      createdAt:
        '2026-08-01T11:00:00',

      updatedAt:
        '2026-08-01T11:00:00',
    },


    {
      id: 4,

      nameType:
        'individual',

      membershipNo:
        'MEM-100024',

      name:
        'Omar Khalid Saeed',

      nationality:
        'LB',

      includeFrom:
        '2026-07-10',

      includeTo:
        '2026-08-10',

      remarks:
        'Whitelist period completed.',

      active:
        false,

      createdAt:
        '2026-07-10T08:00:00',

      updatedAt:
        '2026-08-10T08:00:00',
    },


    {
      id: 5,

      nameType:
        'corporate',

      membershipNo:
        'MEM-100025',

      name:
        'North Star Holdings',

      nationality:
        'GB',

      includeFrom:
        '2026-08-15',

      includeTo:
        '2026-09-15',

      remarks:
        'Approved for selected monitoring period.',

      active:
        true,

      createdAt:
        '2026-08-15T14:10:00',

      updatedAt:
        '2026-08-15T14:10:00',
    },

  ];


// ==================================================
// DEFAULT ADD FORM
// ==================================================

export function createDefaultWhiteListAddForm():
  WhiteListForm {

  return {
    nameType:
      'individual',

    membershipNo:
      '',

    name:
      '',

    nationality:
      '',

    includeFrom:
      '',

    includeTo:
      '',

    remarks:
      '',

    status:
      'active',

    active:
      true,
  };
}


// ==================================================
// DEFAULT SEARCH FORM
// ==================================================

export function createDefaultWhiteListSearchForm():
  WhiteListForm {

  return {
    nameType:
      'all',

    membershipNo:
      '',

    name:
      '',

    nationality:
      '',

    includeFrom:
      '',

    includeTo:
      '',

    remarks:
      '',

    status:
      'all',

    active:
      true,
  };
}