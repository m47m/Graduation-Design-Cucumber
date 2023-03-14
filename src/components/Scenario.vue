<template>
  <div class="scenario-card">
    <span class="scenario-title"
      >Scenario1 with tag[login][user] <span class="tag-add">[+]</span></span
    >
    <span class="scenario-content-title">UserStory</span>
    <div class="scenario-content">
      <el-input
        v-model="userStory"
        :rows="2"
        type="textarea"
        placeholder="Please input"
      />
    </div>
    <span class="scenario-content-title">content</span>
    <div class="scenario-content">
      Given the price of a "banana" is 40c <br />
      When I checkout 1 "banana" <br />
      Then the total price should be 40c <br />
    </div>
    <div class="content-add">
      <el-input v-model="input" placeholder="Please input" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const input = ref("");
const userStory = ref("scenario user story")
</script>

<style scoped>
.scenario-card {
  padding: 30px;
  margin-left: 30px;
  margin-bottom: 20px;
  border-radius: 10px;

  background-color: #fff;
  border: 1px solid #d9ecff;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.tag-add {
  cursor: pointer;
  color: brown;
}
.scenario-title {
  display: block;
  text-align: left;
  margin-bottom: 10px;

  font-size: 1.3em;
  font-weight: 400;
  color: rgb(96, 98, 102);
}

.scenario-content-title {
  display: block;
  text-align: left;
  margin-bottom: 10px;

  font-size: 1.3em;
  font-weight: 500;
  color: rgb(96, 98, 102);
}
.scenario-content {
  display: block;
  text-align: left;
  margin-bottom: 10px;
  padding-left: 60px;
  font-size: 1.2em;

  color: rgb(96, 98, 102);
}
.content-add {
  padding-left: 40px;
}
</style>