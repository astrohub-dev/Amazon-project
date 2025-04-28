import {sumNumbers} from '../scripts/testFunction.js';

describe('test suite: sumNumbers', () => {
    it('display the sum of two numbers ', () => {
      expect(sumNumbers(299, 3)).toEqual(302);  
    });
});