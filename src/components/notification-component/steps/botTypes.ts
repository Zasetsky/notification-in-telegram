export interface Bot {
  label: string;
  value: string;
  token: string;
}

export interface StateBot {
  availableBots: Bot[];
}
