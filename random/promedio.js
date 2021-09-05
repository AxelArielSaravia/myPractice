/**
 *Programa una función que dado un arreglo de números obtenga el promedio, 
 pe. promedio([9,8,7,6,5,4,3,2,1,0]) devolverá 4.5.
*/

const promedio = (arr) => {
    if (arr === undefined || !(arr instanceof Array)) console.warn("No se ingreso un array");
    else if (arr.length === 0) console.warn("El array esta vacio");
    else {
        for (let i of arr){
            if (typeof i !== 'number') return console.error(`El elemento ${i} no es valido`);
        }
        let res = arr.reduce((acumulador, valor) => (acumulador + valor)) / arr.length;
        return `El promedio de ${arr.join(" + ")} es ${res}`
    }
}
console.log(promedio([9,8,7,6,5,4,3,2,1,0]));