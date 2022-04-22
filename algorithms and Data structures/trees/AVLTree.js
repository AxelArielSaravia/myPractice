import { TreeNode } from "../nodes/nodes.js";
import BinarySearchTree from "./binarySearchTree.js";

class AVLTree extends BinarySearchTree {
  static #UNBALANCED_RIGHT = 1;
  static #SLIGHTLY_UNBALANCED_RIGHT = 2;
  static #BALANCED = 3;
  static #SLIGHTLY_UNBALANCED_LEFT = 4;
  static #UNBALANCED_LEFT = 5;

  static getNodeHeight = (treeNode) => treeNode == null ? 0 : Math.max(AVLTree.getNodeHeight(treeNode.left), AVLTree.getNodeHeight(treeNode.right)) + 1;

  static getBalanceFactor(treeNode) {9
    const heihgtDifference = AVLTree.getNodeHeight(treeNode.left) - AVLTree.getNodeHeight(treeNode.right);
    switch (heihgtDifference) {
      case (-2) : return AVLTree.#UNBALANCED_RIGHT; 
      case -1 : return AVLTree.#SLIGHTLY_UNBALANCED_RIGHT; 
      case 1 : return AVLTree.#SLIGHTLY_UNBALANCED_LEFT; 
      case 2 : return AVLTree.#UNBALANCED_LEFT; 
      default : return AVLTree.#BALANCED; 
    }  
  }

  static rotationLL(treeNode) {
    if (treeNode == null) return;
    const temp = treeNode.left;
    treeNode.left = temp.right;
    temp.right = treeNode 
    return temp;
  }

  static rotationRR(treeNode) {
    if (treeNode == null) return;
    const temp = treeNode.right;
    treeNode.right = temp.left;
    temp.left = treeNode;
    return temp;
  }

  static rotationRL(treeNode) {
    if (treeNode == null) return;
    treeNode.right = AVLTree.rotationLL(treeNode.right);
    return AVLTree.rotationRR(treeNode);
  }
  
  static rotationLR(treeNode) {
    if (treeNode == null) return;
    treeNode.left = AVLTree.rotationRR(treeNode.left);
    return AVLTree.rotationLL(treeNode);
  }

  static insertNode(treeNode, value) {
    if (treeNode == null) return new TreeNode(value);  
    else if (value < treeNode.value) treeNode.left = AVLTree.insertNode(treeNode.left, value);
    else if (value > treeNode.value) treeNode.right = AVLTree.insertNode(treeNode.right, value);
    else return treeNode; 
    
    //balance tree if needed
    const balanceFactor = AVLTree.getBalanceFactor(treeNode);
    if (balanceFactor === AVLTree.#UNBALANCED_LEFT) {
      if (value < treeNode.left.value) treeNode = AVLTree.rotationLL(treeNode);
      else return AVLTree.rotationLR(treeNode);
    }
    if (balanceFactor === AVLTree.#UNBALANCED_RIGHT) {
      if (value > treeNode.right.value) treeNode = AVLTree.rotationRR(treeNode);
      else return AVLTree.rotationRL(treeNode);
    }
    return treeNode;
  }

  static removeNode(treeNode, value) {
    let node = super.removeNode(treeNode, value);
    if (node == null) return node;
    const balanceFactor = AVLTree.getBalanceFactor(node);
    if (balanceFactor === AVLTree.#UNBALANCED_LEFT) {
      const balanceFactorLeft = AVLTree.getBalanceFactor(node.left);
      if (balanceFactorLeft === AVLTree.#BALANCED || balanceFactorLeft === AVLTree.#SLIGHTLY_UNBALANCED_LEFT) {
        return AVLTree.rotationLL(node);
      }
      if (balanceFactorLeft === AVLTree.#SLIGHTLY_UNBALANCED_RIGHT) {
        return AVLTree.rotationLR(node);
      }
    } 
    if (balanceFactor === AVLTree.#UNBALANCED_RIGHT) {
      const balanceFactorRight = AVLTree.getBalanceFactor(node.right);
      if (balanceFactorRight === AVLTree.#BALANCED || balanceFactorRight === AVLTree.#SLIGHTLY_UNBALANCED_RIGHT) {
        return AVLTree.rotationRR(node);
      }
      if (balanceFactorRight === AVLTree.#SLIGHTLY_UNBALANCED_LEFT) {
        return AVLTree.rotationRL(node);
      }
    }
    return node;
  }

  constructor(value) {
    super(value);
  }

  insert(value) {  this.root = AVLTree.insertNode(this.root, value); }
  remove(value) { this.root = AVLTree.removeNode(this.root, value) }

} 

export default AVLTree;