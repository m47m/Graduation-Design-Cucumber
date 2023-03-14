<template>
  <span class="feature-title">{{ featureInfo.title }}'s description</span>
  <el-input
    v-model="featureInfo.description"
    :rows="3"
    type="textarea"
    placeholder="Please input"
  />
  
  <div class="feature-title">
    Scenarios
    <el-button style="color:cadetblue">+New</el-button>
  </div>


  <Scenario/>
  <Scenario/>
  <Scenario/>

  <button class="download-btn">download for .feature</button>
  <button class="download-btn">download for .java</button>
</template>
<script setup>
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { onMounted, ref } from "vue";
import  Scenario from "../components/Scenario.vue"
const route = useRoute();

const featureId = ref(0);

const featureInfo = {
  id: 0,
  title: "feature1",
  description: "用户功能描述",
  scenarios: [
    {
      id: 0,
      name: "scenarios1",
      content: "when i login \n then i quit this page",
      tags: ["login", "user"],
    },
    {
      id: 1,
      name: "scenarios2",
      content: "when i login \n then i quit this page",
      tags: ["login", "user"],
    },
  ],
};

onBeforeRouteUpdate((to) => {
  console.log(to, "路由变动");
  featureId.value = to.query.id;
});
onMounted(() => {
  featureId.value = route.query.id;
});
</script>

<style scoped>
.feature-desc {
  color: black;
  width: 70%;
  background: white;
  font-weight: 500;
}
.feature-title {
  display: block;
  text-align: left;
  margin-bottom: 10px;
  padding: 0;
  font-size: 2.3em;
  font-weight: 580;
  color: rgb(96, 98, 102);
}

.download-btn{
  display: block;
  margin-bottom: 10px;
  color:white
}
</style>