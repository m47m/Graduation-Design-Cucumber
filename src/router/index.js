import { createRouter, createWebHashHistory } from "vue-router";
import { ElNotification } from "element-plus";
import { usePermissionStore } from "../store/permission";
import { useCounterStore } from "../store";



// const routes = [
//   { path: '/', redirect: '/login' },

//   {
//     path: "/login",
//     name: "Login",
//     component: () => import('../pages/Login.vue'),
//   },
//   {
//     path: "/home",
//     name: "Home",
//     component: () => import('../pages/Home.vue'),
//     children: [
//       {
//         path: "/featurehome",
//         name: "FeatureHome",
//         component: () => import('../pages/FeatureHome.vue'),
//       },
//       {
//         path: "/demand",
//         name: "Demand",
//         component: () => import('../pages/Demand.vue'),
//       },
//       {
//         path: "/report",
//         name: "Report",
//         component: () => import('../pages/Report.vue'),
//       },
//     ]
//   }
// ]

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: "/login",
    name: "Login",
    component: () => import('../pages/Login.vue'),
  }
]

export const DynamicRoutes = [
  {
    path: "/home",
    component: () => import('../pages/Home.vue'),
    name: "Home",
    meta: {
      requiresAuth: true,
      name: "首页"
    },
    children: [
    ]
  },
  {
    path: "/403",
    component: () => import('../pages/Forbidden.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {

  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('token');
    if (token === null || token === '') {
      // 未登录

      if (to.matched.length > 0 && !to.matched.some(record => record.meta.requiresAuth)) {
        next();
      } else {
        ElNotification({
          title: 'info',
          message: 'please login first',
          type: 'info'
        });
        next('/login');
      }

    } else {
      // 用户已经登录
      let permission = usePermissionStore();


      if (permission.permission === null) {

        console.log("permission.permission === null")
        console.log(token)
        permission.FETCH_PERMISSION(token).then((res) => {
          console.log("FETCH_PERMISSION end")
          next({
            path: to.path,
          })
        })

      } else {
        if (to.path !== "/login") {
          next();
        } else {
          next(from.fullPath)
        }
      }
    }
  }

  // console.log(routes)
});

export default router;

