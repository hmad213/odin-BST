class Node {
  constructor(value) {
    this.value = value;
    this.right = null;
    this.left = null;
  }
}

function mergeSort(arr) {
  if (arr.length == 0) return [];
  if (arr.length == 1) return arr;

  let mid = arr.length / 2;
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid, arr.length));
  let i = 0;
  let j = 0;
  let newArr = [];
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      newArr.push(left[i]);
      i++;
    } else {
      newArr.push(right[j]);
      j++;
    }
  }
  for (; i < left.length; i++) newArr.push(left[i]);
  for (; j < right.length; j++) newArr.push(right[j]);
  return newArr;
}

function removeDuplicates(arr) {
  let prevNum;
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] != prevNum || i == 0) {
      newArr.push(arr[i]);
    }
    prevNum = arr[i];
  }
  return newArr;
}

function buildTree(arr) {
  return recBuildTree(arr, 0, arr.length - 1);
}

function recBuildTree(arr, start, end) {
  if (start > end) return null;

  let mid = Math.floor((start + end) / 2);
  let rootNode = new Node(arr[mid]);

  rootNode.left = recBuildTree(arr, start, mid - 1);
  rootNode.right = recBuildTree(arr, mid + 1, end);

  return rootNode;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

class Tree {
  constructor(arr) {
    let newArr = mergeSort(arr);
    newArr = removeDuplicates(newArr);
    this.root = buildTree(newArr);
  }

  insert(value) {
    let newNode = new Node(value);

    if (this.root == null) {
      this.root = new Node(value);
    }

    let currentNode = this.root;
    while (currentNode != null) {
      if (value >= currentNode.value) {
        if (currentNode.right == null) {
          currentNode.right = newNode;
          currentNode = null;
        } else {
          currentNode = currentNode.right;
        }
      } else {
        if (currentNode.left == null) {
          currentNode.left = newNode;
          currentNode = null;
        } else {
          currentNode = currentNode.left;
        }
      }
    }
  }

  getSuccessor(node) {
    node = node.right;
    while (node != null && node.left != null) node = node.left;
    return node;
  }

  deleteItem(value, node = this.root) {
    if (node == null) return null;

    if (value > node.value) {
      node.right = this.deleteItem(value, node.right);
    } else if (value < node.value) {
      node.left = this.deleteItem(value, node.left);
    } else {
      if (node.left == null && node.right == null) {
        return null;
      }

      if (node.left == null) {
        return node.right;
      }

      if (node.right == null) {
        return node.left;
      }

      let successor = this.getSuccessor(node);
      node.value = successor.value;
      node.right = this.deleteItem(successor.value, node.right);
    }
    return node;
  }

  find(value) {
    if (this.root == null) {
      return null;
    }
    let currentNode = this.root;
    while (currentNode != null) {
      if (currentNode.value == value) {
        return currentNode;
      } else if (value > currentNode.value) {
        currentNode = currentNode.right;
      } else {
        currentNode = currentNode.left;
      }
    }
    return null;
  }

  levelOrder(callback, nodes = [this.root]) {
    if (nodes.length == 0) return;

    let newNodes = nodes.slice();

    callback(newNodes[0]);

    if (newNodes[0].left != null) newNodes.push(newNodes[0].left);
    if (newNodes[0].right != null) newNodes.push(newNodes[0].right);
    newNodes.shift();

    this.levelOrder(callback, newNodes);
  }

  inOrder(callback, node = this.root) {
    if (node.left != null) this.inOrder(callback, node.left);
    callback(node);
    if (node.right != null) this.inOrder(callback, node.right);
  }

  preOrder(callback, node = this.root) {
    callback(node);
    if (node.left != null) this.preOrder(callback, node.left);
    if (node.right != null) this.preOrder(callback, node.right);
  }

  postOrder(callback, node = this.root) {
    if (node.left != null) this.postOrder(callback, node.left);
    if (node.right != null) this.postOrder(callback, node.right);
    callback(node);
  }

  height(value) {
    let node = this.find(value);

    if (node == null) return;

    if (node.left != null && node.right != null)
      return (
        1 +
        Math.max(this.height(node.left.value), this.height(node.right.value))
      );
    else if (node.left != null) return 1 + this.height(node.left.value);
    else if (node.right != null) return 1 + this.height(node.right.value);
    else return 0;
  }

  depth(value) {
    let node = this.root;
    let count = 0;
    while (node != null) {
      if (value == node.value) return count;
      else if (value > node.value) node = node.right;
      else node = node.left;
      count++;
    }
    return null;
  }

  isBalanced(node = this.root) {
    if (node == null) return true;

    let lHeight = node.left == null ? 0 : this.height(node.left.value);
    let rHeight = node.right == null ? 0 : this.height(node.right.value);

    if (Math.abs(lHeight - rHeight) > 1) return false;

    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  getSortedArray(node = this.root) {
    if (node == null) return [];

    return [
      ...this.getSortedArray(node.left),
      node.value,
      ...this.getSortedArray(node.right),
    ];
  }

  rebalance() {
    this.root = buildTree(this.getSortedArray());
  }
}

let print = function (node) {
  console.log(node.value);
};

function getRandomNumbers(){
  let arr = [];
  for(let i = 0; i < 30; i++){
    arr.push(Math.floor(Math.random() * 100));
  }
  return arr;
}

let arr = getRandomNumbers();
let t = new Tree(arr);
console.log(t.isBalanced() ? "The tree is balanced" : "the tree is not balanced");

prettyPrint(t.root);

console.log("-------------------In Level Order-------------------");
t.levelOrder(print);
console.log("-------------------In Inorder-------------------");
t.inOrder(print);
console.log("-------------------In Preorder-------------------");
t.preOrder(print);
console.log("-------------------In Postorder-------------------");
t.postOrder(print);

t.insert(101);
t.insert(124);
t.insert(135);
t.insert(111);
t.insert(175);
t.insert(163);

console.log(t.isBalanced() ? "The tree is balanced" : "the tree is not balanced");
t.rebalance();
console.log(t.isBalanced() ? "The tree is balanced" : "the tree is not balanced");

prettyPrint(t.root);

console.log("-------------------In Level Order-------------------");
t.levelOrder(print);
console.log("-------------------In Inorder-------------------");
t.inOrder(print);
console.log("-------------------In Preorder-------------------");
t.preOrder(print);
console.log("-------------------In Postorder-------------------");
t.postOrder(print);