/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let root = new ListNode(0);
  let cur = root;
  let carry = 0;

  while (l1 != null || l2 != null || carry != 0) {
    let l1Val = l1 != null ? l1.val : 0;
    let l2Val = l2 != null ? l2.val : 0;
    let sumVal = l1Val + l2Val + carry;
    carry = Math.floor(sumVal / 10);

    let sumNode = new ListNode(sumVal % 10);
    cur.next = sumNode;
    cur = sumNode;

    if (l1 != null) {
      l1 = l1.next;
    }
    if (l2 != null) {
      l2 = l2.next;
    }
  }

  return root.next;
};
