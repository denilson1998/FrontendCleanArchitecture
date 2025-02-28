import { Injectable } from '@angular/core';
import {
  LocalStorageSaveOptions,
  LocalStorageLoadOptions,
} from '../../domain/entities/local-storage-options';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor() {}

  save(options: LocalStorageSaveOptions): void {
    // Set default values for optionals
    options.expirationMins = options.expirationMins || 0;

    const expirationMS = options.expirationMins * 60 * 1000;
    const record = {
      value:
        typeof options.data === 'string'
          ? options.data
          : JSON.stringify(options.data),
      expiration:
        expirationMS !== 0 ? new Date().getTime() + expirationMS : null,
      hasExpiration: expirationMS !== 0 ? true : false,
    };
    localStorage.setItem(options.key, JSON.stringify(record));
  }

  load(options: LocalStorageLoadOptions): any | string {
    // Set default values for optionals
    options.isObject = options.isObject || false;
    options.ignoreExpiration = options.ignoreExpiration || false;
    const item = localStorage.getItem(options.key);
    if (item !== null) {
      const record = JSON.parse(item);
      const now = new Date().getTime();
      if (
        !record ||
        (record.hasExpiration &&
          record.expiration <= now &&
          !options.ignoreExpiration)
      ) {
        return null;
      } else {
        return options.isObject ? JSON.parse(record.value) : record.value;
      }
    }
    return null;
  }

  loadJsonString(options: LocalStorageLoadOptions): any | string {
    // Set default values for optionals
    options.isObject = options.isObject || false;
    options.ignoreExpiration = options.ignoreExpiration || false;
    const item = localStorage.getItem(options.key);
    if (item !== null) {
      const record = JSON.parse(item);
      const now = new Date().getTime();
      if (
        !record ||
        (record.hasExpiration &&
          record.expiration <= now &&
          !options.ignoreExpiration)
      ) {
        return null;
      } else {
        return options.isObject ? JSON.parse(record) : record;
      }
    }
    return null;
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  removeMany(keys: string[]): void {
    for (const key of keys) {
      localStorage.removeItem(key);
    }
  }

  cleanLocalStorage(): void {
    localStorage.clear();
  }
}
