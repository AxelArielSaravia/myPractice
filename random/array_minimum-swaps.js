'use strict'

/**
 * You are given an unordered array consisting of consecutive integers [1, 2, 3, ..., n] 
 * without any duplicates. You are allowed to swap any two elements. 
 * Find the minimum number of swaps required to sort the array in ascending order.
 * 
 * Cuantos cambios de posiciones de indice hay que hacer en un array para que queden ordenados de menor a mayor
 * se intercambian posiciones 
 */


let myArr1 = [ 9, 3, 4, 1, 5 ]; //[5, 3, 4, 1, 9] //[ 1, 3, 4, 5, 9]
let myArr2 = [ 1, 3, 5, 2, 4, 6, 7 ];//[1,3,4,2,5,6,7] //[1,2,4,3,5,6,7]
let myArr3 = [ 4, 3, 1, 2 ];//[2, 3, 1, 4] //[1,3,2,4]//[1,2,3,4]
let myArr4 = [1, 0, 4];//[0,1,4]
let myArr5 = [4, 87, -5, 792, 0]; //[0,87,-5,792,4]//[0,4,-5,792,87]//[0,4,-5,87,792]//[-5,4,0,87,792]//[-5,0,4,87,792]


//random array
const set = new Set([]);
for(let i = 0; i < 1000; i++) {
    set.add( parseInt( Math.random() * 1000 + 1 ) );
}
let randomArray = Array.from(set);



function minimumSwaps(arr) {
    //console.log(arr)

    let counter = 0;

    for (let r = (arr.length - 1); r > 0; r--){

        for (let l = 0; l < r; l++){          

            if( arr[r] < arr[l]){

                let temp = arr[l];

                arr[l] = arr[r];
                
                arr[r] = temp;

                //console.log(arr)
                
                //return;

                // arr.fill( arr[r], l, l + 1);
                // arr.fill( v, r, r + 1);

                counter ++;
            }
        }
    }

    return [arr ,counter];
}

console.log(minimumSwaps(myArr5))





//otra forma de solucion NO FUNCIONAN
// function minimumSwaps2(arr) {

//     let swap = 0;//guardamos la cantdad de transaciones

//     for (let i = 0; i < arr.length; i++) { 
//             while (i+1 !== arr[i]) { //mientras el index (sumado 1) no sea igual a su valor

//                 let temp = arr[arr[i] - 1];//guardamos temporalmente el valor que se encuentra en el index en donde deveria estar nuestro valor actual
//                 //console.log(arr[arr[i] - 1])
//                 arr[arr[i] - 1] = arr[i]//insertames nuestro valor en su index
//                 //console.log(arr)
//                 arr[i] = temp;//

//                 swap ++;
//             }
//     }
//     return [arr, swap];
// }

// function minimumSwaps3(arr) {
//     let swap = 0;
//     for (let i = 0; i < arr.length; i++) { 
//             while (i+1 !== arr[i]) {
//                 let temp = arr[arr[i] - 1];
//                 arr[arr[i] - 1] = arr[i]
//                 arr[i] = temp;
//                 swap ++;
//             }
//     }
//     return [arr, swap];
// }


