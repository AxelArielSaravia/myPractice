/**
 *Programa una función que devuelva el monto final
  después de aplicar un descuento a una cantidad dada, 
 pe. miFuncion(1000, 20) devolverá 800.
 */
 const descuento = (m, d = 0) =>{
    if (m === undefined || typeof m !== 'number') console.warn("No se ha introducido un numero de precio");
    if (typeof d !== 'number') console.warn("No se ha introducido el porcentaje de descuento en numero");
    else if (Math.sign(m) === -1) console.warn("El precio no puede ser negativo");
    else if (d === 0 || Math.sign(d) === -1) console.warn("El descuento no puede ser 0 o negativo");
    else return `El precio $${m} - ${d}% = $${m - (m * d / 100)}`;
}
console.log(descuento(1000,20));
