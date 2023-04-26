<template>
  <div class="sidebar">
    <div class="header" @click="goto('/home')" >  Cucumber Test</div>
    <div class="body">
      <div class="catalog-body">
        <!-- <div class="catalog-btn">
          <Odometer style="display: inline-block; width: 20px; height: 20px; padding-right: 2px;"/>
          <router-link to="/demand"> 需求分析</router-link>
        </div>
        <div class="catalog-btn">
          <Compass style="display: inline-block; width: 20px; height: 20px; padding-right: 2px;"/>
          <router-link to="/featurehome">测试</router-link>
        </div>
        <div class="catalog-btn">  
          <Discount style="display: inline-block; width: 20px; height: 20px; padding-right: 2px;"/>
          <router-link to="/report">报告</router-link>
        </div> -->

        <div v-for="v in menuList" :key="v.name" class="catalog-btn">
          <router-link :to="{path: v.path}">{{ v.meta.name }}</router-link>
        </div>

        <!-- <div
          class="catalog-btn"
          :class="{ 'active-btn': nowIndex === 'page1' }"
          @click="nav('page1')"
        >

          <Expand style="display: inline-block; width: 20px; height: 20px;"/>
          <span>page-1</span>
  
        </div>
        <div
          class="catalog-btn"
          :class="{ 'active-btn': nowIndex === 'page2' }"
          @click="nav('page2')"
        >
          page-2
        </div> -->
      </div>
    </div>
    <div class="footer">
      <div class="logout-btn" @click="Logout()">
        Log out
      </div>
      V 0.5
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import {useRouter } from "vue-router"
import { Compass, Discount, Expand, Fold, Odometer } from '@element-plus/icons-vue';
import { usePermissionStore } from "../store/permission";
import { useCounterStore } from "../store";
// const nowIndex = ref("");
const router = useRouter();
const usePermission = usePermissionStore();
const useCounter = useCounterStore();

// const nav = function (value) {
//   console.log(value);
//   nowIndex.value = value;
// };

const props = defineProps({
  menuList: Array,
});

const goto = function (value) {
  router.push({ path: value });
};

const Logout = function () {

  useCounter.clear_token();
  usePermission.clear_permission();
  usePermission.clear_menu();
  router.push({ path: "/login" });
};


</script>

<style scoped>
.sidebar {
  width: 220px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: rgb(251, 251, 250);
  box-shadow: rgba(0, 0, 0, 0.024) -1px 0px 0px 0px inset;
  color: rgba(25, 23, 17, 0.6);
  display: flex;
  flex-direction: column;
}

.header {
  flex: none;
  border-bottom: 1px solid #ddd;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
}
.header:hover{
  cursor: pointer;
}
.body {
  flex: auto;
}
.catalog-body {
  padding: 18px 0;
}
.catalog-btn {
  font-size: 16px;
  width: 100%;
  margin: 4px 20px 4px 30px;
  margin-bottom: 15px;
  cursor: pointer;
  
  display: flex;  
  align-items: center;
}
.catalog-btn:hover {
  color: black;
  transition: 0.7s;
}

.logout-btn {
  margin-top: 20px;
  margin-bottom: 10px;
  cursor: pointer;
  text-align: center;
  color: rgba(25, 23, 17, 0.6);
}

.active-btn {
  color: black;
}

.router-link-active {
  padding-left: 15px;
  color: black;
  transition: 0.6s;

}
a {
  color: rgba(25, 23, 17, 0.6);
  padding-right: 10px;
  transition: 0.6s;

}
a:hover {
  color: black;
}
.footer {
  text-align: center;
}
</style>