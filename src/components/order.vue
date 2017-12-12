<template>
<v-layout row >
    <v-dialog v-model="dialog" max-width="500px">
     
    <v-btn color="red accent-3" :disabled="disable" class="mt-2 ml-0" slot="activator">
<v-icon left>local_grocery_store
</v-icon>
    Buy</v-btn>


    <signinalert v-if="!isAuthenticated" @close='dialog=false'> </signinalert>

     <v-card v-if="isAuthenticated">
        <v-card-title>
          <span class="headline">Order</span>
        </v-card-title>
        <v-divider> </v-divider> 
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>


              
              <v-flex xs12>
                
                 <v-alert color="error" v-if="checkerror" icon="warning" value="true">
                  {{errors }}
                </v-alert>
                
                <v-text-field label="Quantity" v-model= 'quantity' required></v-text-field>
                 <v-alert color="error" v-if="errors.quantity" icon="warning" value="true">
                  {{errors.quantity}}
                </v-alert>

              </v-flex>

              <v-flex xs12>
                <v-text-field label="Location to deliver" v-model= 'location' required></v-text-field>

                 <v-alert color="error" v-if="errors.location" icon="warning" value="true">
                  {{errors.location}}
                </v-alert>

              </v-flex>
              
              
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="order">Order</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template> 

  <script>

  import SignInAlert from './signinAlert'
  
  export default {
    data () {
      return {
        dialog: false,location:'',quantity:'',buyerid:'',disable:false,products:[],errors:''
      }
    },

    components:{

          'signinalert': SignInAlert
     },

    computed:{


      checkerror(){

        if(this.errors!='' && this.errors.quantity==undefined && this.errors.location==undefined){

          return true
        }

      },

      isAuthenticated(){

      return this.$store.getters.isAuthenticated
   
    }},

    props:['product','user_id','status','categories'],

    methods:{

      order(){

        if(!this.isAuthenticated){
          this.$router.push('/signin')
        }

           
       
       
        var data={

          'location': this.location,
          'quantity':this.quantity
        }


         this.buyerid= this.$store.getters.get_user_data.id

         this.errors=''

         this.$http.post('api/buyers/'+this.buyerid+'/products/'+ this.product+'/transactions',data)
                   .then(success=>{
                    

                  //so that we get fresh product whose quantity is new 

              this.categories.forEach(each=>{     

            
            this.$http.get('api/categories/'+ each.id +'/products/except/'+this.user_id)


              .then(success=>{

                console.log(success)

                if(success.body.data[0]!=undefined){
                var x=success.body.data[0].pivot.category_id
                } 
                else{
                  var x= success.body.data
                  success.body.data=null
                }
                console.log(x)

                
                // this.products.push(success.body.data)
                this.products.splice(x-1,0,success.body.data)

                
                
              },errors=>{

                console.log(errors)
                // this.errors=errors.body.error
              })

      
              
      })
              this.$emit('changed',this.products)
              this.$emit('show','')
              this.dialog=false 

            },errors=>{

                console.log(errors)
                this.errors=errors.body.error
              }
)
    }},

    created(){

       

        this.disable= (this.status==1)?false : true
      

    }

    }
</script>