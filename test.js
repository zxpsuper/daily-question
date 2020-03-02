function Node(val) {
  this.left = null;
  this.right = null;
  this.value = val;
}

function generateBST(root, array) {
  var length = array.length;

  for (var i = 1; i < length; i++) {
    insertNode(root, array[i]);
  }

}

function insertNode(node, value) {
  if (value < node.value) {
    if (node.left === null) {
      node.left = new Node(value);
    } else {
      node = node.left;
      insertNode(node, value);
    }
  } else {
    if (node.right === null) {
      node.right = new Node(value);
    } else {
      node = node.right;
      insertNode(node, value);
    }
  }
}

var array = [2, 3, 4, 12, 3, 54, 6, 7, 1];
var root = new Node(array[0]);

generateBST(root, array);

// 中序遍历
function inorderSearch(root) {
  var array = [];

  _inorderSearch(root, array);
  return array;

}

function _inorderSearch(node, array) {
  if (!node) {
    return;
  }
  _inorderSearch(node.left, array);
  array.push(node.value);
  _inorderSearch(node.right, array);
}
console.log(root);
console.log(inorderSearch(root));