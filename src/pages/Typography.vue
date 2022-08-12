<template>
  <div class="mt-2">
    <div class="md-layout">
      <div class="md-layout-item"> 
        <v-card>
          <v-sheet
              class="v-sheet--offset "
              color="#284b63"
              elevation="5" 
            > 
          <v-row justify="space-between" class="  mt-3">
            <v-col cols="4">
              <div class="ml-5" >
                <v-row>
                  <div class="title ml-5 white--text mt-3">Total proveedores: </div> 
                  <div>
                    <div class="title ml-3 mt-3 white--text">  {{suppliers.length}} </div>
                  </div>
                </v-row>
              </div>
            </v-col>
            <v-col cols="2"> 
              <v-btn class="" elevation="0" @click="dialogSup = true" color="white" style="color: #284b63;" dark>
                Agregar
              </v-btn>
            </v-col> 
          </v-row> 
          </v-sheet> 
          <v-data-table 
            :headers="headersSupplier"
            :items="suppliers" 
            :items-per-page="10"
            class="elevation-1"
            :footer-props="{ 'items-per-page-text':'Proveedores por página'}"
          >
            <template v-slot:item="row"> 
              <tr>
                <td class="text-center font-weight-medium">{{ row.item.supplier_name }}</td>
                <td class="text-center font-weight-medium">{{row.item.phone}}</td>
 
              </tr>
          </template>            
          </v-data-table> 
        </v-card>
      </div>
    </div>
    <v-dialog v-model="dialogSup" max-width="500px">
      <v-card>
        <v-card-title> Nuevo proveedor </v-card-title>
        <v-card-text>
          <v-text-field
            class="mt-3"
            label="Ingrese el nombre del proveedor"
            outlined
            dense
            v-model="supplierProductForm.supplier_name"
          ></v-text-field>

          <v-text-field
            label="Ingrese el teléfono del proveedor"
            outlined
            dense
            v-model="supplierProductForm.phone"
          ></v-text-field>
        </v-card-text>
        <v-card outlined class="pa-3" color="grey lighten-4">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn elevation="0" color="grey" dark @click="dialogSup = false">
              Cancelar
            </v-btn>
            <v-btn color="#284b63"
                dark
                elevation="0" @click="(dialogForm = true), submitSupplierForm()">
              Guardar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogForm" hide-overlay persistent width="300">
      <v-card color="#284b63" dark>
        <v-card-text>
          Guardando
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { API } from "../globalVars";
export default {
  data () {
    return {
      shoppingForm: false,
      dialog4: false,
      shopping: {
        date: "",
        total: null,
        receipt: "",
        supplier: null,
        branch_office: 1,
      },
      suplierName: "Proveedor*",
      suppliers: [],
      shoppings: [],
      dialogSup: false,
      dialogForm: false,
      supplierProductForm: {
        supplier_name: "",
        phone: "",
      },
      headersSupplier: [
        {
          text: 'Nombre proveedor',
          align: 'center',
          sortable: false,
          value: 'description',
        },
        { 
          text: 'Teléfono',
          align: 'center',
          sortable: false,
          value: 'date' 
        }, 
         
      ],
    }
  },

  created() {
    this.getSuppliers(); 

  },


   watch: {
    dialogForm(val) {
      if (!val) return;
      setTimeout(() => (this.dialogForm = false), 4000);
    },
  },

  methods: {
    getSuppliers() {
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios.get(`${API}api/sales/supplier/`, { headers }).then((response) => {
        this.suppliers = response.data;
        this.suppliers.reverse();
      });
    },

    submitSupplierForm() {
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios
        .post(`${API}api/sales/supplier/create/`, this.supplierProductForm, {
          headers,
        })
        .then((response) => {
          this.getSuppliers();
          this.shopping.supplier = response.data["id"];
          this.suplierName = response.data["supplier_name"];
          this.supplierProductForm.supplier_name = "";
          this.supplierProductForm.phone = "";  
          setTimeout(() => ( (this.dialogSup = false)), 4000 );
          setTimeout(() => this.notifyVue("top", "right"), 5000);
        })
        .catch((error) => {
          return error;
        });
    },

  
    notifyVue(verticalAlign, horizontalAlign) {
      this.$notify({
        message: "¡Se ha registrado el proveedor! ",
        icon: "check",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "success",
      });
    },

    
  }
};
</script>


<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>