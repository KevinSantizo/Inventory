<template>

  <div >
  <v-footer fixed class="pa-6">
    <v-row justify="end">   
          <div>
            <v-row>
                <v-card @click="dialogCobro = true" style="margin-right: 10px; " class="align-center d-flex align-center pa-6">
                  <div  class="font-weight-bold display-1 d-flex align-center mt-3" >
                    <v-row>
                      <div>
                      <img src="@/assets/img/carrito.png" style="height: 35px;" class="mb-3 mr-2">
                    </div>
                      <div class="font-weight-bold headline" style="color: #2ec4b6;">
                        Cobrar
                      </div>
                    </v-row> 
                  </div> 
                </v-card> 
  
              <v-card class="d-flex align-center pa-6" style="margin-right: 20px;" outlined>
                <div class="font-weight-bold display-1 d-flex align-center blue--text">
                  {{ sumPrecios(gettingProductsBarcode).toFixed(2) }} GTQ
                </div> 
              </v-card> 
            </v-row> 
          </div> 
    </v-row> 
  </v-footer>
    <v-row justify="space-between" class="mt-4"> 
    </v-row>
    <v-dialog v-model="dialogForm" hide-overlay persistent width="300">
      <v-card color="#3fa7d6" dark>
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
      <v-dialog v-model="dialogTypeOfsale" max-width="500px">
      <v-card>
        <v-card-title> Agregar tipo de venta </v-card-title>
        <v-card-text>
          <v-text-field
            class="mt-3"
            label="Ingrese nombre del tipo de venta"
            v-model="typeOfSale"
            outlined
            dense
          ></v-text-field>
        </v-card-text>
        <v-card outlined color="grey lighten-4">  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialogTypeOfsale = false" elevation="0" color="grey" dark> Cancelar </v-btn>
            <v-btn color="#3fa7d6"
                dark
                elevation="0" @click="postTypeOfSale()" >
              Guardar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
    </v-dialog> 
    <div class=" mr-5 ml-5 ">
      <v-card  outlined elevation="0">
        <v-tabs 
          v-model="tab" 
          color="#26547c" 
        >
          <v-tabs-slider color="#26547c"></v-tabs-slider> 
          <v-tab ><v-icon class="mr-3"  >mdi-file-document-multiple-outline</v-icon>Nueva</v-tab>
          <v-tab><v-icon class="mr-3" >mdi-text-box-edit-outline</v-icon>Modificar</v-tab>
          
          <v-tab><v-icon class="mr-3" >mdi-file-document-remove</v-icon>Eliminar</v-tab>
          <v-tab><v-icon class="mr-3" >mdi-table-search</v-icon>Verificador</v-tab>
        </v-tabs>
      </v-card>
      <v-tabs-items v-model="tab">
      <v-tab-item>
      <v-card  flat elevation="0">  
        <v-card outlined color="#F1F4F7">
          <v-list-item>
            <v-list-item-content> 
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    color="#3fa7d6"
                    dense
                    hide-details
                    prepend-inner-icon="mdi-barcode-scan" 
                    v-model="barcode"
                    :autofocus="autofocus"
                    solo
                    v-on:keyup.enter="submit"
                    label="Buscar por código de barras"
                  ></v-text-field>
                </v-col> 
              </v-row>
              
            </v-list-item-content>
          </v-list-item> 
        </v-card>
        
          <v-divider></v-divider>
 
          <v-list-item>
            <v-list-item-content>
              <div class="pb-10">
                <v-simple-table fixed-header height="100%">
                  <thead>
                    <tr>
                      <th></th>
                      <th class=" ">
                        <div class="text-left subtitle-1 font-weight-medium">
                          #Descripción
                        </div>
                      </th>
                      <th class="text-left">
                        <div class="subtitle-1 font-weight-medium">
                          Cantidad
                        </div>
                      </th>
                    <!-- <th class="text-right">
                        <div class="subtitle-1 font-weight-medium">
                          Tipo de venta
                        </div>
                      </th>-->
                      <th class="text-right">
                        <div class="subtitle-1 font-weight-medium">Precio</div>
                      </th>
                      <th class="text-right">
                        <div class="subtitle-1 font-weight-medium">
                          Subtotal
                        </div>
                      </th>
                      <th class="text-right">
                        
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in gettingProductsBarcode"
                      :key="index"
                    >
                      <td class="text-right font-weight-medium">
                        {{ index + 1 }}
                      </td>
                      <td class="text-left font-weight-medium">
                       {{ item.name }}  {{ item.filling }}
                      </td>
                      <td align="right" class="text-right font-weight-medium">
                        <v-row class="mt-2" justify="end">
                          <v-col cols="12" sm="12">
                            <v-text-field
                              type="number"
                              dense
                              color="#3fa7d6"
                              outlined
                              min="1"
                              :max="item.stock"
                              label="Cantidad"
                              v-model.number="item.quanty"
                              @change="sumPrecios(gettingProductsBarcode)"
                            >
                            </v-text-field>
                          </v-col>
                        </v-row>
                      </td>
                     <!-- <td align="right" class="text-right font-weight-medium">
                      <v-row class="mt-2 ml-5" justify="end"> 
                        <v-col cols="5">
                          <v-select 
                            class="mr-2"
                            :items="typeOfSales"
                            return-object
                            :label="typeOfSale"
                            @change="selectTypeOfSale"
                            required
                            outlined
                            dense
                            v-model.trim="item.type_of_sale"
                            item-value="id"
                            color="#3fa7d6"
                            item-text="name"> 
                          </v-select>
                        </v-col>
                          <div class="mt-3">
                          <v-btn 
                            @click="dialogTypeOfsale= true"
                            x-small
                            dark
                            fab
                            color="green"
                          >
                            <v-icon dark> mdi-plus </v-icon>
                          </v-btn>
                        </div>
                        
                      </v-row> 
                      </td>--> 
                      <td class=" text-right font-weight-medium">
                        {{  item.price }} GTQ 
                      </td>
                      <td class="text-right font-weight-medium">
                        {{  item.price * item.quanty }} GTQ
                      </td>
                      <td>
                        <v-btn
                          class="mx-2"
                          dark
                          small
                          elevation="0"
                          color="red accent-3" 
                          @click="deleteProduct(item.id)"
                        >
                          <v-icon small dark> mdi-trash-can </v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>
                 
              </div> 
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-row
                class="mb-3"
                justify="end"
                style="margin-right: 100px !important"
              >
              </v-row>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-tab-item>
      </v-tabs-items>
    </div>
    <v-card  v-if="show"  class="mr-5 ml-5">
      <v-card>
        <v-sheet
            class="v-sheet--offset "
            color="#3fa7d6"
            elevation="5" 
        > 
        <v-row justify="space-between" class=" ">
          <v-col cols="4">
            <div class="ml-5" >
              <v-row>
                <div class="title ml-5 mt-3 white--text">Total ventas: </div> 
                <div>
                  <div class="title ml-3 mt-3 " style="color: #fdf0d5;">  {{   (numberWithCommas(this.sumTotalSales(this.detailSale)))}} GTQ  </div>
                </div>
              </v-row>
            </div>
          </v-col>
          <v-col cols="2"> 
            <v-btn @click="dialog = true"  style="color: #3fa7d6;" elevation="0" color="white" dark>
              Agregar
            </v-btn>
          </v-col> 
        </v-row>
        
        </v-sheet> 
        <v-data-table 
          :headers="headersSales"
          :items="detailSale" 
          :items-per-page="10"
          class="elevation-1"
          :footer-props="{ 'items-per-page-text':'Compras por página'}"
        >
          <template v-slot:item="row"> 
            <tr>
              <td class="text-center font-weight-medium">{{row.item.date}}</td>
              <td class="text-center font-weight-medium">{{row.item.discount}}</td>
              <td class="text-center font-weight-medium">{{row.item.total}} GTQ</td>
               <td class="text-center">
              <v-btn
                class="mx-2"
                dark
                small
                color="#3fa7d6"
                elevation="0"
                @click="(dialogDetailSale = true), getDetailSale(row.item.id)"
              >
                <v-icon small dark> mdi-eye </v-icon>
              </v-btn>
              <v-btn
                class="mx-2"
                dark
                small
                color="#2f4858"
                elevation="0" 
                @click="(dialogInvoice = true), getDetailSaleForPDF(row.item.id)"
              >  <v-icon small dark> mdi-printer </v-icon>
              </v-btn>
            </td>

            </tr>
        </template>            
        </v-data-table> 
      </v-card>
    </v-card>
    <div class="text-center">
      <v-dialog scrollable v-model="dialogDetailSale" width="800">
        <v-card flat elevation="0">
          <v-card-title class="text-h5 grey lighten-2">
            Detalle de venta
          </v-card-title>
          <v-list-item>
            <v-list-item-content>
              <div>
                <v-simple-table class="pa-5" fixed-header>
                  <thead>
                    <tr>
                      <th></th>
                      <th class=" ">
                        <div class="text-left subtitle-1 font-weight-medium">
                          #Descripción
                        </div>
                      </th>
                      <th class="text-center">
                        <div class="subtitle-1 font-weight-medium">
                          Cantidad
                        </div>
                      </th>

                      <th class="text-center">
                        <div class="subtitle-1 font-weight-medium">
                          Tipo de venta
                        </div>
                      </th>
                      
                      <th class="text-right">
                        <div class="subtitle-1 font-weight-medium">Precio</div>
                      </th>
                      <th class="text-right">
                        <div class="subtitle-1 font-weight-medium">
                          Subtotal
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in detailSalesBySale" :key="index">
                      <td class="text-right font-weight-medium grey--text">
                        {{ index + 1 }}
                      </td>
                      <td class="text-left font-weight-medium">
                        {{ item.product_name }} - {{ item.product_code }}
                      </td>
                      <td class="text-center font-weight-medium">
                        {{ item.quantity }}
                      </td>
                      <td :class="item.type_of_sale_id == 19 || typeOfSaleId == 19 ?  'text-center font-weight-medium' : 'text-center green--text font-weight-medium' ">
                        {{ item.type_of_sale }}
                      </td>
                      <td :class="item.type_of_sale_id == 19 || typeOfSaleId == 19 ?  'text-right font-weight-medium' : 'text-right green--text font-weight-medium' ">
                        {{ item.type_of_sale_id > 19 ? item.product_wholesale_price : item.product_sale_price }} GTQ {{item.type_of_sale_id > 19 ? " (D)*": ""}}
                      </td>
                      <td :class="item.type_of_sale_id > 19 ? 'text-right green--text font-weight-medium' : 'text-right font-weight-medium' ">
                        {{ item.sub_total }} GTQ {{item.type_of_sale_id > 19 ? "*": ""}}
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>

                <div
                  class="subtitle-1 font-weight-bold black--text"
                  style="
                    margin-right: 33px !important;
                    margin-bottom: 100px;
                    float: right;
                  "
                >
                 Total {{ totalSale }} GTQ
                </div>
              </div>
              <v-card class="mt-5" outlined color="grey lighten-3">
                <v-card-actions justify="center">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="#3fa7d6"
                    dark
                    elevation="0"
                    @click="dialogDetailSale = false"
                  >
                    Aceptar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-dialog>
    </div>

    <div class="text-center">
      <v-dialog
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      v-model="dialogInvoice" width="800">
      <v-card flat elevation="0">
        <v-toolbar
          dark
          color="grey lighten-2"
          elevation="0" 
        > 
          <v-btn
            v-if="!disabledForPrint"
            icon 
            :disabled="disabledForPrint"
            @click="dialogInvoice = false"
          >
            <v-icon :color="disabledForPrint ? 'white' : 'black' ">mdi-close</v-icon>
          </v-btn>

          <template v-slot:extension v-if="!disabledForPrint">
              <v-fab-transition >
                <v-btn 
                  :disabled="disabledForPrint"
                  class="mr-15"
                  color="#2f4858"
                  fab
                  dark 
                  absolute
                  bottom
                  right
                  @click="printing"
                >
                  <v-icon>mdi-printer</v-icon>
                </v-btn>
              </v-fab-transition>
            </template> 
        </v-toolbar> 
        
        <div style="margin-right: 200px; margin-left: 200px;">
          <v-list> 
            <v-list-item>
              <v-list-item-content>
                <v-card-title class="text-h5 font-weight-bold">
                  Comprobante de compra
                </v-card-title>
                <v-divider></v-divider>
                <v-card-title class="text-h5">
                  Fecha
                </v-card-title>
                <v-card-subtitle class="title">
                  yyyy/mm/dd
                </v-card-subtitle> 
                <v-card-title class="text-h5">
                  Nombre de la Tienda 
                </v-card-title>
                <v-card-subtitle class="title">
                  Dirección de la Tienda 
                </v-card-subtitle> 
                <v-card-title class="text-h5">
                  Cliente
                </v-card-title>
                <v-card-subtitle class="title">
                  Nombre cliente
                </v-card-subtitle> 
                <v-divider></v-divider>
                <div>
                  <v-simple-table class="pa-5" fixed-header>
                    <thead>
                      <tr>
                        <th></th>
                        <th class=" ">
                          <div class="text-left subtitle-1 font-weight-medium">
                            #Descripción
                          </div>
                        </th>
                        <th class="text-center">
                          <div class="subtitle-1 font-weight-medium">
                            Cantidad
                          </div>
                        </th>

                        <th class="text-center">
                          <div class="subtitle-1 font-weight-medium">
                            Tipo de venta
                          </div>
                        </th>
                        
                        <th class="text-right">
                          <div class="subtitle-1 font-weight-medium">Precio</div>
                        </th>
                        <th class="text-right">
                          <div class="subtitle-1 font-weight-medium">
                            Subtotal
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in detailSalesBySale" :key="index">
                        <td class="text-right font-weight-medium grey--text">
                          {{ index + 1 }}
                        </td>
                        <td class="text-left font-weight-medium">
                          {{ item.product_name }} - {{ item.product_code }}
                        </td>
                        <td class="text-center font-weight-medium">
                          {{ item.quantity }}
                        </td>
                        <td :class="item.type_of_sale_id == 19 || typeOfSaleId == 19 ?  'text-center font-weight-medium' : 'text-center green--text font-weight-medium' ">
                          {{ item.type_of_sale }}
                        </td>
                        <td :class="item.type_of_sale_id == 19 || typeOfSaleId == 19 ?  'text-right font-weight-medium' : 'text-right green--text font-weight-medium' ">
                          {{ item.type_of_sale_id > 19 ? item.product_wholesale_price : item.product_sale_price }} GTQ {{item.type_of_sale_id > 19 ? " (D)*": ""}}
                        </td>
                        <td :class="item.type_of_sale_id > 19 ? 'text-right green--text font-weight-medium' : 'text-right font-weight-medium' ">
                          {{ item.sub_total }} GTQ {{item.type_of_sale_id > 19 ? "*": ""}}
                        </td>
                      </tr>
                    </tbody>
                  </v-simple-table>

                  <div
                    class="subtitle-1 font-weight-bold black--text"
                    style="
                      margin-right: 33px !important;
                      margin-bottom: 100px;
                      float: right;
                    "
                  >
                  Total {{ totalSale }} GTQ
                  </div>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list> 
        </div>
        </v-card>
      </v-dialog>
    </div>

    <div class="text-center">
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="dialogCobro"
      width="500"
    > 
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Cobrar
        </v-card-title>
        <div class="d-flex align-center">
          <v-card-text  class="center-text display-1 mt-3 font-weight-medium blue--text">
            {{ sumPrecios(gettingProductsBarcode).toFixed(2) }} GTQ
          </v-card-text>
        </div>

        <v-card class="mb-10" outlined>
          <v-tabs
            v-model="tab2" 
            centered
            color="#2ec4b6" 
            icons-and-text
            grow
          >
          <v-tabs-slider></v-tabs-slider> 
            <v-tab>
              Efectivo
              <v-icon>mdi-cash-multiple</v-icon>
            </v-tab> 
            <v-tab  >
              Crédito
              <v-icon>mdi-account-credit-card</v-icon>
            </v-tab> 
          </v-tabs>

          <v-tabs-items v-model="tab2">
            <v-tab-item  class="ma-7"> 
              <table>
                <tr>
                  <td>
                    <div class="mt-2 mr-2 font-weight-bold ">
                        Pagó con:
                      </div> 
                  </td>
                  <td>
                    <v-text-field 
                      v-model.number="totalSaleDetail" 
                      hide-details
                      prefix="Q." 
                      color="#26547c"
                      required
                      outlined
                      dense 
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
            </v-tab-item>
              <v-tab-item> 
                <v-card-text>text</v-card-text>
            </v-tab-item>
          </v-tabs-items>
        </v-card>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialogCobro = false"
          >
            Cobrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>


  </div>
