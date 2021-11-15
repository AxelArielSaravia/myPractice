/**
 * Programa una función que dada una fecha válida determine 
 cuantos años han pasado hasta el día de hoy, 
 pe. miFuncion(new Date(1984,4,23)) devolverá 35 años (en 2020).
*/

const calcularAniosTranscurridos = (d) => {
    if (d === undefined || !(d instanceof Date)) console.warn("No se ha introducido un objeto DATE");
    
    let fAnteriorMs = d.getTime(),
        fActualMs = new Date().getTime();

    let aniosTransMs = fActualMs - fAnteriorMs,
        aniosEnMs = 1000 * 60 * 60 * 24 * 365,
        msTransAnios = Math.trunc(aniosTransMs / aniosEnMs);
    
    let fAnterior = d.toLocaleDateString(),
        fActual = new Date().toLocaleDateString();
    
    if (Math.sign(msTransAnios) === 1) {
        return `Entre ${fAnterior} y la fecha actual ${fActual} transcurrieron ${msTransAnios} años`
    }else if (Math.sign(msTransAnios) === -1) {
        return `Entre ${fAnterior} y la fecha actual ${fActual} faltan ${Math.abs(msTransAnios)} años`
    }else {
        return `Se introdujo la fecha actual ${fActual} = ${fAnterior}`;
    }
}

console.log(calcularAniosTranscurridos(new Date(1984,4,23)));
