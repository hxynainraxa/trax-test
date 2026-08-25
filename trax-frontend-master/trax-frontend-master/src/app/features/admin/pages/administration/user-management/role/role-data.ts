// ==================================================
// ROLE RECORD
// ==================================================

export interface RoleRecord {
  id: number;

  role: string;

  description: string;

  createdBy: string;

  createdAt: string;

  modifiedBy: string;

  modifiedAt: string;
}


// ==================================================
// ROLE FORM
// ==================================================

export interface RoleForm {
  role: string;

  description: string;
}


// ==================================================
// SEARCH FILTERS
// ==================================================

export interface RoleSearchFilters {
  role: string;

  description: string;
}


// ==================================================
// INITIAL MOCK DATA
// ==================================================

export const initialRoleRecords:
  RoleRecord[] = [

    {
      id: 1,

      role: 'Administrator',

      description:
        'Full system administration access.',

      createdBy: 'Admin',

      createdAt:
        '2026-08-20T10:00:00',

      modifiedBy: '',

      modifiedAt: '',
    },

    {
      id: 2,

      role: 'AML Manager',

      description:
        'AML operational management role.',

      createdBy: 'Admin',

      createdAt:
        '2026-08-21T09:30:00',

      modifiedBy: '',

      modifiedAt: '',
    },

    {
      id: 3,

      role: 'AML Officer',

      description:
        'AML operational user role.',

      createdBy: 'Admin',

      createdAt:
        '2026-08-22T11:15:00',

      modifiedBy: '',

      modifiedAt: '',
    },

  ];


// ==================================================
// DEFAULT FORM
// ==================================================

export function createDefaultRoleForm():
  RoleForm {

  return {
    role: '',
    description: '',
  };
}


// ==================================================
// DEFAULT SEARCH FILTER
// ==================================================

export function createDefaultRoleSearchFilters():
  RoleSearchFilters {

  return {
    role: '',
    description: '',
  };
}