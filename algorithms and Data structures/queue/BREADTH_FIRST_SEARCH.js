import { NodeQueue } from "./queue";

const ProjectName = "BREADTH FIRST SEARCH";

/**
 * Better for Trees and derivatives
 * (if you use a graph see bellow NEVER VISITE NODE TWISE)
 */ 


/* GO THROUGH ALL NODES */
/* This examples do nothing, are demostratives */

//Queue is array
const BREADTH_FIRST_SEARCH = (rootNode) => {
    let queue = [rootNode];

    while (queue.length !== 0) {
        let head = queue.shift(); //delete the first element of the queue and return it
        
        //do somthing here 
        
        for (let child of head) {
            queue.push(child)
        } 
    }
    return /*something */ "We go through all nodes";
}

//Queue is NodeQueue 
const BREADTH_FIRST_SEARCH2 = (rootNode) => {
    let queue = new NodeQueue();
    queue.add(rootNode);
    
    while (!queue.isEmpty()) {
        let head = queue.head;
        
        //do somthing here 

        for (let child of head) {
            queue.add(child)
        } 
        queue.delete();
    }
    return /*something */ "We go through all nodes";
}

 /*
 * Better for Graphs
 */ 

/* GO THROUGH ALL NODES and*/
/* NEVER VISITE NODE TWISE */
/* This examples do nothing, are demostratives*/

//Queue is an array
const BREADTH_FIRST_SEARCH_NVNT = (rootNode) => {
    let queue = [rootNode];
    let visited = {};

    visited[`${rootNode.name}`] = rootNode;

    while (queue.length !== 0) {
        let head = queue.shift(); //delete the first element of the queue and return it
        
        //do somthing here 

        for (let node of head) {

            if (!visited[`${node.name}`]) {
                queue.push(node);
                visited[`${node.name}`] = node;
            }
        }
    }
    return /*something */ "We go through all nodes";
}

//Queue is a NodeQueue 
const BREADTH_FIRST_SEARCH_NVNT2 = (rootNode) => {
    let queue = new NodeQueue();
    let visited = {};
    
    queue.add(rootNode);
    visited[`${rootNode.name}`] = rootNode;


    while (!queue.isEmpty()) {
        let head = queue.head;
        
        //do somthing here 

        for (let node of head) {

            if (!visited[`${node.name}`]) {
                queue.push(node);
                visited[`${node.name}`] = node;
            }
            queue.add(node)
        } 
        queue.delete();
    }
    return /*something */ "We go through all nodes";
}