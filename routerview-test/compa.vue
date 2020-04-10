<template>
    <div>{{msg}}</div>
</template>
<script lang="ts">
    import {Vue, Component} from "vue-property-decorator"
    @Component({name: "compa"})
    export default class Comp extends Vue{
        msg: string = ""
        mounted() {
            this.msg = "component a " +  new Date().toString();
            console.log("compoment a mounted")
        }

        activated() {
            console.log("compoment a activated")
        }

        deactivated() {
            console.log("compoment a deactivated")
        }

        destroyed(){
            console.log("compoment a destroyed")
        }
    }
</script>
<style scoped>

</style>
