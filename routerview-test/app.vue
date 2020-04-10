<template>
    <div>
        <p>
            <router-link to="/compa">go to compa</router-link>
            <router-link to="/compb/xo">go to compb</router-link>
            <router-link to="/compb/xo1">go to compb 1</router-link>
            <router-link to="/compc">go to compc</router-link>
        </p>
        <router-view></router-view>
    </div>
</template>
<script lang="ts">
    import {Vue, Component} from "vue-property-decorator"
    import CompA from "./compa.vue"
    import CompB from "./compb.vue"
    import CompC from "./compc.vue"

    @Component({name: "app", components: {CompA, CompB, CompC}})
    export default class App extends Vue{
        mounted(){
            console.log("app mounted")
        }
    }
</script>
<style scoped>

</style>
