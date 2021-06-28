/**
 Programa una función que dado un arreglo de elementos, elimine los duplicados
 pe. miFuncion(["x", 10, "x", 2, "10", 10, true, true]) devolverá ["x", 10, 2, "10", true].
*/

const eliminarDuplicado = (arr) =>{
    if (arr === undefined || !(arr instanceof Array)) console.warn("No se ingreso un array");
    else if (arr.length === 0) console.warn("El array esta vacio");
    else if (arr.length === 1) console.warn("El array necesita por lo menos dos elementos");
    else {
        let res = arr.filter((value, index, arr) => arr.indexOf(value) === index);
        return {original: arr, sinDuplicar: res}
    }
}
console.log(eliminarDuplicado(["x", 10, "x", 2, "10", 10, true, true]));

//OTRA MANERA

const eliminarDuplicado2= (arr) =>{
    if (arr === undefined || !(arr instanceof Array)) console.warn("No se ingreso un array");
    else if (arr.length === 0) console.warn("El array esta vacio");
    else if (arr.length === 1) console.warn("El array necesita por lo menos dos elementos");
    else {
        let res = [...new Set(arr)]
        return {original: arr, sinDuplicar: res}
    }
}
console.log(eliminarDuplicado2(["x", 10, "x", 2, "10", 10, true, true]));
