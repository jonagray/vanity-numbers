const { formattedNumWords } = require('./index');
const { validateInput } = require('./index');

test('formattedNumWords function exists', () => {
  expect(formattedNumWords).toBeDefined();
});

test('validateInput is a function', () => {
  expect(typeof validateInput).toEqual('function');
});

test('validateInput can handle a string as an input', () => {
  expect(validateInput('2067556940')).toEqual(['2067556940', '7556940', '6940', '755']);
});

test('validateInput can handle a number as an input', () => {
  expect(validateInput(2067556940)).toEqual(['2067556940', '7556940', '6940', '755']);
});

test('validateInput can remove all special characters from a string input', () => {
  expect(validateInput('(206) 755-6940')).toEqual(['2067556940', '7556940', '6940', '755']);
});

test('formattedNumWords - works for three and four digit word combinations together', () => {
  expect(formattedNumWords("2532266253")).toEqual([
    '2532266253',
    '253-226-make',
    '253-226-nake',
    '253-226-male',
    '253-226-nale',
    '253-aam-6253'
  ])
});

test('formattedNumWords - works for seven digit words', () => {
  expect(formattedNumWords("2533569377")).toEqual([
    '2533569377',
    '253-flowers',
    '253-dkm-9377',
    '253-elm-9377',
    '253-flo-9377',
  ])
});