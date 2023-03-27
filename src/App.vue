<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

//路由跳转
const changePage = function (value) {
  router.push({ path: value });
};
</script>

<template>
  <el-button @click="changePage('home')">to Feature page</el-button>
  <el-button @click="changePage('report')">to Report page</el-button>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
</style>
