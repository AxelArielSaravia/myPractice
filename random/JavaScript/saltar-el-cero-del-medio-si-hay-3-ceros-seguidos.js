/* 
***** There is a new mobile game that starts with consecutively numbered clouds.
 Some of the clouds are thunderheads and others are cumulus. 
 The player can jump on any cumulus cloud having a number that is equal to the 
 number of the current cloud plus 1 or 2. The player must avoid the thunderheads. 
 Determine the minimum number of jumps it will take to jump from the starting 
 postion to the last cloud. It is always possible to win the game.

For each game, you will get an array of clouds numbered 0
if they are safe or 1 if they must be avoided.
*/


/**
 * Primero declaramos una variable saltos
 * Segundo realizamos un ciclo FOR
 * si i + 2 es mayor al tamaño del arra Y el elemento dos indices mas adelante es igual a 0
 * aumentar el contador i (salta el cero del medio)
 * aumentar el saltador
 * Como cuenta la cantidad de 0 resta 1 al saltador
 */

let c = [0,0,1,0,0,0,1,0];

function jumpingOnClouds(c) {
    let jumps = 0;
    for (let i = 0; i < c.length; i++) {
        if (i+2 < c.length && c[i+2] === 0) i++; //salta el cero del medio si hay 3
        jumps++
    }
    console.log(jumps-1);
}

jumpingOnClouds(c);