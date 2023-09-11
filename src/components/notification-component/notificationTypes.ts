export interface Employee {
  id: number;
  name: string;
  initial: string;
}

export interface CascaderOption {
  value: string;
  label: string;
  children?: CascaderOption[];
  disabled?: boolean;
}

export interface ChandgeResponsible {
  deal: boolean;
  task: boolean;
  company: boolean;
}

export interface Button {
  id: string;
  inputValue: string;
  cascaderValue: CascaderOption | null;
  linkValue: string;
  delete_message: boolean;
  change_responsible: ChandgeResponsible;
}

export interface NotificationData {
  notificationText: string;
  selectedEmployees: Employee[];
  buttons: Button[];
}

export interface Notification {
  id: string;
  name: string;
  data: NotificationData;
}

export interface NotificationState {
  notificationItem: Notification[];
  cascaderOptions1: CascaderOption[];
}
