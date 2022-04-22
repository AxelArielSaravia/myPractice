import { DoublyNode } from "../nodes/nodes.js";

class DoublyNodeList {
  #LENGTH;
  #HEAD_NODE;
  #TAIL_NODE;

  static #createList(arrVals) {
    if (arrVals === undefined || arrVals.length === 0) return null; 
    let HEAD, TAIL;
    HEAD = TAIL = new DoublyNode(arrVals[0])
    for (let i = 1; i < arrVals.length; i++) {
      TAIL = new DoublyNode(arrVals[i], undefined, TAIL);
      TAIL.prev.next =  TAIL;
    }
    return { HEAD, TAIL };
  }

  #sanitizeIndex = (index) => {
    return (
      0 <= index && index <= this.#LENGTH 
      ? index 
      : this.#LENGTH + index < 0 || this.#LENGTH < index
      ? this.#LENGTH
      : this.#LENGTH + index
    );
  }

  #goTo = (index = 0, isSanitize = false) => {
    let idx = isSanitize ? index : this.#sanitizeIndex(index);
    let node;
    if (idx > this.#LENGTH / 2) {
      node = this.#TAIL_NODE; 
      for (let i = this.length - 1; i > idx; i--) node = node.prev;
    } else {
      node = this.#HEAD_NODE; 
      for (let i = 0; i < idx; i++) node = node.next;
    }
    return node;
  }

  constructor(...vals) {
    let length = vals.length
    if (length === 0 || (length === 1 && (vals[0] === null || vals[0] === undefined)) ) {
      this.#LENGTH = 0;
      this.#HEAD_NODE = null;
      this.#TAIL_NODE = null;
    } else {
      let values = (length === 1 && Array.isArray(vals[0]) ?  vals[0] : vals);
      let { HEAD, TAIL } = DoublyNodeList.#createList(values);
      this.#HEAD_NODE = HEAD;
      this.#TAIL_NODE = TAIL;
      this.#LENGTH = values.length;
    }
  }

  get length() { return this.#LENGTH }
  get head() { return this.isEmpty() ? undefined : this.#HEAD_NODE.value }
  get tail() { return this.isEmpty() ? undefined : this.#TAIL_NODE.value }

  isEmpty() { return this.length === 0 }

  unshift(...els) {
    if (els.length !== 0) {
      let { HEAD, TAIL } = DoublyNodeList.#createList(els);
      if (this.#HEAD_NODE === null) {
        this.#HEAD_NODE = HEAD;
        this.#TAIL_NODE = TAIL;
      } else {
        this.#HEAD_NODE.prev = TAIL;
        TAIL.next = this.#HEAD_NODE;
        this.#HEAD_NODE = HEAD;
      }
      this.#LENGTH += els.length;
    }
    return this.length;
  }
  insertAt(idx, ...els) {
    if (els.length !== 0) {
      let sanitizeIdx = this.#sanitizeIndex(idx);
      
      if (sanitizeIdx === 0) 
        return this.unshift(...els);
     
      let { HEAD, TAIL } = DoublyNodeList.#createList(els);
      let prev  = this.#goTo(sanitizeIdx - 1, true);
      HEAD.prev = prev;
      TAIL.next = prev.next;
      prev.next = HEAD;

      if (TAIL.next === null) this.#TAIL_NODE = TAIL;
      else TAIL.next.prev = TAIL;
  
      this.#LENGTH += els.length;
    }
    return this.length
  }

  push(...els) { return this.insertAt(this.length, ...els); }

  shift() {
    if (this.isEmpty()) return undefined;
    let eliminate = this.#HEAD_NODE.value;
    this.#HEAD_NODE = this.#HEAD_NODE.next;

    if (this.#HEAD_NODE !== null) this.#HEAD_NODE.prev = null;
    else this.#TAIL_NODE = null;
    this.#LENGTH--;
    return eliminate;
  }
  
  removeAt(idx = 0) {
    const sanitizeIdx = this.#sanitizeIndex(idx);
    if ( this.isEmpty() || sanitizeIdx >= this.length) return undefined;
    if (sanitizeIdx === 0) return this.shift();
    
    let prev = this.#goTo(sanitizeIdx - 1, true);
    let eliminateNode = prev.next;
    prev.next = eliminateNode.next;

    if (prev.next === null) this.#TAIL_NODE = prev;
    else prev.next.prev = prev;

    this.#LENGTH--;
    return eliminateNode.value;
  }

  pop() { return this.removeAt(this.length - 1)}

  getAt(idx) { return (this.#goTo(idx)).value; }

  indexOf(el, startIdx = 0) {
    if (!this.isEmpty()) {
      for (let i = startIdx, curr = this.#goTo(startIdx); curr !== null; i++, curr = curr.next) {
        if (Object.is(curr.value , el))
          return i;
      }
    }
    return undefined;
  }
  lastIndexOf(el, endIdx = this.length - 1 ){
    if (!this.isEmpty()) {
      for (let i = endIdx, curr = this.#goTo(endIdx); curr !== null; i--, curr = curr.prev) {
        if (Object.is(curr.value , el))
          return i;
      }
    }
  }

  clear() {
    this.#HEAD_NODE = null;
    this.#TAIL_NODE = null;
    this.#LENGTH = 0;
  }
}


export default DoublyNodeList;