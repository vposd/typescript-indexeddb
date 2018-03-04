import { IDataAccess } from './interfaces/IDataAccess.interface';
import { DBAccess } from './DBAccess.class';

export class DataAccess<T> implements IDataAccess<T> {
  private connection: Promise<IDBDatabase>;

  constructor(dbName: string, private storeName: string) {
    this.connection = new DBAccess().instance.connect(dbName, storeName);
  }

  async add(item: T) {
    const db = await this.connection;
    const request = db.transaction([this.storeName], 'readwrite')
      .objectStore(this.storeName)
      .add(item);

    return this.requestHandler(request);
  }

  async retrieve() {
    const db = await this.connection;
    const store = db.transaction([this.storeName], 'readonly')
      .objectStore(this.storeName);

    return new Promise<T[]>((resolve, reject) => {
      const result: any[] = [];
      store.openCursor().onsuccess = event => {
        const cursor = (event.target as any).result;
        if (cursor) {
          result.push(cursor.value);
          cursor.continue();
        }
        else {
          return resolve(result);
        }
      };
    });
  }

  async update(item: T) {
    const db = await this.connection;
    const request = db.transaction([this.storeName], 'readwrite')
      .objectStore(this.storeName)
      .put(item);
    
    return this.requestHandler(request);
  }

  async get(uid: string) {
    const db = await this.connection;
    const request = db.transaction([this.storeName], 'readonly')
      .objectStore(this.storeName)
      .get(uid);

    return this.requestHandler(request);
  }

  async remove(uid: string) {
    const db = await this.connection;
    const request = db.transaction([this.storeName], 'readwrite')
      .objectStore(this.storeName)
      .delete(uid);

    return this.requestHandler(request);
  }

  private requestHandler(request: IDBRequest) {
    return new Promise<T>((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.result);
    });
  }
}
