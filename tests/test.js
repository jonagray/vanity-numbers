const { formattedNumWords } = require('../helpers/formattedNumberWords');
const { validateInput } = require('../helpers/validateInput');

test('formattedNumWords function exists', () => {
  expect(formattedNumWords).toBeDefined();
});

test('validateInput is a function', () => {
  expect(typeof validateInput).toEqual('function');
});

test('validateInput can handle a string as an input', () => {
  expect(validateInput('2065476944')).toEqual(['2065476944', '5476944', '6944', '547']);
});

test('validateInput can handle a number as an input', () => {
  expect(validateInput(2065476944)).toEqual(['2065476944', '5476944', '6944', '547']);
});

test('validateInput can remove all special characters from a string input', () => {
  expect(validateInput('(206) 547-6944')).toEqual(['2065476944', '5476944', '6944', '547']);
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

test('formattedNumWords - works phone numbers containing 0 or 1 in the 4-digit chunk', () => {
  expect(formattedNumWords("2066976941")).toEqual([
    '2066976941',
    '206-ozs-6941'
  ])
});

test('formattedNumWords - works phone numbers containing 0 or 1 in the 3-digit chunk', () => {
  expect(formattedNumWords("2066916253")).toEqual([
    '2066916253',
    '206-691-make',
    '206-691-nake',
    '206-691-male',
    '206-691-nale',
  ])
});