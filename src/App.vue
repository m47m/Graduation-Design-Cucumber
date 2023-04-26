<script setup>
import Bar from "./components/Bar.vue";
import { useRouter } from "vue-router";
const router = useRouter();

//路由跳转
const changePage = function (value) {
  router.push({ path: value });
};
</script>

<template>
  <!-- <Bar/> -->
  <!-- <el-button @click="changePage('home')">to Feature page</el-button>
  <el-button @click="changePage('report')">to Report page</el-button> -->
  <!-- <div style="margin-left: 220px;">
    <router-view></router-view>
  </div> -->
  <router-view/>
</template>

<style scoped>
</style>
