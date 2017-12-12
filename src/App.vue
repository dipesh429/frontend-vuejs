<template>
  <!-- <v-app id="inspire" style="background-image: url('../../public/smt.jpg')"> -->
  <v-app id="inspire" >
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
      class='hidden-sm-and-up'
    >

      <v-list dense >
        <v-list-tile @click="" to='/' exact>
          <v-list-tile-action  >
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="" to='/products' exact>
          <v-list-tile-action >
            <v-icon>card_giftcard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Products</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="" to='signup' v-if="!isAuthenticated">
          <v-list-tile-action >
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sign Up</v-list-tile-title>
          </v-list-tile-content>
          </v-list-tile>

         <v-list-tile @click="" to='signin' v-if="!isAuthenticated">
          <v-list-tile-action>
            <v-icon>lock_open </v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sign In</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="" to='transactions' v-if="isAuthenticated">
          <v-list-tile-action>
            <v-icon>swap_horiz </v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Transactions</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>


    <!-- <v-toolbar class="red darken-2 white--text"> -->
    <v-toolbar class="red darken-1 white--text ">
    <v-toolbar-side-icon class='hidden-sm-and-up' @click="drawer=true"> </v-toolbar-side-icon>  
    <!-- <v-toolbar-title >Wholesale</v-toolbar-title> -->

    <router-link to='/' tag="v-toolbar-title" style="cursor:pointer"> Wholesale </router-link> 




    <v-spacer></v-spacer>
    
    <v-toolbar-items  >

           <v-btn flat to='/' class="white--text hidden-xs-only" exact>
      <v-icon left >home</v-icon>
      Home</v-btn>

          <v-btn flat to='/products' class="white--text hidden-xs-only" >
      <v-icon left >card_giftcard</v-icon>
      Products</v-btn>

            <v-btn flat  to='transactions' class="white--text hidden-xs-only" v-if="isAuthenticated">
              <v-icon left >swap_horiz
</v-icon>
              Transactions</v-btn>

                <v-btn flat to='signin' class="white--text hidden-xs-only" v-if="!isAuthenticated">
      <v-icon left >lock_open</v-icon>
      SignIn</v-btn>

               <v-btn flat to='signup' v-if="!isAuthenticated" class="white--text hidden-xs-only">
      <v-icon left >contact_mail</v-icon>
      SignUp</v-btn>
         
            
            <v-menu open-on-hover button offset-y v-if="isAuthenticated" >
            <v-btn flat slot="activator" class="white--text">
                 <v-icon left >person</v-icon> {{get_name}}
            </v-btn>

             <v-btn  @click='logout' class="deep-purple darken-1 white--text">
              <v-icon left >lock_open</v-icon>
              LogOut</v-btn>
            
            </v-menu>



      
     
      
      
    </v-toolbar-items>
  </v-toolbar>

<!--   <br> -->

       
        <router-view class="pa-0"> </router-view>


<!-- <v-footer class="pa-3 red darken-1 white--text">
    <v-spacer></v-spacer>
    <div>© {{ new Date().getFullYear() }}</div>
  </v-footer> -->
  </v-app>
</template>

<script>

import SignUp from './components/signup';
import SignIn from './components/signin';



  export default {
    data(){

      return {drawer:false}
    },

  
    computed:{

      isAuthenticated(){

      return this.$store.getters.isAuthenticated
   
    },


     get_name(){

       return this.$store.getters.get_user_data.name;
     }

    

  },  

    methods:{

    logout(){

    	this.$router.push('/')
        this.$store.dispatch('destroy_token')
      },

   
    
  }
  }
</script>