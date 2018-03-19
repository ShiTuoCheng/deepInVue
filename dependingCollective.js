/*jshint esversion: 6 */
/* 依赖收集 */

// 收集
class Discriptor {
  constructor(){
    this.subscriber = [];
  }

  //添加一个watcher
  addSub(sub){
    this.subscriber.push(sub);
  }

  // 通知所有watcher更新世图
  notifySub(){
    this.subscriber.forEach((sub) => {
      sub.update();
    });
  }
}

// watcher
class Watcher{

  constructor(){
    Discriptor.target = this;
  }

  update(){
    console.log('试图更新了');
  }
}

Discriptor.target = null;

function observable(value) {
  if (!value || typeof value !== "object") {
    return;
  }

  Object.keys(value).forEach(key => {
    defineReactive(value, key, value[key]);
  });
}

function defineReactive(obj, key, val){

  const discriptor = new Discriptor();

  Reflect.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    set: function(newVal){
      if(val === newVal) return;

      discriptor.notifySub();
    },

    get: function(){
      discriptor.addSub(Discriptor.target);
      return val;
    }
  })
}

class Vue {
    constructor(options) {
        this._data = options.data;
        observable(this._data);
        /* 新建一个Watcher观察者对象，这时候Dep.target会指向这个Watcher对象 */
        new Watcher();
        /* 在这里模拟render的过程，为了触发test属性的get函数 */
        console.log('render~', this._data.test);
    }
}

const vue = new Vue({
  data: {
    test: "initial Data"
  }
});

vue._data.test = "i change the data!";