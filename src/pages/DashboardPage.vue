<template>
  <div class="content">
    <v-row no-gutters>
      <v-col cols="12" sm="6">
        <div class="mr-2">
          <v-card class=" mx-auto"  >
            <canvas id="myChartDay" width="400px" height="213"></canvas>
          <v-card-text>
            <div class="font-weight-bold">
              {{ currentDaySales.length > 1 ? currentDaySales.length + ' Ventas este día' : currentDaySales.length + ' Venta este día' }}
            </div>
          </v-card-text>
          </v-card>
        </div>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="ml-2">
          <v-card class=" mx-auto"  >
            <canvas id="myChart" width="400px" height="213"></canvas>
          <v-card-text>
            <div class="font-weight-bold">
              {{ currentMonthSales.length > 1 ? currentMonthSales.length + ' Ventas este mes' : currentMonthSales.length + ' Venta este mes' }}
            </div>
          </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <div class="md-layout mt-5">
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="green">
          <template slot="header">
            <v-icon color="white" size="25">mdi-package-variant-closed</v-icon>
          </template>

          <template slot="content">
            <p class="category">Productos</p>
            <h3 class="title">{{listofProducts}}</h3>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="blue">
          <template slot="header">
            <v-icon color="white" size="25">mdi-shape</v-icon>
          </template>

          <template slot="content">
            <p class="category">Categorías</p>
            <h3 class="title">{{categories}}</h3>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="orange">
          <template slot="header">
            <v-icon color="white" size="25">mdi-account-group</v-icon>
          </template>

          <template slot="content">
            <p class="category">Proveedores</p>
            <h3 class="title">{{suppliers}}</h3>
          </template>
        </stats-card>
      </div>


     <!-- <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="red">
          <template slot="header">
            <v-icon color="white" size="25">mdi-human-male-male</v-icon>
          </template>

          <template slot="content">
            <p class="category">Empleados</p>
            <h3 class="title">{{suppliers.length}}</h3>
          </template>
        </stats-card>
      </div>
--> 
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50 mt-10"
      >
        <v-card class="mt-4" >
          <v-sheet
            class="v-sheet--offset"
            color="orange"
            elevation="5" 
          >
          <v-row class="space-between pa-3"> 
              <div class="pl-6 font-weight-bold white--text title">
                Últimas ventas
              </div> 
          </v-row>
          
          </v-sheet> 
            <v-data-table
              :headers="headersSales"
              :items="latestSales" 
              class="elevation-1"
              hide-default-footer
 
            >
            <template v-slot:item="row"> 
              <tr>
                <td class="text-center font-weight-medium">{{row.item.date}}</td>
                <td class="text-center font-weight-medium">{{formattedTypeOfPayment(row.item.payment_type) }}</td>
                <td class="text-center font-weight-medium">{{ row.item.total }} GTQ</td>
                
              </tr>
          </template>            
            </v-data-table>
        </v-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50 mt-10"
      >
        <v-card class="mt-4" >
          <v-sheet
            class="v-sheet--offset"
            color="cyan"
            elevation="5" 
          >
          <v-row class="space-between pa-3"> 
            <div class="pl-6 font-weight-bold white--text title">
              Recordatorios
            </div>
            <v-spacer></v-spacer>
            <div>
              <v-btn
                class="mx-2" 
                dark 
                outlined 
                @click="(dialogReminder = true)"
              >
                Nuevo
              </v-btn>
            </div> 
          </v-row>
          
          </v-sheet> 
            <v-data-table 
              :headers="headers"
              :items="reminders" 
              :items-per-page="5"
              class="elevation-1"
              :footer-props="{ 'items-per-page-text':'Recordatorios por página'}"
            >
            <template v-slot:item="row"> 
              <tr>
                <td class="text-center font-weight-medium">{{row.item.description}}</td>
                <td class="text-center font-weight-medium">{{row.item.date}}</td>
                <td class="text-center font-weight-medium">
                    <v-btn @click="deleteReminder(row.item.id)" fab dark text x-small color="red">
                        <v-icon dark>mdi-close</v-icon>
                    </v-btn>
                </td>
              </tr>
          </template>            
        </v-data-table>
        </v-card>
      </div>
    </div>
    <v-dialog v-model="dialogReminder" max-width="500px">
      <v-card>
        <v-card-title> Agregar recordatorio </v-card-title>
        <v-card-text>
          <v-text-field
            class="mt-3"
            label="Ingrese la descripción del recordatorio"
            outlined
            dense
            v-model="reminderform.description"
          ></v-text-field> 
        </v-card-text>
        <v-card outlined class="pa-3" color="grey lighten-4">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn elevation="0" color="grey" dark @click="dialogReminder = false">
              Cancelar
            </v-btn>
            <v-btn color="cyan"
                dark
                elevation="0" @click="(dialogForm = true), submitReminderForm()">
              Guardar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
    </v-dialog>
     <v-dialog v-model="dialogForm" hide-overlay persistent width="300">
      <v-card color="cyan" dark>
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
import axios from 'axios'
import { API } from "../globalVars";
import Chart from 'chart.js';

