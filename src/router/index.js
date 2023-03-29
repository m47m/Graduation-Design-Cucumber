import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/home",
    name: "FeatureHome",
    component: ()=>import('../pages/FeatureHome.vue'),
  }, 
  {
    path: "/projecthome",
    name: "ProjectHome",
    component: ()=>import('../components/ProjectHome.vue'),
  }, 
	{
    path: "/report",
    name: "Report",
    component: ()=>import('../pages/Report.vue'),
  }, 

  {
    path: "/feature",
    name: "Feature",
    component: ()=>import('../components/Feature.vue'),
  }, 
  {
    path: "/demand",
    name: "Demand",
    component: ()=>import('../pages/Demand.vue'),
  }, 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;