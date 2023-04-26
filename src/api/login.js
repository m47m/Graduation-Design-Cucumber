import myAxios from "./axios"

export const user_login = query =>{
	return myAxios({
		url: '/user/login',
		method: 'get',
		params: query
	})
}

export const fetch_permission = query =>{
	return myAxios({
		url: '/user/permission',
		method: 'get',
		params: query
	})
}