# Voice Foundry Vanity Phone Number Application

### Author: Jonny Graybill

# Application Information
* This application utilizes three popular Amazon Web Services to perform a calculation based on a user's phone number. Once initialized, the algorithm takes a phone number string as an input, and outputs a string of potential vanity numbers that could be used.
* AWS Services:
  * Amazon Connect
  * Lambda
  * DynamoDB

## Problem Domain
1.	Create a Lambda that converts phone numbers to vanity numbers and save the best 5 resulting vanity numbers and the caller's number in a DynamoDB table. "Best" is defined as you see fit - explain your thoughts.
2.	Create an Amazon Connect contact flow that looks at the caller's phone number and says the 3 vanity possibilities that come back from the Lambda function.

## About Vanity Numbers
* What is a vanity phone number?
  * As per [line2.com](https://www.line2.com/articles/should-you-get-a-vanity-phone-number-for-your-business/), a vanity phone number is a custom-made set of digits that either spell out a word or are memorable in some way. For example, a building company may use 1-800-BUILDER (1-800-284-5337) as their business number, where the letters are spelled out using the numbers on the telephone keypad.

* Why would someone want a vanity phone number?
  * According to [Adeptel](http://www.adeptel.com/vanity.asp), the marketing potential of an organization expands rapidly when using a vanity toll-free number. Sales increase, customer service improves, and because of the heightened brand recognition, your customers know who you are and how to contact you. Marketing efforts can seem almost effortless or become more focused in new product areas or markets.

### Initial Input Thoughts
| Inputs         | Outputs       |
| ---------------|:-------------:|
| 2061234567     | 2061234567    |
| 206-123-4567   | 2061234567    |
| 206 123 4567   | 2061234567    |
| (206) 123 4567 | 2061234567    |
| (206) 123-4567 | 2061234567    |
| (206)-123-4567 | 2061234567    |
* This is how I initially thought about how a phone number input would go into the algorithm and be normalized for output.

# Aproach
  * This project as a whole felt like a unique take on a practical business need. Typically when I would think about vanity numbers, it was more along the lines of a business looking for the perfect phone number that they could purchase and use. I like the 1-800-BUILDER example - if you have a construction business and you're getting set up with a phone number, being able to search through available options and find something practical like 1-800-BUILDER, is ideal.
  * However, if you already have your phone number set in stone and can't change it, being able to calculate different ways you could potentially market the number you have, could be quite helpful. With this in mind, I knew a few things about this project would be simplified because essentially there a very limited margin for different inputs. The drawback to this is that many of the vanity options won't be very applicable for a caller, or there may be no vanity options available (like in the case of my own personal phone number).
  * Order I went about building project: algorithm, lambda-dynamo integration, then amazon connect.

## Implemented Solution Reasoning
* Why I implemented the solution the way I did.
* When I first started thinking about how to approach this project, my mind went to potentially working out a recursive solution. Recursive algorithms aren't my strong-suit, but I knew from past experiences that they were often a viable way to go about use cases like this.
* Realistically, performance was always going to be a driving factor in a project like this. Calculating thousands of different possibilities depending on the input you get means that you need to be concerned with speed. In addition, hosting the code in a Lambda further advanced the need for a performant algorithm.
* After I got the recursive solution working, it became clear that I needed to look in a different direction. The algorithm took around 30 seconds from start to finish in my local NodeJS environment, and an entire minute to run in a browser-based repl.it. Neither of those things were going to be fast enough to be considered for a Lambda.
* Needing to do some serious refactoring, I opted first to try and rebuild my solution in an iterative way. This was much easier than I expected, as I'd already thought-out the logic for it when building the recursive approach I tried first.
* The algorithm was definitely faster - but only by about 5 seconds. I was headed in the right direction, but it wasn't enough. To try and isolate what was taking the longest amount of time, inputting temporary timestamps was effective, as well as some of Google Chrome's built-in developer tools. The realization came to me, that the section where I checked the lengthy array of words (mostly gibberish letter combinations) was taking the bulk of the runtime. Initially, I looked around for the best way to check if a letter combination was a valid word or not, and many solutions involved APIs that were way too overengineered for what I needed. I found an NPM module called "check-words" that I had been using from the beginning. It simple checks a string to see if it is a valid word, and returns a boolean. This however, was the culprit for my long runtimes.
* After much more googling than I would have preferred to do, it seemed the fastest option would be to find a resource file that had all the English Dictionary words, and then create a hashmap of it.

## Struggles
* What I struggled with during this project.

## Problems Encountered
* What interesting problems I encountered during this project.

## Shortcuts Taken
* What shortcuts I took for the sake of time that I wouldn't have done for production.

## Desired Features
* What I would have liked to implement if I had more time to work on this project.

## Components
### index.js

### Helpers
  #### validateInput.js
  #### letterCombinations.js
  #### hashtable.js
  #### possibleWords.js
  #### formattedNumberWords.js
  #### digitStringToWordString.js

### Data Structures
  #### dataStructures.js

### Testing
  #### test.js
  #### lambdaTest.json

### Assets
  #### words.json

#### Running the app
1. Call the designated Amazon Connect phone number for this application
2. Enjoy hearing Joey - one of Amazon Connect's automated voices, tell you which vanity phone number options are able to be associated with your phone number

## Links, Tutorials, and Resources
### Vanity Number Informational
  * [What is a vanity phone number?](https://www.line2.com/articles/should-you-get-a-vanity-phone-number-for-your-business/)
  * [Why would you want a vanity phone number?](http://www.adeptel.com/vanity.asp)
  * [Algorithm inspiration](https://phonespell.org/phonespell.html)

### Lambda
  * [Invoke Lambda functions](https://docs.aws.amazon.com/lambda/latest/dg/API_Invoke.html)
  * [Make Lambda functions faster](https://www.webiny.com/blog/5-tips-to-make-your-lambda-functions-run-faster-and-cheaper)
  * [Automating error handling](https://aws.amazon.com/blogs/compute/automating-aws-lambda-function-error-handling-with-aws-step-functions/)
  * [Best practices for working with Lambda](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)
  * [Using NPM modules with Lambda](https://stackoverflow.com/questions/34437900/how-to-load-npm-modules-in-aws-lambda#:~:text=37-,A%20.,%2C%20committing%20to%20git%2C%20etc)

### DynamoDB
  * [CRUD functions with DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html)
  * [PutItem Command](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_PutItem.html)

### Amazon Connect
  * [Create dynamic, personalized experiences](https://aws.amazon.com/blogs/contact-center/creating-dynamic-personalized-experiences-in-amazon-connect/)
  * [Voice speed options](https://docs.aws.amazon.com/polly/latest/dg/voice-speed-vip.html)
  * [Creating instance](https://www.youtube.com/watch?v=oZCIogaOYeo&list=PL4SEtvjUqihF_n-OjIsHwqqayTsAToBOx&index=5)

### Algorithm
  * [NPM module check-word](https://www.npmjs.com/package/check-word)

### Dictionary
  * [English words in JSON](https://github.com/dwyl/english-words)

### Testing
  * lambda
  * amazon connect
  * dynamodb
  * jest

### NodeJS
  * [Nodejs downloads](https://nodejs.org/en/)

### Sample
![Amazon Connect Contact Flow](./assets/img/connect-flow.png)
![DynamoDB Table](./assets/img/dynamodb-table.png)
![Lambda Function](./assets/img/lambda.png)