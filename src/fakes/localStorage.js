class LocalStorageFake {
  constructor() {
    this.store = {};
  }

  removeItem(key) {
    delete this.store[key];
  }

  setItem(key, value) {
    this.store[key] = value;
  }

  getItem(key) {
    return this.store[key] || null;
  }
}

export default LocalStorageFake;
