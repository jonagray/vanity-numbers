// --- Directions
// Given a phone number with length of n:
// Split phone number, grabbing the last 7 digits
// Take the first 3 digits of that 7, and run the function on them
// Take the last 4 digits of that 7, and run the function on them

// Determine if the input phone number can be a vanity number
// I.E. 1-800-292-FLOW(3569)
// I.E. 1-800-BAT(228)-9799
// When a vanity number can be made from the last 4 digits, those combinations are top priority
// When a vanity number can be made from the first 3 digits, those combinations are secondary priority
// 3569377 would be able to spell flowers

// Return the top 5 results, 4-digits first, then 3-digits

const data = require('./words_dictionary.json');

function letterCombinations(n) { //input=('(206) 438-2274')
  let map = [];
  map[2] = ["a", "b", "c"];
  map[3] = ["d", "e", "f"];
  map[4] = ["g", "h", "i"];
  map[5] = ["j", "k", "l"];
  map[6] = ["m", "n", "o"];
  map[7] = ["p", "q", "r", "s"];
  map[8] = ["t", "u", "v"];
  map[9] = ["w", "x", "y", "z"];
  map[0] = "";
  map[1] = "";

  n = validateInput(n); //output=[ '2064382274', '4382274', '2274', '438' ]

  let digits = [];

  if (n === null || n.length === 0) {
    return result;
  }

  let input = n[0];

  let uniqueMap = input.split('').map(x => + x); // output = [4, 3, 8, 2, 2, 7, 4 ]

  // Loop over uniqueMap and create digits array of arrays
  for (let i = 0; i < uniqueMap.length; i++) {
    digits.push(map[uniqueMap[i]]);
  }

  return digits;
}

function validateInput(n) {
  let storage = [];
  let stringified = ""; // Create empty string variable
  if (typeof n !== Number) { // If input is already a string, format it correctly
    stringified = ('' + n).replace(/\D/g, '');
  } else {
    stringified = n.toString();
  }
  storage.push(stringified);

  let fullSeven = stringified.slice(stringified.length - 7);
  storage.push(fullSeven);

  let lastFour = stringified.slice(stringified.length - 4);
  storage.push(lastFour);

  let firstThree = stringified.slice(stringified.length - 7).slice(0, 3);
  storage.push(firstThree);

  return storage;
}

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
  let node = new Node(key, val);
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


function wordsMatching(n) {
  let digits = letterCombinations(n)
  // outer loop is for each digit in the number, inner loop is the letter possibilities for the digit you're on
  // I want an array of the different digits you can get from the input
  let result = digits[0];
  for (let i = 1; i < digits.length; i++) { // loop through arrays inside letters array
    let subresult = [];
    let letters = digits[i];

    for (let j = 0; j < letters.length; j++) {
      // create map with letter appended to end
      subresult = subresult.concat(result.map(str => str + letters[j]));
    }

    result = subresult;
  }
  return result;
}


function hashEverything(n) {
  let storage = wordsMatching(n);

  let newHashtable = new HashTable(40000);
  let hashResults = [];
  for (let key in data) {
    if (key.length === storage[0].length) { // This will make sure the words in hashtable are same length as input words
      newHashtable.add(`${key}`, `${data[key]}`)
    }
  }

  for (let i = 0; i < storage.length; i++) {
    if (newHashtable.get(storage[i]) !== null) {
      hashResults.push(storage[i]);
    }
  }
  return hashResults;
}

function formattedNumWords(n) {
  let numArr = validateInput(n);
  let phoneNum = numArr[0]; // get the original number
  let tempArr = [];

  for (let i = 1; i < numArr.length; i++) {
    tempArr.push(hashEverything(numArr[i]))
  }

  let viableSevenDigitWords = tempArr[0]; // This will grab the full seven digit string
  let viableFourDigitWords = tempArr[1]; // This will grab the string of the last 4 digits
  let viableThreeDigitWords = tempArr[2]; // This will grab the string of the first three digits

  let storageArr = [];

  // Get original phone number into final array
  storageArr.push(phoneNum);

  // Loop through the viable words and concat with the digits of the original number (excluding last 7)
  if (viableSevenDigitWords) {
    for (let i = 0; i < viableSevenDigitWords.length; i++) {
      if (storageArr.length < 6) {
        storageArr.push(`${phoneNum.slice(0, phoneNum.length - 7)}-${viableSevenDigitWords[i]}`);
      }
    }
  }

  // Loop through the viable words and concat with the digits of the original number (excluding last 4)
  if (viableFourDigitWords) {
    for (let i = 0; i < viableFourDigitWords.length; i++) {
      if (storageArr.length < 6) {
        storageArr.push(`${phoneNum.slice(0, phoneNum.length - 7)}-${phoneNum.slice(phoneNum.length - 7, phoneNum.length - 4)}-${viableFourDigitWords[i]}`);
      }
    }
  }

  // Loop through the three-digit viable words and concat with the digits of the original number (excluding first three)
  if (viableThreeDigitWords) {
    for (let i = 0; i < viableThreeDigitWords.length; i++) {
      if (storageArr.length < 6) {
        storageArr.push(`${phoneNum.slice(0, phoneNum.length - 7)}-${viableThreeDigitWords[i]}-${phoneNum.slice(phoneNum.length - 4)}`);
      }
    }
  }

  return storageArr;
}

module.exports = {formattedNumWords, validateInput}