

//Example 
//Count Steps from rootNode to targetNode
//The shortes path
const BFS_TheShortesPath_CountSteps = (rootNode, val) => {
  let queue = [rootNode];
  let steps = 1;

  while (queue.length !== 0) {

      for (let i = 0; i < queue.length; i++) {
          
          let currentNode = queue.shift(); //delete the first element of the queue and return it

          //when the currentNode is the same as targetNode finish
          //finish the while and return steps
          if (currentNode.val === val) return steps;
          
          for (let child of currentNode.nodes) {
              queue.push(child)
          }
      }
      steps++;
  }
  return -1;
}

let tree =  {
  val: 0,
  nodes: [{
      val:1,
      nodes: [{
          val:3,
          nodes: [{
              val:5,
              nodes: []
          }]
      },{
          val:4,
          nodes: [{
              val:6,
              nodes: []
          }]
      }]
  },{
      val:2,
      nodes: [{
          val:4,
          nodes: [{
              val:7,
              nodes: [{
                  val:6,
                  nodes: []
              }]
          },{
              val:8,
              nodes: []
          }]
      }]
  }]
}

let res1 = BFS_TheShortesPath_CountSteps(tree, 6);
console.log(res1);




//Example 
//Count Steps from rootNode to targetNode
//The shortes path
/**
 * @param {number} rootNode 
 * @param {number} targetNode 
 * @param {[number]} graph 
 * @returns 
 */
 const BFS_NVNT_TheShortesPath_CountSteps = (rootNode, targetNode, graph) => {
  let queue = [rootNode];
  let visited = new Set();
  let step = 0;

  visited.add(rootNode);
  
  while (queue.length !== 0) {
      for (let i = 0; i < queue.length; i++) {
          let currenNode = queue.shift();//delete the first element of the queue and return it

          if (currenNode === targetNode) return step;
          
          for (let node of graph[currenNode]) {
              if (!visited.has(node)) {
                  queue.push(node);
                  visited.add(node);
              }
          }
      }
      step++;
  }
  return -1;
}

//the graph is type Array
// visual graph
/**
 *    |--------|
 *    |    |---0---|
 *    |    |       |
 *    | |--4-------1
 *    | |  |       |
 *    | |  |---3---|
 *    | |  |   |
 *    |-|--5   |   2
 *         |   |   |
 *         |---6---7
 */

let graph =  [
  [1,4,5],    /*0: 1 4 5*/
  [0,3,4],    /*1: 0 3 4*/
  [7],        /*2: 7*/
  [1,4,6],    /*3: 1 4 6*/
  [0,1,3,5],  /*4: 0 1 3 5*/
  [0,4,6],    /*5: 0 4 6*/
  [3,5,7],    /*6: 3 5 7*/
  [2,6]       /*7: 2 6*/
];
let rootNode = 0;
let targetNode = 2;
let res2 = BFS_NVNT_TheShortesPath_CountSteps(rootNode, targetNode, graph);
console.log(res2);