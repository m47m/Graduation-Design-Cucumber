<template>
  <div>
    <div class="container">
      <div class="left-bar"></div>

      <div class="mid-bar">
        <div class="userstory-table">
          <el-table
            :data="userstory_tabledata"
            style="width: 100%"
            @row-click="open_left_drawer"
          >
            <el-table-column prop="userstoryName" label="Name" width="180" />
            <el-table-column prop="hasFeature" label="Can Test" width="180" />
            <el-table-column prop="createTime_date" label="Create Time" />
            <el-table-column prop="modifyTime_date" label="Update Time" />
          </el-table>
        </div>
      </div>

      <div class="right-bar">
        <div class="right-item">
          <el-button  link :icon="PieChart" @click="add_userstory()"
            >Add UserStory</el-button
          >
        </div>
      </div>
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

    <el-dialog v-model="dialog_form" title="Shipping address">
      <el-form :model="form">
        <el-form-item label="userstory name" :label-width="formLabelWidth">
          <el-input v-model="form.userstoryName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="userstory content" :label-width="formLabelWidth">
          <el-input
            v-model="form.userstoryContent"
            autocomplete="off"
            type="textarea"
            autosize
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialog_form = false">Cancel</el-button>
          <el-button type="primary" @click="create_userstory_()">
            Save
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { get_userstory, create_userstory } from "../api/demand";
import DemandUserStoryVue from "../components/DemandUserStory.vue";
const selected_userstory = ref(1);
const drawer_left = ref(false);
const userstory_tabledata = ref([]);
const dialog_form = ref(false);

const form = reactive({
  userstoryName: "",
  userstoryContent: "",
});

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

const add_userstory = () => {
  console.log("add userstory");
  dialog_form.value = true;
};

const create_userstory_ = () => {
  console.log("create userstory");
  create_userstory(form)
    .then((res) => {
      console.log(res);
      dialog_form.value = false;
    })
    .catch((err) => {
      console.log(err);
      console.log("create userstory error");
    });
};

onMounted(() => {
  get_userstory()
    .then((res) => {
      userstory_tabledata.value = res.data;
      userstory_tabledata.value.forEach((item) => {
        item.hasFeature = item.featureName ? "是" : "否";

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
  margin-left: 20px;
  margin-right: 20px;
  /* margin-left: 45%;
  margin-top: 20px;
  transform: translateX(-50%); */
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