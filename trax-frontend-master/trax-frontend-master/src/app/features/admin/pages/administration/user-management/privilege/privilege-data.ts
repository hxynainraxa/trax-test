export interface PrivilegeItem {
  id: string;
  label: string;
}

export interface PrivilegeGroup {
  id: string;
  label: string;
  items: PrivilegeItem[];
}

export const privilegeRoles = [
  {
    value: 'aml-officer',
    label: 'AML Officer',
  },
  {
    value: 'aml-manager',
    label: 'AML Manager',
  },
];

const items = (
  values: string[],
): PrivilegeItem[] =>
  values.map((label, index) => ({
    id: `${label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')}-${index}`,
    label,
  }));

export const privilegeGroups:
  PrivilegeGroup[] = [

    {
      id: 'home',
      label: 'Home',
      items: items([
        'Blacklist Violation',
        'Followup Alerts',
        'Case Violation',
        'Identity Violation',
        'Customer Violation',
        'Risk Violation',
        'Escalations',
        'Rule Violation',
      ]),
    },

    {
      id: 'violation-status',
      label: 'Violation Status',
      items: items([
        'Black list violation Status Change',
        'Case violation Status Change',
        'Risk violation Status Change',
        'Rule violation Status Change',
      ]),
    },

    {
      id: 'masters',
      label: 'Masters',
      items: items([
        'Banks / Agents',
        'Currency',
        'Exchange Branches',
        'Representative',
        'Beneficiary',
        'Department',
        'ID Types',
        'Source Of Income',
        'Beneficiary Banks / Agents',
        'Designation',
        'Registered Member',
        'Remittance Purpose',
        'Business Category',
        'Employee',
      ]),
    },

    {
      id: 'settings',
      label: 'Settings',
      items: items([
        'Change Password',
        'Role',
        'User Privilege',
        'Param Master',
        'Scheduler',
        'Privilege',
        'Score Weightage Settings',
        'Reset Users Password',
        'User',
      ]),
    },

    {
      id: 'watch-list',
      label: 'Watch List',
      items: items([
        'Entry To List',
        'Transaction Scanning',
        'List',
        'View List',
        'Name Checker',
        'White List',
        'Noise Master',
        'White List Approve',
      ]),
    },

    {
      id: 'rule',
      label: 'Rule',
      items: items([
        'Clear Violation',
        'Entry To List Approve',
        'Suspicious Words',
        'Daily Rule Violation',
        'Geographic Groups',
        'Drug Trafficking Countries',
        'Goods List',
        'Embargoed Countries',
        'Rule',
      ]),
    },

    {
      id: 'case-management',
      label: 'Case Management',
      items: items([
        'Create Case',
      ]),
    },

    {
      id: 'risk-management',
      label: 'Risk Management',
      items: items([
        'Company Sub Type Risk',
        'Delivery Channel',
        'Profile Risk',
        'Service Types',
        'Company Type Risk',
        'Individual Risk Rating',
        'Remitter Type Risk Score',
        'Transaction Types',
        'Corporate Risk Rating',
        'Nature of Business Risk',
        'Risk Score Settings',
        'Transaction Amount Risk Score',
        'Country',
        'Occupation Risk',
        'Risk Transaction Frequency',
      ]),
    },

    {
      id: 'support-documents',
      label: 'Support Documents',
      items: items([
        'Followup Support Documents',
        'Support Documents',
      ]),
    },

    {
      id: 'escalations',
      label: 'Escalations',
      items: items([
        'Escalation',
        'Escalation Hierarchy',
      ]),
    },

    {
      id: 'reports',
      label: 'Reports',
      items: items([
        'Above Threshold',
        'Audit Report',
        'Case Violation Report',
        'Comments on Violation',
        'Error Log Report',
        'ISTR Transaction Report',
        'Member Report',
        'PEP Log Report',
        'Search Referral List',
        'STR Submitted Report',
        'Top Beneficiaries Receiving Transaction',
        'Transaction Report',
        'User Rights Report',

        'Activity Report',
        'Blacklist Screening Log Report',
        'CB File- Hivdask XML Generation',
        'Compliance Report',
        'Followup Violation Report',
        'Logical Report',
        'News Report',
        'Remittance Volume Report',
        'Single Beneficiary To Multiple Sender',
        'Surveillance Report',
        'Top Customers Sending Transaction',
        'Transaction Summary Report',
        'WatchList Updated Report',

        'Activity Report Correspondent',
        'Blacklist Violation',
        'CDD Report',
        'Customer Risk based Transaction Report',
        'FX Transaction Report',
        'Master Report',
        'Non Compliance Report',
        'Risk Violation Report',
        'Single Sender To Multiple Beneficiary',
        'Suspicious Transaction Report',
        'Trans Wise Member Report',
        'Transaction Wise Report',
        'White List Entry Report',

        'Ageing of Violation',
        'Case Expiry Report',
        'Combined Transaction Report',
        'Detection Viewer',
        'Inward Remittance',
        'Member Id Updated Report',
        'Notice Report',
        'Rule Violation',
        'Status Report',
        'Suspicious Word Report',
        'Transaction Register',
        'Unprocess Transactions',
      ]),
    },

    {
      id: 'analysis',
      label: 'Analysis',
      items: items([
        'Black List Violation Analysis',
        'Monthly Rule Violation Analysis',
        'Branch Wise Rule Violation Analysis',
        'Risk Violation Analysis',
        'Case Violation Analysis',
        'Rule Violation Analysis',
        'Customer Wise Rule Violation Analysis',
      ]),
    },
  ];