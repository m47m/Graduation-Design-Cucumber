import myAxios from "./axios"

export const get_userstory = query =>{
	return myAxios({
		url: '/userstory/all',
		method: 'get',
		params: query
		
	})
}

export const update_userstory = params =>{
	return myAxios({
		url: '/userstory/update',
		method: 'post',
		data: params
	})
}