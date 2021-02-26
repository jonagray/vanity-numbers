const validateInput = require('./validateInput');

const letterCombinations = n => { //input=('(206) 438-2274')
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

  const validated = validateInput(n); //output=[ '4382274', '2274', '438' ]
  let digitsMap = []; // Empty array to store digit arrays
  let uniqueMap = validated[0].split('').map(x => + x); // output = [4, 3, 8, 2, 2, 7, 4 ]

  // Loop over uniqueMap and create digits array of arrays
  for (let i = 0; i < uniqueMap.length; i++) {
    digitsMap.push(map[uniqueMap[i]]);
  }
  
  return digitsMap; // Will return array of arrays, each subarray being the possible keypad digits for the corresponding number
}

module.exports = letterCombinations;