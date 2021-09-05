/* 
***** EXPRESIONES REGULARES 1 *****
selecionar solo los string que empiecen y terminen con la "misma" vocal 
(si empiezan o terminan con consonantes = false)
*/




let s = 'asdasd'
function regexVar() {
    /*
     * Declare a RegExp object variable named 're'
     * It must match a string that starts and ends with the same vowel (i.e., {a, e, i, o, u})
     */
    let re = /^([aeiou]).*\1$/
    return re
    /*
     * Do not remove the return statement
     */

}
regexVar()






// OTRA OPCION 

let s1 = 'ecda';

function regexVar2(s1) {

    let res = s1.split('');
    let resinv = s1.split('').reverse();
    let vowels = 'aeiou';

    if (res[0] == resinv[0]){
        if (vowels.includes(res[0])){
            console.log('true');
        }
    }else console.log('false');
}

regexVar2(s1);