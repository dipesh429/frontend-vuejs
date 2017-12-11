import Vuex from 'vuex'
import Vue from 'vue'


Vue.use(Vuex)


export const store = new Vuex.Store({

	state:{

		user: null,
		loading:null
	},

	getters: {
		
		isAuthenticated(state,getters){

			
				if(state.user){
					return true
				}
			
			else {
				return false
			}

		},

		get_auth_user(state,getters){

	
			var auth_user = JSON.parse(localStorage.getItem('auth_user'))

			if(auth_user){

			var token = auth_user.access_token
			var expiration = auth_user.expiration
			
			}
			
			if(!token || !expiration){
				return null
			}

			if(parseInt(expiration)< Date.now()){
				return null
			}

		

			return auth_user
			
			
		},

	

		get_user_data(state){

			return state.user
		},

		


	},

	mutations:{

		authenticate(state,success){


			 var auth_user = {

			 	'access_token':success.body.access_token,
			 	'refresh_token':success.body.refresh_token,
			 	'expiration':success.body.expires_in+Date.now(),
			 	'id':success.body.id
			 	

			 }  

			 localStorage.setItem('auth_user',JSON.stringify(auth_user))
			 // state.user=auth_user
			 
		},

		destroy_token(state){

			localStorage.removeItem('auth_user');	
			
		},



	},

	actions:{

		

		destroy_token(context){

			context.state.user=null
			context.commit('destroy_token');	

			
		},
	}


})