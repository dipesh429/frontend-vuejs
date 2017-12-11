<template>
<v-layout row wrap>

<v-flex sm8 offset-sm2>

  <v-alert color="success" icon="check_circle" :value="alert" >Thank You for Signing Up! Check the confirmation email at 
    
    <v-chip color="deep-orange darken-1" text-color="white">
      <v-avatar>
        <v-icon>account_circle</v-icon>
      </v-avatar>
      {{confirmation_email}}
    </v-chip>

        </div>      <br>
      After you are activated..please signin below
      <br>
  </v-alert>

</v-flex>  

  <v-flex sm4 offset-sm4>  
    
     

      <v-card>

        <v-card-title>
          <span class="headline">Login for WholeSale</span>
        </v-card-title>


          <v-layout row>

          <v-flex sm8>
        
        <v-alert color="info" icon="info" value="true">
        No Account? &nbsp; Sign up first </v-alert>
          
          </v-flex>

          <v-flex sm3 offset-sm1>
           <v-btn color="primary" class="mt-3" to="/signup">Sign up</v-btn>


          </v-flex>
          
          </v-layout>
<br>




        <v-divider> </v-divider> 
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              
              <v-flex sm12>

                <v-alert color="error" v-if="error" icon="warning" value="true">
                  {{error}}
                </v-alert>

                <v-alert color="error" v-if="message" icon="warning" value="true">
                  {{message}}
                </v-alert>

                <v-text-field label="Email" v-model= 'email' required></v-text-field>

              </v-flex>
              <v-flex sm12>
                <v-text-field label="Password"  v-model= 'password' type="password" required
                :append-icon="p1 ? 'visibility_off' : 'visibility'"
                :append-icon-cb="() => (p1 = !p1)"
                :type="p1 ? 'password' : 'text'"
                ></v-text-field>
              </v-flex>
              
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          
          <!-- <v-btn color="blue darken-1" flat @click.native="signin">Sign In</v-btn> -->


           <v-btn color="info" :loading="loading" @click.native="signin" 
                              :disabled="loading" > SignIn
          <span slot="loader" class="custom-loader">
          <v-icon light>cached</v-icon>
          </span>
          </v-btn>

          <v-btn color="blue darken-1" flat @click.native="cancel">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template> 

  <script>

  import {clientId, clientSecret} from '../../env.js'
  
  export default {
    data () {
      return {
         email:'', password :'',error:'',message:'',p1:true,alert:false,confirmation_email:'',
         loading:false
      }
    },

    created(){

        var x=localStorage.getItem('signup')
        var confirmation_email=localStorage.getItem('confirmation_email')
        if(confirmation_email){
          this.confirmation_email=localStorage.getItem('confirmation_email')
          localStorage.removeItem('confirmation_email')
        }
        if(x=='done'){
          this.alert=true
          localStorage.removeItem('signup')
        }

    },

    methods:{

      cancel(){

        this.$router.push('/')
      },

      signin(){



        var data = {

          'username': this.email,
          'password': this.password,
          'client_id' : clientId,
          'client_secret' : clientSecret,
          'grant_type' : 'password',

        }

        this.error=""
        this.message=""
        this.alert=false
        // this.name = ''
        // this.email = ''
        // this.password = ''
        // this.password_confirmation = ''


           this.loading=true
            this.$http.get('api/users/check/'+data.username)
                .then(user=>{
                  

                  console.log(user)



            this.$http.post('oauth/token',data).then(
                   success=>{

                      this.loading=false
                      this.$router.push('/')
                      console.log(success)
                      // this.$store.dispatch('authenticate')  
                      this.$store.state.user=user.body.data  
                      // context.state.user=user.body.data
                      success.body['id']=user.body.data.id    
                      this.$store.commit('authenticate',success);
                                       
                   },
                   error=>{

                    this.loading=false
                    console.log(error);
                    this.message=''
                     this.message=error.body.message
                   }

          )



                },error=>{
                  this.loading=false
                  this.error=''
                  this.error=error.body.error
                 
                }) 





        

      }
  }}
</script>


 <style scoped>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
