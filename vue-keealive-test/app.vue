<template>
    <div>
        <keep-alive>
            <component v-bind:is="curComp"></component>
        </keep-alive>
        <button @click="switchTab">Switch</button>
    </div>
</template>
<script lang="ts">
    import {Vue, Component} from "vue-property-decorator"
    import CompA from "./compa.vue"
    import CompB from "./compb.vue"

    @Component({name: "app", components: {CompA, CompB}})
    export default class App extends Vue{
        curComp: string = "CompA"
        switchTab(){
            if (this.curComp == "CompA"){
                this.curComp = "CompB"
            }
            else{
                this.curComp = "CompA"
            }
        }
        mounted(){
            console.log("app mounted")
        }
    }
</script>
<style scoped>

</style>
