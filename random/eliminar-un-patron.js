/*
*Programa una función que elimine cierto patrón de caracteres de un texto dado, 
*pe. miFuncion("xyz1, xyz2, xyz3, xyz4 y xyz5", "xyz") devolverá  "1, 2, 3, 4 y 5. 
*/
const eliminarCaracter = (s = "", e = "") => {
    if (!s) console.warn("No se ingreso ningun texto");
    if (!e) console.warn("No se ingreso el patron");
    else if (!s.includes(e)) console.warn("El patron no esta incluido en el texto");
    else{
        let r = new RegExp(e,"ig")
        return s.replace(r,"")
    }
}

console.log(eliminarCaracter("xyz1, xyz2, xyz3, xyz4 y xyz5", "xyz"));