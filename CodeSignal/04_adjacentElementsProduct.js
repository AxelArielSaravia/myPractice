/* adjacentElementsProduct */

/* 
    Given an array of integers, find the pair of adjacent elements that 
    has the largest product and return that product.
*/

function adjacentElementsProduct(inputArray) {
    //the argument must be an array of Numbers
    if( !(inputArray instanceof Array) ) return Error('The argument is not an Array');
    
    //the array must have minimum 2 elements
    return inputArray.length <= 1 
    ? 0
    : inputArray.reduce((acc, e, i, arr) =>{
        // first_acc = firstEl * sndEl
        return arr[i-1] * arr[i] > acc 
        ?  arr[i-1] * arr[i]
        : acc;
    }, inputArray[0] * inputArray[1]);
    
}
