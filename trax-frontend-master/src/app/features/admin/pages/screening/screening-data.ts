// ==================================================
// TYPES
// ==================================================

export type ScreeningStatus =
  | 'Active'
  | 'Inactive';

export type MatchingStyle =
  | 'Exact Match'
  | 'Exhaustive Match';


export interface ScreeningOption {
  label: string;
  value: string;
}


export interface ScreeningFilters {
  name: string;

  status:
    | 'all'
    | 'active'
    | 'inactive';

  list: string;

  matchingStyle: MatchingStyle;

  minWords: number | null;

  minLength: number | null;

  maxLength: number | null;

  idNumber: string;

  nationality: string;

  dob: string;
}


export interface BlacklistEntry {
  id: number;

  name: string;

  status: ScreeningStatus;

  /*
   * Value used by the List filter.
   *
   * Examples:
   * CB
   * OFAC-SDN
   * UN
   */
  list: string;

  /*
   * Human-readable table value.
   */
  listLabel: string;

  idNumber: string;

  nationality: string;

  dob: string;

  matchScore: number;
}


export interface ScreeningResponse {
  data: BlacklistEntry[];

  total: number;

  page: number;

  limit: number;
}


// ==================================================
// STATUS OPTIONS
// ==================================================

export const statusOptions:
  ScreeningOption[] = [
    {
      label: 'All',
      value: 'all',
    },
    {
      label: 'Active',
      value: 'active',
    },
    {
      label: 'Inactive',
      value: 'inactive',
    },
  ];


// ==================================================
// LIST OPTIONS
// ==================================================

export const listOptions:
  ScreeningOption[] = [
    {
      label: 'All',
      value: 'all',
    },
    {
      label: 'CB-Central Bank List',
      value: 'CB',
    },
    {
      label: 'OFAC-SDN-OFAC',
      value: 'OFAC-SDN',
    },
    {
      label:
        'UN-UN - Security Council Committee',
      value: 'UN',
    },
    {
      label: 'UK-UK List',
      value: 'UK',
    },
    {
      label: 'EU-European Union',
      value: 'EU',
    },
    {
      label: 'INT-Internal List',
      value: 'INT',
    },
    {
      label: 'C6-C6 Intelligence',
      value: 'C6',
    },
  ];


// ==================================================
// MATCHING STYLE OPTIONS
// ==================================================

export const matchingStyleOptions:
  Array<{
    label: MatchingStyle;
    value: MatchingStyle;
  }> = [
    {
      label: 'Exact Match',
      value: 'Exact Match',
    },
    {
      label: 'Exhaustive Match',
      value: 'Exhaustive Match',
    },
  ];


// ==================================================
// DEFAULT FILTERS
// ==================================================

export function createDefaultScreeningFilters():
  ScreeningFilters {
  return {
    name: '',

    status: 'all',

    list: 'all',

    matchingStyle:
      'Exhaustive Match',

    minWords: null,

    minLength: null,

    maxLength: null,

    idNumber: '',

    nationality: '',

    dob: '',
  };
}


// ==================================================
// DUMMY BLACKLIST DATA
// ==================================================

