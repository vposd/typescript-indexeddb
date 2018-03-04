# Simple Typescript classes for IndexedDB data access

This is the one of thousands implementations of data access to IndexedDB.
It exposes simple promises API.

## Example

```typescript
import { DataAccess } from './DataAccess.class';

class Item {
  uid: string;
  data: any;
}

const idb = new DataAccess<Item>('db_name', 'store_name');
```

### Writing
```typescript
idb.add({ uid: '42', data: 'value' });
idb.update({ uid: '42', data: 'updated' });
idb.remove('42');
```

### Reading
```typescript
idb.retrieve();
idb.get('42');
```