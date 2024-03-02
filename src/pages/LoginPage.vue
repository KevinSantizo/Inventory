<template>
  <div class=" child" >
    <div  >
      <md-card>
        <md-card-header data-background-color="blue">
          <h4 class="title">Login Administrativo</h4>
        </md-card-header>
        <md-card-content>
          <h4>
             
          </h4>
          <div
            
            class="md-layout-item md-small-size-100 md-size-100"
          >
            <md-field>
              <label>Correo electrónico</label>
              <md-input type="text" v-model="email" required></md-input>
            </md-field>
          </div>
          <div
             
            class="md-layout-item md-small-size-100 md-size-100"
          >
            <md-field>
              <label>Contraseña</label>
              <md-input type="password" v-model="password" required></md-input>
            </md-field>
          </div>
          
          <md-button class="md-raised md-info" @click="login()">
            Iniciar sesión
          </md-button> 
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import { API } from "../globalVars";
import router from "@/routes/index";

 export default {
  data: () => ({
    email: "",
    code: "",
    password: ""
  }),
  computed: {
 
  },
  methods: {
     async login() {
      var url = `${API}api/users/user-store/`;
      axios.get(url).then((res) => {
        for (let index = 0; index < res.data.length; index++) {
          if (this.email === res.data[index]["email"] && this.password === res.data[index]["password"]) { 
          localStorage.setItem('user', res.data[index]['id']); 
          localStorage.setItem('bo', res.data[index]['branch_office']);  
           console.log(res.data[index]['branch_office']);
            router.push({name: 'Ventas'}).catch(e => {
                console.log(e); 
            });
          } else {
            console.log("didnt match ");
          }
        }
      });
    },
  },
  
};
</script>

<style>
    .child {  
        margin: auto;
        margin-top: 100px;
        width: 50%;
        padding: 10px;
    }
</style>
