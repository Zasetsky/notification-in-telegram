export interface Employee {
  id: number;
  name: string;
}

export interface SelectedEmployee {
  name: string;
  telegramID: string;
  selectedEmployeeID: number;
}

export interface EmployeesState {
  employees: Employee[];
  selectedEmployees: SelectedEmployee[];
}

export interface RootState {
  employees: EmployeesState;
}
