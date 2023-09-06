import { EmployeesState } from "@/components/employee-component/employeeTypes";
import { ButtonsState } from "@/components/notification-component/steps/buttonTypes";

export interface RootState {
  employees: EmployeesState;
  buttons: ButtonsState;
}
