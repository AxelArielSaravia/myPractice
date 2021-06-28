/**
 *
Programa una clase llamada Pelicula.

La clase recibirá un objeto al momento de instanciarse con los siguentes datos: 
id de la película en IMDB, titulo, director, año de estreno, país o países de origen, géneros y calificación en IMBD.

  - Todos los datos del objeto son obligatorios.
    - Valida que el id IMDB tenga 9 caracteres, los primeros 2 sean letras y los 7 restantes números.
    - Valida que el título no rebase los 100 caracteres.
    - Valida que el director no rebase los 50 caracteres.
    - Valida que el año de estreno sea un número entero de 4 dígitos.
    - Valida que el país o paises sea introducidos en forma de arreglo.
    - Valida que los géneros sean introducidos en forma de arreglo.
    - Valida que los géneros introducidos esten dentro de los géneros aceptados*.
    - Crea un método estático que devuelva los géneros aceptados*.
    - Valida que la calificación sea un número entre 0 y 10 pudiendo ser decimal de una posición.
    - Crea un método que devuelva toda la ficha técnica de la película.
    - Apartir de un arreglo con la información de 3 películas genera 3 
      instancias de la clase de forma automatizada e imprime la ficha técnica 
      de cada película.

* Géneros Aceptados: Action, Adult, Adventure, Animation, Biography, Comedy, 
* Crime, Documentary ,Drama, Family, Fantasy, Film Noir, Game-Show, History, Horror, 
* Musical, Music, Mystery, News, Reality-TV, Romance, Sci-Fi, Short, Sport, Talk-Show, Thriller, War, Western.
*/


class Pelicula {
  constructor({IMDB_id, titulo, director, estreno, pais, generos, IMDB_clasificacion}){
      this.IMDB_id = IMDB_id;
      this.titulo = titulo;
      this.director = director;
      this.estreno = estreno;
      this.pais = pais;
      this.generos = generos;
      this.IMDB_clasificacion = IMDB_clasificacion;

      //VALIDACIONES
      this.validacionesDeString(IMDB_id, titulo, director, estreno, IMDB_clasificacion);
      this.validacionesDeArray(pais, generos);
  }
  
  /*
  ********* Obtener los GENEROS validos (segun IMDB) *********
  */
  static get getListaGenerosAceptados(){
    return [
      "Action", "Adult", "Adventure", "Animation", 
      "Biography", 
      "Comedy", "Crime", 
      "Documentary" ,"Drama", 
      "Family", "Fantasy", "Film Noir", 
      "Game-Show", 
      "History", "Horror", 
      "Musical", "Music", "Mystery", 
      "News", 
      "Reality-TV", "Romance", 
      "Sci-Fi", "Short", "Sport", 
      "Talk-Show", "Thriller", 
      "War", "Western"
    ];
  }
  static generosAceptados(){
    return console.info(`Los género aceptados son:\n${Pelicula.getListaGenerosAceptados.join(', ')}`);
  }
  
  /*
  *
  ********* VALIDAR ENTRADAS EN STRING (IMDB_id, titulo, director, estreno, IMDB_clasificacion)*********
  */
  validarString(propiedad, valor){
    if (valor === undefined) console.error(`"${propiedad}" es una propiedad obligatoria`); //define a cada propiedad como obligatoria
    else if (typeof valor !== 'string') console.error(`"${valor}" en "${propiedad}" no es un String`);//avisa si el dato no es un string
    else if(!valor) console.warn(`"El valor de "${propiedad}" está vacio`);//avisa si el estupido dejo un valor vacio
    else return true;
  }

