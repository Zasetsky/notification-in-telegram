import { EmployeesState } from "@/components/employee-component/employeeTypes";
import { NotificationState } from "@/components/notification-component/notificationTypes";

export interface RootState {
  employees: EmployeesState;
  notifications: NotificationState;
}
