<script setup>

import { reactive } from "vue";
import bar from "./components/Bar.vue";
import project from "./pages/project.vue";
import midbar from "./components/MidBar.vue";
import * as echarts from "echarts";
import { provide } from "vue";
provide("echarts", echarts);


const selectedProject = reactive({});
const selectProject = function (project) {
  selectedProject.id = project.id;
  selectedProject.name = project.name;
  selectedProject.flag = project.flag;
  selectedProject.features = project.features;

  console.log(selectedProject);
};
const projects = reactive([
  {
    id: 0,
    name: "project1",
    flag: 1,
    features: [
      {
        id: 0,
        title: "feature1",
      },
      {
        id: 1,
        title: "feature2",
      },
      {
        id: 2,
        title: "feature3",
      },
    ],
  },
  {
    id: 1,
    name: "project2",
    flag: 1,
    features: [
      {
        id: 3,
        title: "feature4",
      },
      {
        id: 4,
        title: "feature5",
      },
      {
        id: 5,
        title: "feature6",
      },
    ],
  },
]);


</script>

<template>
  <div>
    <!-- <div class="side">
      <bar @select-project="selectProject" :projects="projects"/>
    </div>
    <div class="mid">
      <midbar :selected="selectedProject" />
    </div>
    <div class="container">
      <router-view></router-view>
    </div> -->

    
  </div>
 
</template>

<style scoped>
.side {
  position: fixed;
  background-color: white;
  left: 0;
  bottom: 0;
  top: 0;
  z-index: 101;
  padding-top: 5px;

  width: 130px;

  display: flex;
  flex-direction: column;
}
.mid {
  position: fixed;
  background-color: ghostwhite;
  left: 130px;
  bottom: 0px;
  top: 0px;
  z-index: 101;
  padding-top: 5px;

  width: 100px;
  display: flex;
  flex-direction: column;
}
.container{
  width: 100%;
  height: 100vh;
  margin-left: 230px;
  padding-left: 20px;
 
}
</style>
