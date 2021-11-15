/*  All Longest strings */
/* 
    Given an array of strings, return another array containing all of its longest strings.
*/

function allLongestStrings(inputArray) {
    let arr = Array.from(inputArray).sort((a,b) => a.length - b.length);
    return arr.filter((e,i, arr) => {
      let lasIndex = arr.length-1;
      return e.length === arr[lasIndex].length
    })
  }
  
  
  
let inputArray = ["aba", "aa", "ad", "vcd", "aba"]
console.log( allLongestStrings(inputArray))