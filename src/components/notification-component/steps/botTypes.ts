export interface Bot {
  label: string;
  value: string;
}

export interface StateBot {
  availableBots: Bot[];
  selectedBot: Bot;
}
