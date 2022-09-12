<template>
  <div class="mt-2">
    <div class="md-layout">
      <div class="md-layout-item"> 
        <v-card flat class="pa-3"> 
          <v-row>
            <v-col cols="4">
              <v-autocomplete 
                class="mb-3"
                ref="input" 
                :items="customers"
                :item-text="getFieldText"
                @change="selectText"
                return-object
                hide-no-data
                hide-details 
                label="Seleccionar cliente"
                required
                color="#26547c"
                outlined 
                clearable
                dense
                value="id" 
                v-model="customerName"
              ></v-autocomplete>
            </v-col>
            <v-col cols="4"> 
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <div class="font-weight-medium title mt-3">
            Estado de cuenta
          </div>
          <div class="font-weight-medium title grey--text mt-1">
            {{this.textSetCustomer}}
          </div>
          <v-row class="ml-1 mt-1">
            <div class="font-weight-medium subtitle-1 green--text mt-1 mb-4">
              Saldo actual:  
            </div>

            <div v-if="isGreather" class="font-weight-medium headline green--text ml-10 mb-4">
             Q {{sumCreditsTotal(listOfCredits).toFixed(2)}} 
            </div>
          </v-row>
       
          
          <div class=" pa-3" > 
            <v-card outlined flat class="pa-6">
              <v-row > 
                <v-btn :disabled="disabledButtons" @click="(dialogSup = true)"  class="ma-2" elevation="0">
                  <v-icon color="#2ec4b6" dark class="mr-2"> mdi-hand-coin </v-icon>
                  Abonar
                </v-btn>   
                <v-btn :disabled="disabledButtons" @click="liquidCredit()" class="ma-2" elevation="0">
                  <v-icon color="#2ec4b6" dark class="mr-2"> mdi-text-box-check </v-icon>
                  Liquidar adeudo
                </v-btn>    
                <v-btn   @click="getDetails()" class="ma-2" elevation="0">
                  <v-icon color="#2ec4b6" dark class="mr-2"> mdi-text-box-multiple </v-icon>
                  Detalle de abonos
                </v-btn>  
              </v-row>
            </v-card>
          </div>
          <div class=" pa-3">
            <v-row>
              <v-col md="3">
                <v-card
                  v-if="listOfCredits.length > 0"
                  class="mx-auto"
                  max-width="400" 
                  outlined 
                >
                <v-virtual-scroll
                :items="listOfCredits"
                :item-height="60"
                height="350"
                >
                <template v-slot:default="{ item }"> 
                    <v-list-item-group
                      v-model="model"
                      mandatory
                      color="#dee2e6"
                    >
                      <v-list-item  
                        @click="getSalesDetailCredit(item.sale.id), getCreditId(item.id, item.total)"
                      >
                        <v-list-item-icon>
                          <v-icon > mdi-text-box-multiple-outline </v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                          <v-list-item-title class="font-weight-medium black--text">{{parsedDate(item.sale.date)}} - Q{{numberWithCommas(item.total)}}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group> 
                </template>


                </v-virtual-scroll>

                </v-card>
                <v-card v-else-if="isGreather" outlined>
                  <div class="grey--text subtitle-1 pa-3">
                    Este cliente no tiene créditos
                  </div>
                </v-card>
              </v-col>
              <v-col cols="6">
                <table class="ndk centrado"  v-if="listOfCredits.length > 0">
                  <thead>
                    <tr> 
                      <th>
                        <div class="text-center">
                          Cantidad
                        </div>
                      </th>
                      <th>
                        <div class="text-center">
                          Descripción
                        </div>
                      </th>
                      <th>
                        <div class="text-center">
                          Subtotal
                        </div>
                      </th> 
                      <th>
                        <div class="text-center">
                          Total
                        </div> 
                      </th>
                    </tr>
                  </thead>
                 <tbody>
                    <tr v-for="(item, index) in salesDetailCredit" :key="index" >
                      <td class="text-center font-weight-medium   ">
                        {{ item.quantity }}
                      </td>
                      <td class="text-center font-weight-medium   ">
                        {{ item.product_name }} - {{ item.filling }}
                      </td> 
                      <td class="text-center font-weight-medium   ">
                        Q{{item.product_sale_price }} 
                      </td>
                      <td class="text-center font-weight-medium   ">
                        Q{{ item.sub_total }} 
                      </td>
                    </tr>  
                  </tbody>
                </table>  
              </v-col>
            </v-row>
          </div>
        </v-card>
      </div>
    </div>
    <v-dialog v-model="dialogSup" max-width="500px" persistent>
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">Abonar</v-card-title>
        <v-card-text>
          <v-text-field
            class="mt-3"
            label="Ingrese la cantidad a abonar"
            outlined
            dense
            prefix="Q."
            type="number"
            v-model.number="bonusCash"
          ></v-text-field>
        </v-card-text>
        <v-card outlined class="pa-3" color="grey lighten-4">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn elevation="0" color="grey" dark @click="dialogSup = false">
              Cancelar
            </v-btn>
            <v-btn color="#2ec4b6"
                @click="(dialogForm = true), createCashBonus()"
                dark
                elevation="0">
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
    <div>
      <v-dialog v-model="dialogBonusCashing" width="700">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Liquidar crédito 
          </v-card-title>
          <v-card outlined> 
            <v-card-text  class="center-text display-1 mt-3 font-weight-medium blue--text">
              Q {{sumCreditsTotal(listOfCredits).toFixed(2)}} 
            </v-card-text>
            <v-list> 
              <div class="d-flex align-center mb-3"> 
                <table>
                  <tr>
                    <td>
                      <div class="mt-2 mr-2 font-weight-bold ">
                          Pagó con:
                        </div> 
                    </td>
                    <td>
                    <v-text-field 
                      v-model.number="totalCreditDetail" 
                      hide-details
                      prefix="Q." 
                      color="#26547c"
                      required
                      outlined
                      dense 
                      clearable 
                      @change="restDiference"
                    ></v-text-field>
                    </td>
                  </tr>
                  <tr >
                  <td>
                    <div class="mt-5 mr-2 font-weight-bold ">
                        Cambio:
                      </div> 
                  </td>
                  <td>
                    <v-text-field 
                      class="mt-5" 
                      hide-details
                      prefix="Q." 
                      color="#26547c"
                      readonly
                      dense 
                      v-model.number="exchange"
                    ></v-text-field>
                    </td>
                </tr>
                </table>
              </div>
            </v-list> 
          </v-card>
          <v-divider></v-divider> 
          <v-card-actions class="pa-5">
            <v-spacer></v-spacer> 
            <v-btn @click="(dialogForm = true), liquidConfirmCredit()" class="pa-2" depressed >
              <v-icon left color="#2ec4b6">mdi-printer</v-icon> 
              Cobrar 
            </v-btn>
          </v-card-actions>
        </v-card> 
      </v-dialog> 
    </div>
    <div>
      <v-dialog v-model="dialogShowBonus" width="700">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">Detalle de abonos</v-card-title>
          <table class="ndk centrado mb-10"  >
            <thead>
              <tr> 
                <th>
                  <div class="text-center">
                    Cantidad
                  </div>
                </th>
                <th>
                  <div class="text-center">
                    Fecha de abono
                  </div>
                </th>
                <th>
                  <div class="text-center">
                    No. Crédito
                  </div>
                </th> 
                <th>
                  <div class="text-center">
                    Forma de pago
                  </div> 
                </th>
                <th>
                  <div class="text-center">
                    Estado
                  </div> 
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in listCashBonus" :key="index" >
                <td class="text-center font-weight-medium">
                  Q{{ item.total }}
                </td>
                <td class="text-center font-weight-medium">
                  {{ parsedDate(item.date) }}  
                </td> 
                <td class="text-center font-weight-medium">
                  #{{ item.credit.id }} 
                </td>
                <td class="text-center font-weight-medium">
                  Efectivo
                </td> 
                <td class="text-center font-weight-medium">
                  {{ item.credit.liquidated ? 'Liquidado' : 'Vigente' }} 
                </td> 
              </tr>  
            </tbody>
          </table>   
          
          <v-card-actions class="pl-5 pr-5 mt-3">
            <v-switch
              v-model="switchCredits"
              inset
              color="#2ec4b6"
              @change="changeSwitch"
              label="Mostrar abonos de créditos ya liquidados"
            ></v-switch>  
            <v-spacer></v-spacer> 
            <v-btn @click="dialogShowBonus = false, switchCredits = false" class="pa-2" depressed >
              <v-icon left color="#2ec4b6">mdi-check</v-icon> 
              Aceptar
            </v-btn>
          </v-card-actions>
        </v-card>
        
      </v-dialog>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import { API } from "../globalVars";
