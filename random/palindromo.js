/*
*Programa una función que valide si una palabra o frase dada, 
*es un palíndromo (que se lee igual en un sentido que en otro), 
*pe. mifuncion("Salas") devolverá true. 
*/


const palindromo = (s ="") =>{
    if (!s){
        console.warn("No se ingreso ningun string");
    } else {
        s = s.toLowerCase()
        let rev = s.split('').reverse().join('');

        if (s === rev) return `"${true}", ${s} es un palíndromo`;
        else return `"${false}", ${s} no es un palíndromo`;
    }
}
console.log(palindromo("Salas"));