  /*
  *
  ********* Propiedades (string) a validar *********
  */
  validacionesDeString(IMDB_id, titulo, director, estreno, IMDB_clasificacion){
    let porpiedades = {IMDB_id, titulo, director, estreno, IMDB_clasificacion}; //tengo mis dudas sobre esto tt (recursos utilizados)

    /** 
    *Expresiones regulares para validar el valor de cada propiedad
    *(podria haberlo hecho con otro metodo en vez de usar expReg)
    */
    let expIMDB_id = /^([a-z]){2}([0-9]){7}$/;
    let expTitulo = /^.{1,100}$/;
    let expDirector = /^.{1,50}$/;
    let expEstreno = /^\d{4}$/;
    let expIMDB_clasificacion = /^\d((?<=1)0)?((?<=\d)(\.\d))?$/; //revisar!!!! CREO QUE ESTA BIEN
        //el primer numero es de 0-9; 0 solo puede aparecer despues de 1 (para formar 10);y ".[0-9]" solo puede aparecer despues de 0-9 (no de 10)

    /*
    *Validaciones propiamente dichas
    */
    for(let v in porpiedades){
      if(this.validarString(v, porpiedades[v])){ //llama a validar si es STRING
        
        if(v === "IMDB_id" && !expIMDB_id.test(porpiedades[v])){     //IMDB_id
          console.error(`${v} "${porpiedades[v]}" no es valido`);
          console.warn(`El ${v} debe tener 2 letras y 7 números`);
        }
        if(v === "titulo" && !expTitulo.test(porpiedades[v])){       //titulo  
         console.error(`El ${v} "${porpiedades[v]}" no es valido`);
         console.warn(`El ${v} debe tener de 1 a 100 caracteres`);
        }
        if(v === "director" && !expDirector.test(porpiedades[v])){   //director
          console.error(`El ${v} "${porpiedades[v]}" no es valido`);
          console.warn(`El ${v} debe tener de 1 a 50 caracteres`);
        }
        if(v === "estreno" && !expEstreno.test(porpiedades[v])){     //estreno
          console.error(`${v} "${porpiedades[v]}" no es valido`);
          console.warn(`El año de ${v} debe tener 4 números`);
        }
        if(v === "IMDB_clasificacion" && !expIMDB_clasificacion.test(porpiedades[v])){  //IMDB_clasificacion
          console.error(`${v} "${porpiedades[v]}" no es valido`);
          console.warn(`La ${v} debe ser en un rango del 0-10`);
        }
      }
    }
  }

  /*
  *
  ********* VALIDAR ENTRADAS EN ARRAY (pais, generos) *********
  */
  validarArray(propiedad, arr){
    if (arr === undefined) console.error(`"${propiedad}" es una propiedad obligatoria`);//define a cada propiedad como obligatoria
    else if(!(arr instanceof Array)) console.error(`"${arr}" en "${propiedad}" no es un Array`);//avisa si el dato no es un string
    else if (arr.length === 0) console.warn(`"El valor de "${propiedad}" está vacio`);//avisa si el estupido dejo un valor vacio
    else{
      for (let s of arr) {
        if (typeof s !== 'string') return console.error(`El valor ${s}, indice ${arr.indexOf(s)}, de "${propiedad}" no es un string`);//revisa que los elementos del array sean STRINGS
      }
      return true;
    }
  }
  /*
  *
  ********* Propiedades (array) a validar *********
  */
  validacionesDeArray(pais, generos){
    let porpiedades = {pais, generos};
    
    //Expresion regular para validar los valores de Pais
    let expPais = /^[A-Z][a-zA-Z][ a-zA-Z]*$/;

    /*
    *Validaciones propiamente dichas
    */
    for(let v in porpiedades){
      if(this.validarArray(v, porpiedades[v])){ //llama a validar si es ARRAY

        if (v === "pais"){//valida los valores de PAIS
          for(let vv of porpiedades[v]){
            if (!expPais.test(vv)) console.error(`El País "${vv}" no es valido`);
          }
        }

        if(v === "generos"){//SOLO PARA GENEROS
          for(let vv of porpiedades[v]){
            if(!Pelicula.getListaGenerosAceptados.includes(vv)){ //si el genero no esta incluido en los generos aceptados
              console.error(`El género "${vv}" no es aceptado`);
              Pelicula.generosAceptados()
            }
          }
        }
      }
    } 
  }

  /*
  ********* FICHA TECNICA*********
  */
  fichaTecnica(){
    return console.info(
    `Ficha Técnica:
    IMDB_id: ${this.IMDB_id}
    Título: ${this.titulo}
    Director: ${this.director}
    Estreno: ${this.estreno}
    País: ${this.pais.join(', ')}
    Géneros: ${this.generos.join(', ')}
    IMDB_clasificación: ${this.IMDB_clasificacion}`);
  }
}



/**
 * Array con la info de tres peliculas
 */ 

const arrPeliculas = [{
  IMDB_id: "tt0319061",
  titulo: "Big Fish",
  director: "Tim Burton",
  estreno: "2004",
  pais: ["USA"],
  generos: ["Adventure","Drama","Fantasy"],
  IMDB_clasificacion: "8.0"
},{
  IMDB_id: "tt0079470",
  titulo: "Monty Python's Life of Brian",
  director: "Terry Jones",
  estreno: "1979",
  pais: ["UK"],
  generos: ["Comedy"],
  IMDB_clasificacion: "8.1"
},{
  IMDB_id: "tt0245429",
  titulo: "Sen to Chihiro no kamikakushi",
  director: "Hayao Miyazaki",
  estreno: "2003",
  pais: ["Japan","USA"],
  generos: ["Animation", "Adventure", "Family"],
  IMDB_clasificacion: "8.6"
}];



/**
 * CREA PELICULAS SEGUN LA LONGITUD DEL ARRAY arrPeliculas.
 * muesta la ficha tecnica en consola
 */
arrPeliculas.forEach(i => new Pelicula(i).fichaTecnica());