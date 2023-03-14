<template>
  <span class="project-title">{{ projectInfo.name }}'s dashboard</span>

  <button class="update-btn">update csv data</button>

	<div class="pic-title" @click="toReport(projectInfo.id)">Wait for json data</div>
  <div id="main"></div>
  <div id="maychar"></div>

</template>
<script setup>
import {useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import { onMounted, ref, inject } from "vue";
const route = useRoute();
const router = useRouter();

const projectId = ref(0);

let echarts = inject("echarts");
const toReport = function(value){
  if(value !== undefined){
    router.push({path:'/report',query:{id:value}})
  }
}

const projectInfo = {
  id: 0,
  name: "project1",
  description: "项目描述",
};

const change = () => {
  const chartBox = echarts.init(document.getElementById("main")); // 主要
  const option = {
    xAxis: {
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {},
    series: [
      {
        type: "bar",
        data: [23, 24, 18, 25, 27, 28, 25],
      },
    ],
  };
  chartBox.setOption(option);
  // 根据页面大小自动响应图表大小
  window.addEventListener("resize", function () {
    chartBox.resize();
  });
};
// 折线图
const changetype = () => {
  // 获取组件实例
  const machart = echarts.init(document.getElementById("maychar"));
  // 设置配置项
  const option = {
    xAxis: {
      data: ["A", "B", "C", "D", "E"],
    },
    yAxis: {},
    series: [
      {
        data: [10, 22, 28, 43, 49],
        type: "line",
        stack: "x",
      },
      {
        data: [5, 4, 3, 5, 10],
        type: "line",
        stack: "x",
      },
    ],
  };
  // 复制
  machart.setOption(option);
  // 根据页面大小自动响应图表大小
  window.addEventListener("resize", function () {
    machart.resize();
  });
};

onBeforeRouteUpdate((to) => {
  console.log(to, "路由变动");
  projectId.value = to.query.id;
});

onMounted(() => {
  projectId.value = route.query.id;
  console.log(projectId.value);

  change();
  changetype();
});
</script>

<style scoped>
.pic-title{
	display: block;
  text-align: left;
	margin-top: 20px;
  margin-bottom: 20px;
  font-size: 1.3em;
  font-weight: 580;
	cursor: pointer;
  color: rgb(96, 98, 102);
}
.project-title {
  display: block;
  text-align: left;
  margin-bottom: 20px;
  padding: 0;
  font-size: 2.3em;
  font-weight: 580;
  color: rgb(96, 98, 102);
}

.update-btn {
  display: block;
  margin-bottom: 10px;
  color: white;
}

#main {
  min-width: 31.25rem;
  min-height: 31.25rem;

}
 
#maychar {
  max-height: 500px;
 
  height: 500px;
}

</style>