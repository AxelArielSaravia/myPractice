
function Node(value = null, next) {
  this.value = value;
  this.next = Node.isNode(next) ? next : null;
}

Node.isNode = (node) => (
  typeof node === 'object' &&
  node !== null &&
  Object.is(Object.getPrototypeOf(node), Node.prototype) 
);



class DoublyNode {
  static isDOublyNode = (DNode) => (
    typeof DNode === 'object' &&
    DNode !== null &&
    Object.is(Object.getPrototypeOf(DNode), DoublyNode.prototype) 
  );
  constructor (value = null, next, prev) {
    this.value = value;
    this.next = DoublyNode.isDOublyNode(next) ? next : null;
    this.prev = DoublyNode.isDOublyNode(prev) ? prev : null;
  }
}



class TreeNode {
  static isTreeNode = (node) => (
    typeof node === "object" && node !== null && Object.is(Object.getPrototypeOf(node), TreeNode.prototype)
  );

  constructor(value, left, right) {
    this.value = value;
    this.left = TreeNode.isTreeNode(left) ? left : null;
    this.right = TreeNode.isTreeNode(right) ? left : null;
  }
}



class RedBlackNode extends TreeNode {
  static #RED = Symbol("RED");
  static #BLACK = Symbol("BLACK");

  static get BLACK() { return RedBlackNode.#BLACK};
  static get RED() {return RedBlackNode.#RED };

  static isRedBackNode = (node) => (
    typeof node === "object" && node !== null && Object.is(Object.getPrototypeOf(node), RedBlackNode.prototype)
  );
  static isColor = (color) => color === RedBlackNode.BLACK || color === RedBlackNode.RED;
  
  constructor(value, left, right, color, parent) {
    super(value);
    super.left = RedBlackNode.isRedBackNode(left) ? left : null;
    super.right = RedBlackNode.isRedBackNode(right) ? left : null;
    this.color = RedBlackNode.isColor(color) ? color : RedBlackNode.RED;
    this.parent = RedBlackNode.isRedBackNode(parent) ? parent : null;
  }
  isRed = () => this.color === RedBlackNode.RED;
  isBlack = () => this.color === RedBlackNode.BLACK;
}


export {Node, DoublyNode, TreeNode, RedBlackNode}