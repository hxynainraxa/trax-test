// ==================================================
// DEPARTMENT RECORD
// ==================================================

export interface DepartmentRecord {
  id: number;

  code: string;

  name: string;

  description: string;

  createdBy: string;

  createdAt: string;

  modifiedBy: string;

  modifiedAt: string;
}


// ==================================================
// DEPARTMENT FORM
// ==================================================

export interface DepartmentForm {
  code: string;

  name: string;

  description: string;
}


// ==================================================
// SEARCH FILTER
// ==================================================

export interface DepartmentSearchFilters {
  code: string;

  name: string;

  description: string;
}


// ==================================================
// INITIAL DATA
// ==================================================

export const initialDepartmentRecords:
  DepartmentRecord[] = [

    {
      id: 1,

      code:
        'AML',

      name:
        'AML DEPARTMENT',

      description:
        'Anti-Money Laundering Department',

      createdBy:
        'Admin',

      createdAt:
        '2026-08-20T10:00:00',

      modifiedBy:
        '',

      modifiedAt:
        '',
    },

    {
      id: 2,

      code:
        'CMP',

      name:
        'COMPLIANCE DEPARTMENT',

      description:
        'Compliance and regulatory operations',

      createdBy:
        'Admin',

      createdAt:
        '2026-08-21T10:15:00',

      modifiedBy:
        '',

      modifiedAt:
        '',
    },

    {
      id: 3,

      code:
        'OPS',

      name:
        'OPERATIONS DEPARTMENT',

      description:
        'Operational processing department',

      createdBy:
        'Admin',

      createdAt:
        '2026-08-22T09:45:00',

      modifiedBy:
        '',

      modifiedAt:
        '',
    },

  ];


// ==================================================
// DEFAULT FORM
// ==================================================

export function createDefaultDepartmentForm():
  DepartmentForm {

  return {
    code: '',
    name: '',
    description: '',
  };
}


// ==================================================
// DEFAULT SEARCH
// ==================================================

export function createDefaultDepartmentSearchFilters():
  DepartmentSearchFilters {

  return {
    code: '',
    name: '',
    description: '',
  };
}