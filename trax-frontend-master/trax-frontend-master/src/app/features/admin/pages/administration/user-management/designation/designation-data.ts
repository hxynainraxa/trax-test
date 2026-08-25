// ==================================================
// DEPARTMENT OPTION
// ==================================================

export interface DesignationDepartmentOption {
  value: string;
  label: string;
}


// ==================================================
// DESIGNATION RECORD
// ==================================================

export interface DesignationRecord {
  id: number;

  code: string;

  name: string;

  departmentCode: string;

  departmentName: string;

  description: string;

  createdBy: string;

  createdAt: string;

  modifiedBy: string;

  modifiedAt: string;
}


// ==================================================
// DESIGNATION FORM
// ==================================================

export interface DesignationForm {
  code: string;

  name: string;

  departmentCode: string;

  description: string;
}


// ==================================================
// SEARCH FILTER
// ==================================================

export interface DesignationSearchFilters {
  code: string;

  name: string;

  departmentCode: string;

  description: string;
}


// ==================================================
// INITIAL DATA
// ==================================================

export const initialDesignationRecords:
  DesignationRecord[] = [

    {
      id: 1,

      code:
        'AML-MGR',

      name:
        'AML Manager',

      departmentCode:
        'AML',

      departmentName:
        'AML DEPARTMENT',

      description:
        'AML department manager',

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
        'AML-OFC',

      name:
        'AML Officer',

      departmentCode:
        'AML',

      departmentName:
        'AML DEPARTMENT',

      description:
        'AML operations officer',

      createdBy:
        'Admin',

      createdAt:
        '2026-08-21T10:00:00',

      modifiedBy:
        '',

      modifiedAt:
        '',
    },

    {
      id: 3,

      code:
        'CMP-MGR',

      name:
        'Compliance Manager',

      departmentCode:
        'CMP',

      departmentName:
        'COMPLIANCE DEPARTMENT',

      description:
        'Compliance department manager',

      createdBy:
        'Admin',

      createdAt:
        '2026-08-22T10:00:00',

      modifiedBy:
        '',

      modifiedAt:
        '',
    },

  ];


// ==================================================
// DEFAULT FORM
// ==================================================

export function createDefaultDesignationForm():
  DesignationForm {

  return {
    code: '',
    name: '',
    departmentCode: '',
    description: '',
  };
}


// ==================================================
// DEFAULT SEARCH
// ==================================================

export function createDefaultDesignationSearchFilters():
  DesignationSearchFilters {

  return {
    code: '',
    name: '',
    departmentCode: 'all',
    description: '',
  };
}