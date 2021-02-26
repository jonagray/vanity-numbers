const wordsData = require("./words.json");
const possibleWords = require('./possibleWords');
const { HashTable, HashNode, LinkedList } = require('./dataStructures');

const hashWords = n => {
  const storage = possibleWords(n);
  let newHashtable = new HashTable(40000);
  let hashResults = [];
  let count = 0;

  for (let key in wordsData) {
    if (storage[count]) {
      if (key.length === storage[count].length) { // This will make sure the words in hashtable are same length as input words
        newHashtable.add(`${key}`, `${wordsData[key]}`)
      }
    } else {
      count++;
    }
  }

  for (let i = 0; i < storage.length; i++) {
    if (newHashtable.get(storage[i]) !== null) {
      hashResults.push(storage[i]);
    }
  }
  
  return hashResults;
}

module.exports = hashWords;