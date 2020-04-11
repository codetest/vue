import * as HtmlParser from "node-html-parser"

export interface VNode{
    tag: string;
    children: VNode[];
    text: string;
    loop: boolean;
    cond: boolean;
    variable?: string;
}

export interface FuncGen{
    func: string;
    node: string;
}


export class VueCompilation{
    private static id: number = 0
    private static createNode(tag: string, text: string): HTMLElement{
        var ele = document.createElement(tag)
        var textNode = document.createTextNode(text)
        ele.appendChild(textNode)
        return ele;
    }

    private static convertToLoopExpression(node: VNode, prefix: string): FuncGen{
        var nodeName = "node" + (this.id++)
        var ret = "var " + nodeName + " = [];\r\n";
        var varaible = prefix
        if (node.variable){
            varaible = varaible + node.variable
        }

        var cloneNode: VNode = {tag: node.tag, children: node.children, text: node.text, cond: false, loop: false}
        var gen = this.converToExpression(cloneNode, nodeName + "data.")
        ret = ret + "for (var inx = 0; inx < " + varaible + ".length; ++inx){\r\n"
        ret = ret + "var " + nodeName + "data = " + varaible + "[inx]\r\n"
        ret = ret +  gen.func
        ret = ret + nodeName + ".push(" + gen.node + ")\r\n"
        ret = ret + "}\r\n"

        return {func: ret, node: nodeName}
    }


    private static extractVariable(text: string){
        const rgx: RegExp = /\{\{([^\{\}]+)\}\}/g
        var match = rgx.exec(text)
        return match[1]
    }

    private static processText(text: string, prefix: string): string{
        const rgx: RegExp = /\{\{([^\{\}]+)\}\}/g
        var outputText = ""
        var match = rgx.exec(text)
        var preInx = 0
        while(match){
            if (match.index > preInx){
                outputText = outputText + (preInx > 0 ? " + ": "") +  "\"" +  text.substr(preInx, match.index - preInx) + "\" + "
            }

            outputText = outputText + " _s(" + prefix + match[1] + ")"
            preInx = match.index + match[0].length
            match = rgx.exec(text)
        }
      
        if (preInx){
            if (preInx < text.length){
                outputText = outputText  +  " + \"" + text.substr(preInx, text.length - preInx) + "\""
            }
        }
        else {
            outputText = outputText  +  "\"" + text.substr(preInx, text.length - preInx) + "\""
        }

        return outputText
    }

    static converToExpression(node:VNode, prefix: string): FuncGen{
        var nodeName = "node" + (this.id++)
        var ret = ""
        if (node.text) {
            ret = "var " + nodeName + " = _c('" + node.tag + "', " +  this.processText(node.text, prefix) +  ")\r\n"
        }
        else{
            ret = "var " + nodeName +  " = _c('" + node.tag + "', '')\r\n" 
        }

        for (var inx = 0; inx < node.children.length; ++inx){
            if (node.children[inx].loop){
                var gen = this.convertToLoopExpression(node.children[inx], prefix)
                ret = ret + gen.func
                ret = ret + "for (var inx = 0; inx < " + gen.node + ".length; ++inx){\r\n"
                ret = ret + nodeName + ".appendChild(" + gen.node + "[inx])\r\n"
                ret = ret + "}\r\n"

            }
            else if (node.children[inx].cond)
            {
                var gen = this.converToExpression(node.children[inx], prefix)
                if (node.children[inx].variable){
                    ret = ret + "if(" + prefix + node.children[inx].variable + "){\r\n"
                    ret = ret + gen.func
                    ret = ret + nodeName + ".appendChild(" + gen.node + ")\r\n"
                    ret = ret + "}\r\n"
                }
            }
            else{
                var gen = this.converToExpression(node.children[inx], prefix)
                ret = ret + gen.func
                ret = ret + nodeName + ".appendChild(" + gen.node + ")\r\n"
            }
        }

        return {func: ret, node: nodeName}
    }

    static parseVNode(result: HtmlParser.Node): VNode {
        if (result instanceof HtmlParser.HTMLElement){
            var ele: HtmlParser.HTMLElement = result as HtmlParser.HTMLElement;
            var node: VNode = {tag: ele.tagName, children: [], text: "", loop: false, cond: false}
            if (ele.hasAttribute("v-for")){
                node.loop = true
                node.variable = this.extractVariable(ele.getAttribute("v-for"))
            }

            if (ele.hasAttribute("v-if")){
                node.cond = true
                node.variable = this.extractVariable(ele.getAttribute("v-if"))
            }

            if (ele.childNodes && ele.childNodes.length) {
                for (var inx = 0; inx < ele.childNodes.length; ++inx){
                    var subNode = this.parseVNode(ele.childNodes[inx])
                    node.children.push(subNode)
                }
            }

            if (node.children.length == 1 && (!node.children[0].tag)){
                node.text = node.children[0].text;
                node.children = []
            }

            return node;
        }
        else if (result instanceof HtmlParser.TextNode){
            var text = result as HtmlParser.TextNode;
            return {tag: "", children: [], text: text.rawText, loop: false, cond: false}
        }
    }
}