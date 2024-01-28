"use client";

import {
  CacheDriverInterface,
  CacheManager,
  CacheManagerInterface,
  PlainLocalStorageDriver,
} from "@mongez/cache";

let cacheManager: CacheManagerInterface;

export function cache() {
  if (cacheManager) {
    return cacheManager;
  }

  cacheManager = new CacheManager();
  const cacheDriver: CacheDriverInterface = new PlainLocalStorageDriver();

  cacheManager.setDriver(cacheDriver);

  return cacheManager;
}
