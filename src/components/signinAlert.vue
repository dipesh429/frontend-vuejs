<template>

      
      <v-card>
        <v-card-title>
          <h2 class="red--text">Please Sign in for further process</h2>
        </v-card-title>

       <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="cancel">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="signin">Signin</v-btn>
        </v-card-actions>
       
      </v-card>

</template> 

  <script>
    
  export default{

      methods:{

        signin(){
           this.$router.push('/signin')
        },

        cancel(){

           this.$emit('close',false)
        }
      }

  }

  </script>

  

     