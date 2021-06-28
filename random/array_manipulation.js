'use strict'

/**
 * Starting with a 1-indexed array of zeros and a list of operations, 
 * for each operation add a value to each the array element between two given indices, inclusive. 
 * Once all operations have been performed, return the maximum value in the array.
 *  1 2 3 4 5
 * [1,5,3,3,7]
*/
let input1 = {
    n: 10,
    q: [
        //[index1, index2, value]
        [1,5,3],
        [4,8,7],
        [6,9,1]
    ]
}
let input2 = {
    n: 5,
    q: [
        [1,2,100],
        [2,5,100],
        [3,4,100]
    ]
}
let input3 = {
    n: 10,
    q: [
        [2,6,8],
        [3,5,7],
        [1,8,1],
        [5,9,15]
    ]
}


function arrayManipulation(n, queries) {
    let array = Array();

    let num = 0;
    
    for (let i = 0; i < queries.length; i++){
        for( let v = (queries[i][0] - 1); v < queries[i][1]; v++ ){
            if (typeof array[v] === "undefined") array[v] = 0;
            array[v] += queries[i][2];
        }
    }

    for ( let i = 0; i < array.length; i++ ){
        if( array[i] > num ) num = array[i];
    }
    
    return num;
}




//otra manera
function arrayManipulation2(n, queries) {
    let array = Array();
    let max = 0;

    //inicilizamos los valores del array a 0
    for( let i = 0; i < n; i++){
        array[i] = 0;
    }
    //recorremos el array de queries
    for( let i = 0; i < queries.length; i++ ){
        //le asignamos al primer indice dado el valor dado
        array[queries[i][0]-1] += queries[i][2];
        
        if (queries[i][1] < array.length) {
            //le asignamos al segundo indice(más uno) dado el valor negativo (para que reste)
            array[queries[i][1]] -= queries[i][2];
        }
    }
    //console.log(array)
    //recorremos nuestro array, desde el indice 1
    for (let j = 1; j < n; j++) {
        //a cada valor del indice indicado se le suma el valor del indice anterior
        //como teniamos antes numeros que restaban
        array[j] += array[j-1];
    }
    //volvemos a recorrer el array
    for (let i in array) {
        //evalua el valor maximo entre dos valores
        max = Math.max(max, array[i]);
    }

    return [max, array];
    
}

//console.log(arrayManipulation(input1.n, input1.q))


console.log(arrayManipulation2(input1.n, input1.q))
