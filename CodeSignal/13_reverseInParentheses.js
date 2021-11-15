/* reverseInParentheses */
/* 
     Write a function that reverses characters in (possibly nested) parentheses in the input string.
     Input strings will always be well-formed with matching ()s.
*/
/**
 * Remove the parenthesis of an string and reverse strings that was in the parenthesis
 * @param {string} inputString - string with parenthesis (or withour parenthesis)
 * @returns {string}
 */
function reverseInParentheses(inputString) {
     let _string = inputString
     
     //RECURSIVE CASE
     if ( /\(\w*\)/.test(_string) ){
          let regex = /\(\w*\)/;
          let str1 = _string.match(regex)[0].slice(1, -1).split("").reverse().join("");
          let strReplace = _string.replace(regex, str1);

          return reverseInParentheses(strReplace);
     }
     //BASE CASE
     else return _string;
}

let a = "(bar)",
     b = "abc(abc)abc(abc)"
     c = "foo(bar)baz",
     d = "abc(abc(abc))abc";

console.log(reverseInParentheses(a));
console.log(reverseInParentheses(b));
console.log(reverseInParentheses(c));
console.log(reverseInParentheses(d));