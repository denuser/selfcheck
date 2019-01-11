import { main } from '../server/HelloWorld';
import { expect } from 'chai';
import 'mocha';

describe('Hello function', () => {

  it('should return hello world', () => {
    const result = main();
    expect(result).to.equal('hello world');
  });

});