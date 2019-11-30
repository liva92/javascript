# javaScript综合面试题

标签（空格分隔）： JavaScript 面试 前端

---

### 1.call和apply的区别是什么，哪个性能更好？

- 联系：它们都是Function原型上的方法，每一个函数作为Function的实例，都可以调用原型上的这两个方法。这两个方法的目的都是改变函数this的指向，并且让函数立刻执行;
- 区别：call以参数列表的形式进行传参，apply以参数数组的形式进行参数；
  跟他们类似的方法还有bind(),但是bind只是预先处理改变this指向，并没有立刻执行;
- 性能：参数数量在3个以内的，性能基本一样；3个以上，call性能好一点。

```javascript
console.time() 
console.timeEnd（）
//配合使用可以测试时间
```
### 2. 实现` (5).add(3).minus(3)`,使其结果为：6

```javascript
//思路：实现实例的链式调用方法，只需在其原型上添加方法，并且返回结果为当前类的实列
(function() {
  function check(n){
    n = Number(n) 
    return isNaN(n)?0:n               
  }
	function add(n) {
    n = check(n)                 
  	return this + n;//返回结果为Number的实例
  }
  function minus(n) {
    n = check(n)
    return this - n;//返回结果为Number的实例
  }
  ['add', 'minus'].forEach(item => {
    Number.prototype[item] = eval(item);//Number原型上添加方法
  });
})();
(5).add(3).minus(3);//6
```

###  3. 箭头函数和普通函数的区别？箭头函数能否new生成实例？为什么

区别：

- 箭头函数比普通函数更加简洁（ES6语法）
- 箭头函数没有自己的this，它的this继承函数所处上下文的this（使用call/apply等任何方式都无法改变this的指向）
- 箭头函数没有arguments（类数组），只能基于...arg获得传递的参数集合（数组）
- 箭头函数不能被new执行，因为没有this,有没有prototype.

思考题：给Array原型上添加each方法

```javascript
Array.prototype.each = function() {
  let arr = [];
  for (let i = 0; i < this.length; i++) {
    isNaN(this[i]) ? arr.push(this[i]) : arr.push(this[i] * 10);
  }
  return arr;
};

let arr = [10, 20, 30, 'aa', 40];
arr.each()//[100, 200, 300, 'aa', 400]

//方法二，使用for of
Array.prototype.each = function() {
  let arr = [];
  for (let item of this) {
    arr.push(item * 2);
  }
  return arr;
};
let arr2 = [2, 3, 5];
console.log('====================================');
console.log(arr2.each());
console.log('====================================');
```

###  4.实现字符串匹配算法，从字符串S中，查找字符串T,若存在返回所在位置，不存在返回-1（不能基于内置的indexof/includes方法）

```javascript
//思路，正则匹配，原型添加方法，立即执行函数
(function() {
  function myindexOf(T) {
    //=>this:S
    let reg = new RegExp(T),
      res = reg.exec(this);
    return res === null ? -1 : res.index;
  }
  String.prototype.myindexOf = myindexOf;
})();

let s = '123pei34589',
  t = 'pei';
console.log(s.myindexOf(t));//3
```

###  5. 关于对象键值的各种表现

```javascript
//example1
var a = {},
  b = { key: '123' },
  c = { key: '456' };
a[b] = 'b';
a[c] = 'c';
console.log(a[b]); //c
/*
1.对象的属性名不能是对象（遇到对象默认转为字符串）
2.普通对象的.toString()调取的是Object.propotype上的方法，
  这个方法是用来检测数据类型的
  obj={} ,obj.toString() =>"[object object]"
  obj[b]='b' =>obj["[object object]"] ='b'
  obj[c]='c' =>obj["[object object]"] ='c',所以覆盖前面
 */

//example2
var a = {},
  b = Symbol(1),
  c = Symbol(1);
a[b] = 'b';
a[c] = 'c';
console.log(a[b]); //b
/*
1.Symbol（）创建出来的对象是唯一的，Symbol(1) ==Symbol(1)//false
*/

//example3
var a = {},
  b = 123,
  c = '123';
a[b] = 'b';
a[c] = 'c';
console.log(a[b]); //c
/*
a['123']==a[123],后面覆盖前面的
*/

```

### 6. 判断输入的内容是否为正确的网址

