<template>
<v-layout row justify-center>
    <v-dialog v-model="dialog"  max-width="700px" >


      <v-btn fab dark  color="indigo"  slot="activator" >
      <v-icon dark>add</v-icon>
    </v-btn>

    <signinalert v-if="!isAuthenticated" @close='dialog=false'> </signinalert>
    
      
      <v-card v-if="isAuthenticated">
        <v-card-title>
          <span class="headline">Give us your product details</span>
        </v-card-title>
        <v-divider> </v-divider> 
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              
              <v-flex sm12>
                <v-text-field label="Name" v-model= 'name' required></v-text-field>
              </v-flex>



              <v-flex sm12>
               <v-text-field  label="Description" v-model= 'description' multi-line required >
               </v-text-field>
              </v-flex>

             

          <v-flex sm12 >
            <v-select
              label="Categories"
              :items="items"
              v-model="category"
              multiple
              chips
              deletable-chips
              hint="Your Product lies in which Categories??"
              persistent-hint
            ></v-select>
          </v-flex>




            
             <v-flex sm12 >

              <input type="file" accept="image/*" @change="uploaded" style='display:none' ref="x">

               <v-btn color="primary" @click="image_process">Upload Image</v-btn>

              <img :src="image_url" height="100"> 

              </v-flex> 

              <v-flex sm12>
                <v-text-field label="Quantity" v-model= 'quantity' required></v-text-field>
              </v-flex>

              <v-flex sm12>
                <v-text-field label="Price" v-model= 'price' required></v-text-field>
              </v-flex>

              
              
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="confirm">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template> 

  <script>

  import SignInAlert from './signinAlert'
  
  export default {
     
     data(){

      return {dialog:false  ,name:'', description:'',quantity:'',price:'', image_url:'',file:'',

              items:[],category:'',product_id:'',category_id:''}
     },

     components:{

          'signinalert': SignInAlert
     },

     created(){


        this.$http.get('api/categories')
                  .then(success=>{
                    var items = success.body.data

                    items.forEach((x)=>{
                      
                      this.items.push(x.name)
                    })
                    
                  })
     },


     computed:{

          isAuthenticated(){

            return this.$store.getters.isAuthenticated
   
    }},

     methods:{


        image_process(){

           this.$refs.x.click()
        },


        uploaded(e){

          var file=e.target.files[0]
          console.log(file)
          this.file=file
          var extension = file.type.split('/')[1]
          console.log(extension)
          var fileReader = new FileReader()
          fileReader.readAsDataURL(file)
          fileReader.onload=()=>{

            this.image_url=fileReader.result
            // this.file=atob(this.image_url.split(',')[1])
            
          }

        },

        confirm(){

          console.log(this.file)

          this.dialog=false

          

          var id=this.$store.getters.get_user_data.id
       

            var formData = new FormData();

            formData.append("name", this.name);
            formData.append("quantity", this.quantity);
            formData.append("description", this.description);
            formData.append("price", this.price);
            formData.append("image", this.file);



          this.$http.post('api/users/'+id+'/products',formData)
                   .then(products=>{
                  //success1

                   

                    console.log(products)
                      this.product_id=products.body.data.id

                     

            this.$http.get('api/categories/find/'+JSON.stringify(this.category))
          
                    .then(success=>{
                   //success2   
                          console.log(success)
                          console.log(success.body)
                          this.category_id=success.body

                          console.log(this.category_id)
                          console.log(JSON.stringify(this.category_id))


            this.$http.post('api/products/'+this.product_id+'/categories', {category_id: this.category_id})
                          .then(success=>{

                             this.name=''
                             this.description=''
                             this.quantity=''
                             this.price=''
                             this.image_url=''
                             this.category=''

                            console.log(success)
                          },error=>{
                            console.log(error)
                          })   
                    },(error)=>{
                      console.log(error)
                    })
        
                   },error=>{
                     console.log(error)
                   })
        }
     }
   }
</script>