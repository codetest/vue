import {VueCompilation} from "./VueCompilation"
import * as HtmlParser from "node-html-parser"

var vue = '<div>\
<div>{{count}}</div>\
<button>点击我</button>\
<div>当前个数{{anotherCount}}</div>\
<div v-for="{{arr}}">{{text}}</div>\
<div v-if="{{con}}"><div v-for="{{arr1}}">{{text}}</div></div>\
<button>更新我</button>\
</div>'

var data = {
  count: 9,
  anotherCount: 10,
  con: 2,
  arr: [
    {
      text: "text1"
    },
    {
      text: "text2"
    },
    {
      text: "text3"
    }
  ],
  arr1: [
    {
      text: "text1"
    },
    {
      text: "text2"
    },
    {
      text: "text3"
    }
  ]
}

var root = VueCompilation.parseVNode(HtmlParser.parse(vue))
var ret = VueCompilation.converToExpression(root.children[0], "data.")
var funcPrefx = 
"function _c(tag, txt){\r\n\
  var ele = document.createElement(tag)\r\n\
  if (txt){\r\n\
    ele.appendChild(document.createTextNode(txt))\r\n\
  }\r\n\
  return ele\r\n\
}\r\n\
function _s(val){\r\n\
   return val.toString()\r\n\
}\r\n\
"
var func = funcPrefx + ret.func
func = "var data = " + JSON.stringify(data) + "\r\n" + func
func = func + "document.getElementById('app').appendChild(node0)\r\n"
var html = '\
<div id="app">\r\n\
</div>\r\n\
<script type="text/javascript">\r\n'
html = html + func + '</script>\r\n'
console.log(html)