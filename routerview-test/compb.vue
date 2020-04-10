<template>
    <div @click="goBack">component b</div>
</template>
<script lang="ts">
    import {Vue, Component, Watch} from "vue-property-decorator"
    import {Route} from "vue-router"
    @Component({name: "compb"})
    export default class Comp extends Vue{
        goBack(){
            this.$router.go(-1)
        }
        @Watch("$route", {deep:true, immediate: true})
        watchRoute(to: Route, from: Route){
            if (to){
                console.log(to)
            }

            if (from){
                console.log(from)
            }
        }

        mounted(){
            console.log("compoment b mounted")
            console.log(this.$route.params)
        }

        activated() {
            console.log("compoment b activated")
        }

        deactivated() {
            console.log("compoment b deactivated")
        }

        destroyed(){
            console.log("compoment b destroyed")
        }
    }
</script>
<style scoped>

</style>
