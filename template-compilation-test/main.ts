import {VueCompilation} from "./VueCompilation"
import * as HtmlParser from "node-html-parser"

var vue = '<div>\
<div>{{count}}</div>\
<button>点击我</button>\
<div>{{anotherCount}}</div>\
<button>更新我</button>\
</div>'

var root = VueCompilation.parseVNode(HtmlParser.parse(vue), "data")
var ret = VueCompilation.converToExpression(root.children[0])
console.log(ret.func)