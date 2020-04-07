<template>
    <div>
        <div class="msg">{{msg}}</div>
        <SampleComp v-if="innerSample.Count > 0" :sample="innerSample"></SampleComp>
    </div>
</template>
<script lang="ts">
    import Vue from "vue"
    import {Component, Prop, Watch} from "vue-property-decorator"
    import {Sample} from "../model/Sample"
    @Component({name: "Sample"})
    export default class App extends Vue{
        @Prop()
        sample: Sample;
        msg: string = "点击了0次"
        innerSample: Sample = {Count: 0}

        @Watch("sample", {immediate: true, deep: true})
        onSampleUpdate(val: Sample, oldVal: Sample){
            if (!oldVal){
                return;
            }

            this.msg = "点击了" + val.Count.toString() + "次"
            this.innerSample.Count = val.Count - 1
        }

        mounted(){
            this.innerSample.Count = this.sample.Count - 1;
            this.msg = "点击了" + this.sample.Count.toString() + "次"
        }
    }
</script>
<style scoped lang="css">
    .msg {
        color: red;
    }
</style>