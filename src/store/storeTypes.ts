import { EmployeesState } from "@/components/employee-component/employeeTypes";
import { NotificationState } from "@/components/notification-component/notificationTypes";
import { GlobalPropsState } from "./modules/globalPropsTypes";

export interface RootState {
  employees: EmployeesState;
  notifications: NotificationState;
  globalProps: GlobalPropsState;
}
