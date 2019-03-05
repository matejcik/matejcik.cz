import Vue from "vue"
import "pug-vdom/runtime"

function handleModel(elem, properties, ctx, model, data) {
    let defaultHandler = ev => {
        let val = ev
        if (ev instanceof Event)
            val = ev.target.value
        eval(`ctx.${model} = val`)
    }

    let value = eval(`ctx.${model}`)
    let type = properties.attributes.type

    if (elem == "input") {
        if (type == "checkbox") {
            data.attrs.checked = Boolean(value)
            let handler = ev => eval(`ctx.${model} = ev.target.checked`)
            data.on.input = handler
            data.on.change = handler
            return
        } else if (type == "select") {
            throw "TODO"
        } else if (type == "radio") {
            throw "TODO"
        }
    } else if (elem == "textarea") {
        data.on.input = defaultHandler
        return value
    }

    data.attrs.value = value
    data.on.input = defaultHandler
}

function filterCreateElement(createElement, ctx) {
    return function(elem, properties, children) {
        let attrs = {}
        let data = {
            on: {},
            attrs: attrs,
            props: attrs,
        }

        if (elem == "slot") {
            if (ctx.$slots.default)
                return ctx.$slots.default
            else
                return children
        }

        for (let key in properties.attributes) {
            let val = properties.attributes[key]
            if (key.startsWith("@")) {
                let evkey = key.replace(/^@/, "")
                data.on[evkey] = val
            } else if (key == "$model") {
                let res = handleModel(elem, properties, ctx, val, data)
                if (res !== undefined) children = res
            } else if (key == "$raw") {
                data.domProps = { innerHTML: val }
            } else if (key == "style") {
                data.style = val
            } else if (key == "class") {
                data.class = val
            } else {
                attrs[key] = val
            }
        }

        return createElement(elem, data, children)
    }
}

export function pugTemplate(tmpl) {
    return function(vueCreateElement) {
        let h = filterCreateElement(vueCreateElement, this)
        let attribKeys = [
            ...Object.keys(this.$data || {}),
            ...Object.keys(this.$props || {}),
            ...Object.keys(this.$options.computed || {}),
            ...Object.keys(this.$options.methods || {}),
        ]

        let concreteObject = { "$": this }
        for (let key of attribKeys) {
            concreteObject[key] = this[key]
        }
        let nodes = tmpl(concreteObject, h)
        if (nodes.length > 1) {
            throw "More than one root node for component"
        }
        return nodes[0]
    }
}

export default function(name) {
    let tmpl = require(`./components/${name}.pug`)
    let options = require(`./components/${name}.js`).default
    options.render = pugTemplate(tmpl)
    return Vue.component(name, options)
}
