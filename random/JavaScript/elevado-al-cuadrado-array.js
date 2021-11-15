/**
 Programa una función que dado un array numérico devuelve 
 otro array con los números elevados al cuadrado, 
 pe. mi_funcion([1, 4, 5]) devolverá [1, 16, 25].
 */

 const arraySqrt = (arr) =>{
    if (arr === undefined || !(arr instanceof Array)) console.warn("No se ingreso un array");
    else if (arr.length === 0) console.warn("El array esta vacio")
    else{
        let nArray = [];
        arr.forEach(i => {
            if (typeof i !== 'number') return console.error(`El valor ${i} del array no es valido`);
            else nArray.push(Math.pow(i,2));
        });
        return nArray
    }
}
console.log(arraySqrt([1,4,5]));
 

//OTRA FORMA
//esta me parece mejor

const arraySqrt2 = (arr) =>{
    if (arr === undefined || !(arr instanceof Array)) console.warn("No se ingreso un array");
    else if (arr.length === 0) console.warn("El array esta vacio");
    else{
        for (let i of arr) { //el for en este caso es mejor para que el retorno tenga mas efectividad
            if (typeof i !== 'number') return console.error(`El valor ${i} del array no es valido`);
        }
        const newArr = arr.map( i => i * i);
        return newArr 
    }
}
console.log(arraySqrt2([1,4,5]));
 