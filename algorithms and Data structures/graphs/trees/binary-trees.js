// Constructor
/**
 * @param {*} val 
 * @param {BinaryTree} left 
 * @param {BinaryTree} rigth 
 */
function BinaryTree(val, left, rigth) {
    this.val = (val === undefined ? null : val);
    this.left = (left === undefined ? null : left);
    this.rigth = (rigth === undefined ? null : rigth);
}

BinaryTree.prototype.isEmpty = function() {
    return (this.val === null && this.left === null && this.rigth === null);
}


