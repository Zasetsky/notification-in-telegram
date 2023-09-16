export interface Bot {
  id: number;
  label: string;
  value: string;
  token: string;
  link?: string;
  isNew: boolean;
}

export interface StateBot {
  availableBots: Bot[];
}
