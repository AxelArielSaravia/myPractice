const NAME = "BUBBLESORT";

/**
 * @param {[number]} arr 
 * @param {number} firstI 
 * @returns {boolean}
 */
function bubble(arr, firstI) {
  let i = arr.length - 1;
  let swapCount = 0;
  while (i > firstI) {
    if (arr[i] < arr[i-1]) {
      //Swap
      let temp = arr[i]
      arr[i] = arr[i-1];
      arr[i-1] = temp;
      swapCount++;
    }
    i--;
  }
  return swapCount > 0 ? true : false;
}

/**
 * @param {[number]} arr 
 * @returns {[number]}
 */
function bubbleSort(arr) {
  const newArr = Array.from(arr);
  let bool = true;
  let i = 0;
  
  while (i < newArr.length - 1 && bool) {
    bool = bubble(newArr, i);
    i++;
  }
  return newArr;
}
//arr1 {1,2,4,3,5,6}; -> {1,2,3,4,5,6}
//arr2 {4,2,6,1,3,5}; -> {1,4,2,6,3,5} -> {1,2,4,3,6,5} -> {1,2,3,4,5,6}
//arr3 {1,3,2,5,4,6}; -> {1,2,3,4,5,6}
//arr4 {3,5,2,6,1,4}; -> {1,3,5,2,6,4} -> {1,2,3,5,4,6} -> {1,2,3,4,5,6}