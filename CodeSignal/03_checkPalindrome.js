/* checkPalindrome */

/* 
Given the string, check if it is a palindrome.
*/

function checkPalindrome(inputString) {
    if( typeof inputString !== 'string') return Error('the argument is not a string');
    let s = inputString,
        sLastIndex = inputString.length - 1;
        
    //recusion in the string
    //BASIC CASE
    return s.length === 0 ? true 
    : s.length === 1 ? true
    //RECUSION CASE
    : s.endsWith( s[0] ) &&  checkPalindrome( s.slice(1, sLastIndex) );
}
