import App from "./app.vue"
import Vue from 'vue'
import { CreateElement } from "vue/types/umd"
new Vue({
    el: '#app',
    render: function(h: CreateElement) {
        return h(App);
    },
})