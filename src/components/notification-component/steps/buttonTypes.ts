export interface CascaderOption {
  value: string;
  label: string;
  children?: CascaderOption[];
  disabled?: boolean;
}

export interface Button {
  id: number;
  inputValue: string;
  cascaderValue1: CascaderOption | null;
  cascaderValue2: CascaderOption | null;
  linkValue: string;
}

export interface ButtonsState {
  buttons: Button[];
  cascaderOptions1: CascaderOption[];
  cascaderOptions2: CascaderOption[];
}
