<template>
    <div>
        <div>点击次数{{count}}</div>
        <button>点击我</button>
        <div>更新次数{{anotherCount}}</div>
        <button>更新我</button>
        <div v-for="item in arr">{{item}}</div>
        <div v-if="cond">条件显示</div>
    </div>
</template>
<script lang="ts">
    import {Vue, Component, Ref} from "vue-property-decorator"
    @Component({name: "app", components: {}})
    export default class App extends Vue{
        cnt: number = 0;
        anotherCnt: number = 0
        arr: number[] = [1, 3, 6, 7]
        cond: boolean = false
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
