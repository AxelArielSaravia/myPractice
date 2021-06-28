/* 
***** EXPRESIONES REGULARES 2 *****
el string tiene que empezar con Mr.,Mrs.,Ms.,Dr. o Er.
y despues pueden venir de una o mas letras en minuscula o mayuscula
*/


let text = 'Mr.Akk'

let res = /^(?:Mr|Mrs|Dr|Er)\.[a-zA-Z]+$/;
//(?:) grupo de NO captura 

console.log(text.match(res));

const re = /^(Mr?s|[MDE]r)\.[A-Za-z]+$/;

