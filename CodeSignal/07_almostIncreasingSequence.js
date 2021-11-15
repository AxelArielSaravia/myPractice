/* 
  almostIncreasingSequence

  Given a sequence of integers as an array, determine whether it is possible to obtain 
  a strictly increasing sequence by removing no more than one element from the array.
  
  Note: sequence a0, a1, ..., an is considered to be a strictly increasing if a0 < a1 < ... < an. 
        Sequence containing only one element is also considered to be strictly increasing.
*/


/*
Function that accept two arguments: an array and the starIndex
-the starIndex takes thakes te current value of that index and compare to all succ-

if all succ are major than a array's elemet return true
if not return the index of the element that is minor or equal than
*/
/**
 * 
 * @param {array} array - Array of numbers
 * @param {number} startIndex - The element to compare
 * @returns {(number|boolean)} - the index of the element that is mayor or equal than, or if is the minor than
 */

function minorThanSucc( array, startIndex ){
  //Recursion in indexSucc
  function recursion( arr, indexSucc ){
    //BASE CASE
    if( indexSucc >= arr.length ) return true;

    if( arr[startIndex] >= arr[indexSucc] ) return indexSucc;
    
    //RECURSIVE CASE
    return recursion(arr, indexSucc+1);
  }
  return recursion(array, startIndex+1)
}



function almostIncreasingSequence(sequence) {
  if( !(sequence instanceof Array) ) return Error('the argument must be an array of numbers');

  let array = Array.from(sequence);

  function recursion(array, index, acc) {
    let isMinor = minorThanSucc(array, index); //true or index of falsy element

    //restriction
    if( acc > 1 ) return false;
    //BASIC CASE
    if( index === array.length-1 ) return true;
    //RECURSION CASE
    if( isMinor !== true ){
      if(array[index] === array[isMinor]) array.splice(isMinor, 1);
      else array.splice(index, 1);
      acc++;
      index--; //check the same index in the next call
    }
    return recursion(array, index+1, acc);
  }

  return recursion(array, 0, 0)
} 


function almostIncreasingSequence(sequence){
    let arr = Array.from(sequence);
  
    let acc = 0;
  
    for (let i = 0; i < arr.length-1; i++) {
      if( acc > 1 ) return false; 
  
      for (let j = i+1; j < arr.length ; j++) {
  
        if( !(arr[i] < arr[j]) ){
          if( arr[i] === arr[j] ) arr.splice(j, 1);
          if( arr[i] > arr[j] ) arr.splice(i, 1);
          acc++;
          i--;
          break
        }
  
      }
  
    }
    if( acc > 1 ) return false; 
    return true;
  }
  
  console.log(almostIncreasingSequence([1, 3, 2, 4, 1]));
  console.log(almostIncreasingSequence([1, 2, 3, 4, 5, 3, 5, 6]));
  console.log(almostIncreasingSequence([40, 50, 60, 10, 20, 30]));
  console.log(almostIncreasingSequence([0, -2, 5, 6]));
  console.log(almostIncreasingSequence([1, 2, 3, 4, 3, 6]));
  console.log(almostIncreasingSequence([3, 5, 67, 98, 3]));
  console.log(almostIncreasingSequence([1, 1, 1, 2, 3]));
  console.log(almostIncreasingSequence([1, 2, 5, 5, 5])); 
  // console.log(almostIncreasingSequence());
  
  
  
  
  let array = [1,2,3,4],
      array2 = [2,1,3,4];
  
  
  