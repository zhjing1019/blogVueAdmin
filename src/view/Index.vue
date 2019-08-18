<template>
  <div class="index-main">
    <fix-header></fix-header>
    <el-row class="admin-main">
        <el-col :span="4" class="">
          <nav-left></nav-left>
        </el-col>
        <el-col :span="20">
          <router-view></router-view>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import FixHeader from "@/components/FixHeader.vue";
import NavLeft from "@/components/NavLeft.vue"
export default {
  components: {FixHeader, NavLeft}
}
</script>

<style lang="scss">
.index-main {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  .admin-main{
    height: calc(100vh - 60px);
    padding-top: 60px;
  }
}
</style>
