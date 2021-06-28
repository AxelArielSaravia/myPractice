/**
 Programa una función que dado un array devuelva el 
 número mas alto y el más bajo de dicho array, 
 pe. miFuncion([1, 4, 5, 99, -60]) devolverá [99, -60].
 */
//esta para mi es mejor

const numMinMax = (arr) => {
    if (arr === undefined || !(arr instanceof Array)) console.warn("No se ingreso un array");
    else if (arr.length === 0) console.warn("El array esta vacio");
    else{
        let array = [];
        arr.forEach(i => {
            if (typeof i !== 'number') return console.error(`El ${typeof i} ${i} del array no es valido`);
            else array.push(i)
        });
        return [Math.max(...array), Math.min(...array)];
    }
}
console.log(numMinMax([1, 4, 5, 99, -60]));


//OTRA FORMA

const numMinMax2 = (arr) => {
    if (arr === undefined || !(arr instanceof Array)) console.warn("No se ingreso un array");
    else if (arr.length === 0) console.warn("El array esta vacio");
    else{
        for (let i of arr) { //el for en este caso es mejor para que el retorno tenga mas efectividad
            if (typeof i !== 'number') return console.error(`El valor ${i} del array no es valido`);
        }
        return [Math.max(...arr), Math.min(...arr)];    
    }
}
console.log(numMinMax2([1, 4, 5, 99, -60]));

