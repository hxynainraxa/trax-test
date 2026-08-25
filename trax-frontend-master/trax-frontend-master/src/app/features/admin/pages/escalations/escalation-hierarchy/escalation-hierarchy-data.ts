// ==================================================
// OPTION
// ==================================================

export interface EscalationHierarchyOption {
  value: string;
  label: string;
}


// ==================================================
// DEPARTMENT
// ==================================================

export const escalationDepartmentOptions:
  EscalationHierarchyOption[] = [

    {
      value: 'aml-department',
      label: 'AML DEPARTMENT',
    },

  ];


// ==================================================
// MODULE
// ==================================================

export const escalationModuleOptions:
  EscalationHierarchyOption[] = [

    {
      value: '',
      label: '--Select--',
    },

    {
      value: 'rule-violation',
      label: 'Rule Violation',
    },

    {
      value: 'customer-violation',
      label: 'Customer Violation',
    },

    {
      value: 'blacklist-sdn-violations',
      label: 'Black list/SDN violations',
    },

    {
      value: 'case-violation',
      label: 'Case Violation',
    },

    {
      value: 'risk-violation',
      label: 'Risk Violation',
    },

  ];


// ==================================================
// RECORD
// ==================================================

export interface EscalationHierarchyRecord {
  id: number;

  department: string;

  module: string;

  createdBy: string;

  createdAt: string;
}


// ==================================================
// SEARCH FILTER
// ==================================================

export interface EscalationHierarchySearchFilters {
  department: string;

  module: string;
}


// ==================================================
// EXISTING MOCK RECORDS
// ==================================================

export const initialEscalationHierarchyRecords:
  EscalationHierarchyRecord[] = [

    {
      id: 1,

      department:
        'aml-department',

      module:
        'rule-violation',

      createdBy:
        'Admin',

      createdAt:
        '2026-08-20T10:10:00',
    },

    {
      id: 2,

      department:
        'aml-department',

      module:
        'blacklist-sdn-violations',

      createdBy:
        'Admin',

      createdAt:
        '2026-08-21T09:20:00',
    },

    {
      id: 3,

      department:
        'aml-department',

      module:
        'case-violation',

      createdBy:
        'Admin',

      createdAt:
        '2026-08-22T11:30:00',
    },

  ];


// ==================================================
// DEFAULT SEARCH
// ==================================================

export function createEscalationHierarchySearchFilters():
  EscalationHierarchySearchFilters {

  return {
    department: '',
    module: '',
  };
}