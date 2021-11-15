/*Crear una clase Polygon; el constructor adquiere un array de el valor de los lados;
* crear un metodo perimeter() que devuelve el perimetro del poligono
*/

class Polygon {
    constructor(lengths){
        this.lengths = lengths;
    }

    perimeter(){
        let values = 0;
        this.lengths.forEach(function(o) {values += o})
        return values
    }
}

const rectangle = new Polygon([10, 20, 10, 20]);
const square = new Polygon([10, 10, 10, 10]);

console.log(rectangle.perimeter());
console.log(square.perimeter());



//Otra forma
class Polygon2{
    constructor(sides){        
        this.sides = sides
    }
    perimeter() {
        return this.sides.reduce((a,b) => {return a+b})
    } 
}

const pentagon = new Polygon2([10, 20, 30, 40, 43]);
console.log(pentagon.perimeter());