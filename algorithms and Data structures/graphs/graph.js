
class Graph {
  #VERTICES;
  #IS_DIRECTED;
  #ADJ_LIST;
  constructor(isDirected = false) {
    this.#IS_DIRECTED = isDirected;
    this.#VERTICES = new Set();
    this.#ADJ_LIST = new Map();
  }

  get isDirected() { return this.#IS_DIRECTED }
  get vertices() { return this.#VERTICES }
  get adjList() { return this.#ADJ_LIST }
  
  hasVertex(v) { return this.#VERTICES.has(v) }

  getVertex(v) { return this.hasVertex(v) ?  `${v} -> ${[...this.#ADJ_LIST.get(v)].join(" ")}` : undefined }

  addVertex(v) {
    if (this.hasVertex(v)) return;
    this.#VERTICES.add(v);
    this.#ADJ_LIST.set(v, new Set());
  }

  addEdge(v, w) {
    if (!this.hasVertex(v)) this.addVertex(v);
    if (!this.hasVertex(w)) this.addVertex(w);
    this.#ADJ_LIST.get(v).add(w);
    if (!this.isDirected) this.#ADJ_LIST.get(w).add(v);
  }

  deleteVertex(v) {
    if (this.hasVertex(v)) {
      this.#ADJ_LIST.get(v).forEach(element => {
        this.deleteEdge(element, v, true);
      });
      this.#ADJ_LIST.delete(v);
      this.#VERTICES.delete(v);
    }
  }

  deleteEdge(v, w, isDirected = false) {
    if (this.hasVertex(v) && this.hasVertex(w)) {
      this.#ADJ_LIST.get(v).delete(w);
      
      if (!this.isDirected && !isDirected) {
        this.#ADJ_LIST.get(w).delete(v);
      }
    }
  }

  clear() {
    this.#VERTICES = new Set();
    this.#ADJ_LIST = new Map();
  }

  toString() {
    let s = "";
    for (let vertex of this.#VERTICES) {
      s += vertex + " -> ";
      s +=[...this.#ADJ_LIST.get(vertex)].join(" ");
      s += "\n";
    }
    return s;
  }
}


const COLOR = { WHITE: 0, GREY: 1, BLACK: 2 } 
const initializeColor = vertices => {
  const color = {};
  vertices.forEach( v => { color[v] = COLOR.WHITE });
  return color;
}

const BFS = (graph, startVertex) => {
  const vertices = graph.vertices;
  const adjList = graph.adjList;
  const color = initializeColor(vertices);
  const queue = [startVertex];
  const distances = {};
  const predecessors = {};
  
  vertices.forEach(v => {
    distances[v] = 0;
    predecessors[v] = null;
  });

  while (queue.length !== 0) {
    const u = queue.shift();
    const neighbor = adjList.get(u);
    color[u] = COLOR.GREY;
    neighbor.forEach(n => {
      if (color[n] === COLOR.WHITE) {
        color[n] = COLOR.GREY;
        distances[n] = distances[u] + 1;
        predecessors[n] = u;
        queue.push(n);
      }
    });
    color[u] = COLOR.BLACK;
  }
  return { distances, predecessors }; 
}

const DFS = graph => {
  const vertices = graph.vertices;
  const adjList = graph.adjList;
  const color = initializeColor(vertices);
  const discovery = {};
  const finished = {};
  const predecessors = {};
  const time = { count: 0 };
  
  vertices.forEach(v => {
    finished[v] = 0;
    discovery[v] = 0;
    predecessors[v] = null;
  });

  vertices.forEach(v => {
    if (color[v] === COLOR.WHITE) 
      DFSVisit(v, color, discovery, finished, predecessors, time, adjList);
  });
  return { discovery, finished, predecessors }
}

const DFSVisit = (u, color, d, f, p, time, adjList) => {
  color[u] = COLOR.GREY;
  d[u] = ++time.count;
  const neighbors = adjList.get(u);
  neighbors.forEach(n => {
    if (color[n] === COLOR.WHITE) {
      p[n] = u;
      DFSVisit(n, color, d, f, p, time, adjList);
    }
  });
  color[u] = COLOR.BLACK;
  f[u] = ++time.count;
} 


const graph = new Graph();
const myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

for (let i = 0; i < myVertices.length; graph.addVertex(myVertices[i++]));

console.log(graph);
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');

let bfs = BFS(graph, "A");
console.log(bfs);

let dfs = DFS(graph);
console.log(dfs);

const graph2 = new Graph(true);
const myVertices2 = ["A", "B", "C", "D", "E", "F"];
myVertices2.forEach(v => graph.addVertex(v));
graph2.addEdge('A', 'C');
graph2.addEdge('A', 'D');
graph2.addEdge('B', 'D');
graph2.addEdge('B', 'E');
graph2.addEdge('C', 'F');
graph2.addEdge('F', 'E');
const result = DFS(graph2);
console.log(result);

const fTimes = result.finished;
let s = "";
for (let x of myVertices2) {
  let max = 0;
  let maxName = null;
  myVertices2.forEach(v => {
    if (fTimes[v] > max) {
      max = fTimes[v];
      maxName = v;
    }
  });
  s += " - " + maxName;
  delete fTimes[maxName];
} 
console.log(s);
