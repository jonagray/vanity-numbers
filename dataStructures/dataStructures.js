function HashTable(length) {
  this.buckets = Array(length);
  this.bucketsLength = this.buckets.length;
}

function HashNode(key, val) {
  this.key = key;
  this.val = val;
  this.next = null;
  this.previous = null;
}

function LinkedList() {
  this.head = null;
  this.tail = null;
  this.length = 0;
}

LinkedList.prototype.addToList = function (key, val) {
  let node = new HashNode(key, val);
  if (!this.length) {
    this.head = node;
    this.tail = node;
  } else {
    this.tail.next = node;
    node.previous = this.tail;
    this.tail = node;
  }
  this.length++;
}

HashTable.prototype.hash = function (key) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash += key.charCodeAt(i);
  }
  return hash % this.bucketsLength;
};

HashTable.prototype.add = function (key, val) {
  let index = this.hash(key);
  if (!this.buckets[index])
    this.buckets[index] = new HashNode(key, val);
  else {
    let currentNode = this.buckets[index];
    while (currentNode.next) {
      currentNode = currentNode.next;
    }
    currentNode.next = new HashNode(key, val)
  }
}

HashTable.prototype.get = function (key) {
  let index = this.hash(key);
  let currentNode = this.buckets[index];
  if (!currentNode) return null;
  else if (currentNode.key === key) return this.buckets[index];
  else {
    while (currentNode.next) {
      if (currentNode.key === key) return currentNode.val;
      currentNode = currentNode.next;
    }
  }
  return null;
};

HashTable.prototype.contains = function (key) {
  let index = this.hash(key);
  let currentNode = this.buckets[index];
  if (currentNode) {
    return true;
  } else {
    return false;
  }
}

module.exports = { HashTable, HashNode, LinkedList };