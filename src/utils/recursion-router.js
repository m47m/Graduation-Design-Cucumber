/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param user_router
 * @param all_router
 * @returns {*}
 */
export function recursion_router(user_router = [],all_router = []) {
	let real_routes = []
	all_router.forEach((v, i) => {
		user_router.forEach((item, index) => {
			if (item.name === v.name) {
				if (item.children && item.children.length > 0) {
					v.children = recursion_router(item.children, v.children)
				}
				real_routes.push(v)
			}
		})
	})
	return real_routes
}

/**
 * 
 */

export function set_default_routes(routes){
	routes.forEach((v,i)=>{
		if(v.children && v.children.length>0){ 
			v.redirect  = {name:v.children[0].name}
			set_default_routes(v.children)
		}
	})
}