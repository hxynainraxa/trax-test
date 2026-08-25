export interface DashboardCard {
  id: number;
  title: string;
  value: number;
  change: number;
}

export const DASHBOARD_CARDS: DashboardCard[] = [
  {
    id: 1,
    title: 'Sanction Count',
    value: 150,
    change: 12,
  },
  {
    id: 2,
    title: 'Rule Count',
    value: 150,
    change: 12,
  },
  {
    id: 3,
    title: 'Case Count',
    value: 150,
    change: 12,
  },
  {
    id: 4,
    title: 'Risk Count',
    value: 28,
    change: 12,
  },
  {
    id: 5,
    title: 'Customers',
    value: 150,
    change: 12,
  },
  {
    id: 6,
    title: 'Delta Screening',
    value: 150,
    change: 12,
  },
];