/* 
***** There is a large pile of socks that must be paired by color. 
Given an array of integers representing the color of each sock, 
determine how many pairs of socks with matching colors there are. 
*/

//example

let n = 11;
let ar = [1,1,3,1,2,1,3,3,3,4];

/**
 * Primero ordenamos el array
 * Creamos variables para guardar los pares posibles
 *    y un contador de numero iguales
 * Recorremos el array
 *    Si el index del valor es igual al index del recorrido, entonces:
 *        si count es par, dividimos count para sacar los pares posibles
 *        sino restamos uno y despues dividimos
 *    SINO (si el index del valor es DESIGUAL al index del recorrido)
 *       se suma el contador de numeros iguales
 * 
 * volvemos a hacer la operacion de count por si el ultimo numero no es distinto
 * devuelve el par
 */

function sockMerchant(n, ar) {
    ar.sort() // primero ordenamos el array

    let pair = 0; //una variable para contar los pares
    let count = 0;//una variable como contador a dividir


    ar.forEach((v, i) => { // recorre todo el array
       if (ar.indexOf(v) === i) { //si el indice del valor es igual al indice del forEach

           //sacamos las posibilidades de par que puede tener la cantidad de numeros iguales contados 
           //en el caso de solo existir un numero de un valor unico, 1%2 = false, 1-1 = 0/2 = 0
           //entonces el par cuenta 0
           (count % 2 === 0) ? count /= 2 : count = (count - 1) / 2;  
           pair += count; // se suman a pares
           count = 1; //y contador vuelve a 1

       }else count++
    });
    (count % 2 === 0) ? count /= 2 : count = (count - 1) / 2;
    pair += count;

    console.log(pair);
}

sockMerchant(n,ar);


