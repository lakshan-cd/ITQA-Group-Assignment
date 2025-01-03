export class DataStore {
  private static instance: DataStore;
  private data: Record<string, any> = {};

  private constructor() {}

  // Get the Singleton instance
  public static getInstance(): DataStore {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }

  // Get data by key
  public getData(key: string): any {
    const keys = key.split(".");
    let result: any = this.data;

    for (const k of keys) {
      if (result && result.hasOwnProperty(k)) {
        result = result[k];
      } else {
        return undefined; // Return undefined if key path is invalid
      }
    }
    return result;
  }

  // Set data by key
  public setData(key: string, value: any): void {
    const keys = key.split(".");
    let current: any = this.data;

    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (!current[k] || typeof current[k] !== "object") {
        current[k] = {}; 
      }
      current = current[k];
    }

    current[keys[keys.length - 1]] = value; 
  }
}
