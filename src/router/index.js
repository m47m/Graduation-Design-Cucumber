import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/home",
    name: "Home",
    component: ()=>import('../components/ProjectHome.vue'),
  }, 
	{
    path: "/report",
    name: "Report",
    component: ()=>import('../pages/report.vue'),
  }, 

  {
    path: "/feature",
    name: "Feature",
    component: ()=>import('../components/Feature.vue'),
  }, 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;