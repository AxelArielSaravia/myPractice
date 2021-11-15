/* commonCharacterCount */
/* 
     Given two strings, find the number of common characters between them.
*/

function commonCharacterCount(s1, s2) {
     let s1Arr = s1.split(""),
         s2Arr = s2.split("");
     
     return s1Arr.reduce(( acc, s1El, i, arr ) => {
          if(  s2Arr.includes(s1El) ){
               let s2Index = s2Arr.findIndex(s2El => s2El === s1El );
               s2Arr.splice(s2Index, 1);

               return acc+1
          }
          return acc+0;
     }, 0);
     
}

let s1 = "aabcc";
let s2 = "adcaa";

console.log(commonCharacterCount(s1,s2))