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

