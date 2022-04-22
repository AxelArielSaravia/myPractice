/**
 * Given an array of integers, where all elements but one occur twice, find the unique element.
 * 
 * EXAMPLE:
 *  a = [1,2,3,4,3,2,1]
 *  a = [1,2,2,5,3,4,1,3,6,6,5]
 * The unique element is 4
 */


function lonelyinteger(a) {
  let n;
  for (let i = 0; i < a.length; i++) {
      const i1 = a.indexOf(a[i]);
      const i2 = a.lastIndexOf(a[i]);
      
      if (i1 === i2) {
          n = a[i];
          break   
      }
  }
  return (n === undefined ? "No unique element found" : n); 
}