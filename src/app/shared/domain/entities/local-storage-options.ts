export interface LocalStorageLoadOptions {
  key: string;
  isObject?: boolean;
  ignoreExpiration?: boolean;
}

export interface LocalStorageSaveOptions {
  key: string;
  data: any;
  expirationMins?: number;
}
