import myAxios from "./axios"

export const getFeatureList = query =>{
	return myAxios({
		url: '/feature/list',
		method: 'get',
		params: query
	})
}

export const getAllFeatures = query =>{
	return myAxios({
		url: '/feature/all',
		method: 'get',
		params: query
	})
}

export const FeatureTest1 = query =>{
	return myAxios({
		url: '/feature/test',
		method: 'get',
		params: query
	})
}

export const UpdateAllFeautres = query =>{
	return myAxios({
		url: '/feature/update',
		method: 'get',
	})
}

