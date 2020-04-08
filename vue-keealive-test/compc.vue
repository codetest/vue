<template>
    <div>component c</div>
</template>
<script lang="ts">
    import {Vue, Component} from "vue-property-decorator"
    @Component({name: "compc"})
    export default class Comp extends Vue{
        mounted(){
            console.log("compoment c mounted")
        }

        activated() {
            console.log("compoment c activated")
        }

        deactivated() {
            console.log("compoment c deactivated")
        }

        destroyed(){
            console.log("compoment c destroyed")
        }
    }
</script>
<style scoped>

</style>
