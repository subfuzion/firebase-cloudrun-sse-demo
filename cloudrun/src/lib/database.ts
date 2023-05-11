/**
 * Mock database for storing time-series data.
 * Uses an array for a buffer and discards oldest data when buffer overflows.
 */
const BUFFER_MAX = 1024 * 1024; // 1 MB

export class Database {
  static data: Array<number> = [];

  appendData(n: number): void {
    if (Database.data.length >= BUFFER_MAX) {
      // console.log(`Database buffer overflow: ${d.length} (dropping oldest 1K
      // of data)`);
      const discard = 1024;
      Database.data = Database.data.slice(discard);
    }
    Database.data.push(n);
    // console.log(`write buffer.length: ${d.length}`);
  }

  getData(): number {
    const d = Database.data;
    if (!d.length) {
      // console.log(`Database buffer underflow (return value: -1)`);
      return -1;
    }
    // const val = d.shift();
    // console.log(`read buffer.length: ${d.length}`);
    // return val;
    return d.shift() || -1;
  }
}
