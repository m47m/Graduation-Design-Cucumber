<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";

import { View,Finished,PieChart, } from "@element-plus/icons-vue";

import FeatureTable from "./FeatureTable.vue";

import { getFeatureList, FeatureTest1 } from "../api/feature";

const router = useRouter()

const drawer_feature = ref(false);
const drawer_report = ref(false);

const selectedFeature = ref({});
const features = reactive([]);
const selectFeature = function (id) {
  console.log("select row " + id);
  selectedFeature.value = features.filter((item) => item.id === id)[0];
  drawer_feature.value = true;
};
const selectFeatureReport = function () {
  drawer_report.value = true;
};

//测试参数
const Test1Param = reactive({
  featureName: "Login.feature",
});

//单独测试一个文件
const Test1 = function () {
  FeatureTest1(Test1Param)
    .then((res) => {
      console.log(res);
    })
    .catch((res) => {});
};
//测试全部文件
const TestAll = function () {
  Test1Param.featureName = " ";
  FeatureTest1(Test1Param)
    .then((res) => {
      console.log(res);
    })
    .catch((res) => {});
};
//日期处理
const DateChange = (timeStap) => {
  let date = new Date(parseInt(timeStap));
  let Y = date.getFullYear() + "-";
  let M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  let D = date.getDate() + " ";
  let h = date.getHours() + ":";
  let m =
    (date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes()) + ":";
  let s = date.getSeconds();

  return Y + M + D + h + m + s;
};
//文件大小处理
const formatBytes = (a, b) => {
  if (0 == a) return "0 B";
  let c = 1024,
    d = b || 2,
    e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    f = Math.floor(Math.log(a) / Math.log(c));
  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f];
};

//路由跳转
const changePage = function(){
  router.push({path:'/report'})
}

onMounted(() => {
  getFeatureList()
    .then((res) => {
      //console.log(res)
      //content.value = res[1].content.replace(/\n/g,'<br>');

      res.forEach((element) => {
        features.push({
          id: element.id,
          featureName: element.featureName,
          lastModified: DateChange(element.lastModified),
          size: formatBytes(parseInt(element.size), 3),
          content: element.content,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>

<template>
  <div class="container">

    <div class="left-bar">

    </div>
    <div class="mid-bar">
      <div class="feature-table">
        <FeatureTable @select-feature="selectFeature" :features="features" />
      </div>
    </div>
    <div class="right-bar">
      <div class="right-item">
        <el-button :icon="View" @click="selectFeatureReport()">See test result</el-button>
      </div>
      <div class="right-item">
        <el-button :icon="PieChart" @click="Test1()">Test one feature</el-button
        >
      </div>

      <div class="right-item">
        <el-button :icon="Finished" @click="TestAll()">Test All</el-button>
      </div>

      <div class="right-item">
        <el-button :icon="Finished" @click="changePage()">to Report page</el-button>
      </div>
      
      <!-- <div class="right-item">
        <el-button :icon="Finished" @click="showReportPage()">See Report page</el-button>
      </div> -->
    </div>
  </div>

  <el-drawer
    v-model="drawer_feature"
    title="I am the title"
    :with-header="false"
    size="45%"
    class="feature-drawer"
    direction="rtl"
  >
    <pre style="color: #000; text-align: left">{{ selectedFeature.content }}</pre>
  </el-drawer>

  <el-drawer
    v-model="drawer_report"
    :with-header="false"
    size="80%"
    direction="ltr"
    class="report-drawer"
  >
    <iframe
      scrolling="no"
      width="100%"
      height="100%"
      src="http://localhost:8080/report/test"></iframe>
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


.container {
  padding: 0;
  margin: 0;
  display: flex;
 
}
.left-bar {
  min-width: 200px;
}
.mid-bar {
  flex: 2;
  padding-top: 30px;
}
.right-bar {
  flex: 1;
  padding-top: 100px;
  padding-left: 30px;
}

.right-item {
  margin-bottom: 10px;
}
.feature-table {
  margin-left: 20px;
  margin-right: 20px;
}

.feature-drawer {
  background-color: azure;
}
.report-drawer {
  background-color: rgb(5, 56, 56);
  padding: 0;
}
</style>
