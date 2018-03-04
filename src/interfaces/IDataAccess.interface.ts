import { Item } from "../Item.class";

interface IRead<T> {
  retrieve(): Promise<T[]>;
  get(uid: string): Promise<T>;
}

interface IWrite<T> {
  add(item: T): Promise<T>;
  update(item: T): Promise<T>;
  remove(uid: string): Promise<T>;
}

export interface IDataAccess<T extends Item> extends IRead<T>, IWrite<T> {}
