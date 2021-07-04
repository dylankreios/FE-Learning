/**
 * 二叉树中序遍历
 * @param {*} root
 * @param {*} res
 * @returns
 */
var inorder = function (root, res) {
  if (!root) return;
  inorder(root.left, res);
  res.push(root);
  inorder(root.right, res);
};

/**
 * 返回遍历之后的数组
 * @param {*} root
 * @returns
 */
var inorderTravel = function (root) {
  let res = [];
  inorder(root, res);
  return res;
};

/**
 * @param {TreeNode} root
 */
var BSTIterator = function (root) {
  this.idx = 0;
  this.arr = inorderTravel(root);
};

/**
 * @return {number}
 */
BSTIterator.prototype.next = function () {
  return this.arr[this.idx + 1];
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function () {
  return this.idx < this.arr.length;
};

// 上述方法方法空间复杂度为 O(n)，要保存所有节点
/**
 * @param {TreeNode} root
 */
var BSTIterator = function (root) {
  this.cur = root;
  this.stack = [];
};

/**
 * @return {number}
 */
BSTIterator.prototype.next = function () {
  // 构造方法：一路到底，把根节点和它的所有左节点放到栈中
  while (this.cur) {
    this.stack.push(this.cur);
    this.cur = this.cur.left;
  }
  // 调用 next() 方法：弹出栈顶的节点
  this.cur = this.stack.pop();
  const ret = this.cur.val;
  // 如果它有右子树，则对右子树一路到底，把它和它的所有左节点放到栈中
  this.cur = this.cur.right;
  return ret;
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function () {
  return this.cur !== null || this.stack.length;
};
