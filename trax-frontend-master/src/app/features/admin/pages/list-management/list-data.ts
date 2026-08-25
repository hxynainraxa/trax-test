// ==================================================
// MANAGED LIST
// ==================================================

export interface ManagedList {
  id: number;

  code: string;

  name: string;

  createdAt: string;

  updatedAt: string;
}


// ==================================================
// LIST FORM
// ==================================================

export interface ListFormData {
  code: string;

  name: string;
}


// ==================================================
// DROPDOWN OPTION
// ==================================================

export interface ManagedListOption {
  value: number;

  code: string;

  label: string;
}


// ==================================================
// DEFAULT LISTS
// ==================================================

export const initialManagedLists:
  ManagedList[] = [

    {
      id: 1,

      code: 'CB',

      name: 'Central Bank List',

      createdAt:
        '2026-08-20T09:00:00',

      updatedAt:
        '2026-08-20T09:00:00',
    },

    {
      id: 2,

      code: 'INT',

      name: 'Internal List',

      createdAt:
        '2026-08-20T09:00:00',

      updatedAt:
        '2026-08-20T09:00:00',
    },

  ];