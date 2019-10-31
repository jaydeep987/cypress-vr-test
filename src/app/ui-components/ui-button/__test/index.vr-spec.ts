/// <reference types="Cypress" />
import { TestComponent } from '../../../../utils/vr-test/test-component';

new TestComponent().test();

// describe('Outer layer', () => {
//   before(() => {
//     console.log('baap');
//     console.log(require('./data'));
//   });

//   it('should pass all tests', () => {
//     console.log('first it');
//     expect(true).to.equal(true);
//   });

//   describe('Inner layer', () => {
//     console.log('this fucking ......');
//     before(() => {
//       console.log('beta');
//     });

//     [1,2,3,4].forEach((num) => {
//       it(`should be ${num}`, () => {
//         expect(num).to.equal(num);
//         console.log('inner ----', num);
//       });
//     });
//   });
// });
