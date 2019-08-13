<template>
    <div class="nav-left">
    <el-menu
      default-active="1"
      class="left-menu-vertical"
      @open="handleOpen"
      @select="handleSelect"
      :router="true"
      @close="handleClose">
      <el-menu-item :index="item.index" v-for="(item, index) in label" :key="index">
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
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(index, indexPath) {
          console.log(index, indexPath)
      }
 
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
