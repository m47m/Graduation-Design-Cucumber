<script setup>
import Bar from "../components/Bar.vue";
import { usePermissionStore } from "../store/permission";

const usePermission = usePermissionStore();




</script>

<template>
  <div>
    <Bar :menuList="usePermission.bar_menu"/>
    <div style="margin-left: 220px">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
        <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}
</style>
