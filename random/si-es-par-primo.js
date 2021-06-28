/**
 * Programa una función que determine si un número es primo 
 * (aquel que solo es divisible por sí mismo y 1) o no, 
 * pe. miFuncion(7) devolverá true.
 */

// const numPrimo = (n) =>{
//     if (n === undefined || typeof n !== "number") console.warn("No se ingreso un numero");
//     else if (n === 0 || Math.sign(n) === -1) console.warn("No se puede ingresar 0 o negativo");
//     else if (n === 1) return `1 no es un número primo`;
//     else {
//         let contador = 0;
//         for(let i = n; i > 0; i--){
//             let res = n % i;
//             if (res === 0)contador++;
//         }
//         return (contador === 2) ? `${n} es un número primo`: `${n} no es un número primo`;
//     }
// }
// console.log(numPrimo(7));

//OTRA FORMA MAS OPTIMISADA, ya que no tiene que estar en una constante division
const numPrimo2 = (n) =>{
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
console.log(numPrimo2(7));

