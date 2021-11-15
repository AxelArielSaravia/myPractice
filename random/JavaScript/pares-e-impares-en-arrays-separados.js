/**
 Programa una función que dado un array de números devuelva un objeto con 2 arreglos 
 en el primero almacena los números pares y en el segundo los impares, 
 pe. miFuncion([1,2,3,4,5,6,7,8,9,0]) devolverá {pares: [2,4,6,8,0], impares: [1,3,5,7,9]}.
*/

const parImpar = (arr) =>{
    if (arr === undefined || !(arr instanceof Array)) console.warn("No se ingreso un array");
    else if (arr.length === 0) console.warn("El array esta vacio");
    else {
        //objeto
        let numeros = {
            pares: [],
            impares: []
        }
        arr.forEach(i => {
            if (typeof i !== 'number') {
                console.error(`El valor ${i} del array no es valido`);
                return null;
            }
            else if (i%2 === 0) numeros.pares.push(i);
            else numeros.impares.push(i);
        });
        return numeros;
    }
}
console.log(parImpar([1,2,3,4,5,6,7,8,9,0]));


//OTRA FORMA 

const parImpar2 = (arr) =>{
    if (arr === undefined || !(arr instanceof Array)) console.warn("No se ingreso un array");
    else if (arr.length === 0) console.warn("El array esta vacio");
    else {
        for (let i of arr) { 
            if (typeof i !== 'number') return console.error(`El valor ${i} del array no es valido`);
        }
        return {
           par: arr.filter(i => i%2 === 0),
           impar: arr.filter(i => i%2 === 1)
        }
    }
}
console.log(parImpar2([1,2,3,4,5,6,7,8,9,0]));