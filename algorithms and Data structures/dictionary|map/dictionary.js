


class Dictionary {
  #SIZE; 
  #TABLE;

  static #isKey = (key) => { 
    const type = typeof key; 
    return type === 'string' || type === "number" || type === "bigint" || type === "symbol"
  }

  constructor() {
    this.#TABLE = {};
    this.#SIZE = 0;
  }

  get size() { return this.#SIZE } 
  get isEmpty() { return this.#SIZE === 0 }

  hasKey(key) { return Dictionary.#isKey(key) && Object.hasOwn(this.#TABLE, key) }

  set(key, value) {
    if (!Dictionary.#isKey(key)) return false;
    this.#TABLE[key] = value;
    this.#SIZE++;
    return true;
  }

  remove(key) {
    if (this.isEmpty || !Dictionary.#isKey(key)) return false;
    this.#SIZE--;
    return delete this.#TABLE[key];
  }

  get(key) { return Dictionary.#isKey(key) ? this.#TABLE[key] : undefined; }

  clear() {
    this.#SIZE = 0;
    this.#TABLE = {}
  }

  values() {
    let valuesArr = Object.values(this.#TABLE); 
    for (let s of Object.getOwnPropertySymbols(this.#TABLE)) {
      valuesArr.push(this.#TABLE[s]);
    }
    return valuesArr;
  }
  
  keys() { return [...Object.getOwnPropertyNames(this.#TABLE), ...Object.getOwnPropertySymbols(this.#TABLE)] }

  entries() {
    if (this.isEmpty) return [];
    let keys = this.keys();
    let arr = [];
    for (let key of keys) {
      arr.push({key: key, value: this.#TABLE[key]});
    }
    return arr;
  }

  forEach(cb) {
    if (cb !== undefined) {
      let keys = this.keys();
      for (let key of keys) {
        let res = cb(this.#TABLE[key], key);
        if (res !== undefined) this.#TABLE[key] = res;
      }
    }
  }

  *[Symbol.iterator]() {
    let keys = this.keys();
    for (let key of keys) yield this.#TABLE[key];
  }
}

export default Dictionary;