/**
 * create a random arbitrary number
 * @param {number} min the min number (real number) to the random interval
 * @param {number} max the max number (real number) to the random interval
 * @returns {number} a pseudo random integer number
 */
 function getRandomNum(min, max){
    try{
        if(typeof min !== 'number') throw new Error("min argument of getRandomArbitrary must be a number");
        if(typeof max !== 'number') throw new Error("max argument of getRandomArbitrary must be a number");
        
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    catch(err){
        console.error(err);
        return err;
    }
}


/**
 * Create a Palidrome
 * Dependes from getRandomNum() function
 * The deafult random Char values (in decimal) are [33, 126] (interval)
 * The deafult length of the crated Palindrome is [2, 100] (interval)
 * 
 * @param {number} charCodeStart - the min random value
 * @param {number} CharCodeEnd - the max random value
 * @param {number} maxLength - how large can be the palindrome (if is a odd number, the length will be always minor than the number)
 * @returns if no error return palindrome, else return undefined
 */
const getRandomPalindrome = (charCodeStart = 33, CharCodeEnd = 126, maxLength = 100) => {
    try {
        let arr = [];
        let revArr;
        let midLength = getRandomNum(1, Number.parseInt(maxLength/2));
        for (let i = 0; i < midLength; i++) {
            let randomCharCode = getRandomNum(charCodeStart, CharCodeEnd);
            arr[i] = String.fromCharCode(randomCharCode);
        }
        if (isEven(arr.length))
            revArr = arr.slice(0, arr.length).reverse();
        else 
            revArr = arr.slice(0, arr.length-1).reverse();

        return arr.join('') + revArr.join(''); 
    }
    catch (err) {
        console.log(err)
        return undefined;
    }
}

/**
 * Check if the palindrome is correct
 * @param {string | number | bigInt} n - is the palindrome
 * @returns a boolean or undefined if an error occur
 */
const isPalindrome = (n) => {
    try {
        if (n === undefined)
            throw new Error("the aragument is empty");
        if (typeof n !== 'string' && typeof n !== 'number' && typeof n !== 'bigInt')
            throw new Error("the aragument is not a string or a number or a bigInt");

        n = n.toString();
        let reverseN = n.split('').reverse().join('');
        return (n === reverseN);

    }
    catch (err) {
        console.log(err);
        return undefined;
    }
}