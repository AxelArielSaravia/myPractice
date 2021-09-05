/* 
***** BITWISE 'AND' OPERATOR *****
para una secuencia de numeros con un valor maximo 'n', queremos saber el maximo valor que se 
obtiene del operador bitwise AND de los enteros, 'a' y 'b'(donde a < b) de la secuencia,
siempre y cuando el resultado sea menor a 'k'.

Entonces para una 'n' y 'k' dada, devolver el maximo valor de ('a' & 'b') < 'k'.
*/

let n = 5
let k = 2


const getMaxLessThanK = (n, k) => {
    let res = 0;

    for (let a = 1; a < n ; a++){
        for (let b = a+1; b <= n; b++){

            let bitwiseAnd = (a & b);
            if(bitwiseAnd < k){
                if(bitwiseAnd > res){
                    res = bitwiseAnd;
                }
            }
        }
    }
    console.log(res);
}

getMaxLessThanK(n, k);