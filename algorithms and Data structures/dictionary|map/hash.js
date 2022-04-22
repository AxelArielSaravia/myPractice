
class Hash {
  #TABLE;

  static #hashFn(key) {
    if (key === undefined) return;
    if (typeof key === "number" || typeof key === "bigint") return key;
    let hash = 0;
    for (let i = 0; i < key.length; i++) hash += key.charCodeAt(i); 
    return hash;
  }
  
  static #isKey = (key) => { 
    const type = typeof key; 
    return type === 'string' || type === "number" || type === "bigint"
  }

  constructor(max_str_size) {
    this.#TABLE = {};
    this.#MAX_STR_SIZE = max_str_size;
  }
   
  get table() { return this.#TABLE }

  put (key, value) {
    if (!Hash.#isKey(key)) return false;
    if (key > this.#MAX_STR_SIZE) throw new Error(`The max of the string value is ${Hash.#MAX_STR_SIZE}`);
    const position = Hash.#hashFn(key);
    this.#TABLE[position] = value;
    return true;
  }
  
  get(key) { return Hash.#isKey(key) ? this.#TABLE[Hash.#hashFn(key)] : undefined } 

  remove(key) { return Hash.#isKey(key) ? delete this.#TABLE[key] : false; }
} 

export default Hash;