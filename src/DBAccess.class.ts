import { IDBAccess } from './interfaces/IDBAccess.interface';

export class DBAccess implements IDBAccess {
  private dbAccess: DBAccess;
  private db: IDBDatabase;

  async connect(dbName: string, storeName: string) {
  
    if (this.db) {
      return this.db;
    }

    let attempts = 3;
    const request = indexedDB.open(dbName, 1);

    return new Promise<IDBDatabase>((resolve, reject) => {
      request.onerror = error => {
        attempts--;
        if (attempts) {
          return this.connect(dbName, storeName);
        }
        return reject(error);
      }
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };
      request.onupgradeneeded = () => {
        this.db = request.result;
        request.result.createObjectStore(storeName, { keyPath: 'uid' });
        resolve(this.db);        
      }
    });

  }

  get instance() {
    return this.dbAccess ? this.dbAccess : this.dbAccess = new DBAccess();
  }
}
