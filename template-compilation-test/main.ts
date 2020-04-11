import {VueCompilation} from "./VueCompilation"
import * as HtmlParser from "node-html-parser"

var vue = '<div>\
<div>{{count}}</div>\
<button>点击我</button>\
<div>当前个数{{anotherCount}}</div>\
<div v-for="{{arr}}">{{text}}</div>\
<div v-if="{{con}}">{{text1}}</div>\
<button>更新我</button>\
</div>'


const rgx: RegExp = /\{\{([^\{\}]+)\}\}/g
function processText(text: string, prefix: string): string{
  var outputText = ""
  var match = rgx.exec(text)
  var preInx = 0
  while(match){
      outputText = outputText + "\"" + text.substr(preInx, match.index - preInx)
      outputText = outputText + "\" + _s(" + match[1] + ")"
      preInx = match.index + match[0].length
      match = rgx.exec(text)
      if (match){
        outputText = outputText + " + "
      }
  }

  
  outputText = outputText + " + \"" + text.substr(preInx, text.length - preInx)
  return outputText + "\""
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
console.log(func)