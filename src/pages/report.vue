<template>
  <div class="report_container">
    <div class="report_form">
      <el-form :model="form" label-width="200px">
        <el-form-item label="项目名称">
          <el-input v-model="form.projectName" />
        </el-form-item>

        <el-form-item label="课程组">
          <el-input v-model="form.curriculumGroup" />
        </el-form-item>

        <el-form-item label="项目介绍">
          <el-input
            v-model="form.projectIntroduction"
            autosize
            type="textarea"
          />
        </el-form-item>

        <el-form-item label="测试环境/网络环境">
          <el-input v-model="form.network" />
        </el-form-item>
        <el-form-item label="测试环境/硬件环境">
          <el-input v-model="form.hardware" />
        </el-form-item>
        <el-form-item label="测试环境/软件环境">
          <el-input v-model="form.software" />
        </el-form-item>

        <el-form-item label="测试方法">
          <el-input v-model="form.testMethod" type="textarea" autosize />
        </el-form-item>

        <el-form-item label="脚本生成工具">
          <el-input v-model="form.scriptGenerationTool" />
        </el-form-item>

        <el-form-item label="测试结论">
          <el-input v-model="form.testConclusion" type="textarea" autosize />
        </el-form-item>
      </el-form>
    </div>

    <div class="report-option">
      <div class="template-title">
        <div><span>template name</span></div>
      </div>

      <div class="template-body">
        <span
          v-if="!editing_template_name"
          @dblclick="editing_template_name = true"
          >{{ form.templateName }}</span
        >
        <el-input
          style="width: auto"
          v-model="form.templateName"
          v-if="editing_template_name"
          @blur="editing_template_name = false"
        />
      </div>

      <div class="select-title">
        <span>choose</span>
      </div>
      <div class="select-body">
        <el-select v-model="current_id" placeholder="select one template">
          <el-option
            v-for="i in templates"
            :key="i.reportId"
            :label="i.templateName"
            :value="i.reportId"
            @click="change_template()"
          ></el-option>
        </el-select>

        <div class="select-btn">
          <el-button class="select-btn" link @click="save()">save</el-button>
        </div>

        <div class="select-btn">
          <el-button class="select-btn" link @click="save_as_new()"
            >save as new</el-button
          >
        </div>

        <el-dialog
          v-model="dialogVisible"
          title="Save as new template"
          width="30%"
          :before-close="handleClose"
        >
          <span>Enter a new template name</span>
          <el-input style="margin-top: 15px; width: 500px;" v-model="new_template_name" />
          <template #footer>
            <span class="dialog-footer">
              <el-button class="dialog-btn" link @click="dialogVisible = false"
                >cancel</el-button
              >
              <el-button class="dialog-btn" link @click="save_as_new_confirm()"
                >save</el-button
              >
            </span>
          </template>
        </el-dialog>

        <div class="select-btn">
          <el-button class="select-btn" link @click="delete_template()"
            >delete</el-button
          >
        </div>
      </div>

      <div class="end-title">
        <div><span>end</span></div>
      </div>
      <el-button class="update-btn" link @click="generate()"
        >generate test report</el-button
      >
      <el-button class="update-btn" link @click="download()"
        >download test report</el-button
      >
    </div>
  </div>
</template>

<script setup>
import { useRouter, onBeforeRouteUpdate } from "vue-router";
import { onMounted, ref, reactive } from "vue";
import { generateReport } from "../api/report";
import { ElNotification } from "element-plus";
import { getCurrentInstance } from "vue";

import {
  create_report_template,
  update_report_template,
  delete_report_template,
  get_report_list,
} from "../api/report";

const form = ref({
  reportId: 1,
  templateName: "template1",
  projectName: "",
  curriculumGroup: "",
  projectIntroduction:
    "本项目将实现一个多源灾情数据管理服务系统，系统平台如图2-1所示。多源社会灾情数据通过接口输入到多源灾情数据管理服务系统平台，进行一体化编码；然后将编码后的数据输入到虚拟化管理系统。数据来源包括业务报送数据、泛在感知数据、舆情感知数据和承载体基础数据等，将来可以扩展更多数据来源。该系统依据数据的时效性进行数据存储，当前时刻为 ，设置合适的时间窗口 ，对 内的数据进行存储，并且随着时间的延续，实现新数据存储旧数据淘汰；最后，当外界发出数据请求时，从管理系统中获取目标数据，并通过接口发送给请求方。项目实现灾情数据统一管理和高效合理利用，构建多源社会灾情数据管理服务系统。",
  network: "Intenet、路由器、服务器",
  hardware: "windows10系统计算机，android系统手机",
  software: "Intellij Idea集成开发环境，Google Chrome浏览器，Postman、Selenium",
  testMethod:
    "本次测试的重点是功能测试和性能测试，采用的测试技术是黑盒测试技术，例如等价类划分法、边界值分析法、场景法、错误推测法、因果图法、判定表驱动法、正交试验设计法、功能图法、探索性测试等等，这些技术基本满足任务的需求。",
  scriptGenerationTool: "Cucumber",
  testConclusion:
    "本实践小组于2022年4月2日至20221年6月1日，依据软件测试相关技术和项目需求规格说明书的要求，采用多种测试方法和手段，对多源灾情数据管理服务系统V1.0从系统性、功能性、易用性、并发性各方面进行了软件产品技术鉴定测试。测试结果如下：\r\n1．系统架构。多源灾情数据服务管理系统采用B/S架构，分布式服务器采用的是华为云云耀服务器HECS，中间件采用Nginx 1.14.0，FTP服务器采用的是阿里云服务器ECS，数据库租用阿里云云数据库RDS服务，数据库采用MySQL 8.0和MongoDB 4.4.5，多源灾情数据服务管理系统客户端运行于Windows 10操作系统，使用Chromium: 80.0.3987.163浏览器。\r\n2．系统功能。多源灾情数据服务管理系统可以将多源社会灾情数据通过接口输入到多源灾情数据管理服务系统平台，通过一体化编码后将数据输入到虚拟化管理系统，分为登录注册、数据获取设置、动态窗口设置、震情数据、人员伤亡及失踪、房屋破坏、生命线工程灾情、次生灾害、泛在感知数据、灾情智能预警和数据请求管理-灾情数据接口输入、灾情数据编码入库、灾情数据全生命周期的动态管理、多源感知灾情智能预报和数据请求输出管理等功能模块，实现了对灾害数据的收集、分类、编辑、以及对灾情的展示、预测的功能，从而实现灾情数据统一管理。\r\n3．系统易用性。系统界面设计风格一致，布局合理，操作较简单",
});

