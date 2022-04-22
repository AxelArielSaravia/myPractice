import { Node } from "../nodes/nodes.js";

/*********************
* NodeList PROTOTYPE *
**********************/
function NodeList(...vals) {
      
  //PRIVATE PROPERTIES
  let _LENGTH;
  let _HEAD_NODE;
  
  //INTERNALS FUNCTIONS
  /**
   *  Create a internal Node-chain, and append in a base Node-chain if exist.
   * @param {any[]} arrVals 
   * @param {Node} [base] 
   * @returns {Node}
   */
  const createList = (arrVals, base = undefined) => {
    if (arrVals === undefined || arrVals.length === 0) return null; 

    let nodeList = base;
    for (let i = arrVals.length -1; i >= 0; nodeList = new Node(arrVals[i--], nodeList));
    return nodeList;
  }

  /**
   * Sanitize an index.
   * If it is a negative number (that represents the reverse 
   * traversal of the NodeList) ...--that is change it to a normal index.--
   * @param {number} index 
   * @returns {number} sanitizate index
   */
  const sanitizeIndex = (index) => {
    return (
      0 <= index && index <= _LENGTH 
      ? index 
      : _LENGTH + index < 0 || _LENGTH < index
      ? _LENGTH
      : _LENGTH + index
    );
  }

  /**
   * Traversal the NodeList
   * @param {number} index 
   * @param {boolean} [sanitizide]
   * @returns 
   */
  const goTo = (index = 0, isSanitize = false) => {    
    let idx = isSanitize ? index : sanitizeIndex(index);
    let node = _HEAD_NODE; 
    for (let i = 0; i < idx; i++) node = node.next;
    return node;
  }

  //inicializate private properties
  {
    const length = vals.length;

    if (length === 0 || (length === 1 && (vals[0] === null || vals[0] === undefined)) ) {
      _LENGTH = 0;
      _HEAD_NODE = null;
    } else {
      let values = (length === 1 && Array.isArray(vals[0]) ?  vals[0] : vals);
      _LENGTH = values.length;
      _HEAD_NODE = createList(values);
    }
  }


  //PTOTOTYPE PROPERTIES

  //properties with specific object properties
  Object.defineProperties(this, {
    /**
     * Return the length of the NodeList 
     */
    length: {
      get: () => _LENGTH,
      enumerable: true
    },
    /**
     * Return the value of the head node
     */
    head: {
      get: () => this.isEmpty() ? undefined : _HEAD_NODE.value,
      enumerable: true,
    },
    /*  
    list: {
      get: () => _HEAD_NODE
    } 
    */
  });
  
  //function properties
  
  /**
  * Return if the NodeList is empty
  * @returns {boolean}
  */
  this.isEmpty = function() { return this.length === 0 }

  /**
   * Add Nodes to the head
   * @param  {...any} elements 
   * @returns {number} the length of NodeList 
   */
  this.unshift = function(...elements) {
    if (elements.length !== 0) {
      _LENGTH += elements.length;
      _HEAD_NODE = createList(elements, _HEAD_NODE);
    }
    return this.length;
  }
  
  /**
   * Insert in to the NodeList an element, or a set of elements, into the index.
   * 
   * if the index is greater than the length of the list or the index is out of range, 
   * the elements will be inserted at the end.
   * 
   * Note: if you use -1 as an index, this doesn't insert the elements at the end, 
   * instead this inserts the elements at the location of the last index.
   * 
   * @param {number} index 
   * @param  {...any} elements 
   * @returns {number} the new length of the NodeList
   */

  /**
   * Add nodes to the end;
   * @param  {...any} elements 
   */
  this.push = function(...elements) {
    return this.insertAt(this.length, ...elements);
  }
  
  this.shift = function() {
    if (this.isEmpty()) return undefined;
    let eliminate = _HEAD_NODE.value;
    _HEAD_NODE = _HEAD_NODE.next;
    _LENGTH--;
    return eliminate;
  }
  /**
   * Remove a node at index
   * @param {number} [index] 
   * @returns {any} the value of the removed node
   */
  this.removeAt = function(index = 0) {
    const sanitizeIdx = sanitizeIndex(index); 
    if (this.isEmpty() || sanitizeIdx  >= this.length) return undefined;
    if (sanitizeIdx === 0) return this.shift();

    let prev = goTo(sanitizeIdx - 1, true);
    let eliminateNode = prev.next;
    prev.next = eliminateNode.next
    _LENGTH--;
    return eliminateNode.value;
  }
  

  this.pop = function() {
    return this.removeAt(-1);
  }
  
  /**
   * Return the index of the first match or -1 if the element doesn't find
   * @param {*} element 
   * @returns {number} 
   */
  this.indexOf = function(element, startIdx = 0) {
    if (!this.isEmpty()) {
      for (let i = startIdx, curr = goTo(startIdx); curr !== null; i++, curr = curr.next) {
        if (Object.is(curr.value, element)) return i;
      }
    }
    return -1;
  }
  
  /**
   * Return the element at index, or undefined if the index is out of range
   * @param {number} index 
   * @returns {*}
   */
  this.getAt = function(index) {
    let node = goTo(index);
    return node !== null ? node.value : undefined;
  }

  /**
   * 
   * @param {(value, index: number, this: NodeList) => {}} [callback] 
   * @returns {NodeList}
   */
  this.map = function(callback) {
    if (this.isEmpty()) return new NodeList();

    const nodeList = new NodeList();
    let curr = _HEAD_NODE;

    for (let i = 0; curr !== null; i++) {
      let value;
      if (callback !== undefined) {
        value = callback(curr.value, i, _HEAD_NODE);

        if (value !== undefined) 
          nodeList.push(value);

      } else {
        value = curr.value;
        nodeList.push(value);
      }
      curr = curr.next;
    }
    return nodeList;
  }

  /**
   * Clear the NodeList
   */
  this.clear = function() {
    _HEAD_NODE = null;
    _LENGTH = 0;
  }

  this.toArray = function() {
    if (this.isEmpty()) return []

    const arr = [_HEAD_NODE.value];
    for (let curr = _HEAD_NODE.next; curr !== null; curr = curr.next) {
      arr.push(curr.value);
    }

    return arr;
  }

  this.toString = function(separator = "") {
    if (typeof separator !== "string") 
      throw new Error("The separator argument in NodeList.prototype.toString() must be a string");
    if (this.isEmpty()) 
      return "";

    let str = "" + _HEAD_NODE.value;
    let curr = _HEAD_NODE.next;
    while (curr !== null) {
      str += separator + curr.value + "";
      curr = curr.next
    }
    return str;
  }
}

export default NodeList