```javascript
let reg = /^(?:(http|https|ftp):\/\/)?((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i;
let str = 'http://www.baidu.cn/index.html?key=i&value=val#erf';
console.log(reg.exec(str));
/*输出结果如下
[ 'http://www.zhufengpeixun.cn/index.html?key=i&value=val#erf',
  'http',
  'www.zhufengpeixun.cn',
  '/index.html',
  '?key=i&value=val',
  '#erf',
  index: 0,
  input: 'http://www.zhufengpeixun.cn/index.html?key=i&value=val#erf',
  groups: undefined ]
*/

```

### 7. 根据原型与原型链输出结果

```javascript
function Foo() {
  Foo.a = function() {
    console.log('1');
  };
  this.a = function() {
    console.log(2);
  };
}
Foo.prototype.a = function() {
  console.log('3');
};
Foo.a = function() {
  console.log(4);
};
Foo.a(); //=>4
let obj = new Foo(); //this指向obj,此时obj.a:f=>2, Foo.a被覆盖，为：f=>1
obj.a(); //=>2
Foo.a(); //=>1
```

### 8. 图片懒加载

 * 1.前端优化方案

   + 通过图片或数据的延迟加载，我们可以加快页面首屏渲染的速度
   + 只有滑动到某个区域，我们才加载真实的图片，可以节省流量

 * 2.处理方案

   + 把所有需要通过延迟加载的图片用一个盒子包起来，设置宽高和默认占位图

   + 开始让所有的 img 的 `src` 为空，把真实的图片地址放在`data-img` 自定义属性上，

   ​         让img 隐藏

   + 等到所有其他资源加载完成后，才开始加载图片

   + 对于加载很多图片，需要页面滚动，图片区域完全显示出来再加载真实图片

   ##### 8.1 加载一张图片


```javascript
//index.html,注意引入了jquery
<div class="imgbox">
    <img src="" alt="图片" data-img="./images/panorama.jpg" />
</div>  

//delayImag.js
var $imgBox = $('.imgbox'),
  	$img = $imgBox.children('img'),
  	$window = $(window);
//JQ支持多事件绑定
$window.on('load scroll', function() {
  //如果图片已经加载，不会重复加载
  if ($img.attr('isload') === 'true') {
    return '';
  }
  //outerHeight()获取元素本身高度，offseet().top获取图片距离body顶部的偏移量
  let $A = $imgBox.outerHeight() + $imgBox.offset().top;
  let $B = $window.outerHeight() + $window.scrollTop();
  //加载图片条件
  if ($A <= $B) {
    $img.attr('src', $img.attr('data-img'));
    $img.on('load', function() {
      //加载成功
      //$img.css('display', 'block');
      // fadeIn()是 jquery 的渐变动画函数
      $img.stop().fadeIn();
    });
    $img.attr('isload', true); //attr存储的自定义属性值都是字符串格式
  }
});
```

##### 8.2 加载多张图片

```javascript
//index2.html,对比上面，外面包裹多一个class 为 container 的 div 标签  
<div class="container">
 //这里插入图片
</div>

//delayImag.js
let $container = $('.container'),
  $imgBoxs = null,
  $window = $(window),
  imgArr = Array(20), //服务端获取图片资源
  str = '';
imgArr.foreach(item => {
  str += `<div class="imgbox">
             <img src="" alt="图片" data-img="item.src" />
          </div>`;
});
$container.html(str);
$imgBoxs = $contaider.children('./imgbox');

//多张图片延迟加载
$window.on('load scroll', function() {
  //$B ：获取浏览器底边框距离 body 顶部的距离
  let $B = $window.outerHeight() + $window.scrollTop();
  //循环每一张图片，根据自己距离  body 顶部的距离，计算是否要加载
  $imgBox.each((index, item) => {
    let $item = $(item);
    $itemA = $item.outerHeight() + $item.offset().top;
    if ($item <= $B && isLoad !== 'true') {
      $item.attr('isLoad', true);
      //加载当前区域的图片
      let $img = $item.children('img');
      $img.attr('src', $img.attr('data-img'));
      $img.on('load', () => $img.stop().fadeIn());
    }
  });
});
```

###  9. 实现一个 $attr(name,value)的遍历，属性为name,值为value 的元素集合

```javascript
function $attr(property, value) {
  let elements = document.getElementsByTagName('*');
  let arr = [];
  [].forEach.call(elements, item => {
    //获取当前元素的属性值
    let itemValue = item.getAttribute(property);
    //属性为 class 的要特殊处理
    if (property === 'class') {
      new RegExp('\\b' + value + '\\b').test(itemValue) ? arr.push(item) : '';
      return;
    }
    if (itemValue === value) {
      arr.push(item);
    }
  });
  //返回给定属性值的标签元素集合
  return arr;
}

```

