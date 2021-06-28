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

function rotLeft(a, d) {
    for( let i = 0; i < d; i++ ){
        a.push(a.shift());
    }
    return console.log(a);
}

rotLeft(array, rotaciones);