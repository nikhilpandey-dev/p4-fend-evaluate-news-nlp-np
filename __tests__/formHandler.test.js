
// const handleSubmit = require('../src/client/js/formHandler')
import { handleSubmit } from '../src/client/js/formHandler'
import { isValidURL } from '../src/client/js/formHandler'

// Checking if a valid handleSubmit Function exists
test('handleSubmit function exists', () => {
    expect(handleSubmit).toBeDefined();
});

// Checking if a isValidURL Functions exists
test('isValidURL function exists', () => {
    expect(isValidURL).toBeDefined();
});

// Checking if a isValidURL Function returnd valid values
test('isValidURL returnd proper values', () => {
    const invalidURL = "Hello, world!"
    expect(isValidURL(invalidURL)).toBeFalsy();
    const validURL = "https://stackoverflow.com/";
    expect(isValidURL(validURL)).toBeTruthy();

});