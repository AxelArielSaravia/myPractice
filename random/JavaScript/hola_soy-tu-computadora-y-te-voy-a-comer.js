/*
* use in the browser
*/

var text = 'Hi, I am your computer, I want to eat you';

/**
 * @param {string} text 
 * @returns 
 */
var speak = (text) => speechSynthesis.speak(new SpeechSynthesisUtterance(text));

speak(text);