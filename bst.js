class Node{
    constructor(value){
        this.value = value;
        this.right = null;
        this.left = null;
    }
}

function mergeSort(arr){
    if(arr.length == 0) return [];
    if(arr.length == 1) return arr;

    let mid = arr.length / 2;
    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid, arr.length));
    let i = 0;
    let j = 0;
    let newArr = []
    while(i < left.length && j < right.length){
        if(left[i] < right[j]){
            newArr.push(left[i]);
            i++;
        }else{
            newArr.push(right[j]);
            j++;
        }
    }
    for(; i < left.length; i++)
        newArr.push(left[i]);
    for(; j < right.length; j++)
        newArr.push(right[j]);
    return newArr;
}

function removeDuplicates(arr){
    let prevNum;
    let newArr = []
    for(let i = 0; i < arr.length; i++){
        if(arr[i] != prevNum || i == 0){
            newArr.push(arr[i]);
        }
        prevNum = arr[i];
    }
    return newArr;
}

function buildTree(arr){
    let newArr = mergeSort(arr);
    newArr = removeDuplicates(newArr);
    return recBuildTree(newArr, 0, arr.length - 1);
}

function recBuildTree(arr, start, end) {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);
    let rootNode = new Node(arr[mid]);
    console.log(mid);

    rootNode.left = recBuildTree(arr, start, mid - 1);
    rootNode.right = recBuildTree(arr, mid + 1, end);

    return rootNode;
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};


class Tree{
    constructor(arr){
        this.root = buildTree(arr);
    }
}

let t = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])

prettyPrint(t.root);