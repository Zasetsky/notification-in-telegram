export interface Employee {
  id: number;
  name: string;
}

export interface SelectedEmployee {
  id: number;
  name: string;
  telegramID: string;
  selectedEmployeeID: number | null;
  isNew: boolean;
}

export interface EmployeesState {
  employees: Employee[];
  selectedEmployees: SelectedEmployee[];
}

export interface RootState {
  employees: EmployeesState;
}