export const dummyBlacklistData:
  BlacklistEntry[] = [

    {
      id: 1,
      name: 'Ahmed Hassan Ali',
      status: 'Active',
      list: 'CB',
      listLabel:
        'CB-Central Bank List',
      idNumber: 'CB-100234',
      nationality: 'UAE',
      dob: '1984-02-15',
      matchScore: 98,
    },

    {
      id: 2,
      name: 'Mohammed Ahmed Khan',
      status: 'Active',
      list: 'OFAC-SDN',
      listLabel:
        'OFAC-SDN-OFAC',
      idNumber: 'OFAC-285731',
      nationality: 'Pakistan',
      dob: '1978-08-21',
      matchScore: 96,
    },

    {
      id: 3,
      name: 'Ali Reza Mahmoud',
      status: 'Inactive',
      list: 'UN',
      listLabel:
        'UN-UN - Security Council Committee',
      idNumber: 'UN-600931',
      nationality: 'Iran',
      dob: '1981-01-09',
      matchScore: 91,
    },

    {
      id: 4,
      name: 'Abdul Rahman Saeed',
      status: 'Active',
      list: 'UK',
      listLabel:
        'UK-UK List',
      idNumber: 'UK-198543',
      nationality: 'Jordan',
      dob: '1975-05-18',
      matchScore: 89,
    },

    {
      id: 5,
      name: 'Omar Khalid Hassan',
      status: 'Active',
      list: 'EU',
      listLabel:
        'EU-European Union',
      idNumber: 'EU-840218',
      nationality: 'Lebanon',
      dob: '1988-11-03',
      matchScore: 94,
    },

    {
      id: 6,
      name: 'Hassan Ali Raza',
      status: 'Inactive',
      list: 'INT',
      listLabel:
        'INT-Internal List',
      idNumber: 'INT-771904',
      nationality: 'Pakistan',
      dob: '1990-07-27',
      matchScore: 87,
    },

    {
      id: 7,
      name: 'Yousef Ahmed Ibrahim',
      status: 'Active',
      list: 'C6',
      listLabel:
        'C6-C6 Intelligence',
      idNumber: 'C6-912344',
      nationality: 'Egypt',
      dob: '1982-09-14',
      matchScore: 93,
    },

    {
      id: 8,
      name: 'Mohammed Saeed Ali',
      status: 'Active',
      list: 'CB',
      listLabel:
        'CB-Central Bank List',
      idNumber: 'CB-227810',
      nationality: 'UAE',
      dob: '1986-06-30',
      matchScore: 88,
    },

    {
      id: 9,
      name: 'Ahmed Raza Khan',
      status: 'Inactive',
      list: 'OFAC-SDN',
      listLabel:
        'OFAC-SDN-OFAC',
      idNumber: 'OFAC-991205',
      nationality: 'Pakistan',
      dob: '1974-10-12',
      matchScore: 85,
    },

    {
      id: 10,
      name: 'Khalid Mahmoud Saleh',
      status: 'Active',
      list: 'UN',
      listLabel:
        'UN-UN - Security Council Committee',
      idNumber: 'UN-120954',
      nationality: 'Syria',
      dob: '1969-03-04',
      matchScore: 99,
    },

    {
      id: 11,
      name: 'Ali Hassan Mohammed',
      status: 'Active',
      list: 'UK',
      listLabel:
        'UK-UK List',
      idNumber: 'UK-431825',
      nationality: 'Iraq',
      dob: '1987-12-19',
      matchScore: 92,
    },

    {
      id: 12,
      name: 'Ibrahim Omar Khalid',
      status: 'Inactive',
      list: 'EU',
      listLabel:
        'EU-European Union',
      idNumber: 'EU-378155',
      nationality: 'Egypt',
      dob: '1991-04-08',
      matchScore: 83,
    },

    {
      id: 13,
      name: 'Mahmoud Ahmed Saleh',
      status: 'Active',
      list: 'INT',
      listLabel:
        'INT-Internal List',
      idNumber: 'INT-881352',
      nationality: 'Jordan',
      dob: '1980-05-23',
      matchScore: 90,
    },

    {
      id: 14,
      name: 'Hassan Mohammed Raza',
      status: 'Active',
      list: 'C6',
      listLabel:
        'C6-C6 Intelligence',
      idNumber: 'C6-442198',
      nationality: 'Pakistan',
      dob: '1985-02-17',
      matchScore: 86,
    },

    {
      id: 15,
      name: 'Ahmed Ali Hassan',
      status: 'Active',
      list: 'CB',
      listLabel:
        'CB-Central Bank List',
      idNumber: 'CB-782340',
      nationality: 'UAE',
      dob: '1984-02-15',
      matchScore: 97,
    },

    {
      id: 16,
      name: 'Ali Ahmed Hassan',
      status: 'Inactive',
      list: 'OFAC-SDN',
      listLabel:
        'OFAC-SDN-OFAC',
      idNumber: 'OFAC-398124',
      nationality: 'UAE',
      dob: '1984-02-15',
      matchScore: 84,
    },
  ];


