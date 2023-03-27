import axios from 'axios'

function myAxios(axiosConfig) {
	const service = axios.create({
		baseURL: '/api',
		timeout: 10000,
	});

	service.interceptors.request.use(
		config => {
			return config;
		},
		error => {
			console.log(error);
			return Promise.reject();
		}
	);

	service.interceptors.response.use(
		response => {
			if (response.status === 200) {
				return response.data;
			} else {
				Promise.reject();
			}
		},
		error => {
			console.log(error);
			return Promise.reject();
		}
	);

	return service(axiosConfig)//返回一个Promise对象
}

export default myAxios;