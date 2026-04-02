/**
 * PixTool IndexedDB Explorer (PIDE)
 * A lightweight, promise-based wrapper for IndexedDB to handle large local-only data.
 */

const DB_NAME = 'pixtool_db';
const DB_VERSION = 1;
const STORES = {
  FILES: 'files',
  NOTES: 'notes',
  SETTINGS: 'settings'
};

class PixDB {
  constructor() {
    this.db = null;
    this.initError = null;
    this.initPromise = this.init().catch((error) => {
      this.initError = error;
      return null;
    });
  }

  async init() {
    if (typeof indexedDB === 'undefined') {
      throw new Error('IndexedDB is not available in this environment')
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        // Files store: { id, name, content (Blob), type, size, parentId, createdAt }
        if (!db.objectStoreNames.contains(STORES.FILES)) {
          const store = db.createObjectStore(STORES.FILES, { keyPath: 'id' });
          store.createIndex('name', 'name', { unique: false });
          store.createIndex('parentId', 'parentId', { unique: false });
        }
        // Notes store: { id, title, content (Markdown), createdAt, updatedAt }
        if (!db.objectStoreNames.contains(STORES.NOTES)) {
          const store = db.createObjectStore(STORES.NOTES, { keyPath: 'id' });
          store.createIndex('updatedAt', 'updatedAt', { unique: false });
        }
        // Settings store: { key, value }
        if (!db.objectStoreNames.contains(STORES.SETTINGS)) {
          db.createObjectStore(STORES.SETTINGS, { keyPath: 'key' });
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        console.error('IndexedDB error:', event.target.error);
        reject(event.target.error);
      };
    });
  }

  async getStore(storeName, mode = 'readonly') {
    await this.initPromise;
    if (this.initError) {
      throw this.initError;
    }
    if (!this.db) {
      throw new Error('IndexedDB database is not initialized');
    }
    const transaction = this.db.transaction(storeName, mode);
    return transaction.objectStore(storeName);
  }

  // Generic Operations
  async set(storeName, item) {
    const store = await this.getStore(storeName, 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.put(item);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async get(storeName, key) {
    const store = await this.getStore(storeName);
    return new Promise((resolve, reject) => {
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getAll(storeName) {
    const store = await this.getStore(storeName);
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async delete(storeName, key) {
    const store = await this.getStore(storeName, 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.delete(key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async clear(storeName) {
    const store = await this.getStore(storeName, 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Multi-delete for folders
  async deleteByParent(storeName, parentId) {
    const store = await this.getStore(storeName, 'readwrite');
    const index = store.index('parentId');
    return new Promise((resolve, reject) => {
      const request = index.getAllKeys(parentId);
      request.onsuccess = async () => {
        const keys = request.result;
        for (const key of keys) {
          const child = await this.get(storeName, key);
          if (child && child.isFolder) {
            await this.deleteByParent(storeName, child.id);
          }
          await this.delete(storeName, key);
        }
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  }
  
  async getQuota() {
    if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.estimate) {
      return await navigator.storage.estimate();
    }
    return null;
  }
}

export const pixDB = new PixDB();
export { STORES };
