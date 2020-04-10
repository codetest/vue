import App from "./app.vue"
import Vue from 'vue'
import { CreateElement } from "vue/types/umd"
import VueRouter from 'vue-router'
import CompA from "./compa.vue"
import CompB from "./compb.vue"
import CompC from "./compc.vue"
Vue.use(VueRouter)
const routes = [
    {path: "/compc", component: CompC},
    {path: "/compa", component: CompA},
    {path: "/compb/:id", component: CompB},
    {path: "/", component: CompB},
]

const router = new VueRouter({routes: routes})
new Vue({
    el: '#app',
    render: function(h: CreateElement) {
        return h(App);
    },
    router: router
})