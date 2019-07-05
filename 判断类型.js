let isType = type => obj => {
  return Object.prototype.toString.call(obj) === '[object ' + type + ']';
};

console.log(isType('String')('123')); // true
console.log(isType('Array')([1, 2, 3])); // true
//  这里就是一个高阶函数，因为 isType 函数将 obj => { ... } 这一函数作为返回值输出。
