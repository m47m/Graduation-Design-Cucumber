<template>
  <div class="info">{{ selected.name }}</div>
  <div class="features">
    <div class="feature" v-for="feature in selected.features" :key="feature.id">
      {{ feature.title }}
    </div>
  </div>
	<div class="report">Report</div>
</template>

<script setup>
const props = defineProps({
  selected: Object,
});
</script>

<style scoped>
.info {
  color: black;
  margin-top: 80px;
  height: 50px;
	cursor: pointer;
}
.features {
  flex: 1;
  margin-top: 50px;
  color: blue;
}
.feature {
  margin-bottom: 30px;
	cursor: pointer;
}
.report{
	color:black;
	margin-bottom: 40px;
	cursor: pointer;
}
</style>