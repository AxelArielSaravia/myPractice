/* alternatingSums */
/* 
  Several people are standing in a row and need to be divided into two teams. 
  The first person goes into team 1, 
  the second goes into team 2, 
  the third goes into team 1 again, 
  the fourth into team 2, and so on.

  You are given an array of positive integers - the weights of the people. 
  Return an array of two integers, where the first element is the total weight of team 1, 
  and the second element is the total weight of team 2 after the division is complete.
*/
/**
 * Return an array of two integers, the first element is the add of even indexes and the second is the add of odd indexes
 * @param {Array} a - An array of numbers
 * @returns {Array}
 */
function alternatingSums(a) {
     if(a.length === 0) return [0,0]
     if(a.length === 1) return [...a, 0];
     if(a.length === 2) return a;

     let addEvenIndex = a.filter( (e,i) => i % 2 === 0 )
                         .reduce( (acc, e) => acc + e);
     let addOddIndex = a.filter( (e,i) => i % 2 !== 0 )
                         .reduce( (acc, e) => acc + e);

     return [addEvenIndex, addOddIndex]
}


console.log(alternatingSums([1,2,3,4]))
console.log(alternatingSums([50, 60, 60, 45, 70]))