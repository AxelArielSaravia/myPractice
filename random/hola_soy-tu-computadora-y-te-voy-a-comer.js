/**
 * use in the browser
 */

console.log(window);
console.log(document);

var texto = 'Hi, I am your computer, I want to eat you';

var hablar = ( function(texto){ return speechSynthesis.speak(new SpeechSynthesisUtterance(texto))});

hablar(texto);