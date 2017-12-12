	<template>

	<v-container>

		<v-alert color="success"  :value='show' >
       Your order was done successfully.. Do you want to see transaction?   
       <router-link to="transactions" tag="v-btn" > Click here </router-link>  
    </v-alert>

	<br>


	 <div v-if="categories.length==0" class="text-xs-center">

        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
            
            <v-progress-circular indeterminate v-bind:size="70" v-bind:width="5" color="purple"></v-progress-circular>
          </div>



	<v-layout row wrap v-for="(category,i) in categories" :key="category.id">
	

		<!-- <v-flex xs12 > -->
			<v-expansion-panel>
			<v-expansion-panel-content :value = "i==0">



			<h2 slot="header" class="red--text"  >{{category.name}}
				<v-subheader style="display:inline"> {{category.description}}</v-subheader>
			</h2>	

	
			
			 	
		<!-- </v-flex>	 -->

      <v-flex sm6 offset-sm3 >  

      	 <span  v-for='product in products[i]' :key="product.id" >



		 <v-card color="cyan darken-2" >
            <v-container  >
            
              <v-layout row>

                <v-flex xs4 sm5>
                  <v-card-media :src='product.image' height="200px" contain> </v-card-media>
                </v-flex>

                <v-flex sm5 offset-sm1 offset-xs1>
                	<div>
                    <div class="headline">{{product.name}}</div>
                    <div class="white--text">{{product.description}}</div>
                    <br>
                    <div>Available Quantity:{{product.quantity}}</div>
                    <div>Price:{{product.price}}</div>

                    

  					 
                    Owner: <v-chip color="indigo" text-color="white">
      <v-avatar>
        <v-icon>account_circle</v-icon>
      </v-avatar>
       {{product.user.name}} ({{product.user.email}}) 
    </v-chip>
                    
                    
					<v-chip :color="(product.status==1)? 'green':'red'" text-color="white" class="ml-0">

						Status: {{(product.status==1)?' Available':' Not Available'}}


						
					</v-chip>	
                    <order :product="product.id" :categories="categories" :status="product.status" :user_id='id' @changed="edit_product" @show="show=true"> </order>
                     
                  </div>
                    
                </v-flex>

                
              </v-layout>
            </v-container>
          </v-card>

          <br>
  
         </span>



	 </v-flex>
	 </v-expansion-panel-content>
	 </v-expansion-panel>
	</v-layout>
</v-container>
</template>



<script>

	import Order from './order'
		
	export default{

		data(){
			return {products:'',id:'',color:'',categories:'',products:[],show:false}
		},

		components:{

			'order':Order
		},

		computed:{

      		isAuthenticated(){

      			return this.$store.getters.isAuthenticated
   
    },

			

			},

		methods:{


			// check(product){

			// 	this.color = (product.status==1)? 'green':'red'

			// 	var sth =

			// 	return sth
			// },

			edit_product(x){
				this.products=x
			}
		},

		created(){

       		this.$http.get('api/categories')
       				  .then(datas=>{

       				  	// console.log(datas)

       				  	 this.categories=datas.body.data
       				  	 
       				  	 this.categories.forEach(each=>{

       				  	 	
       				  	 	if(this.isAuthenticated){


       					this.id = this.$store.getters.get_user_data.id;

						this.$http.get('api/categories/'+ each.id +'/products/except/'+this.id)
			
						  .then(success=>{

						  	if(success.body.data instanceof Array){
						  	var x=success.body.data[0].pivot.category_id
						  	}	
						  	else{
						  		var x= success.body.data
						  		success.body.data=null
						  	}



						  	console.log(x)

						  	console.log(success)

						  	// this.products.push(success.body.data)
						  	this.products.splice(x-1,0,success.body.data)
						  },error=>{

						  	console.log(error)
						  })
		}

			else{

				this.$http.get('api/categories/'+each.id+'/products')
			
						  .then(success=>{

						  	
						  	if(success.body.data instanceof Array){
						  	var x=success.body.data[0].pivot.category_id
						  	}	
						  	else{
						  		var x= success.body.data
						  		success.body.data=null
						  	}

						  	console.log(x)



						  	console.log(success)

						  	// this.products.push(success.body.data)
						  	this.products.splice(x-1,0,success.body.data)

						  	// console.log(this.productss	)
						  	
						  	
						  },error=>{

						  	console.log(error)
						  })


			// }



       				  	 }
       				  })
       				  })	

       		
		

		}

		
	}

</script>