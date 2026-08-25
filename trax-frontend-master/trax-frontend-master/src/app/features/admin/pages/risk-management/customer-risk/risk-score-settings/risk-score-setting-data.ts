// ==================================================
// STATUS
// ==================================================

export type RiskScoreHistoryStatus =
  | 'all'
  | 'active'
  | 'inactive';


// ==================================================
// SCORE RANGE
// ==================================================

export interface RiskScoreRange {
  key:
    | 'low'
    | 'medium'
    | 'medium-high'
    | 'high';

  label: string;

  scoreFrom: number;

  scoreTo: number;
}


// ==================================================
// CURRENT CONFIGURATION
// ==================================================

export interface RiskScoreConfiguration {
  id: number;

  ranges:
    RiskScoreRange[];

  createdBy:
    string;

  createdAt:
    string;

  status:
    'active'
    | 'inactive';
}


// ==================================================
// HISTORY RECORD
// ==================================================

export interface RiskScoreHistoryRecord {
  id: number;

  lowFrom: number;

  lowTo: number;

  mediumFrom: number;

  mediumTo: number;

  mediumHighFrom: number;

  mediumHighTo: number;

  highFrom: number;

  highTo: number;

  status:
    'active'
    | 'inactive';

  createdBy:
    string;

  createdAt:
    string;
}


// ==================================================
// HISTORY FILTERS
// ==================================================

export interface RiskScoreHistoryFilters {
  lowFrom:
    string;

  lowTo:
    string;

  mediumFrom:
    string;

  mediumTo:
    string;

  highFrom:
    string;

  highTo:
    string;

  status:
    RiskScoreHistoryStatus;
}


// ==================================================
// CURRENT FIXED ADMIN CONFIGURATION
//
// This screen is READ ONLY.
// User cannot edit these values.
// ==================================================

export const currentRiskScoreConfiguration:
  RiskScoreConfiguration = {

    id: 4,

    ranges: [

      {
        key:
          'low',

        label:
          'Low',

        scoreFrom:
          0,

        scoreTo:
          1,
      },

      {
        key:
          'medium',

        label:
          'Medium',

        scoreFrom:
          1.01,

        scoreTo:
          2,
      },

      {
        key:
          'medium-high',

        label:
          'Medium High',

        scoreFrom:
          2.01,

        scoreTo:
          2.5,
      },

      {
        key:
          'high',

        label:
          'High',

        scoreFrom:
          2.51,

        scoreTo:
          10,
      },

    ],

    createdBy:
      'Admin',

    createdAt:
      '2026-08-20T13:07:07',

    status:
      'active',
  };


// ==================================================
// CONFIGURATION HISTORY
// ==================================================

export const riskScoreHistory:
  RiskScoreHistoryRecord[] = [

    {
      id:
        4,

      lowFrom:
        0,

      lowTo:
        1,

      mediumFrom:
        1.01,

      mediumTo:
        2,

      mediumHighFrom:
        2.01,

      mediumHighTo:
        2.5,

      highFrom:
        2.51,

      highTo:
        10,

      status:
        'active',

      createdBy:
        'Admin',

      createdAt:
        '2026-08-20T13:07:07',
    },


    {
      id:
        3,

      lowFrom:
        0,

      lowTo:
        0.75,

      mediumFrom:
        0.76,

      mediumTo:
        1.75,

      mediumHighFrom:
        1.76,

      mediumHighTo:
        2.5,

      highFrom:
        2.51,

      highTo:
        10,

      status:
        'inactive',

      createdBy:
        'Admin',

      createdAt:
        '2026-06-15T10:45:00',
    },


    {
      id:
        2,

      lowFrom:
        0,

      lowTo:
        1,

      mediumFrom:
        1.01,

      mediumTo:
        2.25,

      mediumHighFrom:
        2.26,

      mediumHighTo:
        3,

      highFrom:
        3.01,

      highTo:
        10,

      status:
        'inactive',

      createdBy:
        'Admin',

      createdAt:
        '2026-04-10T09:30:00',
    },


    {
      id:
        1,

      lowFrom:
        0,

      lowTo:
        1.25,

      mediumFrom:
        1.26,

      mediumTo:
        2.5,

      mediumHighFrom:
        2.51,

      mediumHighTo:
        3.5,

      highFrom:
        3.51,

      highTo:
        10,

      status:
        'inactive',

      createdBy:
        'Admin',

      createdAt:
        '2026-01-08T08:15:00',
    },

  ];


// ==================================================
// DEFAULT HISTORY FILTERS
// ==================================================

export function createRiskScoreHistoryFilters():
  RiskScoreHistoryFilters {

  return {

    lowFrom:
      '',

    lowTo:
      '',

    mediumFrom:
      '',

    mediumTo:
      '',

    highFrom:
      '',

    highTo:
      '',

    status:
      'all',
  };
}