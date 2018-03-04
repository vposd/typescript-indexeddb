export interface IDBAccess {
  instance: IDBAccess;
  connect(dbName: string, storeName: string): Promise<IDBDatabase>;
}
