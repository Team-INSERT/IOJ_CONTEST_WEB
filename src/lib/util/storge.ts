type LocalStorageKey = 'accessToken' | 'refreshToken';

export default class Storage {
  static async getItem(key: LocalStorageKey): Promise<string | null> {
    return localStorage.getItem(key);
  }

  static async setItem(key: LocalStorageKey, value: string): Promise<void> {
    localStorage.setItem(key, value);
  }

  static async delItem(key: LocalStorageKey): Promise<void> {
    localStorage.removeItem(key);
  }

  static async clear(): Promise<void> {
    localStorage.clear();
  }
}
