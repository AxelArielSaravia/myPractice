import { TreeNode } from "../nodes/nodes.js";

class BinarySearchTree {

  static insertNode(treeNode, value) {
    if (treeNode == null || treeNode.value === value) return;
    let side = value < treeNode.value ? "left" : "right";
    let node = treeNode;
    while (node[side] !== null) {
      node = node[side];

      if (node.value === value) return;

      side = value < node.value ? "left" : "right";
    }
    node[side] = new TreeNode(value);
  }

  static inOrderTraverseNode(treeNode, cb) {
    if (node === null) return;
    BinarySearchTree.inOrderTraverseNode(treeNode.left, cb);
    cb(treeNode.value);
    BinarySearchTree.inOrderTraverseNode(treeNode.right, cb);
  }

  static preOrderTraverseNode(treeNode, cb) {
    if (node === null) return;
    cb(treeNode.value);
    BinarySearchTree.preOrderTraverseNode(treeNode.left, cb);
    BinarySearchTree.preOrderTraverseNode(treeNode.right, cb);
  }

  static postOrderTraverseNode(treeNode, cb) {
    if (node === null) return;
    BinarySearchTree.postOrderTraverseNode(treeNode.left, cb);
    BinarySearchTree.postOrderTraverseNode(treeNode.right, cb);
    cb(treeNode.value);
  }

  static minNode(treeNode) {
    if (treeNode == null) return undefined; 
    let curr = treeNode;
    while (curr.left !== null) curr = curr.left;
    return curr;
  }

  static maxNode(treeNode) {
    if (treeNode == null) return undefined; 
    let curr = treeNode;
    while (curr.right !== null) curr = curr.right;
    return curr; 
  }

  static searchNode(treeNode, value) {
    let node = treeNode;
    while (node != null && value !== node.value) {
      node = value < node.value ? node.left : node.right;
    }
    return node != null && value === node.value;
  }

  static removeNode(treeNode, value) {
    if (treeNode == null) return null;
    //recursive form:
    if (value < treeNode.value) {
      treeNode.left = BinarySearchTree.removeNode(treeNode.left, value);
      return treeNode;
    } else if (value > treeNode.value) {
      treeNode.right = BinarySearchTree.removeNode(treeNode.left);
      return treeNode;
    } else {
      if (treeNode.left == null && treeNode.right == null) return null;
      else if (treeNode.left == null) return treeNode.right;
      else if (treeNode.right == null) return treeNode.left;
      else {
        const aux = BinarySearchTree.minNode(treeNode.right);
        treeNode.value = aux.value;
        treeNode.right = BinarySearchTree.removeNode(treeNode.right, aux.value);
        return treeNode;
      }
    }
    //imperative form:
    /* 
    let node = new TreeNode(null, treeNode);
    let side = "left";
    while (node[side] != null && value !== node[side].value) {
      node = node[side]; 
      side = value < node.value ? "left" : "right";
    }
    if (node[side] == null) return treeNode;
    
    if (node[side].left == null && node[side].right == null) {
      node[side] = null;
    } else if (node[side].left == null) {
      node[side] = node[side] .right;
    } else if (node[side].right == null) {
      node[side] = node[side].left;
    } else {
      const aux = BinarySearchTree.minNode(node[side].right);
      node[side].value = aux.value;
      node[side].right = BinarySearchTree.removeNode(node[side].right, aux.value);
    }
    node = null;
    return treeNode;   
    */
  } 

  constructor(value) {
    this.root = value !== undefined ? new TreeNode(value) : null;
  }

  insert(val) {
    if (this.root === null) {
      this.root = new TreeNode(val);
    } else {
      BinarySearchTree.insertNode(this.root, val);
    }
  }

  inOrderTraverse(cb) { BinarySearchTree.inOrderTraverseNode(this.root, cb) }
  preOrderTraverse(cb) { BinarySearchTree.preOrderTraverseNode(this.root, cb) }
  postOrderTraverse(cb) { BinarySearchTree.postOrderTraverseNode(this.root, cb) }
  min() { return BinarySearchTree.minNode(this.root); }
  max() { return BinarySearchTree.maxNode(this.root); }
  search(value) { return BinarySearchTree.searchNode(this.root, value); }
  remove(value) { this.root = BinarySearchTree.removeNode(this.root, value)}
}


export default BinarySearchTree;