const templates = ref([]);

const current_id = ref("");

const new_template_name = ref("");

const editing_template_name = ref(false);

const dialogVisible = ref(false);

const generate = function () {
  console.log(form);

  generateReport(form).then((res) => {
    // res.code === 200 ? alert("Generate report successfully!"): alert("Generate report failed!");

    res.code === 200
      ? ElNotification({
          title: "Success",
          message: "Generate report successfully!",
          type: "success",
        })
      : ElNotification({
          title: "Error",
          message: "Generate report failed!",
          type: "error",
        });
  });
};

const download = function () {
  window.open("file:///D:/notes/毕业设计/TestDir/report.docx", "_blank");
};

const save = function () {
  console.log(form);

  let params = {
    reportId: form.value.reportId,
    templateName: form.value.templateName,
    projectName: form.value.projectName,
    curriculumGroup: form.value.curriculumGroup,
    projectIntroduction: form.value.projectIntroduction,
    network: form.value.network,
    hardware: form.value.hardware,
    software: form.value.software,
    testMethod: form.value.testMethod,
    scriptGenerationTool: form.value.scriptGenerationTool,
    testConclusion: form.value.testConclusion,
  };

  console.log(params);
  update_report_template(params)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const save_as_new = function () {
  dialogVisible.value = true;
};

const save_as_new_confirm = function(){
  let params = {
    templateName: new_template_name.value,
    projectName: form.value.projectName,
    curriculumGroup: form.value.curriculumGroup,
    projectIntroduction: form.value.projectIntroduction,
    network: form.value.network,
    hardware: form.value.hardware,
    software: form.value.software,
    testMethod: form.value.testMethod,
    scriptGenerationTool: form.value.scriptGenerationTool,
    testConclusion: form.value.testConclusion,
  };
  console.log(params);
  create_report_template(params)
    .then((res) => {
      console.log(res);
      dialogVisible.value = false;
    })
    .catch((err) => {
      console.log(err);
    });
}

const delete_template = function () {
  let params = {
    id: current_id.value,
  };
  console.log(params);
  delete_report_template(params)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const change_template = function () {
  templates.value.forEach((item) => {
    if (item.reportId === current_id.value) {
      form.value = item;
    }
  });
};
onMounted(() => {
  get_report_list().then((res) => {
    console.log(res);
    res.data.forEach((item) => {
      templates.value.push(item);
    });

    form.value = templates.value[0] ? templates.value[0] : {};
  });
});
</script>

<style scoped>
.report_container {
  /* position: relative; */
}
.report-option {
  position: fixed;
  right: 60px;
  top: 150px;
}
.update-btn {
  display: block;
  margin: 0;
  margin-left: 8px;
  margin-bottom: 30px;
  font-size: 14px;
}
.report_form {
  margin: 50px 350px 0 100px;
}

.select-title {
  color: #606266;
  font-size: 16px;
  font-weight: bold;
  padding: 2px;
  margin-bottom: 10px;
}

.select-btn {
  display: block;
  margin: 0;
  margin-top: 15px;

  margin-bottom: 25px;
  font-size: 14px;
}
.select-body {
  margin-left: 8px;
}

.template-title {
  color: #606266;
  font-size: 16px;
  font-weight: bold;
  padding: 2px;
  margin-bottom: 10px;
}

.template-body {
  margin-left: 8px;
  color: #606266;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 15px;
}

.end-title {
  color: #606266;
  font-size: 16px;
  font-weight: bold;
  padding: 2px;
  margin-bottom: 10px;
}

.dialog-btn {
  display: inline-block;
  margin: 0;
  margin-left: 8px;
  margin-right: 5px;
  font-size: 14px;
}
</style>