import VueRouter from 'vue-router'
import Vue from 'vue'
import SignUp from '../components/signup';
import SignIn from '../components/signin';
import Transaction from '../components/transaction';
import Products from '../components/products';
import ProductBuy from '../components/products-buy';
import Home from '../components/home';
import {store} from '../store/store.js'


Vue.use(VueRouter)




export const router = new VueRouter({

	mode:'history',

	routes:[

	// 	{path:'/signin',component:SignIn, meta:{authenticated_user : true}
	// },
	// 	{path:'/signup',component:SignUp},

	{path:'',component:Home},
	{path:'/signin',component:SignIn},
	{path:'/signup',component:SignUp},
	
	{path:'/transactions',component:Transaction},
	{path:'/products',component:Products},
	{path:'/products-buy',component:ProductBuy}

	]
})





