#  js错误类型

### 1、Error 

所有错误的父类型

### 2、ReferenceError 

引用的变量不存在 

```javascript
console.lof(a)//"ReferenceError: 'a' is not defined
```

###  3、TypeError

数据类型不正确

```javascript
let a
console.lof(a.xx)
//"TypeError: Unable to get property 'xx' of undefined or null reference
```

### 4、RangeError

数据值不在允许范围

```javascript
function fn(){
  fn()
}
fn()
// Uncaught RangeError: Maximum call stack size exceeded
```

### 5、SyntaxError

语法错误

```javascript
let b ="""" //Uncaught SyntaxError: Unexpected string

```

