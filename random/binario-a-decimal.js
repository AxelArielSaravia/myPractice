/**
 *Programa una función para convertir números de base binaria a decimal y viceversa, 
 *pe. miFuncion(100,2) devolverá 4 base 10.
 */
 const binarioADecimal = (n, b) =>{
    if (n === undefined || typeof n !== 'number') console.warn("No se ha introducido un numero");
    if (b === undefined || typeof b !== 'number') console.warn("No se ha introducido la base");
    else if (b === 2) return `${n} base ${b} = ${parseInt(n,b)} base 10`;
    else if (b === 10) return `${n} base ${b} = ${Number(n.toString(2))} base 2`;
    else console.warn("La base solo puede ser 2 o 10")
}
console.log(binarioADecimal(100,2));
