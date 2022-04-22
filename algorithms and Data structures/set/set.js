

class _Set {
  #LENGTH;
  #ITEMS;

  constructor() {
    this.#ITEMS = {};
    this.#LENGTH = 0;
  }

  get length() { return this.#LENGTH };
  get items() { return this.#ITEMS }

  has(el) {
    if (typeof el === "number") el = "_._n_" + el + "_._";
    else if (typeof el === "bigint") el = "_._n_" + el + "n_._";
    return Object.hasOwn(this.#ITEMS, el);
  }

  add(el) {
    let id = el;
    if (typeof el === "object" || typeof el === "function")  id = Symbol();
    else if (typeof el === "number") id = "_._n_" + el + "_._";
    else if (typeof el === "bigint") id = "_._n_" + el + "n_._";
    if (this.has(id)) return false;
    this.#ITEMS[id] = el; 
    this.#LENGTH++;
    return true
  }

  delete(el) {
    if (!this.has(el)) return false;
    delete this.#ITEMS[el];
    this.#LENGTH--;
    return true;
  }
  
  toArray() {
    if (this.length === 0) return [];
    let arrNames = Object.getOwnPropertyNames(this.#ITEMS);
    let arrSymbols = Object.getOwnPropertySymbols(this.#ITEMS);
    let arrMix = [...arrNames, ...arrSymbols];
    let arr = [this.#ITEMS[arrMix[0]]];
    for (let i = 1; i < arrMix.length; arr.push(this.#ITEMS[arrMix[i++]]));
    return arr
  }
  
  *[Symbol.iterator]() {
    let arrNames = Object.getOwnPropertyNames(this.#ITEMS);
    let arrSymbols = Object.getOwnPropertySymbols(this.#ITEMS);
    let arr = [...arrNames, ...arrSymbols];
    for (let k of arr) yield this.#ITEMS[k];
  } 
}

export default _Set