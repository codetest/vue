<template>
    <div>component a</div>
</template>
<script lang="ts">
    import {Vue, Component} from "vue-property-decorator"
    @Component({name: "compa"})
    export default class Comp extends Vue{
        mounted() {
            console.log("compoment a mounted")
        }

        activated() {
            console.log("compoment a activated")
        }

        deactivated() {
            console.log("compoment a deactivated")
        }
    }
</script>
<style scoped>

</style>
