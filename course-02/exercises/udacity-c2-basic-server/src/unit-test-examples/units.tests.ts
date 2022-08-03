import { add, divide,concat } from './units';

import { expect } from 'chai';
import 'mocha';
import { it } from 'mocha';

describe('add function', () => {

  it('should add two and two', () => {
    const result = add(2,2);
    expect(result).to.equal(4);
  });

  it('should add -2 and two', () => {
    const result = add(-2,2);
    expect(result).to.equal(0);
  });

});

describe('divide', () => {

  it('should divide 6 by 3', () => {
    const result = divide(6,3);
    expect(result).to.equal(2);
  });

  it('should divide 5 and 2', () => {
    const result = divide(5,2);
    expect(result).to.equal(2.5);
  });

  it('should throw an error if div by zero', () => {
    expect(()=>{ divide(5,0) }).to.throw('div by 0')
  });

});

// @TODO try creating a new describe block for the "concat" method
// it should contain an it block for each it statement in the units.ts @TODO.
// don't forget to import the method ;)

describe('Concat Two String', () => {

  it('Should concatenate two string',()=>{
    const result = concat("Come ","Here");
    expect(result).to.equal("Come Here");
  });

  it('Should throw error ',()=>{
    expect(()=>{concat("","Here")}).to.throw('empty String');
  });
  it('Should throw error ',()=>{
    expect(()=>{concat("Come","")}).to.throw('empty String');
  });
})
