<template>
  <div class="top-section">
    <div class="logo">logo22</div>
  </div>
  <div class="mid-section">
    <!-- <div class="project-link" @click="emitSelectProject">project1</div>

    <div class="project-link">project2</div> -->

    <div
      class="project-link"
      v-for="project in projects"
      :key="project.id"
      @click="emitSelectProject(project)"
    >
      {{ project.name }}
    </div>

    <div class="add-btn">
      <el-button :icon="Plus" circle />
    </div>
  </div>

  <div class="bottom-section">
    <div class="person">person</div>
  </div>
</template>

<script setup>
import { Plus } from "@element-plus/icons-vue";
import { Project } from "../composables/project";
//import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const emit = defineEmits(["select-project"]);
// const projects = [
//   {
//     id: 0,
//     name: "projectone",
//     flag: 1,
//   },
//   {
//     id: 1,
//     name: "projecttwo",
//     flag: 0,
//   },
// ];

const props = defineProps({
  projects: Array,
});

const emitSelectProject = (project) => {
  emit("select-project", project);
  router.push({ path: "/home", query: { id: project.id } });
};
</script>

<style scoped>
.top-section {
  height: 50px;
}
.mid-section {
  flex: 1;
  margin-top: 50px;
  margin-bottom: 50px;
}
.bottom-section {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
}
.logo {
  background-color: antiquewhite;
  margin-bottom: 60px;
}
.project-link {
  color: black;
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  margin: 10px 0px 10px 0px;
  padding-left: 20px;
  padding-right: 30px;
}
.project-link:hover {
  color: lightblue;
}
.add-btn {
}

.person {
  color: black;
}
</style>