/**
 * 迭代写法
 * 单指针，从前面循环删
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  if (!head) {
    return head;
  }
  // 创建空头结点
  let dummy = new ListNode(0, head);
  let cur = dummy;
  while (cur.next && cur.next.next) {
    if (cur.next.val === cur.next.next.val) {
      let equal = cur.next.val;
      while (cur.next && cur.next.val === equal) {
        cur.next = cur.next.next;
      }
    } else {
      cur = cur.next;
    }
  }
  return dummy.next;
};

/**
 * 迭代写法
 * 双指针，cur 先跑到后面去，pre 再夹
 * @param {*} head
 * @returns
 */
var deleteDuplicates = function (head) {
  if (!head) {
    return head;
  }
  // 创建空头结点
  let dummy = new ListNode(0, head);
  let cur = head;
  let pre = dummy;
  while (cur) {
    while (cur.next && cur.val == cur.next.val) {
      cur = cur.next;
    }
    // 指针之间没有相同的节点
    if (pre.next == cur) {
      pre = pre.next;
    } else {
      pre.next = cur;
    }
    cur = cur.next;
  }
  return dummy.next;
};

/**
 * 递归写法
 * @param {*} head
 * @returns
 */
var deleteDuplicates = function (head) {
  if (!head || !head.next) {
    return head;
  }
  if (head.val != head.next.val) {
    head.next = deleteDuplicates(head.next);
  } else {
    let move = new ListNode(head.next);
    while (move && head.val == move.val) {
      move = move.next;
    }
    return deleteDuplicates(move);
  }
  return head;
};
