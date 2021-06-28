/**
 * Programa una función para convertir grados Celsius a Fahrenheit y viceversa, 
 * pe. miFuncion(0,"C") devolverá 32°F.
*/
const convGrados = (n, u="") =>{   
    if (n === undefined || typeof n !== "number") console.warn("No se ingreso el numero de grados");
    if (!u || typeof u !== "string") console.warn("No se ingreso la unidad como C o F");
    else if (u.length !== 1 || !/(C|F)/i.test(u)) console.warn("La unidad solo puede ser C o F");
    else{
        u = u.toUpperCase()
        if (u === "C") {
           let res = Math.round(n * 9 / 5 + 32);
           return `${n}${u} es igual a ${res}F`
        }
        if (u === "F") {
            let res = Math.round((n - 32) * 5 / 9);
            return `${n}${u} es igual a ${res}C`
        }
    }
}
console.log(convGrados(0,"c"));