/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function (head, k) {
  let tail = head;
  let tail_prev = head;
  let listLength = 0;

  if (!head || !head.next) {
    return head;
  }

  while (tail) {
    listLength++;
    tail = tail.next;
  }
  k %= listLength;

  for (let i = 0; i < k; i++) {
    tail = head;
    tail_prev = head;
    // 位移
    while (tail_prev.next.next) {
      tail_prev = tail_prev.next;
    }
    tail = tail_prev.next;

    // 拼接
    tail.next = head;
    tail_prev.next = null;
    head = tail;
  }
  return head;
};
