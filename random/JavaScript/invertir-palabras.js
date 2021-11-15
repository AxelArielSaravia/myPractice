/*
*Programa una función que invierta las palabras de una cadena de texto, 
*pe. miFuncion("Hola Mundo") devolverá "odnuM aloH". 
*/

const invertirString = (s = "") => 
(!s) ? console.warn("No se ingreso ningun string")
: s.split('').reverse().join('');

console.log(invertirString("Hola Mundo"));
