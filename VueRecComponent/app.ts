import App from "./app.vue"
import Vue from 'vue'
import SampleComp from "./component/Sample.vue"
import { CreateElement } from "vue/types/umd"
Vue.component("SampleComp", SampleComp)
new Vue({
    el: '#app',
    render: function(h: CreateElement) {
        return h(App);
    }
})