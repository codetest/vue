import {VueCompilation} from "./VueCompilation"
import * as HtmlParser from "node-html-parser"

String.prototype.format = function(args: any[]) {
    var ret = this;
    for (var k in args) {
      ret = ret.replace("{" + k + "}", args[k])
    }

    return ret
}

String.prototype.matchAll = function(regexp: RegExp): any[] {
    var matches = [];
    this.replace(regexp, function() {
      var arr = ([]).slice.call(arguments, 0);
      var extras = arr.splice(-2);
      arr.index = extras[0];
      arr.input = extras[1];
      matches.push(arr);
    });
    return matches.length ? matches : null;
  };

var vue = '<div>\
<div>{{count}}</div>\
<button>点击我</button>\
<div>{{anotherCount}}</div>\
<button>更新我</button>\
<div :v-for="(item, index) in array">{{item}}</div>\
</div>'

// var root = VueCompilation.parseVNode(HtmlParser.parse(vue))
// console.log(root)
vue.match("a")
var rgx = /\{\{[^\{\{\}\}]\}\}/g
var arr = vue.matchAll(rgx)
console.log(arr)