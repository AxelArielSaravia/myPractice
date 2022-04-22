/* 
  ONLY FOR EXTENDS
*/
class Heap {
  static getLeftIndex = (index) => 2 * index + 1; 
  static getRightIndex = (index) => 2 * index + 2; 
  static getParentIndex = (index) => index !== 0 ? Math.floor((index - 1) /2) : undefined;

  /** 
   * @param {number} index 
   */
  static siftUp(heap, index, compareFn) {
    let parent = Heap.getParentIndex(index);
    while (index >  0 &&  compareFn(heap[parent], heap[index]) === 1) {
      [heap[index], heap[parent]] = [heap[parent], heap[index]]; //swap
      index = parent;
      parent = Heap.getParentIndex(index);
    }
  }
  
  static siftDown(heap, index, length, compareFn) {
    let element = index;
    let left = Heap.getLeftIndex(index);
    let right = Heap.getRightIndex(index);
    if (left < length && compareFn(heap[element], heap[left]) === 1) {
      element = left;
    }
    if (right < length && compareFn(heap[element], heap[right]) === 1) {
      element = right;
    }
    if (index !== element) {
      [heap[index], heap[element]] = [heap[element], heap[index]];
      Heap.siftDown(heap, element, length, compareFn);
    }
  }

  static minHeapCompareFn = (a,b) => a < b ? -1 : a > b ? 1 : 0;
  static maxHeapCompareFn = (a,b) => b < a ? -1 : b > a? 1 : 0;

  #heap;
  constructor() {
    this.#heap = [];

    //IMPOTANT
    //compareFn must be set in the inheritance class
    this.compareFn = () => { throw new Error("compareFn is not set"); }
  }
  

  get length() { return this.#heap.length }
  get isEmpty() { return this.length === 0 }
  get head() { return this.isEmpty ? undefined : this.#heap[0]; }
  get heap() { return [...this.#heap]; }

  /**
   * @param {*} value 
   * @returns {boolean}
   */
  insert(value) {
    if (value == null) return false;
    this.#heap.push(value);
    Heap.siftUp(this.#heap, this.length - 1, this.compareFn);
    return true; 
  }

  extract() {
    if (this.isEmpty) return undefined;
    if (this.length === 1) return this.#heap.shift();
    const removedValue = this.#heap.shift();
    Heap.siftDown(this.#heap, 0, this.length, this.compareFn);
    return removedValue;
  }

}

class MinHeap extends Heap {
  constructor() { 
    super(); 
    //MinHeap compareFn
    this.compareFn = Heap.minHeapCompareFn;
  }
}

class MaxHeap extends Heap {
  constructor() { 
    super(); 
    //MaxHeap compareFn
    this.compareFn = Heap.maxHeapCompareFn;
  }
}

export { Heap, MaxHeap, MinHeap };

//Examples
/* 
const h = new MinHeap();
console.log(h.heap);
h.insert(2);
h.insert(3);
h.insert(4);
h.insert(5);
console.log(h.heap);
h.insert(1);
console.log(h.heap);
h.extract();
console.log(h.heap);
h.extract();
console.log(h.heap);
*/
/*
const hMax = new MaxHeap();
console.log(hMax.heap);
hMax.insert(2);
hMax.insert(3);
hMax.insert(4);
hMax.insert(1);
console.log(hMax.heap);
hMax.insert(5);
console.log(hMax.heap);
hMax.extract();
console.log(hMax.heap);
hMax.extract();
console.log(hMax.heap);
 */