### 10、正则给英语单词前后加空格

![reg00](C:\Users\67564\Desktop\面试\images\reg00.png)

### 11、数组扁平化及去重[1,2[2,4,[4,6,[7,8]]]]

11.1使用ES6提供的`Array.prototype.flat` 和`new Set()`

![1574824123405](C:\Users\67564\Desktop\面试\images\reg01.png)

11.2 将数组变为字符串

![arr00](C:\Users\67564\Desktop\面试\images\arr00.png)

11.3调用`JSON.stringify`

![arr01](C:\Users\67564\Desktop\面试\images\arr01.png)

11.4基于数组的`some()`方法判断

![1574825672241](C:\Users\67564\Desktop\面试\images\arr02.png)

11.5 递归处理

![1574826024914](C:\Users\67564\Desktop\面试\images\arr03.png)



###  12、实现一个` _new`方法，模拟内置`new`的结果

![1574827103802](C:\Users\67564\Desktop\面试\images\fn00.png)

![1574826920665](C:\Users\67564\Desktop\面试\images\fn.01.png)

### 13、数组合并

![1574846311291](C:\Users\67564\Desktop\面试\images\arr04.png)

13.1用数组`includes`方法和索引记录

![1574846565631](C:\Users\67564\Desktop\面试\images\arr05.png)

13.2 使用字符串`localeCompare()`方法![1574993199324](C:\Users\67564\Desktop\面试\images\arr06.png)

### 14、setTimeou异步处理

![1574993600579](C:\Users\67564\Desktop\面试\images\asnys00.png)

### 15、匿名函数调用

15.1 

![1574993953876](C:\Users\67564\Desktop\面试\images\func01.png)

15.2 参数覆盖匿名函数名称

![func02](C:\Users\67564\Desktop\面试\images\func02.png)

### 16、隐式数据类型转换

![1574994420864](C:\Users\67564\Desktop\面试\images\type00.png)

![1574994640741](C:\Users\67564\Desktop\面试\images\type01.png)

```javascript
/* var a=?
    if(a == 1 && a== 2 && a == 3){
       console.log('ok')                          
    }
*/
//方法一：
var a = {
  n: 0,
  toString: function() {
    return ++this.n;
  }
};

//方法二：
let n = 0;
Object.defineProperties(window, 'a', {
  get: function() {
    return ++n;
  }
});
```

### 17、重写数组的`Push`方法

![1574995701807](C:\Users\67564\Desktop\面试\images\arr07.png)

![](C:\Users\67564\Desktop\面试\images\arr08.png)

### 18 、冒泡排序

```javascript
     // 冒泡排序
        function bubble(arr) {
          let len = arr.length - 1;
          //外层遍历循环的次数
          for (let i = 0; i < len; i++) {
                                                                                     //内存循环每次比较的次数
            for (let j = 0; j < len - i; j++) {
              if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
              }
            }
          }
          return arr;
        }
        let arr1 = [12, 5, 16, 9, 24, 1, 7];
        console.log('====================================');
        console.log(bubble(arr1));
        console.log('====================================');
```

### 19、插入排序

```javascript
      //插入排序
      function insert(arr) {
        let handle = [];
        let len = arr.length;
        handle.push(arr[0]);

        for (let i = 1; i < len; i++) {
          let A = arr[i];
          for (let j = handle.length - 1; j >= 0; j--) {
            let B = handle[j];
            if (A > B) {
              handle.splice(j + 1, 0, A);
              break;
            }
            if (j === 0) {
              handle.unshift(A);
            }
          }
        }
        return handle;
      }
      let arr = [12, 8, 24, 16, 1];
      console.log(insert(arr));
```

###  20、快速排序

```javascript
 function quick(arr) {
   if (arr.length <= 1) {
     return arr;
   }
   let middleIndex = Math.floor(arr.length / 2);
   let middleValue = arr.splice(middleIndex, 1)[0];
   let arrLeft = [],
     arrRight = [],
     len = arr.length;
   for (let i = 0; i < len; i++) {
     let item = arr[i];
     item < middleValue ? arrLeft.push(item) :                          arrRight.push(item);
   }

   return quick(arrLeft).concat(middleValue, quick(arrRight));
 }

 arr1 = [12, 5, 16, 9, 24, 1, 7];
 console.log('====================================');
 console.log(quick(arr1));
 console.log('====================================');
```