import moment from 'moment';

export default {
  data () {
    return { 
      dialogShowBonus: false,
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
      
      customerName: "", 
      shoppings: [],
      dialogSup: false,
      dialogForm: false,
      supplierProductForm: {
        supplier_name: "",
        phone: "",
      },
      isGreather: false,
      model: 1,
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
      customers: [],
      textSetCustomer: "",
      setCustomerId: "", 
      bid: "",
      listOfCredits: [],
      salesDetailCredit: [],
      bonusCash: "",
      creditId: "",
      totalCredit: "",
      disabledButtons: true,
      dialogBonusCashing: false,
      totalCreditDetail: "",
      exchange: "",
      listCashBonus: [],
      switchCredits: false,

    }
  },

  created() {
    this.bid = localStorage.getItem('bo');  

    this.getSuppliers(); 
    this.getCustomers(); 

  },


   watch: {
    dialogForm(val) {
      if (!val) return;
      setTimeout(() => (this.dialogForm = false), 4000);
    },
  },

  methods: {

    getDetails(){
      this.dialogShowBonus = true;
    if (this.switchCredits) {
        this.getListOfCreditsLi()
      } else {
        this.getListOfCredits() 
      }
    },

    changeSwitch(){
      console.log(this.switchCredits);
      if (this.switchCredits) {
        this.getListOfCreditsLi()
      } else {
        this.getListOfCredits() 
      }
    },

    liquidConfirmCredit(){
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      var status; 
      for (let index = 0; index < this.listOfCredits.length; index++) { 
        axios.patch(`${API}api/sales/credit-update/${this.listOfCredits[index].id}/`, {
        "liquidated": true
        }, {headers}).then((r)=>{
          status =  r.status;
          this.totalCreditDetail = ""
          this.dialogBonusCashing = false;
          this.getListOfCredits(); 
          let timerInterval;
          this.$swal.fire({
            title: "Abonos",
            text: `¡Se ha liquidado el crédito!`,
            icon: "success",
            confirmButtonColor: "#004e89",
            confirmButtonText: "Aceptar",
            timer: 5000,
            timerProgressBar: true,
            didOpen: () => {
              this.$swal.showLoading() 
            },
            willClose: () => {
              clearInterval(timerInterval); 
              this.bonusCash = "";
            }
          }).then((result) => {
            return result; 
          });
          axios.patch(`${API}api/sales/sale/${r.data.sale}/`, {
            "payment_type": 1
            } , {headers}
          ).then((r)=> {
            console.log(r.data, "payment type patching");
          }).catch((e)=>{
          console.log(e);
          return e
        })
          return r.data
        }).catch((e)=>{
          console.log(e);
          return e
        })
      }

    },

    restDiference(){ 
      this.exchange = this.totalCreditDetail - this.sumCreditsTotal(this.listOfCredits).toFixed(2);
      return this.exchange.toFixed(2);
    },

    liquidCredit(){
      this.$swal.fire({
        title: '¿Seguro que deseas liquidar el adeudo de este cliente?',
        text: "!No podrás revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: "No",
        confirmButtonText: 'Sí, liquidar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.totalCreditDetail = this.sumCreditsTotal(this.listOfCredits).toFixed(2);
          this.dialogBonusCashing = true;
        }
      })
    },

    getCreditId(id, total){
      this.creditId = id;
      this.totalCredit = total;
      console.log(this.creditId, this.totalCredit);
      
    },

    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },


    createCashBonus(){
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios.post(`${API}api/sales/bonus/create/`, {
        "branch_office": this.bid,
        "credit": this.creditId,
        "total": this.bonusCash,
        "customer": this.setCustomerId,
        "branch_office": this.bid
      }, {headers}).then((res)=>{
        console.log(res.data, " cash bonus ");
        axios.patch(`${API}api/sales/credit-update/${this.creditId}/`, {
          "total": (this.totalCredit - this.bonusCash).toFixed(2)
        }, { headers }).then((r)=>{
          this.dialogSup = false
          this.getListOfCredits() 
          
          let timerInterval;
          this.$swal.fire({
              title: "Abonos",
              text: `¡Se han abonado Q${this.bonusCash} al crédito #${this.creditId}!`,
              icon: "success",
              confirmButtonColor: "#004e89",
              confirmButtonText: "Aceptar",
              timer: 5000,
              timerProgressBar: true,
              didOpen: () => {
                this.$swal.showLoading() 
              },
              willClose: () => {
                clearInterval(timerInterval); 
                this.bonusCash = "";
              }
            }).then((result) => {
              return result; 
            });
          return r.data
         }).catch((e)=>{
          console.log(e, " e");
        })
      }).catch((e)=>{
          console.log(e, " e w");
        })
    },

    getSalesDetailCredit(id){ 
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios.get(`${API}api/sales/sale-details/${id}/`, { headers }).then((response) => {
        this.getListOfCredits();
        this.salesDetailCredit = response.data.sales;  
        this.totalCreditDetail = this.sumCreditsTotal(this.listOfCredits).toFixed(2);
        this.disabledButtons = false;
        console.log(response.data, " sales detail" );
      });
    },

    sumCreditsTotal(items) {
      return items.reduce((a, b) => {
        return a + Number((b["total"]));
      }, 0);
    },
 
    parsedDate(date){
      return moment(String(date)).format('DD/MM/YYYY')
    }, 

    getCustomers() {
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios
        .get(`${API}api/users/user-branch/${this.bid}/`, { headers })
        .then((response) => {
          this.customers = response.data.customers;
          this.customers.reverse();
          console.log(response.data, " customers ");
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },

    selectText(c){  
      this.textSetCustomer = `${c.first_name} ${c.last_name}`;
      this.setCustomerId = c.id;  
      this.getListOfCredits();
      console.log(this.setCustomerId);
    },

    getListOfCredits(){
      console.log("entra");
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios.get(`${API}api/sales/credit-customer/${this.setCustomerId}/`, { headers }).then((response) => {
        this.listOfCredits = response.data.list_credits.filter((credit)=> credit.liquidated == false ); 
        this.listCashBonus = response.data.list_bonus.filter((bonus)=>bonus.credit.liquidated == false);
        this.listOfCredits.reverse()
        this.isGreather = true 
        console.log( this.listOfCredits, this.listCashBonus, " lia" );
      });
    },

    getListOfCreditsLi(){
      console.log("no entra"); 
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios.get(`${API}api/sales/credit-customer/${this.setCustomerId}/`, { headers }).then((response) => {
        this.listCashBonus = response.data.list_bonus.filter((bonus)=>bonus.credit.liquidated == true);
        this.listOfCredits.reverse()
        this.isGreather = true 

      });
    },

    getFieldText (item)
    {
      return `${item.first_name} ${item.last_name}`
    },


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