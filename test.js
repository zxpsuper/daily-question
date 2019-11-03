class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(key) {
    const newNode = new Node(key);
    const insertNode = (node, newNode) => {
      if (newNode.key < node.key) {
        if (node.left === null) {
          node.left = newNode;
        } else {
          insertNode(node.left, newNode);
        }
      } else {
        if (node.right === null) {
          node.right = newNode;
        } else {
          insertNode(node.right, newNode);
        }
      }
    };
    if (!this.root) {
      this.root = newNode;
    } else {
      insertNode(this.root, newNode);
    }
  }
  min(node) {
    const minNode = node => {
      return node ? (node.left ? minNode(node.left) : node) : null;
    };
    return minNode(node || this.root);
  }

  max(node) {
    const maxNode = node => {
      return node ? (node.right ? maxNode(node.right) : node) : null;
    };
    return maxNode(node || this.root);
  }
  search(key) {
    const searchNode = (node, key) => {
      if (node === null) return false;
      if (node.key === key) return node;
      return searchNode(key < node.key ? node.left : node.right, key);
    };
    return searchNode(this.root, key);
  }

  remove(key) {
    const removeNode = (node, key) => {
      if (node === null) return false;
      if (node.key === key) {
        console.log(node);
        if (node.left === null && node.right === null) {
          let _node = node;
          node = null;
          return _node;
        } else {
          console.log("key", key);
        }
      } else if (node.left !== null && node.key > key) {
        if (node.left.key === key) {
          node.left.key = this.min(node.left.right).key;
          removeNode(node.left.right, node.left.key);
          return node.left;
        } else {
          return removeNode(node.left, key);
        }
      } else if (node.right !== null && node.key < key) {
        if (node.right.key === key) {
          node.right.key = this.min(node.right.right).key;
          removeNode(node.right.right, node.right.key);
          return node.right;
        } else {
          return removeNode(node.right, key);
        }
      } else {
        return false;
      }
      return removeNode(key < node.key ? node.left : node.right, key);
    };
    return removeNode(this.root, key);
  }
}

const tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
console.log(tree.search(13))