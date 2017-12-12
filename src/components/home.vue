<template>
		
	<v-container fluid >

	<v-alert color="success"  :value="value" v-if="!isAuthenticated">
       Welcome to Wholesale. Please sign in to visit every page of this website
    </v-alert>


	 <v-alert color="success"  :value="value" v-if="isAuthenticated">
      Welcome {{get_name}}!
    </v-alert>

    


	 
<!-- 
	 	<v-parallax src="http://hddesktopwallpapers.in/wp-content/uploads/2015/06/Plain-Wallpapers-HD-A12.jpg" height="700"> -->

	 		<v-parallax src="./image/5.jpg" height="700">

	 		<br>
	 		<br>
	 		<br>
	 		<br>
	 		<br>

	 		<v-layout row wrap justify-center>

		<v-flex text-xs-center sm4 offset-sm1 >  

		<h3 class="white--text darken-4" > Do u want to sell something??</h3>

      <products-form > </products-form>

     </v-flex>
	

	<v-flex text-xs-center sm4 offset-sm1 style="margin-bottom: 300px">  

	 <h3 class="white--text darken-4" > Do u want to buy something??</h3>
	 <v-btn fab dark color="indigo" to='/products-buy'>
      <v-icon dark>send</v-icon>
    </v-btn>

      

     </v-flex>

     </v-layout>
    
  		</v-parallax>	



 </v-container>	
		

</template>


<script>

	import ProductsForm from './products-form'; 
	
	export default{

		data(){

			return{value:true}
		},

		components:{

			'products-form':ProductsForm
		},


    	computed:{

      		isAuthenticated(){

      			return this.$store.getters.isAuthenticated
   
    },

    		get_name(){

       		return this.$store.getters.get_user_data.name;
     	}

	},

	created(){

		setTimeout(()=>{
			this.value=false
		},3000)

	}

	
		

	}

</script>

