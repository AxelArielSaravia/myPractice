"use strict"

/**
 * 
 * @param {number[]} arr 
 * @param {number} target 
 * @param {number} [start] 
 * @param {number} [end] 
 * @returns {boolean}
 */
function binarySearch(arr, target, start, end) {
  let startI = start || 0;
  let endI = end || arr.length-1;
  
  while (startI <= endI) {
    let midI = Math.floor((startI + endI) / 2);
    
    if (arr[midI] === target) return true;
    else if (arr[midI] > target) endI = midI - 1;
    else startI = midI + 1;
  }
  //if the target did not found 
  return false;
}