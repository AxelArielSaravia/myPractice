/* isLucky */
/* 
     Ticket numbers usually consist of an even number of digits. 
     A ticket number is considered lucky if the sum of the first half of the digits is equal to the sum of the second half.
     Given a ticket number n, determine if it's lucky or not.
*/

function isLucky(n) {
     let splitNums = n.toString(10).split("").map(e => Number.parseInt(e));
     let numsLen = splitNums.length;

     let leftNums =  splitNums.slice(0, numsLen/2);
     let rigthNums = splitNums.slice(numsLen/2, numsLen)

     let sumLeftNums = leftNums.reduce( (acc, el) => acc + el);
     let sumRigthNums = rigthNums.reduce( (acc, el) => acc + el);
     console.log(sumRigthNums, sumLeftNums)

     return sumLeftNums === sumRigthNums;
}
let  n1 = 1289,
     n2 = 324432,
     n3 = 10;

console.log(isLucky(n1));
console.log(isLucky(n2));
console.log(isLucky(n3));
