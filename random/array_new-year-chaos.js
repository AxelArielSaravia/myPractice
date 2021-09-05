/**
 * It is New Year's Day and people are in line for the Wonderland rollercoaster ride. 
 * Each person wears a sticker indicating their initial position in the queue from 1 to n. 
 * Any person can bribe the person directly in front of them to swap positions, but they still wear their original sticker. 
 * One person can bribe at most two others.
 * Determine the minimum number of bribes that took place to get to a given queue order. 
 * Print the number of bribes, or, if anyone has bribed more than two people, print Too chaotic.
 */

let arr1 = [2,1,5,3,4],//3
    arr2 = [5,1,2,3,7,8,6,4],
    arr3 = [1,2,5,3,7,8,6,4],//7 [1,2,3,4,5,6,7,8]//[1,2,5,3,4,6,7,8]2//[1,2,5,3,6,4,7,8]1//[1,2,5,3,7,6,4,8]2//[1,2,5,3,7,8,6,4]2
    arr4 = [1,3,5,4,6,8,2,7],//6 [1,2,3,4,5,6,7,8]//[1,3,2,4,5,6,7,8]1//[1,3,5,2,4,6,7,8]2//[1,3,5,4,2,6,7,8]1//[1,3,5,4,6,2,7,8]1//[1,3,5,4,6,8,2,7]2
    arr5 = [1,2,5,3,4,7,8,6]; // 4


function minimumBribes(q) {
    let bribes = 0;

    for( let i = q.length - 1; i >= 0; i-- ){
        if( q[i] - (i+1) > 2 ) return console.log( "Too chaotic" );

        for( let n = Math.max(0, q[i] - 2); n < i; n++ ){
            if( q[n] > q[i] ) bribes++
        }
    }

    return console.log( bribes )
}

minimumBribes(arr4)
