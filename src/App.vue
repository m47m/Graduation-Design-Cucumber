<script setup>
import { ref, reactive } from "vue";
import bar from "./components/Bar.vue";
import project from "./pages/project.vue";
import midbar from "./components/MidBar.vue";
import FeatureTable from "./pages/FeatureTable.vue";
import Feature from "./components/Feature.vue";
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

const drawer = ref(false);

const selectFeature = function(id){
  console.log("select row " + id)
  drawer.value = true;
}
</script>

<template>
  <div class="container">
    <!-- <div class="side">
      <bar @select-project="selectProject" :projects="projects"/>
    </div>
    <div class="mid">
      <midbar :selected="selectedProject" />
    </div>
    <div class="container">
      <router-view></router-view>
    </div> -->
    <div class="left-bar">
      <el-button
        type="primary"
        style="margin-left: 16px"
        @click="drawer = true"
      >
        open
      </el-button>
    </div>
    <div class="mid-bar">
      <div class="feature-table">
        <FeatureTable @select-feature="selectFeature" />
      </div>
    </div>

    <div class="right-bar"></div>
  </div>

  <el-drawer
    v-model="drawer"
    title="I am the title"
    :with-header="false"
    size="45%"
    class="feature-drawer"
  >
    <Feature />
  </el-drawer>
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
/* .container{
  width: 100%;
  height: 100vh;
  margin-left: 230px;
  padding-left: 20px;
} */

.container {
  padding: 0;
  margin: 0;
  display: flex;
  height: 100vh;
  width: 100vw;
}
.left-bar {
  flex: 1;
}
.mid-bar {
  flex: 2;
}
.feature-table {
  margin-left: 20px;
  margin-right: 20px;
}
.right-bar {
  flex: 1;
}

.feature-drawer {
  background-color: azure;
}
</style>
