/**
 * Programa una función que reciba un número y evalúe si es capicúa o no 
 * (que se lee igual en un sentido que en otro), 
 * pe. miFuncion(2002) devolverá true.
 */
 const capicua = (n) => {
    if(n === undefined || typeof n === 'string') console.warn("No se ingreso ningun numero")
    else{
        n = n.toString()
       let rev = n.split('').reverse().join('');
       if(n === rev) return `${n} es capicúa`;
       else return `${n} no es capicúa`;
    }
}
console.log(capicua(2002));
console.log(capicua(201.102));


