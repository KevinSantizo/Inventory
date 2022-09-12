<template>
  <div class="mt-2">
    <div class="md-layout">
      <div class="md-layout-item">
        <v-card > 
            <v-dialog v-model="shoppingForm" persistent max-width="1200px"> 
              <v-card>
                <v-card-title>
                  <span class="title">Nueva compra</span>
                </v-card-title>
                <v-card-text>
                  <v-container> 
                    <v-row>                    
                      <v-col cols="12" sm="6">
                        <v-text-field
                          label="Total*"
                          outlined
                          color="#2ec4b6"
                          dense
                          type="number"
                          prefix="Q."
                          v-model="shopping.total"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          label="Número de factura*"
                          persistent-hint
                          required
                          color="#2ec4b6"
                          outlined
                          dense 
                          prefix="Q."
                          v-model="shopping.receipt"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <v-row no-gutters>
                          <v-select
                            class="mr-2"
                            :label="suplierName"
                            :items="suppliers"
                            item-text="supplier_name"
                            @change="selectTextSupplier"
                            color="#2ec4b6"
                            return-object
                            required
                            outlined
                            dense
                            v-model="suplierName"
                          ></v-select>
                          <div class="">
                            <v-btn
                              @click="dialogSup = true"
                              x-small
                              dark
                              fab
                              color="green"
                            >
                              <v-icon dark> mdi-plus </v-icon>
                            </v-btn>
                          </div>
                        </v-row>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <v-text-field
                          label="Fecha*"
                          type="date"
                          color="#2ec4b6"
                          required
                          outlined
                          dense
                          v-model="shopping.date"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card outlined class="pa-3" color="grey lighten-4">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      elevation="0" color="grey" dark
                      @click="shoppingForm = false"
                    >
                      Cerrar
                    </v-btn>
                    <v-btn 
                      color="#2ec4b6"
                      dark
                      elevation="0"
                      @click="(dialogForm = true), submitShopping()"
                    >
                      Guardar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-card>
            </v-dialog> 
        </v-card>
 
        <v-card>
          <v-sheet
              class="v-sheet--offset "
              color="#2ec4b6"
              elevation="5" 
            > 
          <v-row justify="space-between" class=" mt-3">
            <v-col cols="4">
              <div class="ml-5" >
                <v-row>
                  <div class="title white--text ml-5 mt-3">Total compras: </div> 
                  <div>
                    <div class="title ml-3 mt-3 white--text">  {{numberWithCommas(this.sumTotalShopping(this.shoppings))}} GTQ  </div>
                  </div>
                </v-row>
              </div>
            </v-col>
            <v-col cols="2"> 
              <v-btn class=" " style="color: #2ec4b6;" elevation="0" @click="shoppingForm = true" color="white" dark>
                Agregar
              </v-btn>
            </v-col>
            
          </v-row>
          
          </v-sheet> 
          <v-data-table 
            :headers="headersShopping"
            :items="shoppings" 
            :items-per-page="10"
            class="elevation-1"
            :footer-props="{ 'items-per-page-text':'Compras por página'}"
          >
            <template v-slot:item="row"> 
              <tr>
                <td class="text-center font-weight-medium">{{fixedDate(row.item.date)}}</td>
                <td class="text-center font-weight-medium">{{row.item.supplier.supplier_name}}</td>
                <td class="text-center font-weight-medium">{{row.item.receipt}}</td>
                <td class="text-center font-weight-medium">{{row.item.total}} GTQ</td>
 
              </tr>
          </template>            
          </v-data-table> 
        </v-card>
      </div>
    </div>
    <v-dialog v-model="dialogSup" max-width="500px">
      <v-card>
        <v-card-title> Nueva proveedor </v-card-title>
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
            <v-btn color="#2ec4b6"
                dark
                elevation="0" @click="submitSupplierForm()">
              Guardar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogForm" hide-overlay persistent width="300">
      <v-card color="#2ec4b6" dark>
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
        branch_office: "",
      },
      suplierName: "Proveedor*",
      suppliers: [],
      shoppings: [],
      dialogSup: false,
      dialogForm: false,
      supplierProductForm: {
        supplier_name: "",
        phone: "",
        branch_office: "",
      },
      headersShopping: [
        {
          text: 'Fecha',
          align: 'center',
          sortable: false,
          value: 'description',
        },
        { 
          text: 'Proveedor',
          align: 'center',
          sortable: false,
          value: 'date' 
        }, 
         { 
          text: 'Factura',
          align: 'center',
          sortable: false,
          value: 'date' 
        },
         { 
          text: 'Total',
          align: 'center',
          sortable: false,
          value: 'date',
          bid: "" 
        }, 
      ],
    }
  },

  created() {
    this.bid = localStorage.getItem('bo');  
    this.shopping.branch_office = this.bid;
    this.supplierProductForm.branch_office = this.bid;
    this.getSuppliers(); 
    this.getShoppings();
    this.sumTotalShopping(this.shoppings);
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
      axios.get(`${API}api/sales/branch-office-s/${this.bid}/`, { headers }).then((response) => {
        this.suppliers = response.data.list_suppliers;
        this.suppliers.reverse();
      });
    },

    selectTextSupplier(s) {
      this.shopping.supplier = s.id;
      this.suplierName = s.supplier_name;
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
          this.dialogSup = false;
        })
        .catch((error) => {
          return error;
        });
    },

    submitShopping(){
      let headers = { "Content-Type": "application/json;charset=utf-8" };
        axios.post(`${API}api/sales/shopping/create/`, this.shopping, { headers,}).then((response) => {
        this.shopping.date = "";
        this.shopping.total = null;
        this.shopping.receipt = "";
        this.shopping.supplier = null; 
        this.suplierName = "Proveedor*"; 
        setTimeout(() => ( (this.shoppingForm = false)), 4000 );
        setTimeout(() => this.notifyVue("top", "right"), 5000);
        this.getShoppings()
        return response.data;
      }).catch((error) => {
        return error;
      });
    },

    notifyVue(verticalAlign, horizontalAlign) {
      this.$notify({
        message: "¡Se ha registrado la compra! ",
        
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "success",
      });
    },

    getShoppings(){
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios.get(`${API}api/sales/branch-office-sh/${this.bid}/`, { headers,}).then((response) => {
        this.shoppings = response.data.shoppings; 
        this.shoppings.reverse();
        return response.data
      }).catch((error) => {
        return error;
      });
    },

    sumTotalShopping(items){
      return items.reduce((a, b) => {
        return a + Number(b["total"]);
      }, 0);
    },

    fixedDate(d){
      var options = { year: 'numeric', month: 'long', day: 'numeric' };
      let result = new Date(d).toUTCString("es-ES");
      let newDate = new Date(result).toLocaleDateString("es-ES", options);
      return newDate;
    },

    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
  }
};
</script>


<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>