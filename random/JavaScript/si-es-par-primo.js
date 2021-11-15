/**
 * Programa una función que determine si un número es primo 
 * (aquel que solo es divisible por sí mismo y 1) o no, 
 * pe. miFuncion(7) devolverá true.
 */


/* This Function accept negative integers as an argument*/
const numPrimo = (n) => {
    try{
        let a = n;
        
        if ( a === undefined || typeof a !== "number" ) throw "Error: no se ingreso un numero";
    
        if ( Math.sign(a) === -1 ) a *= -1;
        
        if ( a === 0 ) throw "Error: no se puede ingresar 0";
        if ( a === 1 ) throw `Error: ${n} no es un número primo`;

        /* Recursive Predicate to know if a number is Primo */
        const isPrimo = (a, b) => {
            let x = a;
            let y = b;
            
            // BASIC CASE
            if ( y === 1 ) return true;
            /* if the only divisible number of x=a is 1 then is PRIMO */

            //RECURSIVE CASE
            //patterns 
            else if ( x % y === 0 ) return false;
            /* if exist a number that is divisible for x=a then is NOT PRIMO */

            else return isPrimo(x, (y-1));
        }

        return isPrimo(a, (a-1)) ? `${n} es primo` : `${n} no es primo`;
    }
    catch (err){
       return err;
    }
}

console.log(numPrimo(1));
console.log(numPrimo(2));
console.log(numPrimo(3));
console.log(numPrimo(4));
console.log(numPrimo(5));
console.log(numPrimo(6));
console.log(numPrimo(7));
console.log(numPrimo(8));
console.log(numPrimo(9));
console.log(numPrimo(10));
console.log(numPrimo(11));
console.log(numPrimo(12));
console.log(numPrimo(13));
console.log(numPrimo(14));
console.log(numPrimo(15));

console.log(numPrimo(-1));
console.log(numPrimo(-2));
console.log(numPrimo(-3));
console.log(numPrimo(-4));
console.log(numPrimo(-5));



/* const numPrimo = (n) =>{
    if (n === undefined || typeof n !== "number") console.warn("No se ingreso un numero");
    else if (n === 0 || Math.sign(n) === -1) console.warn("No se puede ingresar 0 o negativo");
    else if (n === 1) console.warn(`1 no es un número primo`);
    else {
        let contador = 0;
        for(let i = n; i > 0; i--){
            let res = n % i;
            if (res === 0)contador++;
        }
        return (contador === 2) ? `${n} es un número primo`: `${n} no es un número primo`;
    }
} */

//OTRA FORMA MAS OPTIMISADA, ya que no tiene que estar en una constante division
/* const numPrimo2 = (n) =>{
    if (n === undefined || typeof n !== "number") console.warn("No se ingreso un numero");
    else if (n === 0 || Math.sign(n) === -1) console.warn("No se puede ingresar 0 o negativo");
    else if (n === 1) console.warn(`1 no es un número primo`);
    else {
        let divisible = false;
        for(let i = 2; i < n; i++){
            let res = n % i;
            if (res === 0){ 
                divisible = true;
                break
            }
        }
        return (divisible) ? `${n} no es un número primo` : `${n} es un número primo`;
    }
}
console.log(numPrimo2(7)); */

