<template>
    <div class="nav-left">
    <el-menu
      default-active="label"
      class="left-menu-vertical"
      :router="true">
      <el-menu-item :index="item.path" v-for="(item, index) in label" :key="index">
        <i :class="item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>
    </el-menu>
 
    </div>
</template>
<script>
import {label} from "@/components/config.js"
export default {
    data() {
        return {
            label: label
        };
    },
    props: {
    },
    methods: {

 
    }
}
</script>

<style lang="scss">
@import "@/style/varStyle.scss";
  .nav-left{
      width: 100%;
      height: calc(100vh - 60px);
      .left-menu-vertical{
          height: 100%;
      }
  }
</style>
