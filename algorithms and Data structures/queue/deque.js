
class ArrayDeque {
  #deque;
  constructor(...vals) {
    this.#deque = vals || []; 
  }
  get length() { return this.#deque.length }
  isEmpty() { return this.length === 0 }
  addFront(el) { this.#deque.unshift(el) }
  addBack(el) { this.#deque.push(el) }
  removeFront() { return this.isEmpty() ? undefined : this.#deque.shift()  }
  removeBack() { return this.isEmpty() ? undefined : this.#deque.pop() }
  front() { return this.isEmpty() ? undefined : this.#deque[0] }
  back() { return this.isEmpty() ? undefined : this.#deque[this.length - 1] }
  clear() { this.#deque = [] }
}


class ObjectDeque {
  #count;
  #lowestCount;
  #queue;
  constructor() {
    this.#count = 0;
    this.#lowestCount = 0;
    this.#queue = {}
  }
  get length() { return this.#count - this.#lowestCount}
  isEmpty() { return this.length === 0 }
  addFront(el) { 
    if (this.isEmpty()) {
      this.addBack(el);
    } else if (this.#lowestCount > 0) {
      this.#lowestCount--;
      this.#deque[this.#lowestCount] = el;
    } else {
      for (let i = 0; i < this.#count; i++) {
        this.#deque[i+1] = this.#deque[i]; 
      }
      this.#count++;
      this.#deque[0] = el; 
    }
  }
  addBack(el) { 
    this.#deque[this.#count] = el
    this.#count++;
  }
  removeFront() { 
    if (this.isEmpty()) return undefined;
    const res = this.#queue[this.#lowestCount];
    delete this.#queue[this.#lowestCount];
    this.#lowestCount++;
    
    if (this.isEmpty()) this.#lowestCount = this.#count = 0;

    return res;
  }
  removeBack() { 
    if (this.isEmpty()) return undefined;
    const res = this.#queue[this.#count - 1];
    delete this.#queue[this.#count - 1];
    this.#count--;
    
    if (this.isEmpty()) this.#lowestCount = this.#count = 0;

    return res;
  }
  front() { return this.isEmpty() ? undefined : this.#deque[0] }
  back() { return this.isEmpty() ? undefined : this.#deque[this.#count - 1] }
  clear() { 
    this.#lowestCount = this.#count = 0;
    this.#queue = {}
  }
}