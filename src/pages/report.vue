<template>
 <span class="project-title">{{projectInfo.name }}'s report</span>
</template>
<script setup>
import { useRoute ,onBeforeRouteUpdate} from 'vue-router'
import {onMounted, ref} from 'vue'
const route = useRoute();

const projectId = ref(0);

const projectInfo = {
	id:0,
	name:"project1",
	description:"项目描述"
}

onBeforeRouteUpdate(to => {
      console.log(to, "路由变动");
			projectId.value = to.query.id;
});

onMounted(()=>{
	projectId.value = route.query.id;
	console.log(projectId.value)
})

</script>

<style scoped>
.project-title{
	display: block;
  text-align: left;
  margin: 0;
  padding: 0;
  font-size: 2.3em;
  font-weight: 580;
  color: rgb(96, 98, 102);
}
</style>