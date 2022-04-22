import { DoublyNode } from "../nodes/nodes.js";

//IMPORTANT!! 
//This example does not use indexes,
//it uses steps in relation to the focus node.  


class CircularNodeList {
  //PRIVATE_PROPERTIES
  #LENGTH;
  #LIST;

  //INTERNAL_FUNCTIONS
  /**
   * 
   * @param {any[]} arrVals 
   * @param {"normal" | "reverse"} [dir] 
   * @returns {DoublyNode}
   */
  static #createList(arrVals, dir = "normal") {
    if (arrVals === undefined || arrVals.length == 0) return null;
    let HEAD, TAIL;
    HEAD = TAIL = new DoublyNode(arrVals[0]);
    if (dir === "reverse") {
      for (let i = 1; i < arrVals.length; i++) {
        HEAD = new DoublyNode(arrVals[i], HEAD);
        HEAD.next.prev = HEAD;
      }
    } else {
      for (let i = 1; i < arrVals.length; i++) {
        TAIL = new DoublyNode(arrVals[i], undefined, TAIL);
        TAIL.prev.next =  TAIL;
      }
    }
    HEAD.prev = TAIL;
    TAIL.next = HEAD;
    return HEAD;
  }


  #sanitizeSteps = (steps) => (
    steps >= this.#LENGTH || steps < -this.#LENGTH
    ? steps % this.#LENGTH
    : steps
  );

  
  #goTo(steps = 1, isSanitize = false) {
    let node = this.#LIST;
    let sanitizeS = isSanitize ? steps : this.#sanitizeSteps(steps);
    if (sanitizeS > 0) {
      for (let i = 0; i < sanitizeS; i++) node = node.next;
    } else if (sanitizeS < 0) {
      sanitizeS = Math.abs(sanitizeS);
      for (let i = 0; i < sanitizeS; i++) node = node.prev;
    }
    return node;
  }

  //PUBLIC_PROPERTIES
  constructor(...vals) {
    let length = vals.length
    if (length === 0 || (length === 1 && (vals[0] === null || vals[0] === undefined)) ) {
      this.#LENGTH = 0;
      this.#LIST = null;
    } else {
      let values = (length === 1 && Array.isArray(vals[0]) ?  vals[0] : vals);
      this.#LIST = CircularNodeList.#createList(values);
      this.#LENGTH = values.length;
    }
  }

  get length() { return this.#LENGTH; }
  get inFocus() { return this.isEmpty() ? undefined : this.#LIST.value; }

  isEmpty() { return this.length === 0; }

  
  /**
   * 
   * @param {"left" | "right"} [at] 
   * @param {"normal" | "reverse"} [dir] 
   * @returns {(...vals) => number}
   */
  add(to = "left", dir ="normal") {
    return (...vals) => {
      if (vals.length !== 0) {
        let list = CircularNodeList.#createList(vals, dir);
        if (this.#LIST === null) {
          this.#LIST = list;
  
        } else if (to === "rigth") {
          list.prev.next = this.#LIST.next;
          this.#LIST.next.prev = list.prev;
          this.#LIST.next = list;
          list.prev = this.#LIST;
  
        } else {
          list.prev.next = this.#LIST;
          this.#LIST.prev.next = list;
          [list.prev, this.#LIST.prev] = [this.#LIST.prev, list.prev];
          
        }
        this.#LENGTH += vals.length;
      }
      return this.length;
    }
  }

  remove(newFocusAt = 1) {
    if (this.isEmpty()) return undefined;
    let eliminateValue = this.#LIST.value;
    this.#LIST.prev.next = this.#LIST.next;
    this.#LIST.next.prev = this.#LIST.prev;
    this.#LIST = newFocusAt === -1 ? this.#LIST.prev : this.#LIST.next;
    this.#LENGTH--;
    return eliminateValue;
  }

  removeAt(steps = 1) {
    if (this.isEmpty()) return undefined;
    let sanitizeS = this.#sanitizeSteps(steps);
    if (sanitizeS === 0) return this.remove();
    
    let node = this.#goTo(sanitizeS);
    let eliminateValue = node.value;
    node.prev.next = node.next;
    node.next.prev = node.prev;
    this.#LENGTH--;
    return eliminateValue;
  }

  getAt(steps) { return (this.#goTo(steps)).value; }

  goTo(steps) {
    this.#LIST = this.#goTo(steps);
    return this.inFocus;
  }

  toArray() {
    if (this.isEmpty()) return [];
    let arr = [this.#LIST.value];
    for (let i = 1, node = this.#LIST.next; i < this.length; i++, node = node.next) {
      arr.push(node.value);
    }
    return arr;
  }

}

export default CircularNodeList;