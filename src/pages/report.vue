<template>
  <!-- <button class="update-btn">update json data</button> -->

  <!-- <el-divider/> -->

  <!-- <button class="update-btn" @click="router.push('/')">back to Feature list</button> -->

  <div class="report_container">
    <div class="report_form">
      <el-form :model="form" label-width="200px">
        <el-form-item label="项目名称">
          <el-input v-model="form.project_name" />
        </el-form-item>

        <el-form-item label="课程组">
          <el-input v-model="form.curriculum_group" />
        </el-form-item>

        <el-form-item label="项目介绍">
          <el-input v-model="form.project_introduction" autosize type="textarea" />
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
          <el-input v-model="form.test_method" type="textarea" autosize />
        </el-form-item>

        <el-form-item label="脚本生成工具">
          <el-input v-model="form.script_generation_tool" />
        </el-form-item>

        <el-form-item label="测试结论">
          <el-input v-model="form.test_conclusion" type="textarea" autosize />
        </el-form-item>
      </el-form>
    </div>

    <div class="report-btn">
        <el-button class="update-btn" link @click="generate()">Generate test report</el-button>
        <el-button class="update-btn" link @click="download()">Download test report</el-button>
        <!-- <button class="update-btn" @click="generate()">
          Generate test report(.docx)
        </button> -->

        <!-- <button class="update-btn" @click="download()">
          Download for that report
        </button> -->
      </div>
  </div>
</template>

<script setup>
import { useRouter, onBeforeRouteUpdate } from "vue-router";
import { onMounted, ref, reactive } from "vue";
import { generateReport } from "../api/report";

const form = reactive({
  project_name: "多源灾情数据服务管理系统",
  curriculum_group: "课程组1",
  project_introduction:"本项目将实现一个多源灾情数据管理服务系统，系统平台如图2-1所示。多源社会灾情数据通过接口输入到多源灾情数据管理服务系统平台，进行一体化编码；然后将编码后的数据输入到虚拟化管理系统。数据来源包括业务报送数据、泛在感知数据、舆情感知数据和承载体基础数据等，将来可以扩展更多数据来源。该系统依据数据的时效性进行数据存储，当前时刻为 ，设置合适的时间窗口 ，对 内的数据进行存储，并且随着时间的延续，实现新数据存储旧数据淘汰；最后，当外界发出数据请求时，从管理系统中获取目标数据，并通过接口发送给请求方。项目实现灾情数据统一管理和高效合理利用，构建多源社会灾情数据管理服务系统。",
  network: "Intenet、路由器、服务器",
  hardware: "windows10系统计算机，android系统手机",
  software: "Intellij Idea集成开发环境，Google Chrome浏览器，Postman、Selenium",
  test_method:"本次测试的重点是功能测试和性能测试，采用的测试技术是黑盒测试技术，例如等价类划分法、边界值分析法、场景法、错误推测法、因果图法、判定表驱动法、正交试验设计法、功能图法、探索性测试等等，这些技术基本满足任务的需求。",
  script_generation_tool: "Cucumber",
  test_conclusion: "本实践小组于2022年4月  日至20221年6月  1日，依据软件测试相关技术和项目需求规格说明书的要求，采用多种测试方法和手段，对多源灾情数据管理服务系统V1.0从系统性、功能性、易用性、并发性各方面进行了软件产品技术鉴定测试。测试结果如下：\r\n1．系统架构。多源灾情数据服务管理系统采用B/S架构，分布式服务器采用的是华为云云耀服务器HECS，中间件采用Nginx 1.14.0，FTP服务器采用的是阿里云服务器ECS，数据库租用阿里云云数据库RDS服务，数据库采用MySQL 8.0和MongoDB 4.4.5，多源灾情数据服务管理系统客户端运行于Windows 10操作系统，使用Chromium: 80.0.3987.163浏览器。\r\n2．系统功能。多源灾情数据服务管理系统可以将多源社会灾情数据通过接口输入到多源灾情数据管理服务系统平台，通过一体化编码后将数据输入到虚拟化管理系统，分为登录注册、数据获取设置、动态窗口设置、震情数据、人员伤亡及失踪、房屋破坏、生命线工程灾情、次生灾害、泛在感知数据、灾情智能预警和数据请求管理-灾情数据接口输入、灾情数据编码入库、灾情数据全生命周期的动态管理、多源感知灾情智能预报和数据请求输出管理等功能模块，实现了对灾害数据的收集、分类、编辑、以及对灾情的展示、预测的功能，从而实现灾情数据统一管理。\r\n3．系统易用性。系统界面设计风格一致，布局合理，操作较简单"});

const router = useRouter();

const generate = function () {

  console.log(form)

  // generateReport().then((res) => {
  //   console.log(res);
  //   alert(res);
  // });
};

const download = function () {
  window.open("http://localhost:8080/report.docx", "_blank");
};
</script>

<style scoped>
.report_container {
  /* position: relative; */
}
.report-btn {
  position: fixed;
  right: 60px;
  top: 200px;
}
.update-btn {
  display: block;
  margin: 0;
  margin-bottom: 30px;
  font-size: 18px;
}
.report_form {
  margin: 50px 350px 0 100px;
}
</style>