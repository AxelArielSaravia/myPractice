'use strict'

/**
 * A left rotation operation on an array shifts each of the array's elements 1 unit to the left. 
 * For example, if  2 left rotations are performed on array [1,2,3,4,5] , 
 * then the array would become [3,4,5,1,2]. 
 * Note that the lowest index item moves to the highest index in a rotation. 
 * This is called a circular array.
 * 
 * Given an array A of N integers and a number, D , perform D left rotations on the array. 
 * Return the updated array to be printed as a single line of space-separated integers.
 */

let array = [1,2,3,4,5];
let rotaciones = 3;

function rotLeft(array, d) {
    
    let a = Array.from(array);
    for( let i = 0; i < d; i++ ){
        a.push(a.shift());
    }
    return a;
}


/* recursive function */
function rotLeft2(array, rotation) {
    let a = Array.from(array);
    
    //BASIC CASE
    if( rotation <= 0 ) return a;

    //RECUSRIVE CASE
    //action
    a.push(a.shift());
    //recursion
    return rotLeft2(a, rotation-1);
}

console.log(rotLeft2(array, rotaciones))
