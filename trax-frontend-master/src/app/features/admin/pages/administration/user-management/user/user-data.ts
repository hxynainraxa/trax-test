// ==================================================
// USER STATUS
// ==================================================

export type UserStatus =
  | 'active'
  | 'inactive'
  | 'temporary-inactive'
  | 'blocked';


// ==================================================
// USER RECORD
// ==================================================

export interface UserRecord {
  id: number;

  firstName: string;

  lastName: string;

  username: string;

  password: string;

  email: string;

  departmentCode: string;

  departmentName: string;

  designationCode: string;

  designationName: string;

  roleId: number | null;

  roleName: string;

  status: UserStatus;

  branch: string;

  description: string;

  createdBy: string;

  createdAt: string;

  modifiedBy: string;

  modifiedAt: string;
}


// ==================================================
// USER FORM
// ==================================================

export interface UserForm {
  firstName: string;

  lastName: string;

  username: string;

  password: string;

  confirmPassword: string;

  email: string;

  departmentCode: string;

  designationCode: string;

  roleId: number | null;

  status: UserStatus;

  branch: string;

  description: string;
}


// ==================================================
// SEARCH FILTER
// ==================================================

export interface UserSearchFilters {
  firstName: string;

  lastName: string;

  username: string;

  email: string;

  description: string;

  departmentCode: string;

  designationCode: string;

  roleId: number | null;

  status: UserStatus | 'all';

  branch: string;
}


// ==================================================
// OPTION
// ==================================================

export interface UserOption<T = string> {
  value: T;

  label: string;
}


// ==================================================
// BRANCHES
// ==================================================

export const userBranchOptions:
  UserOption[] = [

    {
      value: 'head-office',
      label: 'Head Office',
    },

    {
      value: 'deira-branch',
      label: 'Deira Branch',
    },

    {
      value: 'al-ain-branch',
      label: 'Al Ain Branch',
    },

  ];


// ==================================================
// STATUS OPTIONS
// ==================================================

export const userStatusOptions:
  UserOption<UserStatus>[] = [

    {
      value: 'active',
      label: 'Active',
    },

    {
      value: 'inactive',
      label: 'Inactive',
    },

    {
      value: 'temporary-inactive',
      label: 'Temporary Inactive',
    },

    {
      value: 'blocked',
      label: 'Blocked',
    },

  ];


// ==================================================
// INITIAL USERS
// ==================================================

export const initialUserRecords:
  UserRecord[] = [

    {
      id: 1,

      firstName: 'Ahmed',

      lastName: 'Ali',

      username: 'ahmed.ali',

      password: 'Demo@123',

      email: 'ahmed.ali@example.com',

      departmentCode: 'AML',

      departmentName:
        'AML DEPARTMENT',

      designationCode:
        'AML-MGR',

      designationName:
        'AML Manager',

      roleId: 2,

      roleName:
        'AML Manager',

      status: 'active',

      branch:
        'head-office',

      description:
        'AML department manager',

      createdBy: 'Admin',

      createdAt:
        '2026-08-20T10:00:00',

      modifiedBy: '',

      modifiedAt: '',
    },

    {
      id: 2,

      firstName: 'Sara',

      lastName: 'Khan',

      username: 'sara.khan',

      password: 'Demo@123',

      email: 'sara.khan@example.com',

      departmentCode: 'AML',

      departmentName:
        'AML DEPARTMENT',

      designationCode:
        'AML-OFC',

      designationName:
        'AML Officer',

      roleId: 3,

      roleName:
        'AML Officer',

      status: 'active',

      branch:
        'deira-branch',

      description:
        'AML operations user',

      createdBy: 'Admin',

      createdAt:
        '2026-08-21T11:30:00',

      modifiedBy: '',

      modifiedAt: '',
    },

  ];


// ==================================================
// DEFAULT ADD / EDIT
// ==================================================

export function createDefaultUserForm():
  UserForm {

  return {
    firstName: '',

    lastName: '',

    username: '',

    password: '',

    confirmPassword: '',

    email: '',

    departmentCode: '',

    designationCode: '',

    roleId: null,

    status: 'active',

    branch: '',

    description: '',
  };
}


// ==================================================
// DEFAULT SEARCH
// ==================================================

export function createDefaultUserSearchFilters():
  UserSearchFilters {

  return {
    firstName: '',

    lastName: '',

    username: '',

    email: '',

    description: '',

    departmentCode: 'all',

    designationCode: 'all',

    roleId: null,

    status: 'active',

    branch: 'all',
  };
}