export interface Config {
  path: string;
  imported: string;
  lastUsed?: string;
  used?: string;
  name?: string;
  owner?: string;
}

export interface Session {
  path: string;
  created: string;
  owner?: string;
  configName?: string;
  sessionName?: string;
  status: string;
}
