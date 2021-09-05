/**
 * Programa una función que calcule el factorial de un número 
 * (El factorial de un entero positivo n, se define como el producto de 
 * todos los números enteros positivos desde 1 hasta n), 
 * pe. miFuncion(5) devolverá 120.
 */


 const factorial = (n) => {
    if(n === undefined || typeof n !== 'number') console.warn("No se ingreso ningun numero");
    else if(n === 0 || Math.sign(n) === -1) console.warn("No se puede ingresar 0 o numeros negativos");
    else{
        let total = 1;
        for (let i = 1; i <= n; i++) total *= i;
        return `El factorial de ${n} es igual a ${total}`;
    }
}
console.log(factorial(5));

// OTRA MANERA CON FUNCIONES RECUSIVAS
const factorial2 = (n) => {
    if(n === undefined || typeof n !== 'number') console.warn("No se ingreso ningun numero");
    else if(n === 0 || Math.sign(n) === -1) console.warn("No se puede ingresar 0 o numeros negativos");
    else if (n === 1) return 1;
    else{
        let total = n * factorial2(n - 1);
        return total;
    }
}
console.log(factorial2(5));