// ==================================================
// MOCK SCREENING RESPONSE
// ==================================================

export function mockScreeningResponse(
  filters: ScreeningFilters,
  page = 1,
  limit = 10,
): ScreeningResponse {

  const normalizedName =
    normalize(filters.name);

  const normalizedIdNumber =
    normalize(filters.idNumber);

  const normalizedNationality =
    normalize(filters.nationality);


  let filtered =
    dummyBlacklistData.filter(
      entry => {

        // ============================================
        // NAME
        // ============================================

        if (normalizedName) {
          const entryName =
            normalize(entry.name);

          if (
            filters.matchingStyle ===
            'Exact Match'
          ) {
            if (
              entryName !==
              normalizedName
            ) {
              return false;
            }
          } else {
            /*
             * Exhaustive matching:
             * every entered word must exist
             * somewhere in the blacklist name.
             */
            const searchWords =
              normalizedName
                .split(/\s+/)
                .filter(Boolean);

            const matchesAllWords =
              searchWords.every(
                word =>
                  entryName.includes(
                    word,
                  ),
              );

            if (!matchesAllWords) {
              return false;
            }
          }
        }


        // ============================================
        // STATUS
        // ============================================

        if (
          filters.status !== 'all' &&
          entry.status.toLowerCase() !==
            filters.status
        ) {
          return false;
        }


        // ============================================
        // LIST
        // ============================================

        if (
          filters.list !== 'all' &&
          entry.list !== filters.list
        ) {
          return false;
        }


        // ============================================
        // ID NUMBER
        // ============================================

        if (
          normalizedIdNumber &&
          !normalize(
            entry.idNumber,
          ).includes(
            normalizedIdNumber,
          )
        ) {
          return false;
        }


        // ============================================
        // NATIONALITY
        // ============================================

        if (
          normalizedNationality &&
          !normalize(
            entry.nationality,
          ).includes(
            normalizedNationality,
          )
        ) {
          return false;
        }


        // ============================================
        // DOB
        // ============================================

        if (
          filters.dob &&
          entry.dob !== filters.dob
        ) {
          return false;
        }


        // ============================================
        // WORD LENGTH
        // ============================================

        const wordCount =
          getWordCount(entry.name);


        if (
          filters.minWords !== null &&
          filters.minWords > 0 &&
          wordCount <
            filters.minWords
        ) {
          return false;
        }


        if (
          filters.minLength !== null &&
          filters.minLength > 0 &&
          wordCount <
            filters.minLength
        ) {
          return false;
        }


        if (
          filters.maxLength !== null &&
          filters.maxLength > 0 &&
          wordCount >
            filters.maxLength
        ) {
          return false;
        }


        return true;
      },
    );


  // ==================================================
  // BEST MATCH FIRST
  // ==================================================

  filtered = [...filtered].sort(
    (a, b) =>
      b.matchScore -
      a.matchScore,
  );


  // ==================================================
  // PAGINATION
  // ==================================================

  const safePage =
    Math.max(1, page);

  const safeLimit =
    Math.max(1, limit);

  const startIndex =
    (safePage - 1) *
    safeLimit;

  const endIndex =
    startIndex +
    safeLimit;


  return {
    data:
      filtered.slice(
        startIndex,
        endIndex,
      ),

    total:
      filtered.length,

    page:
      safePage,

    limit:
      safeLimit,
  };
}


// ==================================================
// HELPERS
// ==================================================

function normalize(
  value: unknown,
): string {
  return String(
    value ?? '',
  )
    .trim()
    .toLowerCase();
}


function getWordCount(
  value: string,
): number {
  return value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .length;
}