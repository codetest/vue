<template>
    <div>component b</div>
</template>
<script lang="ts">
    import {Vue, Component} from "vue-property-decorator"
    @Component({name: "compb"})
    export default class Comp extends Vue{
        mounted(){
            console.log("compoment b mounted")
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
