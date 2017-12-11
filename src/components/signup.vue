<template>
<v-layout row >
   
      <v-flex sm4 offset-sm4>  
      <v-card>
        <v-card-title>
          <span class="headline">Signup for WholeSale</span>
        </v-card-title>
        <v-divider> </v-divider> 
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              
             
              <v-flex xs12 >
                <v-text-field label="Name" v-model='name' required ></v-text-field>
               
                <v-alert color="error" v-if="errors.name" icon="warning" value="true">
                  {{errors.name[0]}}
                </v-alert>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email" v-model='email' required></v-text-field>
                 <v-alert color="error" v-if="errors.email" icon="warning" value="true">
                  {{errors.email[0]}}
                </v-alert>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password" v-model='password' hint="At least 6 characters" type="password" required 
                :append-icon="p1 ? 'visibility_off' : 'visibility'"
                :append-icon-cb="() => (p1 = !p1)"
                :type="p1 ? 'password' : 'text'"
                ></v-text-field>
                 <v-alert color="error" v-if="errors.password" icon="warning" value="true">
                  {{errors.password[0]}}
                </v-alert>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Confirm Password" v-model='password_confirmation' type="password" required hint="must be same as entered above"
                :append-icon="p2 ? 'visibility_off' : 'visibility'"
                :append-icon-cb="() => (p2 = !p2)"
                :type="p2 ? 'password' : 'text'"
                ></v-text-field>
              </v-flex>
              
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          
          <!-- <v-btn color="blue darken-1" flat @click.native="signup">Sign Up</v-btn> -->

          <v-btn color="info" :loading="loading" @click.native="signup" 
                              :disabled="loading" > SignUp
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
  export default {
    data () {
      return {
         name : '' , email : '', password : '', password_confirmation :'',errors:'',p1:true ,p2:true, loading:false
      }
    },

    methods:{

      cancel(){

        this.$router.push('/')
      },

      signup(){



        var data1 = {

          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation : this.password_confirmation

        }

        this.loading = true
        this.$http.post('api/users',data1).then(
                   success=>{
                    
                    this.loading = false
                    
                    localStorage.setItem('signup','done')  
                    localStorage.setItem('confirmation_email',this.email)  
                    this.name = ''
                    this.email = ''
                    this.password = ''
                    this.password_confirmation = ''
                    

                    this.$router.push('/signin')
                    console.log(success)
                    // success.body.data.password=data1.password
                    // this.$store.dispatch('authenticate',success)

                   },
                   error=>{

                    this.loading = false  
                    this.errors=''
                    this.errors=error.body.error;
                    console.log(error);
                   
                   }

          )

 

                  
                  
        

      }
    }
  }
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
