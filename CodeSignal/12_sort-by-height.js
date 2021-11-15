/* Sort by Height */
/* 
     Some people are standing in a row in a park. 
     There are trees between them which cannot be moved. Y
     our task is to rearrange the people by their heights in a non-descending order without moving the trees. 
     People can be very tall!
*/
function sortByHeight(a) {
     let arr = a.filter( e => e !== -1).sort( (a,b) => a - b);
     return a.map( (e) => {
          if( e !== -1){
               e = arr[0];
               arr.shift();
          }
          return e
     });
}

let a = [-1, 150, 190, 170, -1, -1, 160, 180],
    b = [-1, -1, -1, -1],
    c = [1,23,3,43,2,12],
    d = [2,13,-1,23,-1, 4, 1];

console.log( sortByHeight(a) );
console.log( sortByHeight(b) );
console.log( sortByHeight(c) );
console.log( sortByHeight(d) );

// console.log();
