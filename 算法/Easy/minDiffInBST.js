/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDiffInBST = function (root) {
  // ans 初始化为最大，因为它要保存最小值
  let ans = Number.MAX_SAFE_INTEGER;
  // prev 要初始化为负数，因为不能与节点值相等
  let prev = -1;

  let dfs = (root) => {
    if (!root) return;
    dfs(root.left);

    // 第一个节点
    if (prev == -1) {
      // prev 赋值为第一个的值
      prev = root.val;
    } else {
      // 否则不是第一个节点的话，求上一次的最小值和当前节点与上个节点差的最小值
      ans = Math.min(ans, root.val - prev);
      prev = root.val;
    }

    dfs(root.right);
  };

  dfs(root);
  return ans;
};
