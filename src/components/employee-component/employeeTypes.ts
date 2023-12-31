export interface Employee {
  id: number;
  name: string;
}

export interface SelectedEmployee {
  id: number | null;
  name: string;
  telegramID: string;
  selectedEmployeeID: number | undefined;
  isNew: boolean;
}

export interface EmployeesState {
  employees: Employee[];
  selectedEmployees: SelectedEmployee[];
}
