<template>

  <div >
  <v-footer fixed class="pa-5"> 
    <v-row justify="center">
      <v-card outlined class="pa-2" v-if="this.boxOpened.length > 0">
        <div>
          <span class="body-2 text--primary font-weight-medium">Apertura de caja </span><br/> 
          <span class="body-2 green--text font-weight-medium">
            {{totalBoxO}} GTQ  
          </span><br/>
          <span class="body-2 grey--text">
            Hora: {{formatAMPM(timeBoxo)}} 
          </span> 
        </div>
      </v-card>
    </v-row>
    <v-row justify="end">   
      <div>
        <v-row>
            <v-card @click="cobrate()" outlined style="margin-right: 10px; " class="align-center d-flex align-center pa-6">
              <div  class="font-weight-bold display-1 d-flex align-center mt-2" >
                <v-row>
                  <div>
                  <img src="@/assets/img/carrito.png" style="height: 25px;" class="mb-3 mr-2">
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
  <v-dialog v-model="dialogCash" width="350">
  <v-card class=" ">
    <v-card-title class="subtitle-1 grey lighten-2">
      Vista previa
    </v-card-title>
    <v-divider></v-divider>
    <!-- -->
    <div ref="document"> 
      <div class="ticket" id="element-to-convert"> 
        <div class="centrado mt-3">
          <img src="@/assets/img/paintc.png" style="height: 100px;" class="mb-3 centrado">

        </div>
        <v-divider></v-divider>
        <p class="centrado mt-5">TICKET DE VENTA<br>Fecha: {{parsedDate(dateSale)}}<br>
            Hora: {{formatAMPM(timeSale) }}</p> 
          <div class="font-weight-medium centrado mb-3">Cliente: {{customerDetail}}</div>

          <v-divider></v-divider>
          <table class="ndk centrado">
            <thead>
              <tr>
                <th>Cant.</th> 
                <th>Descripción</th>
                <th>Precio</th> 
                <th>Desc.</th> 
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in detailSalesBySale" :key="index" >
                <td class="text-center font-weight-medium border_bottom">
                  {{ item.quantity }}
                </td>
                <td class="text-left font-weight-medium border_bottom">
                  {{ item.product_name }} - {{ item.filling }}
                </td> 
                <td class="text-right font-weight-medium border_bottom">
                  Q.{{item.product_sale_price }} 
                </td>
                <td class="text-right font-weight-medium border_bottom">
                  Q.{{item.product_sale_price - item.sub_total }} 
                </td>
                <td class="text-right font-weight-medium border_bottom">
                  Q.{{ item.sub_total }} 
                </td>
              </tr>  
              
              <tr class="border_bottom">
                <td></td>
                <td></td> 
                <td></td> 

                <td class="font-weight-medium " style="font-weight: bold !important;" >  
                    TOTAL 
                </td>
                <td class="font-weight-medium " style="font-weight: bold !important;"> 
                    Q.{{totalSale}}
                </td>
              </tr>
            </tbody>
          </table>  
           
          <div v-if="hasCredit">

          <p class="centrado mt-5 font-weight-medium mb-5">*Venta a crédito*<br>
            Firma cliente</p> 
          <v-divider class="mr-5 ml-5 mt-5 font-weight-medium" style="margin-top: 50px !important;"> </v-divider>
          <div class="subtitle-1 centrado font-weight-medium">
            {{customerDetail}}
          </div>
          </div>
          <div class="font-weight-medium mt-3 subtitle-1 centrado mb-5">¡Gracias por su compra!</div>
          </div>
      </div>  
      <v-card-actions>
        <v-spacer></v-spacer>
         <v-btn
            depressed 
            elevation="0" @click="exportToPDF" >
            <v-icon left  color="#2ec4b6">mdi-printer</v-icon>
          Imprimir
        </v-btn>
    </v-card-actions>
    </v-card>
    
  </v-dialog>
  <v-dialog v-model="searchForProduct" hide-overlay persistent width="300">
      <v-card color="#3fa7d6" dark>
        <v-card-text>
          Buscando producto
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogLoading" hide-overlay persistent width="300">
      <v-card color="#3fa7d6" dark>
        <v-card-text>
          Cargando, por favor espera...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
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
      <v-dialog width="700" v-model="showVerifier"> 
        <v-card >  
          <v-card-title class="text-h5 grey lighten-2">
            Verificador de precios 
          </v-card-title>
          <v-card-text>   
            <div class="text--primary center mr-5 mt-5 ml-5"> 
              <v-text-field 
                color="grey" 
                class=""  
                prepend-inner-icon="mdi-barcode-scan" 
                autofocus 
                outlined 
                clearable 
                v-model="barcode"
                v-on:keyup.enter="searchArray"
                dense 
                label="Buscar producto">
              </v-text-field> 
            </div>
            <v-divider></v-divider> 
            <div v-if="this.log.length<2">
              <v-row justify="center" class="mt-4 mb-1">
                <div class="display-1 center">
                  {{productVerifyName}} {{productVerifyFilling}} 
                </div>
              </v-row>
              <v-row justify="center" class="mb-4">
                <div class="title center">
                  {{productVerifyStock}}  
                </div>
              </v-row> 
            <v-divider></v-divider> 
            <v-row justify="center" class="mt-4 mb-4">
              <div class="display-2 center">
                Q {{productVerifyPrice}}
              </div>
            </v-row>  
          </div>
          <div v-else>
            <v-list>
              <v-list-item-group
                v-model="model"
                mandatory
                color="#2ec4b6"
              >
                <v-list-item
                  v-for="(item, i) in this.log"
                  :key="i" 
                > 
                  <v-list-item-content>
                    <v-list-item-title>{{item.name}} {{item.filling}}</v-list-item-title>
                    <v-list-item-subtitle>Existencia: {{item.stock}}</v-list-item-subtitle>
                    <v-list-item-subtitle>Precio: Q{{item.sale_price}}</v-list-item-subtitle>
                 
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn 
                      color="#2ec4b6"
                      dark
                      outlined
                      min-width="200"
                      elevation="0"
                      @click="addToSale(item.barcode)" 
                    >
                      <v-icon dark class="mr-3"> mdi-check </v-icon>
                      Agregar a venta
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </div>
          </v-card-text> 
          <v-card outlined color="grey lighten-4">
            <v-card-actions > 
              <v-row justify="space-between" class="ma-3"> 
                <v-btn 
                  v-show="this.log.length<2"
                  color="#2ec4b6"
                  dark
                  min-width="200"
                  elevation="0"
                  @click="(showVerifier = false)" 
                >
                  <v-icon dark class="mr-3"> mdi-chevron-left </v-icon>
                  Cancelar
                </v-btn>
                <v-spacer></v-spacer>
                
                <v-btn 
                  v-if="this.log.length<2"
                  color="#2ec4b6"
                  dark
                  min-width="200"
                  elevation="0"
                  @click="(showVerifier = false), submit()" 
                >
                  <v-icon dark class="mr-3"> mdi-check </v-icon>
                  Agregar a venta
                </v-btn>
                <v-btn 
                  v-else
                  color="#2ec4b6"
                  dark
                  min-width="200"
                  elevation="0"
                  @click="(showVerifier = false)" 
                >
                  <v-icon dark class="mr-3"> mdi-check </v-icon>
                  Aceptar
                </v-btn>
              </v-row>

            </v-card-actions>
          </v-card> 
        </v-card> 
      </v-dialog> 
      <v-dialog width="700" v-model="dialogGreatherThanOneProduct">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Productos encontrados 
          </v-card-title>
          <v-divider></v-divider> 
          <div>
            <v-list>
              <v-list-item-group
                v-model="model"
                mandatory
                color="#2ec4b6"
              >
                <v-list-item
                  v-for="(item, i) in this.newProductsFeature"
                  :key="i" 
                > 
                  <v-list-item-content>
                    <v-list-item-title>{{item.name}} {{item.filling}}</v-list-item-title>
                    <v-list-item-subtitle>Existencia: {{item.stock}}</v-list-item-subtitle>
                    <v-list-item-subtitle>Precio: Q{{item.sale_price}}</v-list-item-subtitle>
                 
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn 
                      color="#2ec4b6"
                      dark
                      min-width="200"
                      outlined
                      elevation="0"
                      @click="addToSale(item.barcode)" 
                    >
                      <v-icon dark class="mr-3"> mdi-check </v-icon>
                      Agregar a venta
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </div>
          <v-card outlined color="grey lighten-4">
            <v-card-actions > 
              <v-row justify="space-between" class="ma-3"> 
                <v-spacer></v-spacer>
                <v-btn 
                  color="#2ec4b6"
                  dark
                  min-width="200"
                  elevation="0"
                  @click="(dialogGreatherThanOneProduct = false)" 
                >
                  <v-icon dark class="mr-3"> mdi-check </v-icon>
                  Aceptar
                </v-btn>
              </v-row>

            </v-card-actions>
          </v-card> 
        </v-card>
      </v-dialog>
      <v-dialog width="700" v-model="moneyIncomeDialog"> 
        <v-card >  
          <v-card-title class="text-h5 grey lighten-2">
            Entrada de Efectivo
          </v-card-title>
          <v-card-text>    
            <div class="text--primary center mr-5 mt-5 ml-5"> 
              <v-text-field 
                color="grey" 
                class=""  
                prepend-inner-icon="mdi-cash" 
                autofocus 
                outlined 
                clearable 
                type="number"
                v-model.number="moneyIncomeForm.total" 
                dense 
                label="Cantidad">
              </v-text-field> 
            </div>
            <div class="text--primary center mr-5   ml-5"> 
              <v-text-field 
                color="grey" 
                class=""  
                prepend-inner-icon="mdi-file-document-edit-outline" 
                autofocus 
                outlined 
                clearable 
                v-model="moneyIncomeForm.description" 
                dense 
                label="Descripción">
              </v-text-field> 
            </div>
            <v-divider></v-divider>   
          </v-card-text> 
          <v-card outlined color="grey lighten-4">
            <v-card-actions > 
              <v-row justify="space-between" class="ma-3"> 
                <v-btn 
                  color="#2ec4b6"
                  dark
                  min-width="200"
                  elevation="0"
                  @click="(moneyIncomeDialog = false )" 
                >
                  <v-icon dark class="mr-3"> mdi-chevron-left </v-icon>
                  Cancelar
                </v-btn>
                <v-btn 
                  color="#2ec4b6"
                  dark
                  min-width="200"
                  elevation="0"
                  @click="(moneyIncomeDialog = false, dialogForm = true), createMoneyIncome()" 
                >
                  <v-icon dark class="mr-3"> mdi-check </v-icon>
                  Guardar
                </v-btn>
              </v-row> 
            </v-card-actions>
            <v-divider></v-divider> 
              <v-row justify="end" class="ma-3">  
                <v-expansion-panels>
                  <v-expansion-panel
                    v-for="(item,i) in 1"
                    :key="i"
                  >
                  <v-expansion-panel-header class="font-weight-medium">
                    Ver entradas
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <div>
                      <v-simple-table>
                        <thead>
                          <tr>
                            <th></th>
                            <th class=" ">
                              <div class="text-center subtitle-1 font-weight-medium">
                                Hora
                              </div>
                            </th>
                            <th class="text-center">
                              <div class="subtitle-1 font-weight-medium">
                                Descripción
                              </div>
                            </th>

                            <th class="text-center">
                              <div class="subtitle-1 font-weight-medium">
                                Monto
                              </div>
                            </th> 
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in moneyIncome" :key="index">
                            <td class="text-right font-weight-medium grey--text">
                              {{ index + 1 }}
                            </td>
                            <td class="text-center font-weight-medium">
                              {{ formatAMPM(item.time) }}
                            </td>
                            <td class="text-center font-weight-medium">
                              {{ item.description }}
                            </td>
                            <td class="text-center font-weight-medium">
                              Q {{ item.total }}
                            </td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td class="text-center font-weight-bold">
                              Total: Q {{(numberWithCommas(sumPrecios2(moneyIncome)))}}
                            </td>
                          </tr>
                        </tbody>
                      </v-simple-table>
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>  
            </v-row> 
          </v-card> 
        </v-card> 
    </v-dialog> 
    <v-dialog width="700" v-model="moneyOutDialog"> 
        <v-card >  
          <v-card-title class="text-h5 grey lighten-2">
            Salidas de Efectivo
          </v-card-title>
          <v-card-text>    
            <div class="text--primary center mr-5 mt-5 ml-5"> 
              <v-text-field 
                color="grey" 
                class=""  
                prepend-inner-icon="mdi-cash" 
                autofocus 
                outlined 
                clearable 
                type="number"
                v-model.number="moneyOutForm.total" 
                dense 
                label="Cantidad">
              </v-text-field> 
            </div>
            <div class="text--primary center mr-5   ml-5"> 
              <v-text-field 
                color="grey" 
                class=""  
                prepend-inner-icon="mdi-file-document-edit-outline" 
                autofocus 
                outlined 
                clearable 
                v-model="moneyOutForm.description" 
                dense 
                label="Descripción">
              </v-text-field> 
            </div>
            <v-divider></v-divider>   
          </v-card-text> 
          <v-card outlined color="grey lighten-4">
            <v-card-actions > 
              <v-row justify="space-between" class="ma-3"> 
                <v-btn 
                  color="#2ec4b6"
                  dark
                  min-width="200"
                  elevation="0"
                  @click="(moneyOutDialog = false )" 
                >
                  <v-icon dark class="mr-3"> mdi-chevron-left </v-icon>
                  Cancelar
                </v-btn>
                <v-btn 
                  color="#2ec4b6"
                  dark
                  min-width="200"
                  elevation="0"
                  @click="(moneyOutDialog = false, dialogForm = true), createMoneyOut()" 
                >
                  <v-icon dark class="mr-3"> mdi-check </v-icon>
                  Guardar
                </v-btn>
               
              </v-row>
              
            </v-card-actions>
            <v-divider></v-divider> 
              <v-row justify="end" class="ma-3">  
                <v-expansion-panels>
                  <v-expansion-panel
                    v-for="(item,i) in 1"
                    :key="i"
                  >
                    <v-expansion-panel-header class="font-weight-medium">
                      Ver salidas
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <div>
                        <v-simple-table>
                          <thead>
                            <tr>
                              <th></th>
                              <th class=" ">
                                <div class="text-center subtitle-1 font-weight-medium">
                                  Hora
                                </div>
                              </th>
                              <th class="text-center">
                                <div class="subtitle-1 font-weight-medium">
                                  Descripción
                                </div>
                              </th>

                              <th class="text-center">
                                <div class="subtitle-1 font-weight-medium">
                                  Monto
                                </div>
                              </th> 
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in moneyOut" :key="index">
                              <td class="text-right font-weight-medium grey--text">
                                {{ index + 1 }}
                              </td>
                              <td class="text-center font-weight-medium">
                                {{ formatAMPM(item.time) }}
                              </td>
                              <td class="text-center font-weight-medium">
                                {{ item.description }}
                              </td>
                              <td class="text-center font-weight-medium">
                                Q {{ item.total }}
                              </td>
                            </tr>
                            <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td class="text-center font-weight-bold">
                                Total: Q {{(numberWithCommas(sumPrecios2(moneyOut)))}}
                              </td>
                            </tr>
                          </tbody>
                        </v-simple-table>
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>  
              </v-row> 
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
        <v-tab ><v-icon class="mr-3">mdi-file-document-multiple-outline</v-icon>Nueva</v-tab>
        <v-tab @click="showFirstSale = true"><v-icon class="mr-3" >mdi-text-box-outline</v-icon>Ventas del día</v-tab> 
        <v-tab><v-icon class="mr-3" >mdi-cash-multiple</v-icon>Corte</v-tab>
        </v-tabs>
      </v-card>
      <v-tabs-items v-model="tab">
      <v-tab-item>
      <v-card  flat elevation="0">  
        <v-card outlined color="#F1F4F7"> 
          <v-row class="pa-3">  
            <v-col cols="4"> 
              <v-text-field
                color="#3fa7d6"
                dense
                hide-details
                prepend-inner-icon="mdi-barcode-scan" 
                v-model="barcode"
                :autofocus="autofocus"
                solo
                v-on:keyup.enter="searchArrayNewProductsFeature"
                label="Buscar por código de barras"
              ></v-text-field>  
            </v-col> 
            <v-row class="mt-3 ml-5"  >
              <v-btn   
                class="mr-2"
                @click="(showVerifier = true)" 
              >
                <v-icon color="#2ec4b6" dark class="mr-2"> mdi-table-search </v-icon>
                Verificador de precios
              </v-btn> 
            
              <v-btn   
                class="mr-2"
                @click="(moneyIncomeDialog = true)" 
              >
                <v-icon color="#2ec4b6" dark class="mr-2"> mdi-cash-plus </v-icon>
                Entradas
              </v-btn> 
          
              <v-btn   
                @click="(moneyOutDialog = true)" 
              >
                <v-icon color="#2ec4b6" dark class="mr-2"> mdi-cash-remove </v-icon>
                Salidas
              </v-btn>   
            </v-row>
              
          </v-row>  
        </v-card> 
          <v-list-item>
            <v-list-item-content>
              <div class="pb-10"> 
                 <v-row>
                  <v-col
                    cols="12"
                    sm="6" 
                  >
                  <v-autocomplete
                    :disabled="selectDisabled"
                    ref="input"
                    class=""
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
                  <v-col cols="6">
                    <v-text-field
                      label="Fecha*"
                      type="date"
                      color="#2ec4b6"
                      required
                      outlined
                      dense 
                      v-model="date2"
                      v-on:change="changeDate" 
                    ></v-text-field>
                  </v-col>
                </v-row>  
                <v-row>
                  <v-col md="2">
                    <v-card  class="pb-4 pl-4 pr-4 "  outlined style="border-color: #2ec4b6;"> 
                      <v-checkbox
                        class=" "
                        v-model="ex4"
                        label="Crear cliente"
                        color="#2ec4b6"
                        hide-details
                        @change="changeClientMode"
                      ></v-checkbox>  
                    </v-card>
                  </v-col> 
                </v-row>
                
                  <div v-show="selectDisabled">
                    <v-row class="">
                      <v-col
                        cols="12"
                        sm="6" 
                      >
                        <v-text-field
                          label="Nombres"
                          :disabled="checkbox"
                          v-model="customerForm.first_name"
                          hide-details
                          color="#26547c"
                          required
                          dense 
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6" 
                      >
                        <v-text-field
                          label="Apellidos"
                          :disabled="checkbox"
                          v-model="customerForm.last_name"
                          hide-details
                          color="#26547c"
                          required
                          dense 
                          outlined
                        ></v-text-field>
                      </v-col> 
                      <v-col cols="12" sm="6" >
                        <v-text-field
                          :disabled="checkbox"
                          label="Número de teléfono"
                          v-model="customerForm.phone_number"
                          hide-details
                          color="#26547c"
                          required
                          dense 
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" >
                        <v-text-field
                          :disabled="checkbox"
                          label="Dirección" 
                          v-model="customerForm.address"
                          hide-details
                          color="#26547c"
                          required
                          dense 
                          outlined
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </div>
                
                <v-simple-table fixed-header height="100%" class="mt-2">
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
                      <th class="text-LEFT">
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
                              @change="sumPrecios(gettingProductsBarcode), sumTextField()"
                            >
                            </v-text-field>
                          </v-col>
                        </v-row>
                      </td>
                      <td class=" text-right font-weight-medium">
                        <v-row class="mt-2" justify="end">
                          <v-col cols="6" sm="12">
                            <v-text-field
                              type="number"
                              dense
                              color="#3fa7d6"
                              outlined
                              min="1"
                              :max="item.price"
                              label="Precio"
                              v-model.number="item.price"
                              >
                            </v-text-field>
                          </v-col>
                        </v-row> 
                      </td>
                      <td class="text-right font-weight-medium">
                        {{  item.price * item.quanty  }} GTQ
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
      <v-tab-item>
        <v-card flat elevation="0" >
          <v-card outlined color="#F1F4F7">
            <v-row class="pa-3">
              <v-col cols="3">
                <v-card @click="modal = true" outlined class="pa-2">
                  <v-icon> mdi-calendar-month </v-icon>  <span class="subtitle-1 ml-3 grey--text font-weight-medium">Ver por fecha</span> 
                </v-card>
                <v-dialog ref="dialog" v-model="modal" :return-value.sync="dates" persistent width="300px">
                   
                  <v-date-picker 
                    ref="picker"
                    v-model="dates"  
                    locale="es-ES"  
                    scrollable 
                    range
                    header-color="#1D3557" 
                    color="#1D3557">
                    <v-spacer></v-spacer>
                    <v-btn text color="#1D3557" @click="modal = false">Cancelar</v-btn>
                    <v-btn text color="#1D3557" @click="$refs.dialog.save(dates), getSaleByDate()">aceptar</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
            </v-row>
          </v-card>
          <v-row>
            <v-col
            cols="12"
            sm="6"
            >
              <div>
                <v-data-table
                  :headers="saleDateDetails"
                  :items="salesByDatePicker" 
                  class="elevation-0"
                  :items-per-page="5"
                  :footer-props="{ 'items-per-page-text':'Ventas por página'}"
                >
                <template v-slot:item="row">
                  <tr>
                    <td class="text-center font-weight-medium">
                       {{row.item.total_sales}}
                      </td>
                      <td class="text-center font-weight-medium">
                        {{ parsedDate(row.item.date) }}
                      </td>
                      <td class="text-center font-weight-medium">
                        {{ formatAMPM(row.item.time) }}
                      </td>
                      <td class="text-center font-weight-medium">
                        Q {{ row.item.total }}
                      </td>
                      <td class="text-center font-weight-medium">
                        Q {{ row.item.gain }}
                      </td>
                      <td class="text-center font-weight-medium">
                        <v-btn 
                        fab
                        dark
                        x-small
                        color="#00afb9"
                        @click="getSaleByDateId(row.item.id)"
                      >
                        <v-icon dark>
                          mdi-eye
                        </v-icon>
                      </v-btn>
                      </td>
                  </tr>
                </template>
                  
                </v-data-table>
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              >
            <v-card class=" " flat   v-if="showFirstSale">  
              <!-- -->
              <div ref="document" v-if="this.salesByDatePicker.length > 0"> 
                <div class=" " id="element-to-convert"> 
                  <div v-if="this.salesByDatePicker[0].customer.first_name" class="font-weight-medium mt-3">Cliente: {{this.salesByDatePicker[0].customer.first_name || " '' "}} {{this.salesByDatePicker[0].customer.last_name || " '' "}}</div>

                    <p class=" ">  {{parsedDate(this.salesByDatePicker[0].date)}} {{formatAMPM(this.salesByDatePicker[0].time) }}</p> 

                    <v-divider></v-divider>
                    <table class="ndk centrado">
                      <thead>
                        <tr>
                          <th>
                            <div class="text-center">
                              Cant.
                            </div>
                          </th> 
                          <th>
                            <div class="text-center">
                              Descripción
                            </div>
                          </th> 
                          <th>
                            <div class="text-center">
                              Tipo de venta
                            </div>
                          </th> 
                          <th>
                            <div class="text-center">
                              Precio
                            </div>
                          </th>  
                          <th>
                            <div class="text-center">
                              Subtotal
                            </div> 
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in this.salesByDatePicker[0].sales" :key="index" >
                          <td class="text-center font-weight-medium   ">
                            {{ item.quantity }}
                          </td>
                          <td class="text-center font-weight-medium   ">
                            {{ item.product_name }} - {{ item.filling }}
                          </td> 
                          <td class="text-center font-weight-medium   ">
                            {{ item.type_of_sale }}  
                          </td> 
                          <td class="text-center font-weight-medium   ">
                            Q.{{item.product_sale_price }} 
                          </td>  
                          <td class="text-center font-weight-medium   ">
                            Q.{{ item.sub_total }} 
                          </td>
                        </tr>  
                      </tbody>
                    </table>  
                    <v-row justify="center" class="mt-3 " >
                        <div class="text-center title font-weight-medium mr-2">
                            Total:  
                        </div>
                        <div class="text-center grey--text title font-weight-medium ">
                            Q{{this.salesByDatePicker[0].total}}
                        </div>
                        </v-row>  
                      <v-row justify="center" class="mt-3 mb-4">
                        <div class="text-center title font-weight-medium mr-1">
                          Pagó con:  
                        </div>
                        <div class="text-center grey--text title font-weight-medium ">
                          {{fixPaymentType( this.salesByDatePicker[0].payment_type)}}
                        </div>
                      </v-row> 
                  </div>
                </div>   
              </v-card>

              <v-card v-else flat  >  
                <!-- -->
                <div ref="document"> 
                  <div class=" " id="element-to-convert"> 
                    <div class="font-weight-medium mt-3">Cliente: {{this.anotherSalesDetial.customer.first_name}} {{this.anotherSalesDetial.customer.last_name}}</div>

                      <p class=" "> {{parsedDate(this.anotherSalesDetial.date)}}  {{formatAMPM(this.anotherSalesDetial.time) }}</p> 

                      <v-divider></v-divider>
                      <table class="ndk centrado">
                        <thead>
                          <tr>
                            <th>
                              <div class="text-center">
                                Cant.
                              </div>
                            </th> 
                            <th>
                              <div class="text-center">
                                Descripción
                              </div>
                            </th> 
                            <th>
                              <div class="text-center">
                                Tipo de venta
                              </div>
                            </th> 
                            <th>
                              <div class="text-center">
                                Precio
                              </div>
                            </th>  
                            <th>
                              <div class="text-center">
                                Subtotal
                              </div> 
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in this.anotherSalesDetial.sales" :key="index" >
                            <td class="text-center font-weight-medium   ">
                              {{ item.quantity }} 
                            </td>
                            <td class="text-center font-weight-medium   ">
                              {{ item.product_name }} - {{ item.filling }}
                            </td> 
                            <td class="text-center font-weight-medium   ">
                              {{ item.type_of_sale }}  
                            </td> 

                            <td class="text-center font-weight-medium   ">
                              Q.{{item.product_sale_price }} 
                            </td> 
                            <td class="text-center font-weight-medium   ">
                              Q.{{ item.sub_total }} 
                            </td>
                          </tr> 
                           
                        </tbody>
                      </table>   
                      <v-row justify="center" class="mt-3 " >
                        <div class="text-center title font-weight-medium mr-2">
                            Total:  
                        </div>
                        <div class="text-center grey--text title font-weight-medium ">
                            Q{{this.anotherSalesDetial.total}}
                        </div>
                        </v-row> 
                        <v-row justify="center" class="mt-3 mb-4" >
                          <div class="text-center title font-weight-medium mr-2">
                            Pagó con:  
                          </div>
                          <div class="text-center grey--text title font-weight-medium ">
                           {{fixPaymentType( this.anotherSalesDetial.payment_type)}}
                          </div>
                        </v-row> 
                    </div>
                  </div>   
              </v-card>

            </v-col>
          </v-row>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <div>
          <v-dialog v-model="showHistory" width="700">
            <v-card outlined>
              <v-card-title class="text-h5 grey lighten-2">Historial Cortes de caja</v-card-title>
              <v-data-table 
              :headers="historyDetails"
              :items="historyBoxesclosed" 
              :items-per-page="10"
              class="elevation-1"
              :footer-props="{ 'items-per-page-text':'Cortes por página'}"
            >
              <template v-slot:item="row"> 
                <tr>
                  <td class="text-center font-weight-medium">{{parsedDate(row.item.date)}}</td>
                  <td class="text-center font-weight-medium">{{formatAMPM(row.item.time)}}</td>
                  <td class="text-center font-weight-medium">Q {{numberWithCommas(row.item.total)}}</td> 
                  <td class="text-center font-weight-medium">Q {{numberWithCommas(row.item.gain)}}</td> 
                </tr>
            </template>            
            </v-data-table>   
          
          <v-card-actions class="pl-5 pr-5 mt-3">  
            <v-spacer></v-spacer> 
            <v-btn @click="showHistory = false" class="pa-2" depressed >
              <v-icon left color="#2ec4b6">mdi-check</v-icon> 
              Aceptar
            </v-btn>
          </v-card-actions>
        </v-card>
        
      </v-dialog>
    </div>
        <div class="mt-2" v-if="cashCutting == false">
          <v-row justify="end">
            <div class="mb-2 ma-5">
              <v-btn 
                class="mr-3"
                color="#26547c"
                dark
                depressed
                @click="showHistory = true, getHistoryBoxClosed()"
              > 
              <v-icon left>
                mdi-text-box-multiple
              </v-icon>
                Historial
              </v-btn>
              <v-btn 
                color="#26547c"
                dark
                depressed
                @click="cashCut()"
              > 
              <v-icon left>
                mdi-cash-register
              </v-icon>
                Realizar corte de caja
              </v-btn>
            </div>
          </v-row>

          <v-row justify="start">
            <v-col md="4">
              <v-card
                class="pa-2"
                outlined
                tile
              > 
                <table> 
                  <tr>
                    <td class="text-left title font-weight-bold"> Ventas totales ({{totalSalesByTodayAll.length}})</td>
                    <td class="text-right blue--text title font-weight-bold">Q {{numberWithCommas(sumPrecios2(totalSalesByTodayAll).toFixed(2)) }}</td>
                    </tr> 
                </table> 
              </v-card>
            </v-col>
            <v-col md="4">
              <v-card
                class="pa-2"
                outlined
                tile
              >
              <table> 
                <tr>
                  <td class="text-left title font-weight-bold"> Ganancias </td>
                  <td class="text-right blue--text title font-weight-bold">Q {{numberWithCommas(sumPreciosTotalGain(salesByTodayCash).toFixed(2))}} </td>
                </tr> 
              </table> 
              </v-card>
            </v-col>
          </v-row>
          <v-row justify="start">
            <v-col md="4">
              <v-card class="pa-0" outlined tile > 
                <v-card-text>
                  <div class="font-weight-medium blue--text title">
                    <v-icon color="blue">
                      mdi-calculator
                    </v-icon>
                    Dinero en caja
                  </div>
                </v-card-text>
                
                <table> 
                  <tr>
                    <td class="text-left grey--text font-weight-bold"> Fondo de caja </td>
                    <td class="text-right grey--text font-weight-bold"> Q {{this.numberWithCommas(totalBoxO)}} </td>
                   </tr>
                  <tr>
                    <td class="text-left grey--text font-weight-bold"> Ventas en efectivo ({{salesByTodayCash.length}})</td>
                    <td class="text-right green--text font-weight-bold"> + Q {{numberWithCommas(sumPrecios2(salesByTodayCash).toFixed(2)) }}</td>
                  </tr>
                  <tr>
                    <td class="text-left grey--text font-weight-bold"> Créditos liquidados </td>
                    <td class="text-right green--text font-weight-bold"> + Q {{numberWithCommas(sumPrecios2(credtisLiquidToday).toFixed(2)) }}</td>
                  </tr>
                  <tr>
                    <td class="text-left grey--text font-weight-bold"> Abonos en efectivo </td>
                    <td class="text-right green--text font-weight-bold"> + Q {{numberWithCommas(sumPrecios2(bonusToday).toFixed(2)) }}  </td>
                   </tr>
                  <tr>
                    <td class="text-left grey--text font-weight-bold"> Entradas </td>
                    <td class="text-right green--text font-weight-bold"> + Q {{numberWithCommas(sumPrecios2(moneyIncome).toFixed(2)) }} </td>
                   </tr>
                  <tr> 
                    <td class="text-left grey--text font-weight-bold"> Salidas </td>
                    <td class="text-right red--text font-weight-bold "> - Q {{numberWithCommas(sumPrecios2(moneyOut).toFixed(2)) }} </td>
                  </tr> 
                  <tr> 
                    <td class="text-left grey--text font-weight-bold"> Total compras </td>
                    <td class="text-right red--text font-weight-bold border_bottom"> - Q {{numberWithCommas(sumPrecios2(shoppings).toFixed(2)) }} </td>
                  </tr> 
                  <tr> 
                    <td></td>
                    <td  class="text-right black--text font-weight-bold">Q {{numberWithCommas(getCutOfCashDetail)}}</td>
                  </tr>
                </table>
              </v-card>
            </v-col>
            <v-col md="4">
              <v-card
                class="pa-0"
                outlined
                tile
              >
              <v-card-text>
                <div class="font-weight-medium blue--text title">
                  <v-icon color="blue">
                    mdi-cash
                  </v-icon>
                  Ventas / Créditos / Abonos
                </div>
              </v-card-text>
                <table>  
                  <tr>
                    <td class="text-left grey--text font-weight-bold"> Ventas en efectivo </td>
                    <td class="text-right green--text font-weight-bold"> + Q {{numberWithCommas(sumPrecios2(salesByTodayCash).toFixed(2)) }}</td>
                  </tr>
                  <tr>
                    <td class="text-left grey--text font-weight-bold">Total Créditos </td>
                    <td class="text-right green--text font-weight-bold"> + Q {{numberWithCommas(sumPrecios2(creditsToday).toFixed(2)) }}</td>
                  </tr>
                  <tr>
                    <td class="text-left grey--text font-weight-bold">Créditos liquidados (hoy) </td>
                    <td class="text-right green--text font-weight-bold"> + Q {{numberWithCommas(sumPrecios2(credtisLiquidToday).toFixed(2)) }}</td>
                  </tr> 
                  <tr>
                    <td class="text-left grey--text font-weight-bold">Créditos no liquidados (hoy) </td>
                    <td class="text-right green--text font-weight-bold"> + Q {{numberWithCommas(sumPrecios2(creditsNoLi).toFixed(2)) }}</td>
                  </tr> 
                  <tr>
                    <td class="text-left grey--text font-weight-bold"> Total abonos a créditos (hoy)  </td>
                    <td class="text-right green--text font-weight-bold">+ Q {{numberWithCommas(sumPrecios2(bonusToday).toFixed(2)) }}  </td>
                  </tr>  
                </table> 
              </v-card>
            </v-col>
            
            <v-col md="4">
              <v-card
                class="pa-0"
                outlined
                tile
              >
              <v-card-text>
                <div class="font-weight-medium blue--text title">
                  <v-icon color="blue">
                    mdi-cash-plus
                  </v-icon>
                  Entradas
                </div>
              </v-card-text>
                  <div>
                    <table> 
                      <tbody>
                        <tr v-for="(item, index) in moneyIncome" :key="index">
                          <td class="text-left grey--text font-weight-bold">
                            {{ index + 1 }}
                          </td>
                          <td class="text-left grey--text font-weight-bold">
                            {{ item.description }}  
                          </td>
                          <td class="text-left grey--text font-weight-bold">
                            Q {{ item.total }}
                          </td> 
                        </tr>
                      </tbody>
                    </table>
                  </div>
                    
                  <v-divider class="mt-3"></v-divider>
                  <div class="font-weight-medium red--text mt-1 title ml-1">
                    <v-icon color="red">
                      mdi-cash-remove
                    </v-icon>
                    Salidas
                  </div> 
                  <div>
                    <table> 
                      <tbody>
                        <tr v-for="(item, index) in moneyOut" :key="index">
                          <td class="text-left grey--text font-weight-bold">
                            {{ index + 1 }}
                          </td>
                          <td class="text-left grey--text font-weight-bold">
                            {{ item.description }}  
                          </td>
                          <td class="text-left grey--text font-weight-bold">
                            Q {{ item.total }}
                          </td> 
                        </tr>
                      </tbody>
                    </table>
                  </div>

              </v-card>
            </v-col>
          </v-row> 
        </div>

        <div class="mt-2" v-else> 
          <v-row justify="start">
            <v-col md="5">
              <v-card
                class="pa-2"
                outlined
                tile
              > 
                <v-card-text>
                  <div class="font-weight-medium green--text title">
                    <v-icon color="green">
                      mdi-cash
                    </v-icon>
                    Corte de caja
                  </div>
                </v-card-text>
                <table>  
                  <tr>
                    <td class="text-left grey--text font-weight-bold"> Total </td>
                    <td class="text-right green--text font-weight-bold">Q {{numberWithCommas(totalBoxClosed) }}</td>
                  </tr>
                  <tr>
                    <td class="text-left grey--text font-weight-bold"> Ganancias </td>
                    <td class="text-right green--text font-weight-bold">Q {{numberWithCommas(gainBoxClosed)}}</td>
                  </tr>
                  <tr>
                    <td class="text-left grey--text font-weight-bold">Fecha</td>
                    <td class="text-right green--text font-weight-bold"> {{parsedDate(dateBoxClosed)}}</td>
                  </tr> 
                  <tr>
                    <td class="text-left grey--text font-weight-bold">Hora</td>
                    <td class="text-right green--text font-weight-bold"> {{ formatAMPM(timeBoxClosed)  }}</td>
                  </tr> 
                  
                </table> 
              </v-card>
            </v-col>
          </v-row> 
        </div>

        
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
        <v-dialog
          transition="dialog-bottom-transition"
          v-model="dialogCustomer"
          width="600"
          persistent
        > 
      <v-card
        class="mx-auto"
        max-width="600"
      >
      <v-footer padless>
        <v-row justify="end" class="pa-4">
         <v-btn
            color="red"
            class="text--primary"
            dark
            elevation="0"
            small
            @click="(dialogCustomer = false)"
          >
            <v-icon dark color="white">mdi-close</v-icon>
          </v-btn>
 
        </v-row> 
      </v-footer>
        <v-card-title class="white--text" style="background-color: #073b4c;" >
          Asignar cliente 
        </v-card-title  >

        <v-card-title>
          <v-text-field hide-details prepend-inner-icon="mdi-account" color="grey" class=" "  autofocus outlined clearable v-model="searchCustomer" dense label="Buscar cliente"> 
          </v-text-field> 
        </v-card-title>    
        <v-virtual-scroll
          :items="filteredData"
          :item-height="60"
          height="300"
        >
          <template v-slot:default="{ item }">
          <v-card outlined >
            <v-list-item >
              <v-list-item-avatar>
                <v-avatar
                  color="#0081a7"
                  size="50"
                  class="white--text font-weight-medium"
                >
                  {{ item.first_name[0] }}{{ item.last_name[0] }}
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="font-weight-medium subtitle-1">{{ item.first_name }} {{ item.last_name }}</v-list-item-title>
                <v-list-item-subtitle class="body-1">{{ item.address }} - {{ item.phone_number }}</v-list-item-subtitle>

              </v-list-item-content>

              <v-list-item-action>
                <v-btn
                  depressed
                  small
                   @click="setCustomer(item.id, item.first_name, item.last_name)"
                >
                  Asignar cliente
                  <v-icon
                    color="#073b4c"
                    right
                  > 
                    mdi-open-in-new
                  </v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
           
            </v-card>
          </template>
        </v-virtual-scroll>
         <v-card-actions>
          <v-spacer>  </v-spacer>
          
            <v-btn 
              class="ma-4" 
              color="#0081a7"
              dark
              elevation="0"
              @click="(dialogCustomer = false), unAssignCustomer()"
            >
            <v-icon
              color="white"
              
              dark
            > 
              mdi-account-cancel
            </v-icon>
              Des-asignar
              
            </v-btn>  
            <v-btn 
              class="ma-4" 
              color="#0081a7"
              dark
              elevation="0"
              
              @click="(dialogCustomer = false)"
            >
              Aceptar
              
            </v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
 

  <div class="text-center">
    <v-dialog 
      v-model="dialogCobro"
      width="700"
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
            <v-tab @click="clickCash()">
              Efectivo
              <v-icon>mdi-cash-multiple</v-icon>
            </v-tab> 
            <v-tab   @click="clickCredit()">
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
                      clearable
                      @keyup="restDiference"
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
              <v-card outlined class="pa-3 mt-4" color="#f6fff8">
                <v-row justify="space-between">
                  <div class="pa-3 font-weight-medium">
                    Cliente: {{ this.textSetCustomer }}     
                  </div>
                  <div> 
                  </div> 
                </v-row>
              </v-card>
            </v-tab-item>
            <v-tab-item  > 
              <v-card-title v-if="setCustomerId == null">
                <v-text-field hide-details prepend-inner-icon="mdi-account" color="grey" class=" "  autofocus outlined clearable v-model="searchCustomer" dense label="Buscar cliente"> 
                </v-text-field> 
              </v-card-title>
              <div v-if="setCustomerId == null">
                <v-virtual-scroll
                  :items="filteredData"
                  :item-height="60"
                  height="300"
                >
                  <template v-slot:default="{ item }">
                  <v-card outlined @click="setCustomer(item.id, item.first_name, item.last_name)" >
                    <v-list-item > 
                      <v-list-item-content>
                        <v-list-item-title class="font-weight-medium subtitle-1">{{ item.first_name }} {{ item.last_name }}</v-list-item-title>
                        <v-list-item-subtitle class="body-1">{{ item.address }} - {{ item.phone_number }}</v-list-item-subtitle> 
                      </v-list-item-content> 
                    </v-list-item>
                  
                    </v-card>
                  </template>
                </v-virtual-scroll>
              </div> 
              <div v-else class="pa-3 title font-weight-medium grey--text mt-4">
                <v-card outlined class="pa-3" color="#f6fff8">
                  <v-row justify="space-between">
                    <div class="pa-3">
                      {{ this.textSetCustomer }}     
                    </div>
                    <div>
                      <v-btn
                        class="ma-2"
                        outlined
                        fab
                        small
                        color="grey"
                        @click="setCusomerIdF()"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </div> 
                  </v-row>
                </v-card>
              </div>

            </v-tab-item>
          </v-tabs-items>
        </v-card>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
           <v-btn 
            class="pa-2"
            depressed 
            @click="clearInput(), (dialogForm = true), createSale(false)"
          >
            <v-icon left  color="red">mdi-printer-off</v-icon> 
            Cobrar sin imprimir
          </v-btn>
          <v-btn 
            class="pa-2"
            depressed 
            @click="clearInput(), (dialogForm = true), createSale(true)"
          >
            <v-icon left   color="#2ec4b6">mdi-printer</v-icon> 
            Cobrar e imprimir
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

  <div class="text-center">
    <v-dialog 
      v-model="dialogBoxO"
      persistent
      width="500"
    > 
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Apertura de caja
        </v-card-title>
        <div class="d-flex align-center"> 
        <v-list-item> 
          <v-list-item-content>
            <v-list-item-title >
              <v-row justify="center" class="mb-8  mt-3">
                <div class="center-text headline mt-3 font-weight-medium blue--text"> 
                  ¿Cuánto dinero hay en caja?
                </div>
              </v-row>
            </v-list-item-title>  
              <v-text-field 
                class="ml-10 mr-10 mb-2"
                v-model.number="totalBoxO" 
                hide-details
                prefix="Q." 
                color="#26547c"
                required
                outlined
                label="Ingrese la cantidad"
                dense 
                clearable 
              ></v-text-field> 
            </v-list-item-content>
          </v-list-item> 
        </div> 
        <v-divider></v-divider> 
        <v-card-actions>
          <v-spacer></v-spacer> 
          <v-btn 
            class="pa-2"
            depressed 
            @click="(dialogForm = true), createBoxOpen()"
          >
            <v-icon left dark size="25" color="#2ec4b6">mdi-cash</v-icon> 
            Registrar 
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
import html2pdf from "html2pdf.js";
import moment from 'moment'
export default {
  components: {
    //MultiListSelect,
    //VueGoodTable
  },
  data() {
    return {
      showVerifier: false,
      dialogNewC: false,
      searchCustomer: '',
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
      timeSale: "",
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
      exchange: "",
      dialogCustomer: false,
      customers: [],
      textSetCustomer: " ",
      setCustomerId: null, 
      customerForm: {
        first_name: "",
        last_name: "",
        phone_number: "",
        address: "",
        branch_office: ""
      },
      hasCredit: false,
      theSaleId: "",
      showTicket: false,
      dialogCash: false,
      customerDetail: "",
      showVerifyInfo: false,
      productVerifyName: "",
      productVerifyFilling: "",
      productVerifyStock: "",
      productVerifyPrice: "0.00",
      search: "",
      log: [],
      moneyIncomeDialog: false,
      moneyOutDialog: false,
      moneyIncomeForm: {
        description: "Entrada de dinero", 
        branch_office: "",
        total: null,
      },
      moneyOutForm: {
        description: "Salida de dinero", 
        branch_office: "",
        total: null,
      },
      checkbox: false,
      customerId: "",
      customerName: "", 
      boxOpened: [],
      dialogBoxO: false,
      totalBoxO: "",
      timeBoxo: "",
      moneyOut: [],
      moneyIncome: [],
      showBoxOpen: false, 
      modal: false,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),

      salesByDatePicker: [],
      ex4: false,
      selectDisabled: false,
      saleDateDetails: [
        {
          text: 'Productos',
          align: 'left',
          sortable: false, 
        },
        {
          text: 'Fecha',
          align: 'left',
          sortable: false, 
        },
   
        { 
          text: 'Hora',
          align: 'center',
          sortable: false, 
        }, 
        { 
          text: 'Total',
          align: 'center',
          sortable: false, 
        },
        { 
          text: 'Ganancia',
          align: 'center',
          sortable: false, 
        },
      ],
      historyDetails: [
        {
          text: 'Fecha',
          align: 'center',
          sortable: false, 
        },
        {
          text: 'Hora',
          align: 'center',
          sortable: false, 
        },
   
        { 
          text: 'Total',
          align: 'center',
          sortable: false, 
        }, 
        { 
          text: 'Ganancia',
          align: 'center',
          sortable: false, 
        }, 
      ],
      showFirstSale: true,
      anotherSalesDetial: [],
      salesForCutDay: [],
      totalSalesToday: [],
      shoppings: [],
      bonusToday: [],
      credtisLiquidToday: [],
      creditsToday: [],
      salesByTodayCash: [],
      getCutOfCashDetail: "",
      totalSalesByTodayAll: [], 
      creditsNoLi: [], 
      cashCutting: false,
      totalBoxClosed: "",
      dateBoxClosed: "",
      timeBoxClosed: "",
      gainBoxClosed: "",
      exchange2: "",
      showHistory: false,
      historyBoxesclosed: [],
      cfCheck: false,
      searchForProduct: false,
      listPriceDiscount: [],
      objDiscount: {},
      disableTypeOfSaleDetail: false,
      typeOfSaleNum: 0,
      newProductsFeature: [],
      dialogGreatherThanOneProduct: false,
      dates: ['', ''],
      dialogLoading: false
 
    };
  },
 


  computed: {
    filteredData (){
      if (this.searchCustomer) {
        return this.customers.filter((item) => {
          return item.first_name.toLowerCase().includes(this.searchCustomer.toLowerCase()) 
        })   
      } else {
        return this.customers;
      }
    },
  },

  created() {
    this.getCashCutting() 
    this.bid = localStorage.getItem('bo');    

    this.customerForm.branch_office = this.bid;
    this.moneyIncomeForm.branch_office = this.bid;
    this.moneyOutForm.branch_office = this.bid;
    this.getProducts();
    this.getSales();
    this.numberWithCommas(this.sumTotalSales(this.detailSale));
    this.getTypeOfSales();
    this.getCustomers();
    this.getBoxODataApi();
    this.getMoneyOut();
    this.getMoneyIncome(); 
    this.getBonusToday();
    this.getCreditsLuiquid();
    this.getCreditsToday();
    this.getSaleByToday();
    this.getSaleByTodayAll();
    this.getCreditsNoLi();
    this.getBoxClosed();  
    this.getShoppings();
    
  },

  watch: {
    dialogForm(val) {
      if (!val) return;
      setTimeout(() => (this.dialogForm = false), 4000);
      
    },
  },

  methods: {
 

    addToSale(barcode){ 
      this.barcode = barcode;
      this.getProduct();
    },

    sumPrecios2(items) {
      return items.reduce((a, b) => {
        return a + Number((b["total"]) );
      }, 0);
    },
    getHistoryBoxClosed(){
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios.get(`${API}api/sales/branch-office-total-boxc/${this.bid}/`, {headers}).then((r)=>{
        if (r.data.total_boxes_closed.length > 0) {
          this.historyBoxesclosed = r.data.total_boxes_closed;
        } 
      })
    },

    getBoxClosed(){

      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios.get(`${API}api/sales/branch-office-boxc/${this.bid}/`, {headers}).then((r)=>{
        if (r.data.boxes_closed.length > 0) {
          this.totalBoxClosed = r.data.boxes_closed[0].total;
          this.dateBoxClosed = r.data.boxes_closed[0].date;
          this.timeBoxClosed = r.data.boxes_closed[0].time;
          this.gainBoxClosed = r.data.boxes_closed[0].gain;
        } 
      })
    },

    getCashCutting(){
      if (this.cashCutting == false) {
        this.cashCutting = (JSON.parse(localStorage.getItem('cashCut')) === true);
      }
    },

    getCreditsNoLi(){
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios.get(`${API}api/sales/branch-office-credits-noli-today/${this.bid}/`, {headers}).then((r)=>{
        this.creditsNoLi = r.data.credits_today_noli 
      })
    },

    cashCut(){ 
 
      this.getCutOfCashDetail = (this.totalBoxO + this.sumPrecios2(this.salesByTodayCash) + this.sumPrecios2(this.credtisLiquidToday) + this.sumPrecios2(this.bonusToday) + this.sumPrecios2(this.moneyIncome) - this.sumPrecios2(this.moneyOut) - this.sumPrecios2(this.shoppings)).toFixed(2);
      this.$swal.fire({
        title: '¿Seguro que deseas realizar el corte de caja?',
        text: "!No podrás revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: "No",
        confirmButtonText: 'Sí, realizar corte'
      }).then((result) => {
        if (result.isConfirmed) {
          this.dialogForm = true; 
          this.createBoxClose()
        }
      }) 
    },

    createBoxClose(){
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios.post(`${API}api/sales/box-close/create/`, {
        "branch_office": this.bid,
        "total": this.getCutOfCashDetail,
        "gain": this.numberWithCommas(this.sumPreciosTotalGain(this.salesByTodayCash).toFixed(2))
      }, {headers}).then((r)=>{
        localStorage.setItem('cashCut', true);
        this.getBoxClosed();
        this.cashCutting = (JSON.parse(localStorage.getItem('cashCut')) === true);   
        let timerInterval; 
        this.$swal.fire( {
            icon: 'success',
            title: 'Corte de caja',
            text: '¡Corte de caja realizado correctamente!',
            confirmButtonText: 'Aceptar',
            showClass: {
            popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
            popup: 'animate__animated animate__fadeOutUp', 
            }, 
            timer: 4000,
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
        return r.data;
      }) 
    },

    getCreditsToday(){
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios.get(`${API}api/sales/branch-office-credits-today/${this.bid}/`, {headers}).then((r)=>{
        this.creditsToday = r.data.credits_today 
      })
    }, 

    getCreditsLuiquid(){
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios.get(`${API}api/sales/branch-office-credits-l-today/${this.bid}/`, {headers}).then((r)=>{
        this.credtisLiquidToday = r.data.credits_liquid_today 
      })
    },

    getBonusToday(){
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios.get(`${API}api/sales/branch-office-bonus-today/${this.bid}/`, {headers}).then((r)=>{
        this.bonusToday = r.data.bonus_today 
      })
    },



    setCusomerIdF(){
      this.setCustomerId = null;
    },
    
    changeDate() {
      console.log(this.date2, "# date 2");
    },


    fixPaymentType(type){
      var paymentType;
      switch (type) {
        case 1:
          paymentType = " Efectivo";
        break;

        case 2:
          paymentType = " Cheque";
        break;

        case 3:
          paymentType = " Crédito";
        break;
      
        default:
        paymentType = " Sin información";
          break;
      }
      return paymentType;
    },

    changeClientMode (){
      this.selectDisabled = !this.selectDisabled
      this.setCustomerId = null;
    },
 
    sumQuant(items) { 
      if (Array.isArray(items)) {
        return items.reduce((a, b) => {
          return a + Number((b["quantity"]) );
        }, 0)  ; 
      }

    },

    getSaleByDate(){
      this.dialogLoading = true;
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios.get(`${API}api/sales/branch-office-sales-date/?date_after=${this.dates[0]}&date_before=${this.dates[1]}`, {headers}).then((r)=>{
       console.log(r.data, " data ")
        if (r.data.length > 0) {
          this.dialogLoading = false;
          this.salesByDatePicker = r.data.filter((s)=> s.branch_office.id == this.bid);

          this.salesByDatePicker.reverse(); 
          this.salesForCutDay = this.salesByDatePicker.filter((s) => s.payment_type == 1);
          this.totalSalesToday = this.salesByDatePicker;
        } else {
          console.log("si entra");
          this.dialogLoading = false;

        }

       })
    },

    getSaleByToday(){
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios.get(`${API}api/sales/branch-office-sales-today-cash/${this.bid}/`, {headers}).then((r)=>{
        if (r.data.sales_today_cash.length > 0) {
          
          this.salesByTodayCash = r.data.sales_today_cash;
          console.log(this.salesByTodayCash, " today cashing");
          this.salesByTodayCash.reverse();  

        } else {
          console.log("si entra");
        }

       })
    },

    getSaleByTodayAll(){
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios.get(`${API}api/sales/branch-office-sales-today/${this.bid}/`, {headers}).then((r)=>{
 
        if (r.data.sales_today.length > 0) {
          
          this.totalSalesByTodayAll = r.data.sales_today 
          this.totalSalesByTodayAll.reverse();  

        } else {
          console.log("si entra");
        }

       })
    },


    getSaleByDateId(id){
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios.get(`${API}api/sales/branch-office-sales-date/${id}/`, {headers}).then((r)=>{
        this.anotherSalesDetial = r.data;
        this.showFirstSale = false;
       })
    },
 

    getMoneyOut(){
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios.get(`${API}api/sales/branch-office-mout-d/${this.bid}/`, {headers}).then((r)=>{
        this.moneyOut = r.data.outflows_today 
      })
    },

    getMoneyIncome(){
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios.get(`${API}api/sales/branch-office-min-d/${this.bid}/`, {headers}).then((r)=>{
        this.moneyIncome = r.data.money_income_today 
      })
    },


    createBoxOpen(){
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios.post(`${API}api/sales/box-open/create/`, {
        "total": this.totalBoxO,
        "branch_office": this.bid
      }, {headers}).then((r)=>{ 
        setTimeout(() => this.notifyVue2("top", "right"), 5000);
        this.dialogBoxO = false;
        this.showBoxOpen = true;
        localStorage.removeItem("cashCut");
        this.cashCutting = false;
        this.getBoxODataApi();
        return r.data
      }).catch((e)=>{
        return e;
      })
    },

    getBoxODataApi(){
      console.log(this.bid, " bid ");
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios.get(`${API}api/sales/branch-office-boxo/${this.bid}/`, {headers}).then((r)=>{
        this.boxOpened = r.data.boxes_opened; 
        console.log(r.data.boxes_opened, " boxo pened");
        if (this.boxOpened.length != 0) {
          this.totalBoxO = parseFloat(this.boxOpened[0].total) 
          this.timeBoxo = this.boxOpened[0].time;
          console.log(this.totalBoxO, " bocono"); 
        }
 
        this.getBoxO();
        return this.totalBoxO;
      })
    },

    getBoxO(){ 
      if (this.boxOpened.length == 0) {
        this.dialogBoxO = true;
      }  
    },
 
    clearInput() {
      this.listPriceDiscount.push(this.objDiscount);
      this.$refs.input.reset()
    },

    changeCheckbox(){ 
      this.setCustomerId = null; 
    },

  createMoneyOut(){
    let headers = { "Content-Type": "application/json;charset=utf-8" };
    axios.post(`${API}api/sales/money-out/create/`, this.moneyOutForm, { headers }).then((r)=>{
      setTimeout(() => this.notifyVue2("top", "right"), 5000);
      this.moneyOutForm.total  = "";
      this.getMoneyOut();
      this.getShoppings();
      return r.data;
    })

  },

 

  createMoneyIncome(){
    let headers = { "Content-Type": "application/json;charset=utf-8" };
    axios.post(`${API}api/sales/money-income/create/`, this.moneyIncomeForm, { headers }).then((r)=>{
      setTimeout(() => this.notifyVue2("top", "right"), 5000);
      this.getMoneyIncome();
      this.getShoppings();

      this.moneyIncomeForm.total  = ""; 
      return r.data;
    })

  },

  searchArray(e) {
    e.preventDefault();
    let filtered = [];
    const input = e.target.value.toLowerCase();
    if (input || this.barcode) {  
      filtered = this.listofProducts.filter((el) => {
        return Object.values(el).some((val) =>
          String(val).toLowerCase().includes(input)
        );
      });

      this.log = filtered;
      console.log(this.log, " products ");
      switch (this.log.length) {
        case 0:
          this.$swal.fire({
            title: 'Verificador producto',
            text: "¡Producto no encontrado!",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar' 
          })
        break;

        case 1: 
          this.productVerifyName = this.log[0].name; 
          this.productVerifyFilling = this.log[0].filling;  
          this.productVerifyStock = `Existencia: ${this.log[0].stock}`;
          this.productVerifyPrice = this.log[0].sale_price;   
        break;
      
        default:
          break;
      } 

    } 
},

searchArrayNewProductsFeature(e) {
    e.preventDefault();
    let filtered = [];
    const input = e.target.value.toLowerCase();
    if (input || this.barcode) {  
      filtered = this.listofProducts.filter((el) => {
        return Object.values(el).some((val) =>
          String(val).toLowerCase().includes(input)
        );
      });

    this.newProductsFeature = filtered;
      console.log(this.newProductsFeature, " products ");
      switch (this.newProductsFeature.length) {
        case 0:
          this.$swal.fire({
            title: 'Detalle venta',
            text: "¡Producto no encontrado!",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar' 
          })
        break;

        case 1: 
        const detailSale = {
            id: this.newProductsFeature[0].id,
            name: this.newProductsFeature[0].name,
            quanty: 1,
            stock: this.newProductsFeature[0].stock,
            min_stock: this.newProductsFeature[0].min_stock,
            max_stock: this.newProductsFeature[0].max_stock, 
            price: this.newProductsFeature[0].sale_price,
            cost_price: this.newProductsFeature[0].cost_price,
            wholesale_price: this.newProductsFeature[0].wholesale_price,
            subtotal: this.newProductsFeature[0].sub_total,
            code: this.newProductsFeature[0].code,
            filling: this.newProductsFeature[0].filling,   
            type_of_sale: 1, 
          };

          var obj = {};
          obj["id"] = detailSale.id;
          obj["name"] = detailSale.name;
          obj["quanty"] = detailSale.quanty;
          obj["stock"] = detailSale.stock;
          obj["min_stock"] = detailSale.min_stock;
          obj["max_stock"] = detailSale.max_stock; 
          obj["price"] = detailSale.price;
          obj["cost_price"] = detailSale.cost_price;
          obj["wholesale_price"] = detailSale.wholesale_price;
          obj["sub_total"] = detailSale.subtotal; 
          obj["code"] = detailSale.code;
          obj["filling"] = detailSale.filling;  
          obj["type_of_sale"] = detailSale.type_of_sale;


          this.barcode = ""

          if (obj["stock"] < 1) {
            this.errorProductStock()
          } else if (obj["stock"] <= obj["min_stock"]) {
            this.warningProductStock(obj["stock"]); 
            this.gettingProductsBarcode.push(obj); 
          } else { 
            this.gettingProductsBarcode.push(obj); 
          }
          this.totalSaleDetail = this.sumPrecios(this.gettingProductsBarcode).toFixed(2) * (obj["quanty"])               
          this.exchange = this.totalSaleDetail - this.totalSaleDetail; 
        break;
      
        default:
          break;
      } 
      if (this.newProductsFeature.length > 1) {
        console.log("greather than");
        this.dialogGreatherThanOneProduct = true
      }

    } 
},

    searchItem() {
      let filtered = [];  
      if (this.barcode) {
        filtered = this.listofProducts.filter((el) => {
          return Object.values(el).some((val) =>
            String(val).toLowerCase().includes(this.barcode)
          );
        });

        this.log = filtered;
          switch (this.log.length) {
          case 0:
            this.$swal.fire({
              title: 'Verificador de producto',
              text: "¡Producto no encontrado!",
              icon: 'warning',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Aceptar' 
            })
          break;

          case 1:   
            this.productVerifyName = this.log[0].name; 
            this.productVerifyFilling = this.log[0].filling;  
            this.productVerifyStock = `Existencia: ${this.log[0].stock}`;
            this.productVerifyPrice = this.log[0].cost_price;   
          break;
        
          default:
            break;
        } 
      } 
    },

    parsedDate(date){
      return moment(String(date)).format('DD/MM/YYYY')
    },

    formatAMPM(time) {
      const dt = moment(time, ["h:mm:ss a"]).format("hh:mm a");
      return dt;
    },

    exportToPDF() {
      this.dialogCash = false;
      html2pdf(document.getElementById("element-to-convert"), {
				margin: 1,
  			filename: "Venta.pdf",
			});
    },

    clickCredit(){
      this.hasCredit = true;
    },

    clickCash(){
      this.hasCredit = false;
    },

    customerCreate(){ 
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios.post(`${API}api/users/customer/create/`, this.customerForm, { headers }).then((r)=>{
        this.getCustomers();
        this.textSetCustomer = `${r.data.first_name} ${r.data.last_name}`;
        this.setCustomerId = r.data.id;
        this.dialogNewC = false;
        return r.data;
      })
    },

    setCustomer(id, name, last_name) {
      this.textSetCustomer = `${name} ${last_name}`;
      this.setCustomerId = id;

    }, 


    selectTypeOfPayment(p){
      this.typeOfPayment = p.id;
    },

    selectText(c){  
      this.textSetCustomer = `${c.first_name} ${c.last_name}`;
      this.setCustomerId = c.id;  
    },

    getFieldText (item)
    {
      return `${item.first_name} ${item.last_name}`
    },

    getCustomers() {
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios
        .get(`${API}api/users/user-branch/${this.bid}/`, { headers })
        .then((response) => {
          this.customers = response.data.customers;
          this.customers.reverse();
        })
        .catch((error) => {
          this.errored = true;
        })
        .finally(() => (this.loading = false));
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
        .get(`${API}api/sales/branch-office-p/${this.bid}/`, { headers })
        .then((response) => {
          this.listofProducts = response.data.list_products;

          this.listofProducts.reverse();
        })
        .catch((error) => {
          this.errored = true;
          return error;
        })
        .finally(() => (this.loading = false));
    },

    submit() {
      this.searchForProduct = true;
      this.getProduct();
    },

    getProduct() { 
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios
        .get(`${API}api/sales/branch-office-cat/${this.bid}/`, { headers })
        .then((response) => { 
        
          if (response.data.list_products.length > 0) { 
            this.barc = response.data.list_products;
            console.log(this.barc, " filter");
            this.filterProducts = this.barc.find(element => element.barcode == (this.barcode) || element.name.toLowerCase() == this.barcode.toLowerCase() || element.code.toLowerCase() == this.barcode.toLowerCase()); 
            console.log(this.filterProducts, " filter");
            
            if (this.filterProducts) {
              const detailSale = {
                id: this.filterProducts.id,
                name: this.filterProducts.name,
                quanty: 1,
                stock: this.filterProducts.stock,
                min_stock: this.filterProducts.min_stock,
                max_stock: this.filterProducts.max_stock, 
                price: this.filterProducts.sale_price,
                cost_price: this.filterProducts.cost_price,
                wholesale_price: this.filterProducts.wholesale_price,
                subtotal: this.filterProducts.sub_total,
                code: this.filterProducts.code,
                filling: this.filterProducts.filling,   
                type_of_sale: 1, 
              };

              var obj = {};
              obj["id"] = detailSale.id;
              obj["name"] = detailSale.name;
              obj["quanty"] = detailSale.quanty;
              obj["stock"] = detailSale.stock;
              obj["min_stock"] = detailSale.min_stock;
              obj["max_stock"] = detailSale.max_stock; 
              obj["price"] = detailSale.price;
              obj["cost_price"] = detailSale.cost_price;
              obj["wholesale_price"] = detailSale.wholesale_price;
              obj["sub_total"] = detailSale.subtotal; 
              obj["code"] = detailSale.code;
              obj["filling"] = detailSale.filling;  
              obj["type_of_sale"] = detailSale.type_of_sale;


              this.barcode = ""
 
              if (obj["stock"] < 1) {
                this.errorProductStock()
              } else if (obj["stock"] <= obj["min_stock"]) {
                this.warningProductStock(obj["stock"]); 
                this.gettingProductsBarcode.push(obj); 
              } else { 
                this.gettingProductsBarcode.push(obj); 
              }
              this.totalSaleDetail = this.sumPrecios(this.gettingProductsBarcode).toFixed(2) * (obj["quanty"])               
              this.exchange = this.totalSaleDetail - this.totalSaleDetail;
              this.searchForProduct = false;

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
              this.searchForProduct = false;

            } 
          } 
        })
        .catch((error) => {
          this.errored = true;
          return error;
        })
        .finally(() => (this.loading = false));
    },

    
    sumTextField(){
      this.totalSaleDetail = this.sumPrecios(this.gettingProductsBarcode).toFixed(2) 
    },

    restDiference(){ 
      this.exchange = this.totalSaleDetail - this.sumPrecios(this.gettingProductsBarcode).toFixed(2);
      return this.exchange.toFixed(2);
    },


    sumPrecios(items) {
      return items.reduce((a, b) => { 
        return a + Number((b["price"]) * b["quanty"]  );
      }, 0);
    },

    sumPreciosTotalGain(items) {
      return items.reduce((a, b) => {
        return a + Number((b["gain"]));
      }, 0);
    },

    sumPreciosGain(items) {
      return items.reduce((a, b) => {
        return a + Number((b["cost_price"]) * b["quanty"]  );
      }, 0);
    },


    cobrate(){
      if (this.selectDisabled) {
        this.textSetCustomer = `${this.customerForm.first_name} ${this.customerForm.last_name}`;
      }
      if (this.setCustomerId == null && this.selectDisabled == false) {
        let timerInterval; 
          this.$swal.fire( {
            icon: 'error',
            title: 'Venta',
            text: '¡Debes seleccionar o crear un cliente!',
            confirmButtonText: 'Aceptar',
            showClass: {
            popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
            popup: 'animate__animated animate__fadeOutUp', 
            }, 
            timer: 4000,
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
      } else {
        this.dialogCobro = true;

      }
    },

    createSale(print) { 

      let headers = { "Content-Type": "application/json;charset=utf-8" };
      this.dialogCobro = false;
      
      if (this.selectDisabled) {

        this.textSetCustomer = `${this.customerForm.first_name} ${this.customerForm.last_name}`
        

        axios.post(`${API}api/users/customer/create/`, this.customerForm, { headers }).then((r)=>{
          this.getCustomers();
          var gain = (this.sumPrecios(this.gettingProductsBarcode).toFixed(2) - this.sumPreciosGain(this.gettingProductsBarcode));
          
          axios.post(
              `${API}api/sales/create/`,
              {
                "discount": 0.0,
                "total": this.sumPrecios(this.gettingProductsBarcode).toFixed(2),
                "branch_office": this.bid,
                "payment_type": this.hasCredit ? 3 : 1,
                "customer": r.data.id,
                "gain": gain.toFixed(2),
                "date": this.date2
              },
              { headers }
            )
            .then((responsev) => {
              if (this.hasCredit) {
                axios.post(
                  `${API}api/sales/credit/create/`,
                  {
                    "branch_office": this.bid,
                    "customer":  this.setCustomerId, 
                    "sale": responsev.data.id,
                    "liquidated": false, 
                    "total": responsev.data.total,
                    "date": this.date2

                  },
                  { headers }
                ).then((r)=>{
                  this.getCreditsToday();
                  
                  return r.data;
                })
              }
              this.theSaleId = responsev.data.id; 
              for ( let index = 0; index < this.gettingProductsBarcode.length; index++ ) {
                
                axios
                  .post(
                    `${API}api/sales/detail-sale/create/`,
                    {
                      "sale": responsev.data.id,
                      "product": this.gettingProductsBarcode[index].id,
                      "quantity": this.gettingProductsBarcode[index].quanty,
                      "sub_total": this.gettingProductsBarcode[index].quanty * this.gettingProductsBarcode[index].price,
                      "type_of_sale": 1 ,  
                    },
                    { headers }
                  )
                  .then((r) => {  
                    console.log(r.data.type_of_sale, "sales data by");
                     var restStock = this.gettingProductsBarcode[index].quanty;

                    axios.patch( `${API}api/sales/product/${this.gettingProductsBarcode[index].id}/`,
                    {
                      "stock": this.gettingProductsBarcode[index].stock - restStock,
                    },

                    ).then((response)=>{  
                      console.log(response.data, "product");
                      setTimeout(() => ( (this.dialog = false), (this.gettingProductsBarcode = [])), 4000 );
                      setTimeout(() => this.notifyVue("top", "right"), 5000);
                      this.getSales();
                      this.getSaleByDate(); 
                      this.dialogCobro = false;
                      this.getDetailSale(this.theSaleId)  
                      this.customerForm.first_name = "";
                      this.customerForm.last_name = "";
                      this.customerForm.address = "";
                      this.customerForm.phone_number = ""; 
                      this.customerForm.branch_office = "";  
                      this.getSaleByDate(); 
                      this.getSaleByToday(); 
                      this.getSaleByTodayAll();
                      this.getCreditsToday(); 
                      this.getShoppings();
                      if (print == false) {
                        this.dialogCash = false;  
                      } else {
                        this.dialogCash = true;   
                      }
                      return response.data;

                    }).catch((error) => {
                      return error;
                    });

                  return r.data;
                  })
                  .catch((error) => {
                    return error;
                  });
              }
            })
            .catch((error) => {
              return error;

          });
        })
      } else {
        var gain = (this.sumPrecios(this.gettingProductsBarcode).toFixed(2) - this.sumPreciosGain(this.gettingProductsBarcode));
        console.log(gain, " gain ");
        axios.post(
          `${API}api/sales/create/`,
          {
            "discount":  0.0,
            "total": this.sumPrecios(this.gettingProductsBarcode).toFixed(2),
            "branch_office": this.bid,
            "payment_type": this.hasCredit ? 3 : 1,
            "customer": this.setCustomerId,
            "gain": gain.toFixed(2),
            "date": this.date2

          },
          { headers }
        )
        .then((responsev) => {
          if (this.hasCredit) {
                axios.post(
                  `${API}api/sales/credit/create/`,
                  {
                    "branch_office": this.bid,
                    "customer":  this.setCustomerId, 
                    "sale": responsev.data.id,
                    "liquidated": false, 
                    "total": responsev.data.total,
                    "date": this.date2

                  },
                  { headers }
                ).then((r)=>{
                  this.getCreditsToday();
                  return r.data;
                })
              }
          this.theSaleId = responsev.data.id;
          for ( let index = 0; index < this.gettingProductsBarcode.length; index++ ) {
            
            axios
              .post(
                `${API}api/sales/detail-sale/create/`,
                {
                  "sale": responsev.data.id,
                  "product": this.gettingProductsBarcode[index].id,
                  "quantity": this.gettingProductsBarcode[index].quanty,
                  "sub_total": this.gettingProductsBarcode[index].quanty * this.gettingProductsBarcode[index].price,
                  "type_of_sale": 1 ,

                },
                { headers }
              )
              .then((r) => {  
                console.log(r.data.type_of_sale, "sales data by");
                var restStock = this.gettingProductsBarcode[index].quanty;
                 axios.patch( `${API}api/sales/product/${this.gettingProductsBarcode[index].id}/`,
                {
                  "stock": this.gettingProductsBarcode[index].stock - restStock,
                },

                ).then((response)=>{  
                  console.log(response.data, "product");

                  setTimeout(() => ( (this.dialog = false), (this.gettingProductsBarcode = [])), 4000 );
                  setTimeout(() => this.notifyVue("top", "right"), 5000);
                  this.getSales();
                  this.getSaleByDate(); 
                  this.dialogCobro = false;
                  this.getDetailSale(this.theSaleId)  
                  this.customerForm.first_name = "";
                  this.customerForm.last_name = "";
                  this.customerForm.address = "";
                  this.customerForm.phone_number = ""; 
                  this.customerForm.branch_office = "";    
                  if (print == false) {
                    this.dialogCash = false;  
                  } else {
                    this.dialogCash = true;   
                  }
                  this.getSaleByDate(); 
                  this.getSaleByToday();
                  this.getSaleByTodayAll();
                  this.getCreditsToday(); 
                  this.getShoppings();

                  return response.data;
                }).catch((error) => {
                  return error;

                }); 
                return r.data;
              })
              .catch((error) => {
                return error;

              });
          }
        }).catch((error) => {
          return error;

        }); 
      
      }
 
    },

    notifyVue(verticalAlign, horizontalAlign) {
      this.$notify({
        message: "¡Se ha registrado la venta! ", 
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "success",
      });
    },

    notifyVue2(verticalAlign, horizontalAlign) {
      this.$notify({
        message: "¡Registro guardado! ", 
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
      let timerInterval; 
      this.$swal.fire( {
          icon: 'error',
          title: 'Stock',
          text: '¡No hay stock de este producto!',
          confirmButtonText: 'Aceptar',
          showClass: {
          popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
          popup: 'animate__animated animate__fadeOutUp', 
          }, 
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
    },

     warningProductStock(stock) {
      let timerInterval; 
      this.$swal.fire({
          icon: 'warning',
          title: '¡Stock bajo de este producto!',
          text: 'Stock: ' + ' ' +  stock,
          confirmButtonText: 'Aceptar',
          showClass: {
          popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
          },
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
    },

    getSales() {
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios
        .get(`${API}api/sales/sale-details/`, { headers })
        .then((response) => {
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
          this.timeSale = response.data.time;
          this.dateSale = response.data.date;
          this.customerDetail = `${response.data.customer.first_name} ${response.data.customer.last_name}`;


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
          return error;
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
          return error;
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
        this.totalSaleDetail = this.sumPrecios(this.gettingProductsBarcode).toFixed(2) 

    },

    unAssignCustomer(){
      this.textSetCustomer = "Asignar cliente";
      this.setCustomerId = null;

    },


    getShoppings(){
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios.get(`${API}api/sales/branch-office-sh-today/${this.bid}/`, { headers,}).then((response) => {
        this.shoppings = response.data.shoppings; 
        console.log(this.sumPrecios2(this.salesByTodayCash),  this.salesByTodayCash, "today casj");
        this.getCutOfCashDetail = (this.totalBoxO + this.sumPrecios2(this.salesByTodayCash) + this.sumPrecios2(this.credtisLiquidToday) + this.sumPrecios2(this.bonusToday) + this.sumPrecios2(this.moneyIncome) - this.sumPrecios2(this.moneyOut) - this.sumPrecios2(this.shoppings)).toFixed(2);

        this.shoppings.reverse();
        return response.data
      }).catch((error) => {
        return error;
      });
    },


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

 
td.border_bottom,
table.ndk {
    border-bottom: 1px solid grey;
    border-collapse: collapse;
    margin-left: 13px;
}


td.producto,
th.producto {
    width: 75px;
    max-width: 75px;
}

td.cant,
th.cant {
    width: 60px;
    max-width: 60px;
    word-break: break-all;
}

td.precio,
th.precio {
    width: 60px;
    max-width: 60px;
    word-break: break-all;
}

.centrado {
    text-align: center;
    align-content: center;
}
 

tr.border_bottom td {
  border-bottom: 1px solid grey;
}

.ticket {
    width: 350px;
    max-width: 350px;
}

tr:nth-child(even) {
  background-color: #EEFDFB;
}

</style>
