const dynamicRoutes = [
	{
		path: "/demand",
		name: "Demand",
		component: () => import('../pages/Demand.vue'),
		meta: {
			name: "需求分析",
			icon: "el-icon-s-home"
		}
	},
	{
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
	},
]

export default dynamicRoutes
