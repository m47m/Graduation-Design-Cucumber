import myAxios from "./axios"

export const get_userstory = query =>{
	return myAxios({
		url: '/userstory/all',
		method: 'get',
		params: query
		
	})
}

export const update_userstory = query =>{
	return myAxios({
		url: '/userstory/update',
		method: 'post',
		data: query
	})
}

export const create_userstory = query =>{
	return myAxios({
		url: '/userstory/create',
		method: 'post',
		data: query
	})
}