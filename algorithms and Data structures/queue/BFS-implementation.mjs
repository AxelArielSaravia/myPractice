import {Queue, DynamicQueue} from "./queue";
import {Graph} from "../graphs/graph";

//BREADTH FIRST SEARCH
//never visit a node twice !!



/**
 * @param {number} rootNode 
 * @param {number} targetNode 
 * @param {[number]} graph 
 * @returns 
 */
const BFS = (rootNode, targetNode, graph) => {
    let queue = new Queue();
    let visited = {};
    let step = 0;

    queue.enQueue(rootNode);
    visited[`${rootNode}`] = graph[rootNode];
    
    while (!queue.isEmpty()) {
        let size = queue.length;

        for (let i = 0; i < size; i++) {
            let cur = queue.head();

            if (cur === targetNode) return step;
            
            for (let node of graph[cur]) {
                if (!visited[`${node}`]) {
                    queue.enQueue(node);
                    visited[`${node}`] = graph[node];
                }
            }
            queue.deQueue();
        }
        step++;
    }
    return -1;
}

//EXAMPLE
//if the graph is type Array
let graph =  [[1,4,5], [0,3,4], [7], [1,4,6], [0,1,3,5], [0,4,6], [3,5,7], [2,6]];
// visual graph
/**
 *                      |--------|
 *                      |    |---0---|
 *                      |    |       |
 *                      | |--4-------1
 *                      | |  |       |
 *                      | |  |---3---|
 *                      | |  |   |
 *                      |-|--5   |   2
 *                           |   |   |
 *                           |---6---7
 *  
 */

let rootNode = 0;
let targetNode = 2;
let res = BFS(rootNode, targetNode, graph);
console.log(res)