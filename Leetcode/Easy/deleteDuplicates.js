/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  if (!head) {
    return head;
  }

  let dummy = new ListNode(0, head);
  let cur = dummy;

  while (cur.next && cur.next.next) {
    if (cur.next.val === cur.next.next.val) {
      cur.next = cur.next.next;
    } else {
      cur = cur.next;
    }
  }
  return dummy.next;
};

// 递归
var deleteDuplicates = function (head) {
  if (!head || !head.next) {
    return head;
  }

  if (head.val !== head.next.val) {
    head.next = deleteDuplicates(head.next);
  } else {
    let move = head.next;
    while (move.next && move.next.val === head.val) {
      move.next = move.next.next;
    }
    return deleteDuplicates(move);
  }

  return head;
};
