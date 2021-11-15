'use strict'

/**
 * Encontrar todas las estructuras de 3x3 de cada array
 * ejemplo:
 *  1  1  1
 *  0  1  0
 *  1  1  1
 * 
 * Y sumar solo el siguiente contenido de la estructura:\
 *  1  1  0
 *     0   
 *  1  1  0
 * 
 * devolver solo el bloque que esta suma genere el numero mas grande
 */



function hourglassSum( arr ) {
    //we asume that the matrix nxm, have the minimun value 3x3
    if (arr.length < 3 || arr[0].length < 3 ){
        return new Error("we can not computate matrix minor than 3x3");
    }

    let columnLength = arr.length;
    let rowLength = arr[0].length;
    
    //the total is the first matrix sum
    let total = arr[0][0] + arr[0][1] + arr[0][2] 
                        + arr[1][1]
              arr[2][0] + arr[2][1] + arr[2][2];
    
    //time complexity O(n^2)
    for (let i = 0; i < columnLength-2; i++){
        for (let j = 0; j < rowLength+2; j++){
            let sum = arr[i][j] + arr[i][j+1] + arr[i][j+2];
            sum += arr[i+1][j+1];
            sum += arr[i+2][j] + arr[i+2][j+1] + arr[i+2][j+2];
    
            if (sum > total) total = sum;
        }
    }
    return total; 
} 


let myArr = [
    [ 1, 1, 1, 0, 0, 0 ],
    [ 0, 1, 0, 0, 0, 0 ],
    [ 1, 1, 1, 0, 0, 0 ],
    [ 0, 0, 2, 4, 4, 0 ],
    [ 0, 0, 0, 2, 0, 0 ],
    [ 0, 0, 1, 2, 4, 0 ]
];//19

let myArr2 = [
    [ -9, -9, -9, 1, 1, 1 ],
    [ 0, -9, 0, 4, 3, 2 ],
    [ -9, -9, -9, 1, 2, 3 ],
    [ 0, 0, 8, 6, 6, 0 ],
    [ 0, 0, 0, -2, 0, 0 ],
    [ 0, 0, 1, 2, 4, 0 ]
];//28

let myArr3 = [
    [ 1, 1, 1, 0, 0, 0 ],
    [ 0, 1, 0, 0, 0, 0 ],
    [ 1, 1, 1, 0, 0, 0 ],
    [ 0, 9, 2, -4, -4, 0 ],
    [ 0, 0, 0, -2, 0, 0 ],
    [ 0, 0, -1, -2, -4, 0 ]
];//13

let myArr4 = [
    [ -1, -1, 0, -9, -2, -2 ],
    [ -2, -1, -6, -8, -2, -5 ],
    [ -1, -1, -1, -2, -3, -4 ],
    [ -1, -9, -2, -4, -4, -5 ],
    [ -7, -3, -3, -2, -9, -9 ],
    [ -1, -3, -1, -2, -4, -5 ]
];//-6

let myArr5 = [
    [ 0, -4, -6, 0, -7, -6 ],
    [ -1, -2, -6, -8, -3, -1 ],
    [ -8, -4, -2, -8, -8, -6],
    [ -3, -1, -2, -5, -7, -4 ],
    [ -3, -5, -3, -6, -6, -6 ],
    [ -3, -6, 0, -8, -6, -7 ]
];//-19

console.log(`Expected output 19 = output ${hourglassSum(myArr)}`)
console.log(`Expected output 28 = output ${hourglassSum(myArr2)}`)
console.log(`Expected output 13 = output ${hourglassSum(myArr3)}`)
console.log(`Expected output -6 = output ${hourglassSum(myArr4)}`)
console.log(`Expected output -19 = output ${hourglassSum(myArr5)}`)



//otra solucion

// function hourglassSum2(arr) {

//     let sum = 0; //se gurda la suma de cada bloque 3x3
//     let total = -Infinity; //gurdamos cada valor en un array

//     /**
//      * -Vamos iterando por cada fila
//      * -Ponemos el limite a la longitud menos 2, ya que trabajamos con bloques de 3x3
//      */
//     for( let fila = 0; fila < (arr.length - 2); fila++ ){

//         /**
//         * -A cada elemento de una fila le asignamos conseptualmente una columna
//         * -Lo mismo la cantidad de columnas es la longitud de los elementos menos 2, ya que trabajamos con bloques de 3x3
//         */
//         for( let columna = 0; columna < (arr[fila].length - 2); columna++ ){

//             /**
//              * -Estructuramos los bloques de 3x3
//              * -limitando la busqueda de 3 filas y 3 columnas; desde las posiciones reales de 
//              *  cada fila oa columna
//              */
//             for( let i1 = fila; i1 <= (fila + 2); i1++ ){
                
//                 for( let i2 = columna; i2 <= (columna + 2); i2++ ){
//                     if ( i1 === (fila + 1) ){
//                         if( i2 === columna || i2 === (columna + 2) ){
//                             continue;
//                         }
//                     }
//                     console.log(arr[i1][i2])
//                     sum += arr[i1][i2];
//                 }
//             }
//             break
//             if (total < sum) total = sum;

//             sum = 0;
//         }
//         break
//     }
//     return total;
// }
