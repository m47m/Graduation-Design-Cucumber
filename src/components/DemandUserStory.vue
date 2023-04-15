<template>
  <div>
    <div class="demand-top-bar">
      <div class="right-demand-top-bar">
        <div class="close-btn">
          <el-button link @click="close()">close</el-button>
        </div>
      </div>
      <div class="mid-demand-top-bar"></div>
      <div class="left-demand-top-bar">
        <div class="save-btn">
          <el-button link @click="save()">save</el-button>
        </div>
      </div>
    </div>

    <el-divider />
    <div class="userstory-title">User Story</div>

    <div class="one-card">
      <span style="color: rgb(96, 98, 102)">userstory name: &nbsp;</span>
      <span
        style="color: black"
        v-if="!editing_userstory_name"
        @dblclick="editing_userstory_name = true"
        >{{ userstory.userstoryName }}</span
      >
      <el-input
        style="width: auto"
        v-model="userstory.userstoryName"
        v-if="editing_userstory_name"
        @blur="editing_userstory_name = false"
      />
      <el-divider />
      <span style="color: rgb(96, 98, 102)">userstory content:</span>
      <div class="userstory" v-if="!editing_userstory">
        <pre style="color: #000; text-align: left">{{
          userstory.userstoryContent
        }}</pre>
      </div>

      <div class="userstory" v-if="editing_userstory">
        <el-input
          v-model="userstory.userstoryContent"
          autosize
          type="textarea"
          placeholder="edit your user story"
          @blur="editing_userstory = false"
        />
      </div>

      <el-divider />
      <el-button link @click="editing_userstory = true">edit</el-button>
      <el-button link @click="copy()">copy</el-button>
    </div>

    <el-tabs v-model="name_active" class="tabs" @tab-click="handleClick">
      <el-tab-pane label="Feature" name="first">
        <div class="one-card">
          <span style="color: rgb(96, 98, 102)">feature name: &nbsp;</span>
          <span
            style="color: black"
            v-if="!editing_feature_name"
            @dblclick="editing_feature_name = true"
            >{{ userstory.featureName }}</span
          >
          <el-input
            style="width: auto"
            v-model="userstory.featureName"
            v-if="editing_feature_name"
            @blur="editing_feature_name = false"
          />
          <el-divider />
          <span style="color: rgb(96, 98, 102)">feature content</span>
          <div class="feature" v-if="!editing_feature_current">
            <pre style="color: #000; text-align: left">{{
              userstory.featureContent
            }}</pre>
          </div>

          <div class="feature" v-if="editing_feature_current">
            <el-input
              v-model="userstory.featureContent"
              autosize
              type="textarea"
              placeholder="edit your feature"
              @blur="editing_feature_current = false"
            />
          </div>

          <el-divider />
          <el-button link @click="editing_feature_current = true"
            >edit</el-button
          >
        </div>

        <div style="height: 10px; width: auto"></div>
      </el-tab-pane>

      <el-tab-pane label="Generate" name="second">
        <div class="one-card">
          <div class="feature">
            <pre style="color: #000; text-align: left">{{
              feature_generate
            }}</pre>
          </div>
          <el-divider />
          <el-button link @click="generate()">generate feature</el-button>
          <el-button link @click="apply()">apply</el-button>
          <el-button link @click="optimize()">optimize</el-button>
        </div>

        <div style="height: 10px; width: auto"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import { defineProps } from "vue";
import { update_userstory } from "../api/demand";
import { ElNotification} from "element-plus";

const props = defineProps({
  testId: Number,
  selected_userstory: Object,
});

