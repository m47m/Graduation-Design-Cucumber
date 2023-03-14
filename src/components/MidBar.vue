<template>
  <div class="info">{{ selected.name }}</div>
  <div class="home" @click="toHome(selected.id)"> <span>DashBoard</span></div>
  <div class="features">
    <div 
    class="feature"
     v-for="feature in selected.features" 
     :key="feature.id"
    >
      <span @click="toFeature(feature.id)">{{ feature.title }}</span>
    </div>

    <div class="add-btn">
      <el-button :icon="Plus" circle />
    </div>
  </div>

	<div class="report" >
		<span @click="toReport(selected.id)">Report</span>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Plus } from "@element-plus/icons-vue";
const router =useRouter()

const props = defineProps({
  selected: Object,
});
const toReport = function(value){
  if(value !== undefined){
    router.push({path:'/report',query:{id:value}})
  }
}
const toFeature = function(value){
  if(value !== undefined){
    router.push({path:'/feature',query:{id:value}})
  }
}
const toHome = function(value){
  if(value !== undefined){
    router.push({path:'/home',query:{id:value}})
  }
}
</script>


<style scoped>
.home{
  color:black;
  cursor: pointer;
  margin-bottom: 30px;
  padding-right: 5px;
}
.info {
  color: gray;
  margin-top: 45px;
  height: 50px;

}
.features {
  flex: 1;
  margin-top: 30px;
  color: blue;
}
.feature {
  margin-bottom: 30px;
	cursor: pointer;
  padding-left: 20px;
}
.report{
	color:black;
	margin-bottom: 100px;
  padding-right: 10px;
	cursor: pointer;
}
</style>