// Convert this from "697" to "six nine seven"

const toWords = s => {
  
  let result = '';
  
  for (let char of s) {
    switch (char) {
      case '0':
        char = 'zero';
        break;
      case '1':
        char = 'one';
        break;
      case '2':
        char = 'two';
        break;
      case '3':
        char = 'three';
        break;
      case '4':
        char = 'four';
        break;
      case '5':
        char = 'five';
        break;
      case '6':
        char = 'six';
        break;
      case '7':
        char = 'seven';
        break;
      case '8':
        char = 'eight';
        break;
      case '9':
        char = 'nine';
        break;
      default:
        char;
    }
    result += ` ${char}`;
  }
  
  
  return result;
}

module.exports = toWords;