const letterCombinations = require('./letterCombinations');

const possibleWords = n => {
  let digits = letterCombinations(n)
  
  // Loop through digits array and see if any of the indeces are empty. If they are, figure out if it's in position [3,4,5], or [6,7,8,9]
    // If it's in the first chunk, that means that the loop below has to start at a later index in order to only loop through either the first chunk or the second chunk
    let result = digits[0];
    for (let i = 1; i < digits.length; i++) { // loop through arrays inside letters array
      let subresult = [];
      let letters = digits[i];
      
  // outer loop is for each digit in the number, inner loop is the letter possibilities for the digit you're on
    // I want an array of the different digits you can get from the input
    for (let j = 0; j < letters.length; j++) {
      // create map with letter appended to end
      subresult = subresult.concat(result.map(str => str + letters[j]));
    }

    result = subresult;
  }
  return result;
}

module.exports = possibleWords;