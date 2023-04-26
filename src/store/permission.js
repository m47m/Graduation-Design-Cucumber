import router, { DynamicRoutes } from "../router/index"

import dynamicRouter from "../router/dynamic-router"

import { recursion_router, set_default_routes } from '../utils/recursion-router'

import { defineStore } from 'pinia'

// import { useCounterStore } from "../store";

export const usePermissionStore = defineStore('permission', {
	state: () => ({
		permission: null,
		bar_menu: [],
		current_mueu: '',
	}),
	getters: {

	},
	actions: {
		set_permission(permission) {
			this.permission = permission
		},
		clear_permission() {
			this.permission = null
		},
		set_menu(mueu) {
			this.bar_menu = mueu
		},
		clear_menu() {
			this.bar_menu = []
		},

		async FETCH_PERMISSION(token) {
			// let permission = await fetch_permission();
			let permission = [];
			console.log(token)
			if (token === "1") {
				
				permission = [
					{
						path: "/demand",
						name: "Demand",
						component: () => import('../pages/Demand.vue'),
						meta: {
							name: "需求分析",
							icon: "el-icon-s-home"
						}
					},
				]
			} else {
				permission = [{
					path: "/featurehome",
					name: "FeatureHome",
					component: () => import('../pages/FeatureHome.vue'),
					meta: {
						name: "测试用例",
						icon: "el-icon-s-home"
					}
				},

				{
					path: "/report",
					name: "Report",
					component: () => import('../pages/Report.vue'),
					meta: {
						name: "测试报告",
						icon: "el-icon-s-home"
					}
				},]
			}

			//筛选
			let routes = recursion_router(permission, dynamicRouter)

			//找到插入节点
			let main_container = DynamicRoutes.find(v => v.path === "/home");

			let children = main_container.children;

			//插入
			children.splice(0, children.length)
			children.push(...routes)

			//设置菜单
			this.set_menu(children)

			//设置默认路由
			// set_default_routes([main_container]);

			let init_routes = router.options.routes;

			DynamicRoutes.forEach(item => {
				router.addRoute(item)
			})

			let end_routes = init_routes.concat(DynamicRoutes)

			this.set_permission(end_routes)

		}
	},
})