<template>
	<v-container>
	
	<h2>Your total transactions till date</h2>
<br>
<br>
<br>
		
	<v-layout row wrap  >

	
      <v-flex sm5  >  

	


        <v-expansion-panel>

		<div v-if="transactionsSeller.length==0">

	<v-alert color="success"  value="true" >
       0 products of yours are sold till date
    </v-alert>

	</div>
	
	<div v-else>
	<v-alert color="success"  value="true" class="ml-0" >
       Purchased_Date ({{transactionsSeller.length}})
       <span class="red--text darken-4  ml-5"> Your Products bought by others </span>
    </v-alert>
     

	    <v-expansion-panel-content v-for="transaction in transactionsSeller" :key="transaction.id">
    					 <div slot="header"><div>  {{transform(transaction.created_at)}} </div> </div>


		

						<v-card color="cyan darken-2" >
            <v-container  >
            
              <v-layout row>

                <v-flex xs3>
                  <v-card-media :src='transaction.product.image' height="200px" contain> </v-card-media>
                </v-flex>

                <v-flex sm8	 offset-sm1>
                	<div>
                    <div class="headline">{{transaction.product.name}}</div>
                    
                    <br>
  					Buyer:
  					 <v-chip color="indigo" text-color="white">
      <v-avatar>
        <v-icon>account_circle</v-icon>
      </v-avatar>
       {{transaction.buyer.name}} ({{transaction.buyer.email}}) 
    </v-chip>
							
							<div> Location: {{transaction.location}} </div>
                    		<div> Quantity sold:  {{transaction.quantity}} </div>			
							
							<div>Total Price: {{transaction.product.price*transaction.quantity}} </div>

							
							
					<br>	
				
                  </div>
                    
                </v-flex>

                
              </v-layout>
            </v-container>
          </v-card>


      					
    </v-expansion-panel-content>
    </div>
  </v-expansion-panel>	


		 

        
   

	 </v-flex>


<br>
<br>
<br>



	 <v-flex sm5 offset-sm1 >  

	


        <v-expansion-panel>



        	<div v-if="transactionsBuyer.length==0">

	<v-alert color="success"  value="true" >
       You have not bought anything till date 
    </v-alert>


	</div>

	<div v-else>


	<v-alert color="success"  value="true" class="ml-0"  >
       Purchased_Date ({{transactionsBuyer.length}})
	<span class="red--text darken-4  ml-5"> Products you bought </span>
    </v-alert>

     


	    <v-expansion-panel-content v-for="transaction in transactionsBuyer" :key="transaction.id">
    					 <div slot="header"><div> {{transform(transaction.created_at)}} </div> </div>



						<v-card color="cyan darken-2" >
            <v-container  >
            
              <v-layout row>

                <v-flex xs3>
                  <v-card-media :src='transaction.product.image' height="200px" contain> </v-card-media>
                </v-flex>

                <v-flex sm8 offset-sm1>
                	<div>
                    <div class="headline">{{transaction.product.name}}</div>
                    
                    <br>

                    Seller:
  					 <v-chip color="indigo" text-color="white">
      <v-avatar>
        <v-icon>account_circle</v-icon>
      </v-avatar>
       {{transaction.product.user.name}} ({{transaction.product.user.email}}) 
    </v-chip>
          
							<div> Location: {{transaction.location}} </div>
                    		<div> Quantity sold:  {{transaction.quantity}} </div>			
							
							<div>Total Price: {{transaction.product.price*transaction.quantity}} </div>

							
							
					<br>	
				
                  </div>
                    
                </v-flex>

                
              </v-layout>
            </v-container>
          </v-card>


      					
    </v-expansion-panel-content>
</div>
  </v-expansion-panel>	


		 

        
   

	 </v-flex>
	 
	</v-layout>
</v-container>
</template>


<script>

export default{


	data(){

		return {transactionsSeller:'',transactionsBuyer:'',sum:0}
	},
	
	created(){

		console.log("running")

			if(this.isAuthenticated){

			
			var user_id = this.$store.getters.get_user_data.id

			this.$http.get('api/users/'+ user_id +'/seller')
				.then(success=>{

					console.log(success)

					this.transactionsSeller=success.body.data

				},error=>{

					console.log(error)
				})

			this.$http.get('api/users/'+ user_id +'/buyer')
				.then(success=>{

					console.log(success)

					this.transactionsBuyer=success.body.data

				},error=>{

					console.log(error)
				})	
		}


	},

	methods:{

		transform(x){

			var one=moment(x).format('MMMM Do YYYY, h:mm:ss a')
			var two=moment(x).fromNow()			
			return one+ ' ('+two+')'
		}

		
	},

	computed:{

      		isAuthenticated(){

      			return this.$store.getters.isAuthenticated
   
    },

			},

}

</script>