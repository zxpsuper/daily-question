function TreeNode(val, char) {
  this.val = val; // 数量
  this.char = char;
  this.code = '';
  this.left = this.right = null;
}

/**
 * str 需要编码的字符串
 */
function HuffmanCompression(str) {
  const charCountMap = {};
  var heap = [];
  var length = str.length;
  for (var i = 0; i < length; i++) {
    if (charCountMap[str[i]]) {
      charCountMap[str[i]] = charCountMap[str[i]] + 1;
    } else {
      charCountMap[str[i]] = 1;
    }
  }

  var charCountMapKeys = Object.keys(charCountMap);
  var tempCharArray = [];
  for (var i = 0; i < charCountMapKeys.length; i++) {
    var currentKey = charCountMapKeys[i];
    tempCharArray.push({ val: charCountMap[currentKey], char: currentKey });
  }
  tempCharArray.sort(function(a, b) {
    return a.val - b.val;
  });

  for (var i = 0; i < tempCharArray.length; i++) {
    heap.push(new TreeNode(tempCharArray[i].val, tempCharArray[i].char));
  }

  while (heap.length > 1) {
    var first = heap.shift();
    var second = heap.shift();
    var sum = first.val + second.val;
    var char = first.char + second.char;

    var newTreeNode = new TreeNode(sum, char);
    newTreeNode.left = first;
    newTreeNode.right = second;

    heap.push(newTreeNode);
    heap.sort(function(a, b) {
      return a.val - b.val;
    });
  }

  calculateCode(heap[0]);
  var codeMap = {};
  generateCodeMap(heap[0], codeMap);

  var result = '';
  for (var i = 0; i < str.length; i++) {
    result += codeMap[str[i]];
  }
  return result;
}

function calculateCode(node) {
  if (node.left) {
    node.left.code = node.code + '0';
    calculateCode(node.left);
  }
  if (node.right) {
    node.right.code = node.code + '1';
    calculateCode(node.right);
  }
}

function generateCodeMap(node, codeMap) {
  if (!node.left && !node.right) {
    codeMap[node.char] = node.code;
  }
  if (node.left) {
    generateCodeMap(node.left, codeMap);
  }
  if (node.right) {
    generateCodeMap(node.right, codeMap);
  }
}

console.log(HuffmanCompression('everyday is awesome!'));
