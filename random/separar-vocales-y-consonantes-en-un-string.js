
const s = 'javascriptloops';


//separa y muestra en consola las letras 
function vowelsAndConsonants(s) {
    let vowels = 'aeiou'
    let consonant = ''
    for (let letters of s) {
        if (vowels.includes(letters)) console.log(letters);
        else consonant += letters + '\n'
    }
    console.log(consonant);
}
vowelsAndConsonants(s)


//otra forma de resolverlo
/*
*/
function vowelsAndConsonants2(s) {
    const vowels = [];
    const consonants = [];

    s.split('').forEach(function(o) {
     if (['a','e','i','o','u'].indexOf(o) != -1) {
      vowels.push(o);
     } else {
      consonants.push(o);
     }
    })

    console.log(vowels.join('\n'));
    console.log(consonants.join('\n'));
}
vowelsAndConsonants2(s)




//respuesta:
//         muestra primero las vocales en orden de aparicion
//         y despues las consonantes en orden de aparicion      
/* 
* a
* a
* i
* o
* o
* j
* v
* s
* c
* r
* p
* t
* l
* p
* s
*/