const userstory = reactive({
  userstoryId: 1,
  userstoryName: "注册功能",
  userstoryContent:
    "Story name：登录系统Story 作为（As a）数据管理员/系统管理员 \r\n  我想要（I want）登录IP地址为http://114.116.249.36/的多源地震灾情管理系统\r\n  以便于（that）在输入用户名和密码后点击登录能够按照对应身份进入系统进行操作  \r\n  数据管理员用户名：123456 密码：123456 \r\n  系统管理员用户名：123123 密码：123456",
  featureName: "loginpage",
  featureContent:
    "Feature: 登录系统 \r\n Scenario: 数据管理员成功登录系统 \r\n	Given 打开多源地震灾情管理系统登录页面 \r\n	When 输入用户名为123456，密码为123456 \r\n	And 点击登录按钮 \r\n	Then 登录成功并跳转到数据管理员首页",
  createTime: "2021-06-01 12:00:00",
  modifyTime: "2021-06-01 12:00:00",
});
const feature_current =
  "Feature: 登录系统 \r\n As a 数据管理员/系统管理员 \r\n我想要登录多源地震灾情管理系统 \r\n 以便于按照对应身份进入系统进行操作 \r\n Background: \r\n 	Given IP地址为http://114.116.249.36/ \r\n	And 数据管理员用户名为123456，密码为123456 \r\n	And 系统管理员用户名为123123，密码为123456 \r\n Scenario: 数据管理员成功登录系统 \r\n	Given 打开多源地震灾情管理系统登录页面 \r\n	When 输入用户名为123456，密码为123456 \r\n	And 点击登录按钮 \r\n	Then 登录成功并跳转到数据管理员首页";

const feature_generate = ref("使用chatgpt3生成feature");

const OPENAI_API_KEY = "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";

const editing_userstory = ref(false);
const editing_userstory_name = ref(false);
const editing_feature_name = ref(false);
const editing_feature_current = ref(false);
const name_active = ref("first");

const chat = async (input) => {
  try {
    let data = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
    };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.openai.com/v1/chat/completions",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      data: data,
      proxy: {
        host: "127.0.0.1",
        port: 7890,
        protocol: "http",
      },
    };

    let completion = await axios(config)
      .then((response) => {
        //console.log("response.data:", JSON.stringify(response.data));
        console.log(
          "response data content:",
          response.data.choices[0].message.content
        );
        feature_generate.value = response.data.choices[0].message.content;
        return response.data.choices[0].message;
      })
      .catch((error) => {
        console.log(error);
      });

    return completion;
  } catch (error) {
    console.log(error);
  }
};

const generate = function () {
  let msg =
    "请你根据" +
    userstory.userstoryContent +
    "这个用户故事，给我对应的feature文件";
  chat(msg).then((res) => {
    console.log("method return" + res.data);
  });
};

const apply = function () {
  if (feature_generate) userstory.featureContent = feature_generate;
};

const handleClick = (tab, event) => {
  console.log(tab, event);
};

const save = function () {
  console.log("save");
  console.log("userstory:", userstory);
  update_userstory(userstory).then((res) => {
    console.log("update_userstory res:", res);
    ElNotification({
          title: "Success",
          message: "Save successfully!",
          type: "success",
        })
  });
};

const close = function(){
  
}

onMounted(() => {
  console.log("props.testId:", props.testId);
  console.log("props.selected_userstory:", props.selected_userstory);

  userstory.userstoryId = props.selected_userstory.userstoryId;
  userstory.userstoryName = props.selected_userstory.userstoryName;
  userstory.userstoryContent = props.selected_userstory.userstoryContent;
  userstory.featureName = props.selected_userstory.featureName
    ? props.selected_userstory.featureName
    : "feature";
  userstory.featureContent = props.selected_userstory.featureContent;
  userstory.createTime = props.selected_userstory.createTime;
  userstory.modifyTime = props.selected_userstory.modifyTime;
});
</script>

<style scoped>
.demand-top-bar {
  width: 100%;
  display: flex;
}
.right-demand-top-bar {
  width: 200px;
  text-align: start;
}
.mid-demand-top-bar {
  flex: auto;
}
.left-demand-top-bar {
  width: 200px;
  text-align: end;
}
.close-btn {
  margin-left: 15px;
}
.save-btn {
  margin-right: 15px;
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
</style>