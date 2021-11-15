/**
 * Divicion de entera lineal
 * @param {number} dividendo 
 * @param {number} divisor 
 * @returns {object} devuelve el cociente y el resto de la divicion
 */
const divisionEntera = (dividendo, divisor) => {
    // time complex O(n)
    //{P: dividendo >= 0 && divisor > 0}
    let cociente = 0, //veamos que el menor numero posible del cociente es 0
        resto = dividendo; // si cociente es 0 => resto = rdividendo segun I
    //{I: dividendo =  cociente * divisor + resto && 0 <= r}(invariante)
    while (resto >= divisor) {
        cociente++;
        resto -= divisor;
    }
    //{Q: dividendo =  cociente * divisor + resto && 0 <= r && resto < divisor}
    return {cociente, resto}
}

/**
 * Divicion de entera mejorada
 * @param {number} dividendo 
 * @param {number} divisor 
 * @returns {object} devuelve el cociente y el resto de la divicion
 */
const divisionEntera2 = (dividendo, divisor) => {
    //el incremento del cociente sera mayor que lineal
    //para eso en vez de tener cociente = cociente + 1
    //vamos a tener cociente = cociente + d (sea d entero y d<=0 )
    // vamos a asumir que d es alguna potencia de 2, por lo tanto va a crecer multiplicandose por 2
    //y el resto (ligado al cociente) en vez de resto = resto - divisor
    //sera resto = resto - d * divisor (esto esta demostrado por calculo)
    // y llamaresmo dd = d * divisor

    //{P: dividendo >= 0 && divisor > 0}
    let cociente = 0,
        resto = dividendo;
    //{I: dividendo =  cociente * divisor + resto && 0 <= r}(invariante)
    while (resto >= divisor) {
        let d = 1, //veamos que 1 es el minimo necesario para que se cumpla II
        dd = divisor; // = (d * divisor) && d = 1 => (1 * divisor) = divisor

        //{II: 1 <= d && d * y <= r && dd = d * y && [∃i:0<=i: 2^i = d]}
        while (resto >= 2 * d * divisor) {
            d *= 2,
            dd *= 2;
        }
        //{QQ: 1 <= d && d * y <= r && dd = d * y && [∃i:0<=i: 2^i = d] && r < 2 * d * y}
        
        cociente += d;
        resto -= dd;
    }
    //{Q: dividendo =  cociente * divisor + resto && 0 <= r && resto < divisor}
    return {cociente, resto}
}