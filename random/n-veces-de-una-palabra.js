/*
*Programa una función para contar el número de veces que se repite 
*una palabra en un texto largo, 
*pe. miFuncion("hola mundo adios mundo", "mundo") devolverá 2. 
*/

const contarStrings = (s="", n= "") => {
    if (!s) console.warn("No se ingreso ningun string");
    if (!n) console.warn("No se ingreso el string para evaluar");
    else if (s.indexOf(n) === -1) console.warn("El string a evaluar no se encuentra");
    else {
        let index = s.indexOf(n),
            contador = 0;
        while(index != -1){
            contador++
            index = s.indexOf(n, index+1);
        }
        return `"${n}" aparece ${contador} veces en "${s}"`;
    }
}
console.log(contarStrings("hola mundo adios mundo", "mundo"));

