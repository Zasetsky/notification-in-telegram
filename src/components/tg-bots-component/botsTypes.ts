export interface Bot {
  id: number;
  label: string;
  token: string;
  isNew: boolean;
}

export interface StateBot {
  availableBots: Bot[];
}
