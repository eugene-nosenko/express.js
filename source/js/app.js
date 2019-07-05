import {
  square,
  MyClass
} from './module';

console.log(square(5));
var cred = {
  name: 'LS Kuchma',
  enrollmentNo: 11115078
};
var x = new MyClass(cred);
console.log(x.getName());