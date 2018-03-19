/*jshint esversion: 6 */
/* 实现双向绑定 */

function cd(value) {
  console.log('更新世图咯');
}

function defineReactive(obj, key, val){
  Reflect.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    set: function reactiveSetter(newVal){
      if(val !== newVal) cd(newVal);
    },
    get: function reactiveGetter (){
      return val;
    }
  });
}


function observable(value) {
  if(!value || (typeof value !== 'object')){
    return;
  }

  Object.keys(value).forEach((key) => {
    defineReactive(value, key, value[key]);
  })
}

class Vue {
  constructor(options){
    this._data = options.data;
    observable(this._data);
  }
}

const vue = new Vue(
  {
    data: {
      test: 'initial Data'
    }
  }
);

vue._data.test = "i change the data!";
