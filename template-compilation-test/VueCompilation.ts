import * as HtmlParser from "node-html-parser"

export interface VNode{
    tag: string;
    children: VNode[];
    text: string;
    loop: boolean;
    cond: boolean;
    data: string[];
}

export interface FuncGen{
    func: string;
    node: string;
}

String.prototype.format = function(data: Object) {
    var ret = this;
    for (var k in data) {
      ret = ret.replace("{{" + k + "}}", data[k])
    }

    return ret
}

const rgx: RegExp = /\{\{([^\{\}]+)\}\}/g

export class VueCompilation{
    private static id: number = 0
    private static createNode(tag: string, text: string): HTMLElement{
        var ele = document.createElement(tag)
        var textNode = document.createTextNode(text)
        ele.appendChild(textNode)
        return ele;
    }

    private static convertToLoopExpression(node: VNode): FuncGen{
        var nodeName = "node" + (this.id++)
        var ret = "var " + nodeName + " = [];\r\n";
        for (var inx = 0; inx < node.children.length; ++inx){
            var gen = this.converToExpression(node.children[inx])
            ret = ret + gen.func;
            ret = nodeName + ".push(" + gen.node + ")\r\n"
        }

        return {func: ret, node: nodeName}
    }

    static converToExpression(node:VNode): FuncGen{
        var nodeName = "node" + (this.id++)
        var ret = "var " + nodeName +  " = document.createElement('" + node.tag + "')\r\n" 
        if (node.text) {
            ret = ret + nodeName + ".appendChild(document.createTextNode('" + node.text +  "'))\r\n"
        }

        for (var inx = 0; inx < node.children.length; ++inx){
            if (node.children[inx].loop){
                var gen = this.convertToLoopExpression(node.children[inx])
                ret = ret + gen.func
                ret = ret + "for (var inx = 0; inx < " + gen.node + ".length; ++inx){\r\n"
                ret = ret + "\t" + nodeName + ".appendChild(" + gen.node + "[inx])\r\n"
                ret = ret + "}\r\n"

            }
            else{
                var gen = this.converToExpression(node.children[inx])
                ret = ret + gen.func
                ret = ret + nodeName + ".appendChild(" + gen.node + ")\r\n"
            }
        }

        return {func: ret, node: nodeName}
    }

    private static processText(node: VNode, prefix: string){
        var match = rgx.exec(node.text)
        while(match){
            node.data.push(prefix + "." + match[1])
            match = rgx.exec(node.text)
        }
    }

    static parseVNode(result: HtmlParser.Node, prefix: string): VNode {
        if (result instanceof HtmlParser.HTMLElement){
            var ele: HtmlParser.HTMLElement = result as HtmlParser.HTMLElement;
            var node: VNode = {tag: ele.tagName, children: [], text: "", loop: false, cond: false, data: []}
            if (ele.hasAttribute("v-for")){
                node.loop = true
            }

            if (ele.hasAttribute("v-if")){
                node.cond = true
            }

            if (ele.childNodes && ele.childNodes.length) {
                for (var inx = 0; inx < ele.childNodes.length; ++inx){
                    var subNode = this.parseVNode(ele.childNodes[inx], prefix)
                    node.children.push(subNode)
                }
            }

            if (node.children.length == 1 && (!node.children[0].tag)){
                node.text = node.children[0].text;
                this.processText(node, prefix)
                node.children = []
            }

            return node;
        }
        else if (result instanceof HtmlParser.TextNode){
            var text = result as HtmlParser.TextNode;
            return {tag: "", children: [], text: text.rawText, loop: false, cond: false, data: []}
        }
    }
}