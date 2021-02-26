const validateInput = n => {
  let results = []; // Empty storage array for results
  n = ('' + n).replace(/\D/g, ''); // Format number correctly
  results.push(n);

  let fullSeven = n.slice(n.length - 7);
  results.push(fullSeven);

  let lastFour = n.slice(n.length - 4);
  results.push(lastFour);

  let firstThree = n.slice(n.length - 7).slice(0, 3);
  results.push(firstThree);

  return results;
}

module.exports = validateInput;