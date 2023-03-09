<template>

  <div class="info">{{ selected.name }}</div>
  <div class="features">
    <div class="feature">featrue1</div>
    <div class="feature">featrue2</div>
  </div>

</template>
<script setup>

//import midbar from '../components/MidBar.vue'
const props = defineProps({
	selected : Object
});
</script>

<style scoped>

.info {
  color: black;
}
.features {
  color: blue;
}

</style>