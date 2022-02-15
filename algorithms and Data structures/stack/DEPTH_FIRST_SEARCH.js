import {DynamicStack} from "./stack";


const ProjectName = "DEAPT FIRST SEARCH";

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

/**
 * WITH RECURSION 
 */ 

/* GO THROUGH ALL NODES*/
/* This examples do nothing, are demostratives*/

const DEAPT_FIRST_SEARCH = (currentNode, visited = {}) => {

    //Do something to finish de recursion

    for (let nextNode of currentNode) {
        if (visited[`${nextNode.name}`] === undefined) {
            visited[`${nextNode.name}`] = nextNode;
            DEAPT_FIRST_SEARCH(nextNode, visited);
        }
    }
    return /*something */ "We go through all nodes";
}


//Example
const DFS = (currentNode, graph, visited = (new Set())) => {

    for (let node of graph[currentNode]) {

        if (!visited.has(node)) {
            visited.add(node);

            console.log(visited);

            DFS(node, graph, visited);
        }
    }
    return /*something */ "We go through all nodes";
}

let res1 = DFS(0, graph);
console.log(res1);

//Example
//Count Steps from rootNode to targetNode
//Is not the shortes path (view BFS instead)
const DFS_CountSteps = (currentNode, targetNode, graph, visited = (new Set()), steps = 1) => {
    for (let node of graph[currentNode]) {
        //stop the recursion
        if (node === targetNode) return {found: true, step: (steps+1),  path: (visited.add(node))};

        if (!visited.has(node)) {
            visited.add(node);

            let {found, step, path} = DFS_CountSteps(node, targetNode, graph, visited, steps + 1); 
            
            if (found === true) {
                //return all
                return {found, step, path};
            }
        }
    }
    return {found: false, step: -1, path: visited};
}

let res2 = DFS_CountSteps(0, 2, graph);
console.log(res2);



/**
 * WITH out RECURSION 
 */ 
/* GO THROUGH ALL NODES*/
/* This examples do nothing, are demostratives*/

//Stack is an array
const DEAPT_FIRST_SEARCH_IMPERATIVE_1 = (rootNode) => {
    const stack = [rootNode];
    const visited = new Set();

    while (stack.length !== 0) {
        let currentNode = stack[stack.length-1];

        for (let i = 0; i < graph[currentNode].length; i++) {
            let nextNode = graph[currentNode][i];
            
            if (!visited.has(nextNode)) {
                visited.add(nextNode);
                stack.push(nextNode);
                
                i = -1;
                currentNode = stack[stack.length-1];
            }
        }
        stack.pop();
    }
    return /*something */ "We go through all nodes";
}

//Stack is an DynamicStack
const DEAPT_FIRST_SEARCH_IMPERATIVE_2 = (rootNode) => {
    const stack = new DynamicStack();
    const visited = new Set();

    stack.push(rootNode);

    while (!stack.isEmpty()) {
        let currentNode = stack.top;

        for (let i = 0; i < graph[currentNode].length; i++) {
            let nextNode = graph[currentNode][i];
            if (!visited.has(nextNode)) {
                visited.add(nextNode);
                stack.push(nextNode);
                
                i = -1;
                currentNode = stack[stack.length-1];
            }
        }
        stack.pop();
    }
    return /*something */ "We go through all nodes";
}


//Example
const DFS_IMPERATIVE = (rootNode, graph) => {
    const stack = [rootNode];
    const visited = new Set();

    while (stack.length !== 0) {
        let currentNode = stack[stack.length-1]
        
        for (let i = 0; i < graph[currentNode].length; i++) {
            let nextNode = graph[currentNode][i];
            if (!visited.has(nextNode)) {
                visited.add(nextNode);
                stack.push(nextNode);
                
                i = -1;
                currentNode = stack[stack.length-1];
            }
        }
        stack.pop();
    }
    return /*something */ "We go through all nodes";
}
let res3 = DFS_IMPERATIVE(0, graph);
console.log(res3);


//Example
//Count Steps from rootNode to targetNode
//Is not the shortes path (view BFS instead)
const DFS_IMPERATIVE_CountSteps = (currentNode, targetNode, graph) => {
    const stack = [currentNode];
    const visited = new Set();
    let steps = 1;

    while (stack.length !== 0) {

        let currentNode = stack[stack.length-1]
        
        for (let i = 0; i < graph[currentNode].length; i++) {
            let nextNode = graph[currentNode][i];
            
            if (!visited.has(nextNode)) {
                visited.add(nextNode);
                stack.push(nextNode);
                steps++;
                
                if (nextNode === targetNode) {
                    return {found: true, steps, path: visited}
                }
                
                i = -1;
                currentNode = stack[stack.length-1];
            }
        }
        stack.pop();
        steps--;
    }
    return {found: false, steps: -1, path: visited};
}

let res4 = DFS_IMPERATIVE_CountSteps(0, 2, graph);
console.log(res4);