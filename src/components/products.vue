<template> 

<v-container class="mt-3">
<v-layout row wrap>

<v-flex xs12 >  

          

         

  <v-alert color="success"  :value=true >
       Check your latest products. If you want to buy any of them .  
       <router-link to="products-buy" tag="v-btn" > Click here </router-link>  
    </v-alert>
      

       <div v-if="products.length==0" class="text-xs-center">

        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
            
            <v-progress-circular indeterminate v-bind:size="70" v-bind:width="5" color="purple"></v-progress-circular>
          </div>

            
              <v-layout row wrap > 


               <v-flex xs3 offset-xs1 v-for="product in products" :key="product.id">

                 <v-card color="cyan darken-2" class="text-xs-center" >
                 <br>  

                <!-- <v-layout row wrap > 
                <v-flex xs7> -->
                  <v-card-media :src='product.image' height="200px" contain> </v-card-media>
                <!-- </v-flex> -->

                <!-- <v-flex xs5> -->
                	<div>
                    <div class="headline">{{product.name}}</div>
                    <div class="white--text">{{product.description}}</div>

                  </div>
                    
                <!-- </v-flex> -->

              <!-- </v-layout> -->


                 </v-card>
                 <br>
                 
               </v-flex>
                
                <!-- </span> -->

                
              </v-layout>
            
         
        </v-flex>
      </v-layout>
      </v-container>
</template>



<script>
  
export default{

  data(){


    return {products:''}
  },

created(){

          this.$http.get('api/products')
                .then(success=>{

                  console.log(success)

                  this.products=success.body.data.reverse()

                })

         

}}

</script>
