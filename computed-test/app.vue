<template>
    <div>
        <div>{{count}}</div>
        <button @click="addClick">点击我</button>
        <div>{{anotherCount}}</div>
        <button @click="addAnotherClick">更新我</button>
    </div>
</template>
<script lang="ts">
    import {Vue, Component, Ref} from "vue-property-decorator"
    @Component({name: "app", components: {}})
    export default class App extends Vue{
        cnt: number = 0;
        anotherCnt: number = 0
        mounted(){
            console.log("app mounted")
        }

        get count() : number{
            return this.cnt + 1;
        }

        get anotherCount() : number{
            return this.anotherCnt + 1;
        }

        addClick() {
            this.cnt++;
        }

        addAnotherClick() {
            this.anotherCnt++;
        }
    }
</script>
<style scoped>

</style>
