<template>
  <div>
    <md-table v-model="latestSales" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Fecha">{{ item.date }}</md-table-cell>
        <md-table-cell md-label="Total">{{ item.total }} GTQ</md-table-cell>
        <md-table-cell md-label="Tipo de pago">{{formattedTypeOfPayment(item.payment_type) }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import M from 'minimatch';
import axios from 'axios'
import { API } from "../../globalVars";

export default {
  name: "ordered-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      selected: [],
      latestSales: [],
       
    };
    
  },

  created() {
    this.getSales()
  },

  methods: {
    getSales() {
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios
        .get(`${API}api/sales/`, { headers })
        .then((response) => {
          console.log(response.data);
          this.latestSales = response.data.slice(0, 5);

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
