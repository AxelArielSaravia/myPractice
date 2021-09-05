/* 
***** There is a string, s, of lowercase English letters that 
is repeated infinitely many times. 
Given an integer, n, find and print the number of letter a's in 
the first n letters of the infinite string.
*/


let s = "abafda";
let n = 11;

function repeatedString(s, n) {
    if(s === "a") return console.log(n);
    else {
        //guarda al cantidad de "a" y el calor de su posicion que aparece en el string
        let indexOfA = []
        for(let i = 0; i < s.length; i++){
            if (s[i] === "a") indexOfA.push(i); 
        }
        //divicion entre n y el largo del string
        let div = Math.trunc(n / s.length);

        //n es divisible por la longitud del string 
        if (n % s.length === 0){
            //solo se multiplica la cantidad de "a"s encontradas, por la divicion
            //entre n y la longitud del string
            return console.log(indexOfA.length * div); 
        }
        //n NO es divisible por la longitud del string 
        else{
            let resto = n % s.length; //guardamos el resto 
            let aSuelta = 0; // contador de 'a' sueltas
            //si el indice de las "a" del string es igual al indice del resto
            indexOfA.forEach((v) => { 
                for(let i = 0; i < resto; i++){
                   if (v === i) aSuelta++;  //se cuentan las "a"
                }  
            });
            return console.log(indexOfA.length * div + aSuelta);
        }
    }
}
repeatedString(s, n);



// OTRA SOLUCION
function repeatedString3(s, n) {
    let c = 0,
        ca = 0,
        r = n % s.length;

    for(let i in s){
        if (s[i] === 'a') {
            c++;
            if (i < r) ca++;
        }
    }
    return console.log(((n - r) / s.length * c) + ca);
}
repeatedString3(s, n);