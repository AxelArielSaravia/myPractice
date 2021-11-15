/* matrixElementsSum */
/* 
Given matrix, a rectangular matrix of integers, where each value represents the cost of the room, 
your task is to return the total sum of all rooms that are suitable for the CodeBots 
(ie: add up all the values that don't appear below a 0).

matrix = [[0, 1, 1, 2], 
          [0, 5, 0, 0], 
          [2, 0, 3, 3]]
your output must be: 9
*/

function matrixElementsSum(matrix) {

    let sum = 0;
    let _continue = [];
  
    for( let i = 0; i < matrix.length; i++ ){
  
      for (let j = 0; j < matrix[i].length; j++){
  
        if( _continue.includes(j) ) continue;
  
        if( i !== matrix.length-1 ){
          if( matrix[i][j] === 0 ) _continue.push(j)
        }
        sum += matrix[i][j];
      }
    }
    return sum;
  }
  
  let matrix =  [[0,1,2,3],
                 [0,2,0,4],
                 [2,0,1,0]
                ] //12
  
  console.log( matrixElementsSum(matrix) );