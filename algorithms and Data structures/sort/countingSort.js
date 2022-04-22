/**
 * Counting sort is a stable sorting technique,
 * which is used to sort objects according to the keys that are small numbers. 
 * It counts the number of keys whose key values are same. 
 * This sorting technique is effective when the difference between different keys are not so big, 
 * otherwise, it can increase the space complexity.
 * 
 * Time Complexity: O(n+r)
 * Space Complexity: O(n+r)
 * 
 * 
 * Example:
 * Array: [2,4,6,3,2,6,8,9,1,2,5,0,0,4]
 * Max value: 9
 * Count Array[9]
 * 
 * Values [0,1,2,3,4,5,6,7,8,9]
 * Count  [1,1,3,2,2,1,2,0,1,1]
 * 
 * result [0,1,2,2,2,3,3,4,4,5,6,6,8,9]
 */

function countSort(arr) {
  let i;
  const output = Array(arr.length);

  //get the max number;
  const MAX = Math.max(...arr);

  //Initialize count array to zero
  const count = Array(MAX + 1).fill(0);

  //Increase number count in count array
  for (i = 0; i < arr.length; i++)  {
    count[arr[i]] += 1;
  }
  console.log("Count Array: ",count);

  //find cumulative frequency
  for (i = 1; i <= MAX; i++) {
    count[i] += count[i - 1];
  }
  console.log("Count Array after cumulative: ",count);

  //The cumulative frequency it is thinking in a positive integer ranger (without the zero)
  //For that we need to decrease for one the values in Count cumulative frequency
  //decrease count for same numbers
  for (i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i]]-1] = arr[i];
    count[arr[i]]--; 
  }

  return output;
}

let arr = [2,4,6,3,2,6,8,9,1,2,5,0,0,4];
countSort(arr);