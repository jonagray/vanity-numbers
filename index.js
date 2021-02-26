// --- Directions
// Given a phone number with length of n:
  // Split phone number, grabbing the last 7 digits
  // Take the first 3 digits and last 4 digits of that 7, and calculate all possible letter combinations resulting from those chunks of numbers
  // If any of those 3-digit and 4-digit letter combinations equate to a valid word, add it to the return array

// Determine if the input phone number can be a vanity number
// I.E. 1-800-292-FLOW(3569)
// When a vanity number can be made from the last 4 digits, those combinations are top priority
// When a vanity number can be made from the first 3 digits, those combinations are secondary priority
// 3569377 would be able to spell flowers

// Return the top 5 results, 7-digits first, 4-digits next, then 3-digits

var AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});
const { HashTable, HashNode, LinkedList } = require('./dataStructures/dataStructures');
const hashWords = require('./hashtable');
const validateInput = require('./validateInput');
const formattedNumWords = require('./formattedNumberWords');

exports.handler = (event, context, callback) => {
  const phoneNumber = event.Details.ContactData.CustomerEndpoint.Address;

  if (typeof phoneNumber !== 'string') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create the item.',
    });
    return;
  }
  
  const arrData = formattedNumWords(phoneNumber);
  const vanityOption1 = arrData[1][0];
  const vanityOption2 = `${arrData[1][0]}, ${arrData[1][1]}`;
  const vanityOption3 = `${arrData[1][0]}, ${arrData[1][1]}, ${arrData[1][2]}`;
  
  const params = {
      TableName: 'callerNumbers',
      Item: {
        'callerId' : phoneNumber,
        'vanityOptions': arrData[0]
      }
  };
  
  let nums = 0;
  
  const dataOptions = params.Item.vanityOptions.length;
    switch (dataOptions) {
      case 1:
        nums += 1;
        break;
      case 2:
        nums += 2;
        break;
      case 3:
        nums += 3;
        break;
      default:
        nums;
  }
  
  if (dataOptions > 3) {
      nums = 3;
  }

    // Add item to the DyanmoDB table
    ddb.put(params, (err) => {
      if (err) {
        console.error(err);
        callback(null, {
          statusCode: err.statusCode || 501,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Couldn\'t create the item.',
        });
      return;
    };

    // Create the response for Connect Flow
    const response = {
      statusCode: 200,
      phoneNumber: phoneNumber,
      vanityOption1: vanityOption1,
      vanityOption2: vanityOption2,
      vanityOption3: vanityOption3,
      connectOptions: nums,
    };
    
    callback(null, response);
  });
};