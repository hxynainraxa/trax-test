export interface ParamMasterRecord {
  id: number;
  code: number;
  description: string;
  value: string;
  visible: boolean;
  udf: boolean;
  modifiedBy: string;
  modifiedDate: string;
}

export const paramMasterData: ParamMasterRecord[] = [
  {
    id: 1,
    code: 20,
    description: 'Check Duplication for Good Quality AKA',
    value: 'Y',
    visible: true,
    udf: true,
    modifiedBy: '',
    modifiedDate: '',
  },
  {
    id: 2,
    code: 56,
    description: 'CaseManagementSystem',
    value: 'N',
    visible: false,
    udf: true,
    modifiedBy: '',
    modifiedDate: '1/1/1900 12:00:00 AM',
  },
  {
    id: 3,
    code: 58,
    description: 'Blacklist violation additional filters',
    value: 'N',
    visible: false,
    udf: true,
    modifiedBy: '',
    modifiedDate: '1/1/1900 12:00:00 AM',
  },
  {
    id: 4,
    code: 60,
    description: 'Yearly- Risk Transaction Frequency',
    value: 'N',
    visible: false,
    udf: true,
    modifiedBy: '',
    modifiedDate: '1/1/1900 12:00:00 AM',
  },
  {
    id: 5,
    code: 61,
    description: 'Comments dropdown while releasing',
    value: 'N',
    visible: false,
    udf: true,
    modifiedBy: '',
    modifiedDate: '1/1/1900 12:00:00 AM',
  },
  {
    id: 6,
    code: 63,
    description: '90 days transaction in customer summary',
    value: 'N',
    visible: false,
    udf: true,
    modifiedBy: '',
    modifiedDate: '1/1/1900 12:00:00 AM',
  },
  {
    id: 7,
    code: 64,
    description: 'Previous risk calculation checking',
    value: 'Y',
    visible: false,
    udf: true,
    modifiedBy: '',
    modifiedDate: '1/1/1900 12:00:00 AM',
  },
];