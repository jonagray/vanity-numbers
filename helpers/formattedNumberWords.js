const validateInput = require('./validateInput');
const hashWords = require('./hashtable');
const toWords = require('./digitStringToWordString');

const formattedNumWords = n => {
  let numArr = validateInput(n);
  let tempArr = [];
  let phoneNum = numArr[0];
  let startingIndex = 1;

  for (let i = 1; i < numArr.length; i++) {
    tempArr.push(hashWords(numArr[i]))
  }

  let viableSevenDigitWords = tempArr[0]; // This will grab the full seven digit string
  let viableFourDigitWords = tempArr[1]; // This will grab the string of the last 4 digits
  let viableThreeDigitWords = tempArr[2]; // This will grab the string of the first three digits
  let results = [];
  let spokenFormat = [];
  
  if (phoneNum.charAt(0) ==='1'){
    phoneNum = phoneNum.replace(/[^a-zA-Z0-9+]/g, "").substr(1);
  }

  // Loop through the viable words and concat with the digits of the original number (excluding last 7)
  if (viableSevenDigitWords) {
    for (let i = 0; i < viableSevenDigitWords.length; i++) {
      if (results.length < 5) {
        results.push(`${phoneNum.slice(0, phoneNum.length - 7)}-${viableSevenDigitWords[i]}`);
        spokenFormat.push(`${toWords(phoneNum.slice(0, phoneNum.length - 7))} ${viableSevenDigitWords[i]}`);
      }
    }
  }

  // Loop through the viable words and concat with the digits of the original number (excluding last 4)
  if (viableFourDigitWords) {
    for (let i = 0; i < viableFourDigitWords.length; i++) {
      if (results.length < 5) {
        results.push(`${phoneNum.slice(0, phoneNum.length - 7)}-${phoneNum.slice(phoneNum.length - 7, phoneNum.length - 4)}-${viableFourDigitWords[i]}`);
        spokenFormat.push(`${toWords(phoneNum.slice(0, phoneNum.length - 7))}${toWords(phoneNum.slice(phoneNum.length - 7, phoneNum.length - 4))} ${viableFourDigitWords[i]}`)
      }
    }
  }

  // Loop through the three-digit viable words and concat with the digits of the original number (excluding first 3
  if (viableThreeDigitWords) {
    for (let i = 0; i < viableThreeDigitWords.length; i++) {
      if (results.length < 5) {
        results.push(`${phoneNum.slice(0, phoneNum.length - 7)}-${viableThreeDigitWords[i]}-${phoneNum.slice(phoneNum.length - 4)}`);
        spokenFormat.push(`${toWords(phoneNum.slice(0, phoneNum.length - 7))} ${viableThreeDigitWords[i]} ${toWords(phoneNum.slice(phoneNum.length - 4))}`)
      }
    }
  }

  return [results, spokenFormat];
}

module.exports = formattedNumWords;