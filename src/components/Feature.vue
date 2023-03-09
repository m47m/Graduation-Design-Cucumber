<template>
  <span class="feature-title">{{ featureInfo.title }}'s description</span>
  <textarea class="feature-desc" v-model="featureInfo.description"></textarea>
  <span class="feature-title">Scenario</span>
  <span class="feature-title">Download</span>
  <button class="download-btn">download for .feature</button>
  <button class="download-btn">download for .java</button>
</template>
<script setup>
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { onMounted, ref } from "vue";
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
  margin: 0;
  padding: 0;
  font-size: 2.3em;
  font-weight: 580;
  color: rgb(96, 98, 102);
}
.download-btn {
  width: 250px;
  height: 30px; 
  color: white;
  background-color: rgb(43, 100, 206);
  border-radius: 3px; 
  border-width: 0; 
  margin-right: 10px;
  outline: none; 
  font-family: KaiTi; /*字体设置为楷体*/
  font-size: 17px;
  text-align: center; /*字体居中*/
  cursor: pointer; 

}
.download-btn:hover {
	background-color: rgb(73, 73, 233);
}
</style>