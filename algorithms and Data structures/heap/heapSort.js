import { Heap } from "./heap.js";

function heapSort(array, compareFn = Heap.maxHeapCompareFn) {
  let heapSize = array.length;
  buildMaxHeap(array, compareFn);
  while (heapSize > 1) {
    heapSize--;
    [array[0], array[heapSize]] = [array[heapSize], array[0]]; //SWAP;
    Heap.siftDown(array, 0, heapSize, compareFn);
  }
  return array;
}

function buildMaxHeap(array, compareFn) {
  for (let i = Math.floor(array.length / 2); i >= 0; i--) {
    Heap.siftDown(array, i, array.length, compareFn);
  }
}


//Example

/* 
const array = [7,6,3,5,4,1,2];

console.log('Before sorting: ', array);
console.log('After sorting: ', heapSort(array));
*/