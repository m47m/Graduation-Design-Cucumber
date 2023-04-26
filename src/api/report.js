import myAxios from "./axios"

export const getReport = query =>{
	return myAxios({
		url: '/report/test',
		method: 'get',
		params: query
	})
}


export const generateReport = query =>{
	return myAxios({
		url: '/report/generate',
		method: 'post',
		data: query
	})
}

export const get_report_list = params =>{
	return myAxios({
		url: '/report/all',
		method: 'get',
		params: params
	})
}


export const create_report_template = query =>{
	return myAxios({
		url: '/report/create',
		method: 'post',
		data: query
	})
}

export const update_report_template = query =>{
	return myAxios({
		url: '/report/update',
		method: 'post',
		data: query
	})
}

export const delete_report_template = params =>{
	return myAxios({
		url: '/report/delete',
		method: 'get',
		params: params
	})
}


