<template>
  <!-- <div class="right">

 </div> -->
  <!-- <div class="left">

 </div> -->

  <div class="main">
    <div class="userstory-table">
      <el-table
        :data="userstory_tabledata"
        style="width: 100%"
        @row-click="open_left_drawer"
      >
        <el-table-column prop="userstoryName" label="名称" width="180" />
        <el-table-column prop="hasFeature" label="是否有feature" width="180" />
        <el-table-column prop="createTime_date" label="创建时间" />
        <el-table-column prop="modifyTime_date" label="更新时间" />
      </el-table>
    </div>

    <el-drawer
      v-model="drawer_left"
      title="I am the title"
      :with-header="false"
      size="50%"
      :destroy-on-close="true"
    >
      <DemandUserStoryVue
        :testId="1"
        :selected_userstory="selected_userstory"
      />
    </el-drawer>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { get_userstory } from "../api/demand";
import DemandUserStoryVue from "../components/DemandUserStory.vue";
const selected_userstory = ref(1);
const drawer_left = ref(false);
const userstory_tabledata = ref([]);


const open_left_drawer = (row) => {
  selected_userstory.value = row;
  console.log(selected_userstory.value);
  drawer_left.value = true;
};

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

onMounted(() => {
  get_userstory()
    .then((res) => {
      userstory_tabledata.value = res.data;
      userstory_tabledata.value.forEach((item) => {
        item.hasFeature = item.hasFeature ? "是" : "否";

        if (item.modifyTime) {
          item.modifyTime_date = DateChange(item.modifyTime);
        } else {
          item.modifyTime_date = DateChange(item.createTime);
        }
        if (item.createTime) {
          item.createTime_date = DateChange(item.createTime);
        }
      });

      console.log(userstory_tabledata.value);
    })
    .catch((err) => {
      console.log(err);
      console.log("get userstory error");
    });
});
</script>

<style scoped>
.main {
  width: auto;
}

:deep(.el-tabs__active-bar) {
  background-color: black;
}
:deep(.el-tabs__item.is-active) {
  color: black;
}
:deep(.el-tabs__item) {
  font-size: 1.5em;
  font-weight: 540;
  color: rgb(96, 98, 102);
}
.tabs {
  margin-top: 25px;
  height: auto;
}
.tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.userstory-feature {
  margin-top: 20px;
}
.userstory-table {
  margin-left: 45%;
  margin-top: 20px;
  transform: translateX(-50%);
}
.userstory-title {
  display: block;
  text-align: left;
  margin-bottom: 15px;
  padding: 0;
  font-size: 1.6em;
  font-weight: 540;
  color: rgb(96, 98, 102);
}

.one-card {
  margin: auto;
  width: 95%;
  padding: 15px 10px 10px 10px;
  background-color: white;
  border-radius: 1px;
  box-shadow: 2px 2px 2px 2px rgba(223, 224, 224, 0.5);
}

:deep(.el-divider--horizontal) {
  margin-top: 8px;
  margin-bottom: 15px;
}
.userstory {
  color: black;
  text-align: left;
}
.generate—feature {
  color: black;
  text-align: left;
  margin-left: 20px;
}
.right {
  background-color: rebeccapurple;
  height: 70vh;
  display: inline-block;
  width: 50%;
}

.left {
  background-color: antiquewhite;
  height: 70vh;
  display: inline-block;
  width: 50%;
}
</style>