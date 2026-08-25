export interface SidebarMenuItem {
  id: string;
  label: string;
  icon: any;
  route?: string;
  disabled?: boolean;
  badge?: string | number;
  roles?: string[];
  children?: SidebarMenuItem[];
}
