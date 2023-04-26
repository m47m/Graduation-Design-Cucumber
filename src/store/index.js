import {defineStore} from 'pinia'

//定义容器
export const useCounterStore = defineStore('counter', {
   state:()=>{
		return {
			token: '',
		}
	 },

	 //封装计算属性 
	 //存在缓存，只有依赖的state发生变化才会重新计算
	 getters:{
		doubleToken: (state)=>state.token + state.token
	 },

	 //封装业务逻辑
	 actions:{
		setToken(token){
			localStorage.setItem('token', token)
			this.token = token
		},
		getToken(){
			return this.token
		},
		clear_token(){
			  localStorage.removeItem("token");
			this.token = ''
		}
	 },
})


