/**
 * MIN and MAX sums of 4 element (in array)
 * 
 * Given five positive integers, find the minimum and maximum values that 
 * can be calculated by summing exactly four of the five integers. 
 * Then print the respective minimum and maximum values 
 * as a single line of two space-separated long integers.
 */
/**
 * Input Format
 * A single line of five space-separated integers.
 * 
 * Constraints
 * 1 <= arr[i] <= 10^9
 * 
 * Output Format
 * Print two space-separated long integers denoting the respective minimum and maximum values 
 * that can be calculated by summing exactly four of the five integers. 
 * (The output can be greater than a 32 bit integer.)
 */


 function miniMaxSum(arr) {
  let minArr = arr;
  let maxArr = arr;
  let min = Math.min(...minArr);
  let max = Math.max(...maxArr);
  let minimumSum = min;
  let maximumSum = max;
  
  for (let i = 0; i < 3; i++) {
      let minIndex = minArr.indexOf(min);
      let maxIndex = maxArr.indexOf(max);
      minArr = minArr.filter((_, i) => i !== minIndex);
      maxArr = maxArr.filter((_, i) => i !== maxIndex);
      min = Math.min(...minArr);
      max = Math.max(...maxArr);
      minimumSum += min;
      maximumSum += max;
  }
  return [minimumSum, maximumSum];
}