import { RedBlackNode } from "../nodes/nodes.js";
import BinarySearchTree from "./binarySearchTree.js"; 

class RedBlackTree extends BinarySearchTree {
  
  static insertNode(RBTree, value) {
    if (RBTree == null) return null;
    if (value < RBTree.value) {
      if (treeNode.left == null) {
        RBTree.left = new RedBlackNode(value);
        RBTree.left.parent = RBTree;
        return RBTree.left;
      } else {
        return RedBlackNode.insertNode(RBTree.left, value);
      }
    } else if (RBTree.right == null) {
      RBTree.right = new RedBlackNode(value);
      RBTree.right.parent = RBTree;
      return RBTree.right;
    } else {
      return RedBlackNode.insertNode(RBTree.right, value);
    }
  }

  constructor(value) {
    super();
    super.root = value !== undefined ? new RedBlackNode(value) : null;
  }

  insert(value) {
    if (this.root == null) {
      this.root = new RedBlackNode(value, null, null, RedBlackNode.BLACK);
    } else {
      const newNode = RedBlackNode.insertNode(this.root, value);
      this.fixTreeProperties(newNode);
    }
  }

  rotationLL(RBNode) {
    const tmp = RBNode.left;
    RBNode.left = tmp.right;
    if (tmp.right && tmp.right.valued) {
      tmp.right.parent = RBNode; 
    }
    tmp.parent = RBNode.parent;
    if (!RBNode.parent) {
      this.root = tmp;
    } else {
      if (RBNode === RBNode.parent.left) {
        RBNode.parent.left = tmp;
      } else {
        RBNode.parent.right = tmp;
      }
    }
    tmp.right = RBNode;
    RBNode.parent = tmp;
  }

  rotationRR(RBNode) {
    const tmp = RBNode.right;
    RBNode.right = tmp.left;
    if (tmp.left && tmp.left.valued) {
      tmp.left.parent = RBNode; 
    }
    tmp.parent = RBNode.parent;
    if (!RBNode.parent) {
      this.root = tmp;
    } else {
      if (RBNode === RBNode.parent.left) {
        RBNode.parent.left = tmp;
      } else {
        RBNode.parent.right = tmp;
      }
    }
    tmp.left = RBNode;
    RBNode.parent = tmp;
  }

  fixTreeProperties(RBNode) {
    while (RBNode && RBNode.parent && RBNode.parent.isRed() && RBNode.isBlack()) {
      let parent = RBNode.parent;
      const grandParent = parent.parent;
      if (grandParent && grandParent.left === parent) {
        const uncle = grandParent.right;
        if (uncle && uncle.isRed()) {
          grandParent.color = RedBlackNode.RED;
          parent.color = RedBlackNode.BLACK;
          uncle.color = RedBlackNode.BLACK;
          RBNode = grandParent;
        } else {
          if (RBNode === parent.right) {
            this.rotationRR(parent);
            RBNode = parent;
            parent = RBNode.parent;
          }
          this.rotationLL(grandParent);
          parent.color = RedBlackNode.BLACK;
          grandParent.color = RedBlackNode.RED;
          RBNode = parent;
        }
      } else {
        const uncle = grandParent.left;
        if (uncle && uncle.isRed()) {
          grandParent.color = RedBlackNode.RED;
          parent.color = RedBlackNode.BLACK;
          uncle.color = RedBlackNode.BLACK;
          RBNode = grandParent;
        } else {
          if (RBNode === parent.left) {
            this.rotationLL(parent);
            RBNode = parent;
            parent = RBNode.parent;
          }
          this.rotationRR(grandParent);
          parent.color = RedBlackNode.BLACK;
          grandParent.color = RedBlackNode.RED;
          RBNode = parent;
        }
      }
    }
    this.root.color = RedBlackNode.BLACK;
  }
}

export default RedBlackTree;