</template>

<script>
//import { MultiListSelect } from 'vue-search-select'
import axios from "axios";
import { API } from "../globalVars";
 

export default {
  components: {
    //MultiListSelect,
    //VueGoodTable
  },
  data() {
    return {
      tab2: null,
      dialogCobro: false,
      bid:"",
      show: false,
      tab: null,
      typeOfPayment: 1,
      disabledForPrint: false,
      dialogInvoice: false,
      numberis: 1,
      model: "",
      dialog: false,
      dialogForm: false,
      dialogDetailSale: false,
      dialogTypeOfsale: false,
      listofProducts: [],
      products: [],
      items: [],
      parent_id: [],
      barcode: "",
      autofocus: true,
      gettingProductsBarcode: [],
      searchText: "",
      item: {
        barcode: "",
        name: "",
      },
      total: 0.0,
      detailSale: [],
      totalSale: "",
      dateSale: "",
      discountSale: "",
      detailSalesBySale: [],
      totalAllSales:"",
      typeOfSales: [],
      typeOfSale: "Unidad",
      typeOfSaleId: "",
      paymentType: "",
      headersSales: [
        {
          text: 'Fecha',
          align: 'center',
          sortable: false,
          value: 'description',
        },
        { 
          text: 'Descuento',
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
         { 
          text: 'Acciones',
          align: 'center',
          sortable: false,
          value: 'date' 
        }, 
      ],
      typeOfPayments: [
        {
          "id": 1, "name": "Efectivo",
        },
        {
        "id": 2, "name": "Cheque",
        },
        {
          "id": 3, "name": "Crédito"
        }

      ],
      barc: [],
      filterProducts: [],
      totalSaleDetail: "",
      exchange: ""
    };
  },

  created() {
    this.bid = localStorage.getItem('bo');

    this.totalSaleDetail = this.sumPrecios(this.gettingProductsBarcode).toFixed(2)
    console.log(this.totalSaleDetail)
    this.getProducts();
    this.getSales();
    this.numberWithCommas(this.sumTotalSales(this.detailSale));
    this.getTypeOfSales();
  },

  watch: {
    dialogForm(val) {
      if (!val) return;
      setTimeout(() => (this.dialogForm = false), 4000);
      
    },
  },

  methods: {

    charge(){

    },

    selectTypeOfPayment(p){
      this.typeOfPayment = p.id;
    },


    printing(){
      this.disabledForPrint = true;
      document.title='Comprobante'
      setTimeout(() => (window.print()), 1000 ); 
      setTimeout(() => (this.disabledForPrint = false), 1000 ); 
    },

    getProducts() {
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios
        .get(`${API}api/sales/product/`, { headers })
        .then((response) => {
          this.listofProducts = response.data;
          this.listofProducts.reverse();
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },

    submit() {
      this.getProduct();
    },

    getProduct() { 
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios
        .get(`${API}api/sales/branch-office-cat/${this.bid}/`, { headers })
        .then((response) => { 
          
          if (response.data.list_products.length > 0) { 
            this.barc = response.data.list_products;
            this.filterProducts = this.barc.find(element => element.barcode == this.barcode || element.name.toLowerCase() == this.barcode.toLowerCase() || element.code.toLowerCase() == this.barcode.toLowerCase()); 
            if (this.filterProducts) {
              const detailSale = {
                id: this.filterProducts.id,
                name: this.filterProducts.name,
                quanty: 1,
                stock: this.filterProducts.stock,
                price: this.filterProducts.sale_price,
                wholesale_price: this.filterProducts.wholesale_price,
                subtotal: this.filterProducts.sub_total,
                code: this.filterProducts.code,
                filling: this.filterProducts.filling,  
              };

              var obj = {};
              obj["id"] = detailSale.id;
              obj["name"] = detailSale.name;
              obj["quanty"] = detailSale.quanty;
              obj["stock"] = detailSale.stock;
              obj["price"] = detailSale.price;
              obj["wholesale_price"] = detailSale.wholesale_price;
              obj["sub_total"] = detailSale.subtotal; 
              obj["code"] = detailSale.code;
              obj["filling"] = detailSale.filling;
              this.gettingProductsBarcode.push(obj); 
              this.barcode = ""
              this.totalSaleDetail = this.sumPrecios(this.gettingProductsBarcode).toFixed(2)
              this.exchange = this.totalSaleDetail - this.totalSaleDetail;
              console.log(this.totalSaleDetail, " total ");
            } else { 
              this.$swal.fire({
                title: 'Detalle venta',
                text: "¡Producto no encontrado!",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar' 
              })
              this.barcode = ""
            }
 
          }

          /*if (response.data.length > 0) { 
            if (obj["stock"] <=1) {
              this.errorProductStock();
              this.gettingProductsBarcode.push(obj); 
            } else if (obj["stock"] <=10) {
              this.warningProductStock(obj["stock"])
              this.gettingProductsBarcode.push(obj); 
            } else {
              this.gettingProductsBarcode.push(obj); 
            }

          } else{
            this.errorNotifyVue()
          }*/
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },


    restDiference(){ 
      this.exchange = this.totalSaleDetail - this.sumPrecios(this.gettingProductsBarcode).toFixed(2);
      return this.exchange.toFixed(2);
    },


    sumPrecios(items) {
      return items.reduce((a, b) => {
        return a + Number((b["price"]) * b["quanty"]);
      }, 0);
    },

    createSale() {
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios
        .post(
          `${API}api/sales/create/`,
          {
            "discount": 0.0,
            "total": this.sumPrecios(this.gettingProductsBarcode),
            "branch_office": 1,
            "payment_type": this.typeOfPayment
          },
          { headers }
        )
        .then((responsev) => {
          for ( let index = 0; index < this.gettingProductsBarcode.length; index++ ) {
            if (typeof this.gettingProductsBarcode[index].type_of_sale === "number") {
              console.log("is number");
            }

            axios
              .post(
                `${API}api/sales/detail-sale/create/`,
                {
                  "sale": responsev.data.id,
                  "product": this.gettingProductsBarcode[index].id,
                  "quantity": this.gettingProductsBarcode[index].quanty,
                  "sub_total": this.gettingProductsBarcode[index].quanty * (typeof this.gettingProductsBarcode[index].type_of_sale === "number" 
                    ? this.gettingProductsBarcode[index].price 
                    : this.gettingProductsBarcode[index].type_of_sale.id > 19 
                    ? this.gettingProductsBarcode[index].wholesale_price 
                    : this.gettingProductsBarcode[index].price ),
                  "type_of_sale": typeof this.gettingProductsBarcode[index].type_of_sale === "number" ? 19 : this.gettingProductsBarcode[index].type_of_sale.id
                },
                { headers }
              )
              .then((r) => {  
                axios.patch( `${API}api/sales/product/${this.gettingProductsBarcode[index].id}/`,
                {
                  "stock": this.gettingProductsBarcode[index].stock - this.gettingProductsBarcode[index].quanty,
                },

                ).then((response)=>{ 
                  setTimeout(() => ( (this.dialog = false), (this.gettingProductsBarcode = [])), 4000 );
                  setTimeout(() => this.notifyVue("top", "right"), 5000);
                  this.getSales();
                  
                return response.data;
                }).catch((error) => {
                  console.log(error);
                });
               return r.data;
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    notifyVue(verticalAlign, horizontalAlign) {
      this.$notify({
        message: "¡Se ha registrado la venta! ",
        icon: "check",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "success",
      });
    },

    errorNotifyVue() {
      this.$swal.fire(
        {
          icon: 'error',
          title: 'Ha ocurrido un error',
          text: '¡Producto no registrado!',
          confirmButtonText: 'Aceptar',
          showClass: {
          popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
          }
        }
      )
    },

    errorProductStock() {
      this.$swal.fire(
        {
          icon: 'error',
          title: 'Stock',
          text: '¡No hay stock de este producto!',
          confirmButtonText: 'Aceptar',
          showClass: {
          popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
          }
        }
      )
    },

     warningProductStock(stock) {
      this.$swal.fire(
        {
          icon: 'warning',
          title: '¡Stock muy bajo de este producto!',
          text: 'Stock: ' + ' ' +  stock,
          confirmButtonText: 'Aceptar',
          showClass: {
          popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
          }
        }
      )
    },

    getSales() {
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios
        .get(`${API}api/sales/sale-details/`, { headers })
        .then((response) => {
          console.log(response.data);
          this.detailSale = response.data;
          this.detailSale.reverse();
        });
    },

    getDetailSale(id) {
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios
        .get(`${API}api/sales/sale-details/${id}/`, { headers })
        .then((response) => {
          this.totalSale = response.data.total;
          this.detailSalesBySale = response.data.sales;
          switch (response.data.payment_type) {
            case 1:
              this.paymentType = "Efectivo"
              break;
            
            case 2:
              this.paymentType = "Cheque"
              break;

            case 3:
              this.paymentType = "Crédito"
              break;

            default:
              break;
          }
         })
        .catch((error) => {
          console.log(error);
        });
    },

    sumTotalSales(items){
      return items.reduce((a, b) => {
        return a + Number(b["total"]);
      }, 0);
    },

    getTypeOfSales(){
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios.get(`${API}api/sales/type-of-sale/`, { headers }).then((response) => {
        this.typeOfSales = response.data; 
        this.typeOfSale.reverse();
        return this.typeOfSales;
      }).catch((error) => { return error});
    },

    selectTypeOfSale(t) {
      this.typeOfSaleId = t.id;
      this.typeOfSale = t.name; 
      console.log(this.typeOfSaleId);
    },

    postTypeOfSale(){
      let headers = { "Content-Type": "application/json;charset=utf-8" }; 
      axios.post(`${API}api/sales/type-of-sale/create/`, {
        "name": this.typeOfSale
      },{ headers }).then((response) => {
        this.dialogTypeOfsale = false;
        this.typeOfSale = response.data.name;
        this.typeOfSaleId = response.data.id;
        this.getTypeOfSales();
        return response.data;
      }).catch((error) => { return error })
    },

    clicking(){
      console.log("clicking");
    },

 

    fixedDate(d){
      var options = { year: 'numeric', month: 'long', day: 'numeric' };
      let result = new Date(d).toUTCString("es-ES");
      let newDate = new Date(result).toLocaleDateString("es-ES", options);
      return newDate;
    },

    getDetailSaleForPDF(id) {
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios
        .get(`${API}api/sales/sale-details/${id}/`, { headers })
        .then((response) => {
          this.totalSale = response.data.total;
          this.detailSalesBySale = response.data.sales;
          switch (response.data.payment_type) {
            case 1:
              this.paymentType = "Efectivo"
              break;
            
            case 2:
              this.paymentType = "Cheque"
              break;

            case 3:
              this.paymentType = "Crédito"
              break;

            default:
              break;
          }
         })
        .catch((error) => {
          console.log(error);
        });
    },

    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    deleteProduct(id){
      const indexOfObject = this.gettingProductsBarcode.findIndex(object => {
          return object.id === id;
        }); 
        this.gettingProductsBarcode.splice(indexOfObject, 1); 
    }

  },
};
</script>

<style>
@page { margin: 0; }

.v-dialog:not(.v-dialog--fullscreen) {
    max-height: 100%;
}

.row + .row {
    margin-top: 0px;
}


table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 90%;
}

td, th {
  border: 0px solid #dddddd;
  text-align: right;
  padding: 5px;
}
 

 .center-div{ 
    /* Center vertically and horizontally */
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -25px 0 0 -25px;
 }

</style>
