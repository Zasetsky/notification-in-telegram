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
  title: string;
  inputValue: string;
  cascaderValue: CascaderOption | null;
  linkValue: string;
  delete_message: boolean;
  change_responsible: ChandgeResponsible;
}

export interface ButtonsState {
  buttons: Button[];
  cascaderOptions: CascaderOption[];
}
