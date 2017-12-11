import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
import 'vuetify/dist/vuetify.css'
import {store} from './store/store.js'
import {router} from './router/router.js'



Vue.use(Vuetify)
Vue.use(VueResource)

// Vue.http.options.root ='http://dipesh.app';
Vue.http.options.root ='https://dipeshh.herokuapp.com';

// if(store.getters.get_auth_user!=null){

// 	Vue.http.headers.common['Authorization'] = 'Bearer ' + store.getters.get_auth_user.access_token ;
// }



router.beforeEach((to,from,next)=>{
					if(to.meta.authenticated_user){
						if(store.getters.isAuthenticated){
										next('/')
					}
					next()
					}
					next()
		}),





new Vue({
  el: '#app',
  store,
  router,

  created(){


  		var check =store.getters.get_auth_user
	  	if(check){

	  		console.log('true')
	  		console.log('Bearer ' + store.getters.get_auth_user.access_token) 
	  		var id=store.getters.get_auth_user.id
	  		store.state.user={id:id}
	  		Vue.http.get('api/users/'+id)
                   				.then(user=>{
                   					console.log(1)
                   					console.log(user)
                   					store.state.user=user.body.data
                   				})
	  		

	  	}
	  },


  render: h => h(App),

  
 
	  


})
