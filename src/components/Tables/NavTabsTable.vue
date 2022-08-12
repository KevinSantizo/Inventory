<template>
  <div>
    <md-table v-model="reminders"  >
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell>{{ item.description }}</md-table-cell>
        <md-table-cell>
          <v-btn
            class="mx-2"
            fab
            dark
            x-small
            color="primary"
          >
            <v-icon dark>
              mdi-minus
            </v-icon>
          </v-btn>
          <md-button class="md-just-icon md-simple md-danger">
            <md-icon>close</md-icon>
            <md-tooltip md-direction="top">Close</md-tooltip>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>

import axios from 'axios'
import { API } from "../../globalVars";


export default {
  name: "ordered-table",
  data() {
    return {
      reminders: [], 
    };
  },

  created(){
    this.getReminders();
  },

  methods: {
    onSelect: function (items) {
      this.selected = items;
    },

    getReminders(){
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios
        .get(`${API}api/sales/reminder/`, { headers })
        .then((response) => {
          this.reminders = response.data;
         })
        .catch((error) => {
          return error;
        }) 
    }
  },
};
</script>