import {
  StatsCard,
 } from "@/components";

export default {
  components: {
    StatsCard, 
   },
  data() {
    return {
      bid: "",
      headers: [
        {
          text: 'Descripción',
          align: 'center',
          sortable: false,
          value: 'description',
        },
        { 
          text: 'Fecha',
          align: 'center',
          sortable: false,
          value: 'date' 
        }, 
         { 
          text: 'Acciones',
          align: 'center',
          sortable: false,
          value: 'date' 
        },
      ],
      headersSales: [
        {
          text: 'Fecha',
          align: 'center',
          sortable: false,
          value: 'description',
        },
        { 
          text: 'Tipo de pago',
          align: 'center',
          sortable: false,
          value: 'date' 
        }, 
         { 
          text: 'Total',
          align: 'center',
          sortable: false,
          value: 'date' 
        },
      ],
      latestSales: [],

      dialogReminder: false, 
      dialogForm: false,
      salesByMonth: [],
      salesBM: [],
      salesByDay: [],
      labelsTotal: [],
      labelsMonth: [],
      currentDaySales: [],
      currentMonthSales: [],
      length: "",
      listofProducts: "",
      categories: "",
      suppliers: "",  
      reminders: [], 
      reminderform: {
        description: "",
        date: "",
        branch_office: 1
      },
      parsedEntrySales: [],
      parsedEntrySalesDay: []

    };
  },


   watch: {
    dialogForm(val) {
      if (!val) return;
      setTimeout(() => (this.dialogForm = false), 4000);
    },
  }, 
  async mounted () { 

    this.bid = localStorage.getItem('bo'); 
    const labels = [];
    const theData = []; 

    await axios.get(`${API}api/sales/sales-by-month/`).then((response) => {
      function getFirst (keyFn, array) {
        var mySet = new Set();
        return array.filter(function(x) {
            var key = keyFn(x), isNew = !mySet.has(key);
            if (isNew) mySet.add(key);
          return isNew;
        }); 
      }  
      var withoutDuplicates = getFirst(x => x.month, response.data);
        this.salesByMonth = withoutDuplicates;
        withoutDuplicates.map(entry => { 
          this.parsedEntrySales = entry.sales.filter((s)=> s.branch_office == this.bid);
           labels.push(entry.month.toUpperCase().substring(0, 3));  
          theData.push(this.parsedEntrySales.length)
        }); 
 
      }).catch((err) => {
        console.log('Err: ' + err);
      })



    const labelsDay = [];
    const theDataDay = []; 
 
    await axios.get(`${API}api/sales/sales-by-day/?branch_office=${this.bid}`).then((response) => {
      this.salesByDay = response.data.slice(-7); 
      this.salesByDay.map(entry => {
          this.parsedEntrySalesDay = entry.sales.filter((s)=> s.branch_office == this.bid);
          labelsDay.push(entry.day.toUpperCase().substring(0, 1));  
          theDataDay.push(this.parsedEntrySalesDay.length)
        }); 
 
      }).catch((err) => {
        console.log('Err: ' + err);
      })


    const data = {
      labels: labels,
      datasets: [{
        label: "Ventas por mes",
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
        data: theData,
      }]
    };

    const config = {
      type: 'bar',
      data: data,
      options: {
        scales: { 
           yAxes: [{
            ticks: {
              beginAtZero: true,
              userCallback: function(label, index, labels) {
                 if (Math.floor(label) === label) {
                  return label;
                } 
              },
            }
         }], 
        }
      },
    };

    const myChart = new Chart(
      document.getElementById('myChart'),
      config
    );

    const dataDay = {
      labels: labelsDay,
      datasets: [{
        label: "Ventas por día",
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
        fill: true,
        tension: 0.3,
        data: theDataDay,
      }]
    };

    const configDay = {
      type: 'line',
      data: dataDay,
      options: {
        scales: { 
           yAxes: [{
            ticks: {
              beginAtZero: true,
              userCallback: function(label, index, labels) {
                 if (Math.floor(label) === label) {
                  return label;
                } 
              },
            }
         }], 
        }
      },
    };

    const myChartDay = new Chart(
      document.getElementById('myChartDay'),
      configDay
    );

  },
   created (){ 
    this.bid = localStorage.getItem('bo');
    console.log(localStorage.getItem('user'), " getting user id ");
    this.getSalesByCurrentMonth(); 
    this.getSalesByCurrentDay(); 
    this.getProducts();
    this.getSuplliers(); 
    this.getReminders();
    this.getSales();
  },

  methods: {
  
    getProducts() {
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios
        .get(`${API}api/sales/branch-office-p/${this.bid}/`, { headers })
        .then((response) => { 
          this.listofProducts = response.data.products;
          this.categories = response.data.categories;  
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        }) 
    },

/*
    getCategories() {
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios
        .get(`${API}api/sales/product-category/`, { headers })
        .then((response) => {
          this.categories = response.data;
         })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        }) 
    },
*/
    getSuplliers() {
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios
        .get(`${API}api/sales/branch-office-s/${this.bid}/`, { headers })
        .then((response) => { 
          this.suppliers = response.data.suppliers;
         })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        }) 
    },
  
    getSalesByCurrentMonth(){
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios.get(`${API}api/sales/sale-details-current-month/?branch_office=${this.bid}`, { headers }).then((response) =>{
       this.currentMonthSales = response.data; ;
       }).catch((err) => {
        console.log('Err: ' + err);
      })
    },

    getSalesByCurrentDay(){
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios.get(`${API}api/sales/sale-details-current-day/?branch_office=${this.bid}`, { headers }).then((response) =>{
       this.currentDaySales = response.data; 

       }).catch((err) => {
        console.log('Err: ' + err);
      })
    },

    submitReminderForm(){
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios.post(`${API}api/sales/reminder/create/`, this.reminderform, {
        headers,
      }).then((response)=> {
        setTimeout(() => ( (this.dialogReminder = false)), 4000 );
        setTimeout(() => this.notifyVue("top", "right"), 5000);
        this.reminderform.description = "";
        this.getReminders();
        return response.data;
      }).catch((error) => {
        return error;
      })
    },

    notifyVue(verticalAlign, horizontalAlign) {
      this.$notify({
        message: "¡Se ha registrado el recordatorio! ",
        icon: "check",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "success",
      });
    },

    getReminders(){
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios.get(`${API}api/sales/branch-office-re/${this.bid}/`, { headers })
      .then((response) => { 
        this.reminders = response.data.list_reminders;
        this.reminders.reverse();
        })
      .catch((error) => {
        return error;
      }) 
    },
    deleteReminder(id){
      let headers = { "Content-Type": "application/json;charset=utf-8" };
        axios.delete(`${API}api/sales/reminder/delete/${id}/`, { headers }).then((r)=>{
        this.getReminders();
        return r.data;
      }).catch((error) => {
        return error;
      }) 
    },


    getSales() {
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios
        .get(`${API}api/sales/branch-office-sa/${this.bid}`, { headers })
        .then((response) => { 
          this.latestSales = response.data.list_sales.slice(-5); 
          this.latestSales.reverse();
        }).catch((error) => {
        return error;
      });
    },

    formattedTypeOfPayment(p){
      var payment = ""
      switch (p) {
        case 1:
          payment = "Efectivo";
        break;

        case 2:
          payment = "Cheque"
        break;

        case 3:
          payment = "Crédito"
        break;
      
        default:
          break;
      }
      return payment;
    }

  }
};
</script>

<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }

.v-data-table-header th {
  text-transform: uppercase;
  font-size: 15px !important;
}
</style>