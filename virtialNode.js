/*vnode 虚拟节点 */
/*jshint esversion:6 */

class VNode{
  constructor(tag, data, children, text, element){
    /*当前节点的标签名*/
    this.tag = tag;
    /*当前节点的一些数据信息，比如props、attrs等数据*/
    this.data = data;
    /*当前节点的子节点，是一个数组*/
    this.children = children;
    /*当前节点的文本*/
    this.text = text;
    /*当前虚拟节点对应的真实dom节点*/
    this.element = element;
  }
}

function createEmptyNode(){
  const node = new Node();
  node.text = '';
  return node;
}

function createTextNode(text){
  return new VNode(undefined, undefined, undefined, String(text));
}