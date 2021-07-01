'use strict'
/**
 * Convert the given number into a roman numeral.
 * All roman numerals answers should be provided in upper-case.
 * e.g. = convertToRoman(2) should return the string II.
 * convertToRoman(45) should return the string XLV.
 */
function convertToRoman(num) {
    const romanSimbols = {
      "M": 1000,
      "CM": 900,
      "D": 500,
      "CD": 400,
      'C': 100,
      "XC": 90,
      "L": 50,
      "XL": 40,
      "X": 10,
      "IX": 9,
      "V": 5,
      "IV": 4,
      "I": 1
    };
  
    let myNum = num;
    let str = '';
  
    for (let value of Object.keys(romanSimbols)) {
      if( myNum < romanSimbols[value] ) continue;
  
      let q = Math.floor(myNum / romanSimbols[value]);
      myNum -= q * romanSimbols[value];
      str += value.repeat(q);
  
      if( myNum < 1) break;
    }
    return str;
  }
  
  
  convertToRoman(36);