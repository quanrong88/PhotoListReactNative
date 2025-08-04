// utils/utils.test.js
import { addNumbers } from '../utils/utils';

describe('addNumbers', () => {
  it('adds two numbers correctly', () => {
    expect(addNumbers(2, 3)).toBe(5);
  });
});
