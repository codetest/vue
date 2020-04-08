<template>
    <div>component b</div>
</template>
<script lang="ts">
    import {Vue, Component} from "vue-property-decorator"
    @Component({name: "compb"})
    export default class Comp extends Vue{
        mounted(){
            console.log("compoment a mounted")
        }
    }
</script>
<style scoped>

</style>
