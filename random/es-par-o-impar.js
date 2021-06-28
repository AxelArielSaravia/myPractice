/**
 * Programa una función que determine si un número es par o impar, 
 * pe. miFuncion(29) devolverá Impar.
 */
 const numPar = (n) =>{
    if (n === undefined || typeof n !== "number") console.warn("No se ingreso un numero");
    else if (n === 0) console.warn("No se puede ingresar 0");
    else return(n % 2 === 0) ? `${n} es par` : `${n} es impar`;
}
console.log(numPar(29));
