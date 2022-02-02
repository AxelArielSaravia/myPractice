import {DynamicQueue} from '../queue/queue.mjs'
import {DynamicStack} from '../stack/stack'

class Node {
    /**
     * @param {*} value 
     * @param {string | number} id 
     * @param {...Node} neighbors 
     */
    constructor(value, id, ...neighbors) {
        this.value = (value === undefined ? null : value);
        this.neighbors = new Map();

        Object.defineProperty(this, 'id', {enumerable: true, value: id});

        if (neighbors !== undefined && neighbors.length > 0) {
            this.link(...neighbors);
        }
    }

    /**
     * @param  {...Node} neighbors 
     * @returns {bool}
     */
    link(...neighbors) {  
        try {
            if (this.id !== undefined && neighbors !== undefined && neighbors.length > 0) {
                for (let neighbor of neighbors) {
                    if (neighbor.id !== undefined && !this.neighbors.has(neighbor.id)) {

                        this.neighbors.set(neighbor.id, neighbor);
                        neighbor.neighbors.set(this.id, this);
                    }
                }
                return true;
            }
            return false;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    /**
     * @param  {...Node} neighbors 
     * @returns {bool}
     */
    unlink(...neighbors) {
        try {
            if (this.id !== undefined && neighbors !== undefined && neighbors.length > 0) {
                for (let neighbor of neighbors) {
                    if (neighbor.id !== undefined && this.neighbors.has(neighbor.id)) {
                        this.neighbors.delete(neighbor.id);
                        neighbor.neighbors.delete(this.id);
                    }
                }
                return true;
            }
            return false;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    /**
     * @returns {Node}
     */
    copy() {
        let newNode = new Node(this.value, this.id);
        newNode.neighbor = new Map(this.neighbor);
        return newNode;
    }
}



class Graph {
    #id;
    #degree;
    #size;
    /**
     * @param  {...Node} nodes 
     */
    constructor(...nodes) {
        this.nodes = {};
        this.links = {};
        this.#degree = 0;
        this.#size = 0;
        this.#id = 0;

        if (nodes !== undefined && nodes.length > 0) {
            for (let node of nodes) {
                this.addNode(node);
            }
        }
    }

    get size() { return this.#size}
    get degree() { return this.#degree}

    /**
     * @param {*} value 
     * @param {string | number} name 
     * @param  {...string | number} neighbors 
     * @returns {bool}
     */
    createNode(value, name, ...neighbors) {
        try {
            if (name === undefined) {
                name = this.#id + "";
                this.#id++;
            }

            if (this.nodes[name] !== undefined) {
                this.nodes[name].value = value;
                return true;
            } else {
                this.nodes[name] = new Node(value, name);
            }

            if (neighbors !== undefined && neighbors.length > 0) {
                this.link(name, ...neighbors)
            }

            this.#size++;
            return true;

        } catch (err) {
            console.error(err);
            return false;
        }
    }

    /**
     * @param {Node} node 
     * @param  {...string | number} neighbors 
     * @returns {bool}
     */
    addNode(node, ...neighbors) {
        try{
            if (node !== undefined && node.id !== undefined) {
                
                if (this.nodes[node.id] !== undefined) {
                    this.nodes[node.id].val = node.value;
                } else {
                    this.nodes[node.id].val = node.value;
                    this.nodes[node.id].neighbors = new Map();
                    if (neighbors !== undefined && neighbors.length > 0)
                    this.link(node.id, ...neighbors);
                }
                return true
            }
        } catch (err) {
            console.error(err);
            return false;
        } 
    }

    /**
     * @param {number | string} node 
     * @param  {... number | string} linkNodes 
     * @returns {bool}
     */
    link(node, ...linkNodes) {
        if (node !== undefined && linkNodes.length > 0 && this.nodes[node] !== undefined) {
            let num = 0;

            for (let el of linkNodes) {
                if (this.nodes[el] === undefined) continue;

                this.nodes[node].link(this.nodes[el]);

                if (this.links[el] === undefined) this.links[el] = new Set();
                if (!this.links[el].has(node + "")) {
                    this.links[el].add(node + "");
                    num++;
                }

                if (this.links[node] === undefined) this.links[node] = new Set();
                if (!this.links[node].has(el + "")) this.links[node].add(el + "");
            }

            this.#degree += num;
            return true;
        }
    }

    /**
     * @param {number | string} node 
     * @param  {...number | string} unlinkNodes 
     * @returns {bool}
     */
    unlink(node, ...unlinkNodes) {
        if (node !== undefined && unlinkNodes.length > 0 && this.nodes[node] !== undefined) {
            let num = 0;

            for (let el of unlinkNodes) {
                if (this.nodes[el] === undefined) continue;

                this.nodes[node].unlink(this.nodes[el]);

                if (this.links[el] !== undefined && this.links[el].has(node + "")) {
                    this.links[el].delete(node + "");
                    num++;

                    if (this.links[el].size === 0) delete this.links[el];
                } 

                if (this.links[node] !== undefined && this.links[node].has(el + "")) {
                    this.links[node].delete(el + "");

                    if (this.links[node].size === 0) delete this.links[node];
                }
            }

            this.#degree -= num;
            return true;
        }
    }

    /**
     * @param  {...string | number} nodes 
     * @returns {bool}
     */
    delete(...nodes) {
        try {
            if (nodes !== undefined && this.nodes.length > 0) {
                for (let node of nodes) {
                    if (this.nodes[node] !== undefined) {
                        for (let [neighbor] of this.nodes[node].neighbors) {
                            this.unlink(node, neighbor);
                        }
                        delete this.nodes[node];
                        this.#size--;
                    }
                }
                return true;
            }
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    clean() {
        this.nodes = {};
        this.links = {};
        this.#degree = 0;
        this.#size = 0;
        this.#id = 0;
    }
} 


//Util Functions

//Use DynamicQueue class
/**
 * use BFS (breadth first search) algorithm.
 * @param {string | number} rootNode 
 * @param {string | number} targetNode 
 * @param {Graph} graph 
 * @returns {number}
 */
 const shortestPath = (rootNode, targetNode, graph) => {
    if (graph.nodes[rootNode] !== undefined && graph.nodes[targetNode] !== undefined) {

        let queue = new DynamicQueue(rootNode);
        let visited = new Set();
        let step = 0;

        visited.add(rootNode);
        stack.add(rootNode);
    
        while (!stack.isEmpty()) {
            let size = queue.length;

            for (let i = 0; i < size; i++) {
                let cur = queue.head;
    
                if (cur === targetNode) {
                    console.log(stack);
                    return step;
                };
    
                for (let [next] of graph.nodes[cur].neighbors) {
                    if (!visited.has(next)) {
                        queue.add(next);
                        visited.add(next);
                    }
                }
                queue.delete();
            }
            step++;
        }
    }
    return -1;
}

