<template>
  <div class=" ">
    <v-row justify="space-between" class="mt-2" >  
      <div>
        <v-row justify="center"> 
          <v-dialog v-model="productPatchForm" persistent max-width="1200px"> 
            <v-card>
              <div > 
                <v-card-title>
                  <div class="title">Modificar producto</div>
                </v-card-title> 
                <v-divider></v-divider> 
                <div>
                  <v-form ref="productForm" class="mt-3"> 
                    <table>
                      <tr>
                          <td>
                            <div class="mt-2 mr-2 font-weight-bold ">
                              Código de barras
                            </div> 
                          </td>
                          <td>
                            <v-text-field  
                              hide-details
                              readonly
                              prepend-inner-icon="mdi-barcode-scan" 
                              color="#26547c"
                              required
                              outlined
                              dense 
                              @keydown.enter="submit"
                              v-model="productForm.barcode"
                            ></v-text-field>
                          </td>
                          <td>
                            <div class="mt-2 font-weight-bold   ">
                              Stock 
                            </div>  
                          </td>
                          <td> 
                            <v-text-field 
                              type="number"
                              color="#26547c"
                              outlined
                              hide-details
                              dense 
                              v-model="productForm.stock"
                            ></v-text-field>
                          </td>   
                        </tr>
                        <tr>
                          <td>
                            <div class="mt-2 mr-2 font-weight-bold ">
                              Descripción
                            </div>
                            
                            </td>
                          <td>
                            <v-text-field 
                              hide-details
                              required
                              outlined
                              dense
                              color="#26547c"
                              v-model="productForm.name" 
                            ></v-text-field> 
                          </td> 
                          <td>
                            <div class="mt-2 mr-2 font-weight-bold">
                              Stock mínimo
                            </div>  
                          </td>
                          <td>
                            <v-text-field 
                              type="number"
                              color="#26547c"
                              outlined
                              dense
                              hide-details 
                              v-model="productForm.min_stock"
                          ></v-text-field>
                          </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="mt-2 mr-2 font-weight-bold ">
                              Precio costo
                            </div>
                        </td>
                        <td>
                          <v-text-field 
                            outlined
                            hide-details=""
                            dense
                            color="#26547c"
                            type="number" 
                            prefix="Q."
                            v-model="productForm.cost_price"
                          ></v-text-field>
                        </td> 
                        <td>
                          <div class="mt-2 mr-2 font-weight-bold">
                            Stock máximo
                          </div>  
                        </td>
                        <td>
                          <v-text-field 
                            type="number"
                            color="#26547c"
                            outlined
                            dense
                            hide-details 
                            v-model="productForm.max_stock"
                          ></v-text-field>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="mt-2 mr-2 font-weight-bold  ">
                            Precio venta
                          </div> 
                        </td>
                        <td>
                          <v-text-field 
                            persistent-hint
                            required
                            color="#26547c"
                            outlined
                            hide-details="" 
                            dense
                            type="number"
                            prefix="Q."
                            v-model="productForm.sale_price"
                          ></v-text-field> 
                        </td> 
                        <td>
                          <div class="mt-2 mr-2 font-weight-bold">
                            Código
                          </div>  
                        </td>
                        <td>
                          <v-text-field 
                            color="#26547c"
                            outlined
                            dense
                            hide-details 
                            v-model="productForm.code"
                          ></v-text-field>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="mt-2 mr-2 font-weight-bold ">
                            Precio mayoreo
                          </div>  
                        </td>
                        <td>
                          <v-text-field 
                            hide-details
                            outlined
                            color="#26547c"
                            dense 
                            type="number"
                            prefix="Q."
                            v-model="productForm.wholesale_price"
                        ></v-text-field>
                        </td> 
                        <td>
                          <div class="mt-2 mr-2 font-weight-bold ">
                            Presentación
                          </div>
                        </td>
                        <td>
                          <v-text-field 
                            color="#26547c"
                            outlined
                            dense
                            hide-details 
                            v-model="productForm.filling"
                          ></v-text-field> 
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="mt-2 mr-2 font-weight-bold">
                            Categoría
                          </div>
                        </td>
                        <td>
                          <v-row>
                            <v-select
                              class="mr-3 ml-3 "
                              :items="categories"
                              item-text="name"
                              @change="selectText"
                              return-object
                              hide-details
                              :disabled="readOnly" 
                              required
                              color="#26547c"
                              outlined 
                              dense
                              readonly
                              v-model="categoryName"
                            ></v-select>
                            <div class=" ">
                              <v-btn
                                @click="dialog2 = true"  
                                elevation="0" 
                                outlined
                                small
                                disabled
                                color="#26547c"
                              >
                                <v-icon dark> mdi-plus </v-icon>
                              </v-btn>
                            </div>
                          </v-row>
                        </td> 
                      </tr>  
                    </table> 
                  </v-form>  
                </div>
              <v-card outlined class="pa-3 mt-6" color="grey lighten-4">
                <v-card-actions>
                  <v-spacer></v-spacer> 
                  <v-btn @click="(productPatchForm = false), clearPForm()" class="ma-2" elevation="0" color="grey" dark>
                    Cancelar
                  </v-btn>
                  <v-btn 
                    color="#2ec4b6"
                    dark
                    min-width="200"
                    elevation="0"
                    @click="(dialogForm = true), patchProductByForm()"
                  >
                    <v-icon dark class="mr-3"> mdi-check </v-icon>
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card> 

            </div>
          </v-card>
          </v-dialog>
          <v-dialog v-model="dialog2" max-width="500px">
            <v-card>
              <v-card-title> Nueva categoría </v-card-title>
              <v-card-text>
                <v-text-field
                  class="mt-3"
                  label="Ingrese el nombre de la categoría"
                  v-model="categoryProductForm.name"
                  outlined
                  dense
                ></v-text-field>
              </v-card-text>
              <v-card outlined class="pa-3" color="grey lighten-4"> 
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn  color="grey" elevation="0" dark @click="dialog2 = false">
                    Cancelar
                  </v-btn>
                  <v-btn
                    color="#2ec4b6"
                    dark
                    elevation="0"
                    @click="submitCategoryProductForm()"
                  >
                  <v-icon dark> mdi-check </v-icon>
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-card>
          </v-dialog>
        </v-row>
      </div> 
    </v-row>
    
    <div class=" mr-5 ml-5 "> 
      <v-card  outlined elevation="0">
        <v-tabs 
          v-model="tab" 
          color="#26547c" 
        >
          <v-tabs-slider color="#26547c"></v-tabs-slider> 
          <v-tab ><v-icon class="mr-3"  >mdi-file-document-multiple-outline</v-icon>Nuevo</v-tab>
          <v-tab><v-icon class="mr-3" >mdi-clipboard-text-multiple-outline</v-icon>Productos</v-tab>

          <v-tab><v-icon class="mr-3" >mdi-text-box-edit-outline</v-icon>Modificar</v-tab>
          
          <v-tab><v-icon class="mr-3" >mdi-file-document-remove</v-icon>Eliminar</v-tab>
          <!-- <v-tab><v-icon class="mr-3" >mdi-cogs</v-icon>Ajuste</v-tab>
           -->
        
        </v-tabs>
      </v-card>
      <v-tabs-items v-model="tab" class="mt-3">
        <v-tab-item > 
          <v-card-title>
            <div class="title">Nuevo producto</div>
          </v-card-title> 
          <v-divider></v-divider> 
          <div>
            <v-form ref="productForm" class="mt-3"> 
                <table>
                  <tr>
                      <td>
                        <div class="mt-2 mr-2 font-weight-bold ">
                          Código de barras
                        </div> 
                      </td>
                      <td>
                        <v-text-field  
                          hide-details
                          prepend-inner-icon="mdi-barcode-scan" 
                          color="#26547c"
                          required
                          outlined
                          dense 
                          @keydown.enter="submit"
                          v-model="productForm.barcode"
                        ></v-text-field>
                      </td>
                      <td>
                        <div class="mt-2 font-weight-bold   ">
                          Stock 
                        </div>  
                      </td>
                      <td> 
                        <v-text-field 
                          type="number"
                          color="#26547c"
                          outlined
                          hide-details
                          dense
                          :rules="obligatorioRules" 
                          v-model="productForm.stock"
                        ></v-text-field>
                      </td>   
                    </tr>
                    <tr>
                      <td>
                        <div class="mt-2 mr-2 font-weight-bold ">
                          Descripción
                        </div>
                        
                        </td>
                      <td>
                        <v-text-field 
                          hide-details
                          required
                          outlined
                          dense
                          color="#26547c"
                          v-model="productForm.name"
                          :rules="obligatorioRules" 
                        ></v-text-field> 
                      </td> 
                      <td>
                        <div class="mt-2 mr-2 font-weight-bold">
                          Stock mínimo
                        </div>  
                      </td>
                      <td>
                        <v-text-field 
                          type="number"
                          color="#26547c"
                          outlined
                          dense
                          hide-details
                          :rules="obligatorioRules" 
                          v-model="productForm.min_stock"
                      ></v-text-field>
                      </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="mt-2 mr-2 font-weight-bold ">
                          Precio costo
                        </div>
                    </td>
                    <td>
                      <v-text-field 
                        outlined
                        hide-details=""
                        dense
                        color="#26547c"
                        type="number"
                        :rules="obligatorioRules" 
                        prefix="Q."
                        v-model="productForm.cost_price"
                      ></v-text-field>
                    </td> 
                    <td>
                      <div class="mt-2 mr-2 font-weight-bold">
                        Stock máximo
                      </div>  
                    </td>
                    <td>
                      <v-text-field 
                        type="number"
                        color="#26547c"
                        outlined
                        dense
                        hide-details
                        :rules="obligatorioRules" 
                        v-model="productForm.max_stock"
                      ></v-text-field>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="mt-2 mr-2 font-weight-bold  ">
                        Precio venta
                      </div> 
                    </td>
                    <td>
                      <v-text-field 
                        persistent-hint
                        required
                        color="#26547c"
                        outlined
                        hide-details=""
                        :rules="obligatorioRules" 
                        dense
                        type="number"
                        prefix="Q."
                        v-model="productForm.sale_price"
                      ></v-text-field> 
                    </td> 
                    <td>
                      <div class="mt-2 mr-2 font-weight-bold">
                        Código
                      </div>  
                    </td>
                    <td>
                      <v-text-field 
                        color="#26547c"
                        outlined
                        dense
                        hide-details
                        :rules="obligatorioRules" 
                        v-model="productForm.code"
                      ></v-text-field>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="mt-2 mr-2 font-weight-bold ">
                        Precio mayoreo
                      </div>  
                    </td>
                    <td>
                      <v-text-field 
                        hide-details
                        outlined
                        color="#26547c"
                        dense
                        :rules="obligatorioRules" 
                        type="number"
                        prefix="Q."
                        v-model="productForm.wholesale_price"
                    ></v-text-field>
                    </td> 
                    <td>
                      <div class="mt-2 mr-2 font-weight-bold ">
                        Presentación
                      </div>
                    </td>
                    <td>
                      <v-text-field 
                        color="#26547c"
                        outlined
                        dense
                        hide-details
                        :rules="obligatorioRules" 
                        v-model="productForm.filling"
                      ></v-text-field> 
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="mt-2 mr-2 font-weight-bold">
                        Categoría
                      </div>
                    </td>
                    <td>
                      <v-row>
                        <v-select
                          class="mr-3 ml-3 "
                          :items="categories"
                          item-text="name"
                          @change="selectText"
                          return-object
                          hide-details
                          :disabled="readOnly" 
                          required
                          color="#26547c"
                          outlined
                          :rules="obligatorioRules" 
                          dense
                          v-model="categoryName"
                        ></v-select>
                        <div class=" ">
                          <v-btn
                            @click="dialog2 = true"  
                            elevation="0" 
                            outlined
                            small
                            color="#26547c"
                          >
                            <v-icon dark> mdi-plus </v-icon>
                          </v-btn>
                        </div>
                      </v-row>
                    </td> 
                  </tr>  
                </table> 
              </v-form>  
            </div>
          <v-card outlined class="pa-3 mt-6" color="grey lighten-4">
            <v-card-actions>
              <v-spacer></v-spacer> 
              <v-btn 
                color="#2ec4b6"
                dark
                min-width="200"
                elevation="0"
                @click="submitProductForm()"
              >
                <v-icon dark class="mr-3"> mdi-check </v-icon>
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card> 
        </v-tab-item>
        <v-tab-item>
          <v-card-title>
            <div class="title">Todos los productos</div>
          </v-card-title>  
          <div >
            <v-row  justify="space-between">
              <v-col cols="5">
                <v-text-field prepend-inner-icon="mdi-magnify" color="grey" class="ml-5 mr-5"  autofocus outlined clearable v-model="searchProduct" dense label="Buscar producto"> 
                </v-text-field> 
              </v-col>

              <v-col lg="5"> 
              <v-row no-gutters> 
                <v-select
                  color="grey"
                  :items="[{ name: '- Todos -' }, ...categories]"
                  return-object
                  class="ml-5 mr-5" 
                  label="Categoría"  
                  dense 
                  item-text="name"
                  item-value="id"
                  @change="selectCategory"
                  outlined> 
                </v-select> 
               <div>
                  <vue-excel-xlsx
                    :data="listOfProducts"
                    :columns="columns"
                    :file-name="'productos'"
                    :file-type="'xlsx'"
                    :sheet-name="'sheetname'"
                    >
                    <v-btn dark color="#0ead69">
                      <v-icon dark>
                        mdi-microsoft-excel
                      </v-icon> 
                    </v-btn> 
                  </vue-excel-xlsx>
                  
                </div>
                
              </v-row>  
              </v-col>
            </v-row> 
            <v-data-table 
              :headers="headersSProducts"
              :items="filteredData" 
              class="elevation-1"
              :items-per-page="10"
              :footer-props="{ 'items-per-page-text':'Productos por página'}"
            >
            <template v-slot:no-data>
              <v-alert :value="true" color="error" dark class="text-center mt-3 mr-15 ml-15">
                Producto(s) no encontrado :(
              </v-alert>
            </template>
              <template v-slot:item="row"> 
                <tr>
                  <td class="text-left caption font-weight-medium">{{row.item.code}}</td> 
                  <td class="text-left caption font-weight-medium">{{row.item.name}} - {{row.item.filling }}</td>
                  <td class="text-center caption font-weight-medium">{{row.item.product_category.name}}</td>
                  <td class="text-center caption font-weight-medium">{{row.item.cost_price }}</td>
                  <td class="text-center caption font-weight-medium">{{row.item.sale_price}} GTQ</td>
                  <td class="text-center caption green--text font-weight-medium">{{row.item.wholesale_price}} GTQ</td>
                  <td class="text-center caption font-weight-medium">
                    <v-chip class="ma-2 pa-1" label outlined :color="row.item.stock < 1 ? '#ff312e' : row.item.stock <= row.item.min_stock ? 'orange' : '#66ad2d' "  > 
                      <div class="text-center caption center-text">{{fixStock(row.item.stock)}}</div> 
                    </v-chip>
                  </td>
                  <td class="text-center caption font-weight-medium">{{ row.item.stock }}</td>
                  <td class="text-center">
                    <v-btn
                      class="mx-2"
                      dark
                      x-small
                      elevation="0"
                      color="#26547c" 
                      @click="readOnly = true, productPatchForm = true, getProduct(row.item.id)"
                    >
                      <v-icon small dark> mdi-pencil </v-icon>
                    </v-btn>
                    <v-btn
                      class="mx-2"
                      dark
                      x-small
                      elevation="0"
                      color="red accent-3" 
                      @click="deleteProductAlert(row.item.id)"
                    >
                      <v-icon small dark> mdi-trash-can </v-icon>
                    </v-btn>
                  </td> 
                </tr>
            </template>            
          </v-data-table> 
          </div>
        </v-tab-item>
        <v-tab-item> 
        <div v-if="showDataTable">
          <v-data-table 
              :headers="headersSProducts"
              :items="log" 
              class="elevation-1"
              :items-per-page="10"
              :footer-props="{ 'items-per-page-text':'Productos por página'}"
            >
              <template v-slot:item="row"> 
                <tr>
                  <td class="text-left font-weight-medium">{{row.item.code}} </td>

                  <td class="text-left font-weight-medium">{{row.item.name}} - {{row.item.filling }}</td>
                  <td class="text-center font-weight-medium">{{row.item.product_category.name}}</td>
                  <td class="text-center font-weight-medium">{{row.item.cost_price }}</td>
                  <td class="text-center font-weight-medium">{{row.item.sale_price}} GTQ</td>
                  <td class="text-center green--text font-weight-medium">{{row.item.wholesale_price}} GTQ</td>
                  <td class="text-center font-weight-medium">
                    <v-card class="ma-2 pa-1 rounded-card" outlined dark :color="row.item.stock < 1 ? '#ff312e' : row.item.stock <= 10 ? 'orange' : '#66ad2d' " text-color="white" > 
                      <div class="text-center center-text">{{fixStock(row.item.stock)}}</div> 
                    </v-card>
                  </td>
                  <td class="text-center font-weight-medium">{{ row.item.stock }}</td>
                  <td class="text-center">
                    <v-btn
                      class="mx-2"
                      dark
                      x-small
                      elevation="0"
                      color="#26547c" 
                      @click="readOnly = true, productPatchForm = true, getProduct(row.item.id)"
                    >
                      <v-icon small dark> mdi-pencil </v-icon>
                    </v-btn>
                    <v-btn
                      class="mx-2"
                      dark
                      x-small
                      elevation="0"
                      color="red accent-3" 
                      @click="deleteProductAlert(row.item.id)"
                    >
                      <v-icon small dark> mdi-trash-can </v-icon>
                    </v-btn>
                  </td> 
                </tr>
            </template>            
          </v-data-table> 
          <v-card outlined class="pa-3 mt-6" color="grey lighten-4">
            <v-card-actions>
              <v-spacer></v-spacer> 
              <v-btn @click="(showSearcher = true, showDataTable = false), clearPForm()" class="ma-2" elevation="0" color="grey" dark>
                Cancelar
              </v-btn> 
            </v-card-actions>
          </v-card> 
        </div>
          <div v-if="showForm"> 
            <v-card-title>
              <div class="title">Modificar producto</div>
            </v-card-title> 
            <v-divider></v-divider> 
            <div>
              <v-form ref="productForm" class="mt-3"> 
                <table>
                  <tr>
                      <td>
                        <div class="mt-2 mr-2 font-weight-bold ">
                          Código de barras
                        </div> 
                      </td>
                      <td>
                        <v-text-field  
                          hide-details
                          readonly
                          prepend-inner-icon="mdi-barcode-scan" 
                          color="#26547c"
                          required
                          outlined
                          dense
                          :rules="obligatorioRules" 
                          @keydown.enter="submit"
                          v-model="productForm.barcode"
                        ></v-text-field>
                      </td>
                      <td>
                        <div class="mt-2 font-weight-bold   ">
                          Stock 
                        </div>  
                      </td>
                      <td> 
                        <v-text-field 
                          type="number"
                          color="#26547c"
                          outlined
                          hide-details
                          dense
                          :rules="obligatorioRules" 
                          v-model="productForm.stock"
                        ></v-text-field>
                      </td>   
                    </tr>
                    <tr>
                      <td>
                        <div class="mt-2 mr-2 font-weight-bold ">
                          Descripción
                        </div>
                        
                        </td>
                      <td>
                        <v-text-field 
                          hide-details
                          required
                          outlined
                          dense
                          color="#26547c"
                          v-model="productForm.name"
                          :rules="obligatorioRules" 
                        ></v-text-field> 
                      </td> 
                      <td>
                        <div class="mt-2 mr-2 font-weight-bold">
                          Stock mínimo
                        </div>  
                      </td>
                      <td>
                        <v-text-field 
                          type="number"
                          color="#26547c"
                          outlined
                          dense
                          hide-details
                          :rules="obligatorioRules" 
                          v-model="productForm.min_stock"
                      ></v-text-field>
                      </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="mt-2 mr-2 font-weight-bold ">
                          Precio costo
                        </div>
                    </td>
                    <td>
                      <v-text-field 
                        outlined
                        hide-details=""
                        dense
                        color="#26547c"
                        type="number"
                        :rules="obligatorioRules" 
                        prefix="Q."
                        v-model="productForm.cost_price"
                      ></v-text-field>
                    </td> 
                    <td>
                      <div class="mt-2 mr-2 font-weight-bold">
                        Stock máximo
                      </div>  
                    </td>
                    <td>
                      <v-text-field 
                        type="number"
                        color="#26547c"
                        outlined
                        dense
                        hide-details
                        :rules="obligatorioRules" 
                        v-model="productForm.max_stock"
                      ></v-text-field>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="mt-2 mr-2 font-weight-bold  ">
                        Precio venta
                      </div> 
                    </td>
                    <td>
                      <v-text-field 
                        persistent-hint
                        required
                        color="#26547c"
                        outlined
                        hide-details=""
                        :rules="obligatorioRules" 
                        dense
                        type="number"
                        prefix="Q."
                        v-model="productForm.sale_price"
                      ></v-text-field> 
                    </td> 
                    <td>
                      <div class="mt-2 mr-2 font-weight-bold">
                        Código
                      </div>  
                    </td>
                    <td>
                      <v-text-field 
                        color="#26547c"
                        outlined
                        dense
                        hide-details
                        :rules="obligatorioRules" 
                        v-model="productForm.code"
                      ></v-text-field>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="mt-2 mr-2 font-weight-bold ">
                        Precio mayoreo
                      </div>  
                    </td>
                    <td>
                      <v-text-field 
                        hide-details
                        outlined
                        color="#26547c"
                        dense
                        :rules="obligatorioRules" 
                        type="number"
                        prefix="Q."
                        v-model="productForm.wholesale_price"
                    ></v-text-field>
                    </td> 
                    <td>
                      <div class="mt-2 mr-2 font-weight-bold ">
                        Presentación
                      </div>
                    </td>
                    <td>
                      <v-text-field 
                        color="#26547c"
                        outlined
                        dense
                        hide-details
                        :rules="obligatorioRules" 
                        v-model="productForm.filling"
                      ></v-text-field> 
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="mt-2 mr-2 font-weight-bold">
                        Categoría
                      </div>
                    </td>
                    <td>
                      <v-row>
                        <v-select
                          class="mr-3 ml-3 "
                          :items="categories"
                          item-text="name"
                          @change="selectText"
                          return-object
                          hide-details
                          :disabled="readOnly" 
                          required
                          color="#26547c"
                          outlined
                          :rules="obligatorioRules" 
                          dense
                          readonly
                          v-model="categoryName"
                        ></v-select>
                        <div class=" ">
                          <v-btn
                            @click="dialog2 = true"  
                            elevation="0" 
                            outlined
                            small
                            disabled
                            color="#26547c"
                          >
                            <v-icon dark> mdi-plus </v-icon>
                          </v-btn>
                        </div>
                      </v-row>
                    </td> 
                  </tr>  
                </table> 
              </v-form>  
            </div>
          <v-card outlined class="pa-3 mt-6" color="grey lighten-4">
            <v-card-actions>
              <v-spacer></v-spacer> 
              <v-btn @click="(showSearcher = true, showForm = false), clearPForm()" class="ma-2" elevation="0" color="grey" dark>
                Cancelar
              </v-btn>
              <v-btn 
                color="#2ec4b6"
                dark
                min-width="200"
                elevation="0"
                @click="patchProductByForm()"
              >
                <v-icon dark class="mr-3"> mdi-check </v-icon>
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card> 

        </div>
        <div class="child" v-if="showSearcher"> 
          <v-card> 
              <v-card-text>  
                <p class="text-h4 text-center text--primary">
                  Modificar producto
                </p> 
                <div class="text--primary center mr-5 ml-5"> 
                  <v-text-field 
                    color="grey" 
                    class=""  
                    prepend-inner-icon="mdi-barcode-scan" 
                    autofocus 
                    outlined 
                    clearable 
                    v-model="search"
                    v-on:keyup.enter="searchArray"
                    dense 
                    label="Buscar producto">
                  </v-text-field> 
                </div>
              </v-card-text> 
              <v-row justify="center" class="mb-5">
              <v-card-actions> 
                <v-btn 
                  color="#2ec4b6"
                  dark
                  min-width="200"
                  elevation="0"
                  @click="searchItem()" 
                >
                  <v-icon dark class="mr-3"> mdi-check </v-icon>
                  Aceptar
                </v-btn>
              </v-card-actions>
                </v-row>
              
            </v-card> 
          </div>
        </v-tab-item>
        <v-tab-item> 
            <div v-if="showDataTable">
              <v-data-table 
                  :headers="headersSProducts"
                  :items="log" 
                  class="elevation-1"
                  :items-per-page="10"
                  :footer-props="{ 'items-per-page-text':'Productos por página'}"
                >
                  <template v-slot:item="row"> 
                    <tr>
                      <td class="text-left font-weight-medium">{{row.item.code}} </td> 
                      <td class="text-left font-weight-medium">{{row.item.name}} - {{row.item.filling }}</td>
                      <td class="text-center font-weight-medium">{{row.item.product_category.name}}</td>
                      <td class="text-center font-weight-medium">{{row.item.cost_price }}</td>
                      <td class="text-center font-weight-medium">{{row.item.sale_price}} GTQ</td>
                      <td class="text-center green--text font-weight-medium">{{row.item.wholesale_price}} GTQ</td>
                      <td class="text-center font-weight-medium">
                        <v-card class="ma-2 pa-1 rounded-card" outlined dark :color="row.item.stock < 1 ? '#ff312e' : row.item.stock <= 10 ? 'orange' : '#66ad2d' " text-color="white" > 
                          <div class="text-center center-text">{{fixStock(row.item.stock)}}</div> 
                        </v-card>
                      </td>
                      <td class="text-center font-weight-medium">{{ row.item.stock }}</td>
                      <td class="text-center">
                        <v-btn
                          class="mx-2"
                          dark
                          x-small
                          elevation="0"
                          color="#26547c" 
                          @click="readOnly = true, productPatchForm = true, getProduct(row.item.id)"
                        >
                          <v-icon small dark> mdi-pencil </v-icon>
                        </v-btn>
                        <v-btn
                          class="mx-2"
                          dark
                          x-small
                          elevation="0"
                          color="red accent-3" 
                          @click="deleteProductAlert(row.item.id)"
                        >
                          <v-icon small dark> mdi-trash-can </v-icon>
                        </v-btn>
                      </td> 
                    </tr>
                </template>            
              </v-data-table> 
              <v-card outlined class="pa-3 mt-6" color="grey lighten-4">
                <v-card-actions>
                  <v-spacer></v-spacer> 
                  <v-btn @click="(showSearcher = true, showDataTable = false), clearPForm()" class="ma-2" elevation="0" color="grey" dark>
                    Cancelar
                  </v-btn> 
                </v-card-actions>
              </v-card> 
            </div>
              <div v-if="showForm"> 
                <v-card-title>
                  <div class="title">Eliminar producto</div>
                </v-card-title> 
                <v-divider></v-divider> 
                <div>
                  <v-form ref="productForm" class="mt-3"> 
                    <table>
                      <tr>
                          <td>
                            <div class="mt-2 mr-2 font-weight-bold ">
                              Código de barras
                            </div> 
                          </td>
                          <td>
                            <v-text-field  
                              hide-details
                              readonly
                              prepend-inner-icon="mdi-barcode-scan" 
                              color="#26547c"
                              required
                              outlined
                              dense
                              :rules="obligatorioRules" 
                              @keydown.enter="submit"
                              v-model="productForm.barcode"
                            ></v-text-field>
                          </td>
                          <td>
                            <div class="mt-2 font-weight-bold   ">
                              Stock 
                            </div>  
                          </td>
                          <td> 
                            <v-text-field 
                              type="number"
                              color="#26547c"
                              readonly
                              outlined
                              hide-details
                              dense
                              :rules="obligatorioRules" 
                              v-model="productForm.stock"
                            ></v-text-field>
                          </td>   
                        </tr>
                        <tr>
                          <td>
                            <div class="mt-2 mr-2 font-weight-bold ">
                              Descripción
                            </div>
                            
                            </td>
                          <td>
                            <v-text-field 
                              hide-details
                              required
                              readonly
                              outlined
                              dense
                              color="#26547c"
                              v-model="productForm.name"
                              :rules="obligatorioRules" 
                            ></v-text-field> 
                          </td> 
                          <td>
                            <div class="mt-2 mr-2 font-weight-bold">
                              Stock mínimo
                            </div>  
                          </td>
                          <td>
                            <v-text-field 
                              type="number"
                              color="#26547c"
                              readonly
                              outlined
                              dense
                              hide-details
                              :rules="obligatorioRules" 
                              v-model="productForm.min_stock"
                          ></v-text-field>
                          </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="mt-2 mr-2 font-weight-bold ">
                              Precio costo
                            </div>
                        </td>
                        <td>
                          <v-text-field 
                            outlined
                            hide-details=""
                            dense
                            readonly
                            color="#26547c"
                            type="number"
                            :rules="obligatorioRules" 
                            prefix="Q."
                            v-model="productForm.cost_price"
                          ></v-text-field>
                        </td> 
                        <td>
                          <div class="mt-2 mr-2 font-weight-bold">
                            Stock máximo
                          </div>  
                        </td>
                        <td>
                          <v-text-field 
                            type="number"
                            color="#26547c"
                            readonly
                            outlined
                            dense
                            hide-details
                            :rules="obligatorioRules" 
                            v-model="productForm.max_stock"
                          ></v-text-field>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="mt-2 mr-2 font-weight-bold  ">
                            Precio venta
                          </div> 
                        </td>
                        <td>
                          <v-text-field 
                            persistent-hint
                            required
                            color="#26547c"
                            outlined
                            readonly
                            hide-details=""
                            :rules="obligatorioRules" 
                            dense
                            type="number"
                            prefix="Q."
                            v-model="productForm.sale_price"
                          ></v-text-field> 
                        </td> 
                        <td>
                          <div class="mt-2 mr-2 font-weight-bold">
                            Código
                          </div>  
                        </td>
                        <td>
                          <v-text-field 
                            color="#26547c"
                            outlined
                            dense
                            readonly
                            hide-details
                            :rules="obligatorioRules" 
                            v-model="productForm.code"
                          ></v-text-field>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="mt-2 mr-2 font-weight-bold ">
                            Precio mayoreo
                          </div>  
                        </td>
                        <td>
                          <v-text-field 
                            hide-details
                            outlined
                            readonly
                            color="#26547c"
                            dense
                            :rules="obligatorioRules" 
                            type="number"
                            prefix="Q."
                            v-model="productForm.wholesale_price"
                        ></v-text-field>
                        </td> 
                        <td>
                          <div class="mt-2 mr-2 font-weight-bold ">
                            Presentación
                          </div>
                        </td>
                        <td>
                          <v-text-field 
                            color="#26547c"
                            outlined
                            readonly
                            dense
                            hide-details
                            :rules="obligatorioRules" 
                            v-model="productForm.filling"
                          ></v-text-field> 
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="mt-2 mr-2 font-weight-bold">
                            Categoría
                          </div>
                        </td>
                        <td>
                          <v-row>
                            <v-select
                              class="mr-3 ml-3 "
                              :items="categories"
                              item-text="name"
                              @change="selectText"
                              return-object
                              hide-details
                              :disabled="readOnly" 
                              required
                              color="#26547c"
                              outlined
                              :rules="obligatorioRules" 
                              dense
                              readonly
                              v-model="categoryName"
                            ></v-select>
                            <div class=" ">
                              <v-btn
                                @click="dialog2 = true"  
                                elevation="0" 
                                outlined
                                small
                                disabled
                                color="#26547c"
                              >
                                <v-icon dark> mdi-plus </v-icon>
                              </v-btn>
                            </div>
                          </v-row>
                        </td> 
                      </tr>  
                    </table> 
                  </v-form>  
                </div>
              <v-card outlined class="pa-3 mt-6" color="grey lighten-4">
                <v-card-actions>
                  <v-spacer></v-spacer> 
                  <v-btn @click="(showSearcher = true, showForm = false), clearPForm()" class="ma-2" elevation="0" color="grey" dark>
                    Cancelar
                  </v-btn>
                  <v-btn 
                    color="#2ec4b6"
                    dark
                    min-width="200"
                    elevation="0"
                    @click="deleteProductAlert(productForm.id)"
                  >
                    <v-icon dark class="mr-3"> mdi-check </v-icon>
                    Eliminar
                  </v-btn>
                </v-card-actions>
              </v-card> 

            </div>
            <div class="child" v-if="showSearcher"> 
              <v-card> 
                  <v-card-text>  
                    <p class="text-h4 text-center text--primary">
                      Eliminar producto
                    </p> 
                    <div class="text--primary center mr-5 ml-5"> 
                      <v-text-field 
                        color="grey" 
                        class=""  
                        prepend-inner-icon="mdi-barcode-scan" 
                        autofocus 
                        outlined 
                        clearable 
                        v-model="search"
                        v-on:keyup.enter="searchArray"
                        dense 
                        label="Buscar producto">
                      </v-text-field> 
                    </div>
                  </v-card-text> 
                  <v-row justify="center" class="mb-5">
                  <v-card-actions> 
                  <v-btn 
                    color="#2ec4b6"
                    dark
                    min-width="200"
                    elevation="0"
                    @click="searchItem()" 
                  >
                    <v-icon dark class="mr-3"> mdi-check </v-icon>
                    Aceptar
                  </v-btn>
                </v-card-actions>
                  </v-row>
                
              </v-card> 
              </div>
        </v-tab-item>
        <v-tab-item>  
          <v-row justify="start">
            <v-col md="4">
              <v-card class="pa-0"  outlined tile>
                <v-card-text>
                  <div class="font-weight-medium blue--text subtitle-1">
                    <v-icon color="blue">
                      mdi-cogs
                    </v-icon>
                    Ajustar inventario
                  </div>
                </v-card-text>
              </v-card> 
            </v-col>
          </v-row> 

          <v-row justify="space-around">
            <v-col md="4">
              <div class="text--primary center mt-2"> 
                <v-text-field 
                  color="grey" 
                  class=""  
                  prepend-inner-icon="mdi-barcode-scan" 
                  autofocus 
                  outlined 
                  clearable 
                  v-model="search"
                  v-on:keyup.enter="searchArrayForSetting"
                  dense 
                  label="Buscar producto">
                </v-text-field> 
              </div>
            </v-col>
            <v-col md="4">
              <div class="font-weight-bold">
                Producto al que se le hará el ajuste
              </div>
              <div class="text--primary center"> 
                <v-text-field 
                  color="grey" 
                  class=""  
                  prepend-inner-icon="mdi-barcode-scan" 
                  autofocus 
                  outlined 
                  clearable 
                  v-model="search2"
                  v-on:keyup.enter="searchArrayForSetting2"
                  dense 
                  label="Buscar producto">
                </v-text-field> 
              </div>
            </v-col>
          </v-row>
          <v-row justify="space-around"> 
            <v-col md="6" v-if="showsettingForm">
              <table>  
                <tr>
                  <td class="text-left black--text subtitle-1 font-weight-bold"> Descripción </td>
                  <td class="text-right grey--text subtitle-1 font-weight-bold">{{productForm.name}}</td>
                </tr>
                <tr>
                  <td class="text-left black--text subtitle-1 font-weight-bold"> Código </td>
                  <td class="text-right grey--text subtitle-1 font-weight-bold">{{productForm.code}}</td>
                </tr>
                <tr>
                  <td class="text-left black--text subtitle-1 font-weight-bold"> Stock actual </td>
                  <td class="text-right grey--text subtitle-1 font-weight-bold">{{productForm.stock}}</td>
                </tr>
                <tr>
                  <td class="text-left black--text subtitle-1 font-weight-bold">-</td>
                  <td class="text-right grey--text subtitle-1"> 
                    <v-text-field 
                      hide-details
                      color="grey" 
                      class=""   
                      v-model.number="quantySetting"  
                      dense
                      regular
                      @keyup="restDiference2" 
                      label="Ingrese cantidad para el ajuste"
                    >
                    </v-text-field>   
                  </td>
                </tr> 
                <tr>
                  <td class="text-left black--text subtitle-1 font-weight-bold">Nuevo stock</td>
                  <td class="text-right grey--text subtitle-1 font-weight-bold"> {{exchange2}}</td>
                </tr> 
                
              </table> 
              <v-row class="mt-5" justify="start">
                <v-btn
                  depressed
                  color="#26547c"
                  dark
                  @click="selectProductsForSetting()"
                >
                <v-icon 
                  left
                >
                  mdi-plus
                </v-icon>
                  Guardar y agregar nuevo
                </v-btn>
              </v-row>
              <div class="mt-10 ">
                <v-slide-group
                  v-model="model"
                  active-class="success"
                  show-arrows
                >
                <v-slide-item v-for="(item, index) in selectedProductForSetting"  v-bind:key="index">
                  <v-chip 
                    class="ma-2"
                    close 
                    color="#26547c"
                    label
                    @click:close="removeProd(item.id)"
                    outlined
                  >
                    <div>
                      {{item.name }}  (-{{ item.quant}}) 
                    </div>
                  </v-chip>  
                </v-slide-item>
              </v-slide-group>

              </div>
            </v-col>

            <v-col md="4"  v-if="showsettingForm">
              <table>  
                <tr>
                  <td class="text-left green--text subtitle-1 font-weight-bold"> Descripción </td>
                  <td class="text-right green--text subtitle-1 font-weight-bold">{{descNewSetProduct}}</td>
                </tr>
                <tr>
                  <td class="text-left green--text subtitle-1 font-weight-bold"> Código </td>
                  <td class="text-right green--text subtitle-1 font-weight-bold">{{codeNewSetProduct}}</td>
                </tr>
                <tr>
                  <td class="text-left green--text subtitle-1 font-weight-bold"> Stock actual </td>
                  <td class="text-right green--text subtitle-1 font-weight-bold">{{stockNewSetProduct}}</td>
                </tr>   
                
              </table> 
              
              <div v-if="showsettingForm2" class="ma-5 mt-10">
                <v-row justify="end">
                  <v-btn
                    depressed
                    color="#26547c"
                    dark
                    @click="checkSecodnProduct()"
                  >
                  <v-icon 
                    left
                  >
                    mdi-check
                  </v-icon>
                    Guardar ajuste
                  </v-btn>
                </v-row>
                
              </div>
            </v-col> 
          </v-row>

          
        </v-tab-item>
      </v-tabs-items> 
  <!-- <v-row justify="space-between" >   
    <v-text-field color="white" class="ml-5 mt-5 mr-15" style="margin-right: 525px !important;" dark autofocus outlined clearable v-model="search" dense label="Buscar producto"> 
    </v-text-field>  
    <v-btn elevation="0" class="mr-10 mt-5" style="color: #26547c;" @click="newProduct()" color="white" dark>
      Agregar
    </v-btn> 
  </v-row>  --> 
      
     </div>
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
  components: { },
  data() {
    return {
      columns : [
        {
            label: "Código",
            field: "code",
        },
        {
            label: "Nombre",
            field: "name", 
        },
        {
            label: "Categoría",
            field: "product_category.name",
        },
        {
            label: "Costo",
            field: "cost_price",
            dataFormat: this.priceFormat
        },
        {
            label: "Precio Venta",
            field: "sale_price",
            dataFormat: this.priceFormat

        },
         {
            label: "Precio Mayoreo",
            field: "wholesale_price",
            dataFormat: this.priceFormat
        },
         {
            label: "Existencia",
            field: "stock",
        },
         {
            label: "Inv. Mínimo",
            field: "min_stock",
        },
         {
            label: "Inv. Máximo",
            field: "max_stock",
        }
      ], 
      json_monitoring: {
        Código: "code",
        Nombre: "name",
        Categoría: {
          field: "product_category",
          callback: (value) => {
            return `${value.name}`;
          },
        },
        Costo: "cost_price",
        PVenta: "sale_price",
        PMayoreo: "wholesale_price",  
        Existencia: "stock",
        InvMínimo: "min_stock",
        InvMáximo: "max_stock",

      },
      catId: "",
      showForm: false,
      showSearcher: true,
      showDataTable: false,
      searchProduct: '',
      log: [],
      bid: "",
      tab: null,
        items: [
          'web', 'shopping', 'videos', 'images', 'news',
        ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      obligatorioRules: [(v) => !!v || "Campo obligatorio"],
      search: "",
      search2: "",

      productFormDialog: false,
      productPatchForm: false,

      dialog2: false,
      dialog3: false,
      dialog4: false,
      dialogForm: false,
      productForm: {
        id: "",
        name: "",
        barcode: "",
        stock: null,
        min_stock: null,
        max_stock: null,
        cost_price: null,
        sale_price: null,
        wholesale_price: null,
        type_of_sale: "Unidad",
        sell_by_date: "", 
        code: "",
        filling: "",
        product_category: null, 
        branch_office: this.bid
      },

      categoryProductForm: {
        name: "",
        branch_office: ""
      },

      codeProductForm: {
        code: "",
      },

      supplierProductForm: {
        supplier_name: "",
        phone: "",
      },

      categories: [],
      codes: [],
      suppliers: [],
      suplierName: "Proveedor*",
      codeName: "Presentación*",
      categoryName: "Categoría*",
      headersSProducts: [
        {
          text: 'Código',
          align: 'left',
          sortable: false,
          value: 'description',
        },
        {
          text: 'Nombre',
          align: 'left',
          sortable: false,
          value: 'description',
        },
   
        { 
          text: 'Categoría',
          align: 'center',
          sortable: false,
          value: 'date' 
        }, 
         { 
          text: 'Costo',
          align: 'center',
          sortable: false,
          value: 'date' 
        },
        { 
          text: 'P. Venta',
          align: 'center',
          sortable: false,
          value: 'date' 
        }, 
        { 
          text: 'P. Mayoreo',
          align: 'center',
          sortable: false,
          value: 'date' 
        }, 
        {
          text: 'Stock',
          align: 'center',

        },
        { 
          text: 'Existencia',
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

      //vars to get product
      listOfProducts: [],
      loading: true,
      errored: false,
      readOnly: false,
      showsettingForm: false,
      quantySetting: null,
      exchange2: "",
      idNewSetProduct: null,
      descNewSetProduct: "",
      stockNewSetProduct: "",
      newStockSetProduct: "",
      codeNewSetProduct: "",
      showsettingForm2: false,
      selectedProductForSetting: [],
      selectedProductObj: {},
      model: null,
    };
  },


computed: {
    filteredData() {
       
      if (this.searchProduct) { 
        return this.listOfProducts.filter((item) => { 
          return Object.values(item).some((val) =>
            String(val).toLowerCase().includes(this.searchProduct)
          );
        })   
      } else {
        return this.listOfProducts;
      } 
    },
  },
   watch: {
    dialogForm(val) {
      if (!val) return;
      setTimeout(() => (this.dialogForm = false), 4000);
    },
  },

  created() {

    this.bid = localStorage.getItem('bo');
    this.categoryProductForm.branch_office = this.bid;
    this.getCategories();  
    this.getProducts();
  },

  methods: { 

    checkSecodnProduct(){
      if (this.idNewSetProduct == null) {
        let timerInterval; 
        this.$swal.fire( {
          icon: 'error',
          title: 'Ajuste',
          text: '¡Debes buscar el producto a ajustar!',
          confirmButtonText: 'Aceptar',
          showClass: {
          popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
          popup: 'animate__animated animate__fadeOutUp', 
          }, 
          timer: 3000,
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
        this.dialogForm = true; 
        this.saveSettingProduct();
      }
      
    },

    removeProd(id){
      const indexOfObject = this.selectedProductForSetting.findIndex(object => {
          return object.id === id;
        }); 
        this.selectedProductForSetting.splice(indexOfObject, 1); 
        console.log(this.selectedProductForSetting, " pushing other");

    },

    selectProductsForSetting(){
      const detailProduct = {
        id: this.productForm.id,
        name: this.productForm.name,
        stock: this.productForm.stock,
        code: this.productForm.code,
        quant: this.quantySetting,
      }

      var obj = {};

      obj["id"] = detailProduct.id;
      obj["name"] = detailProduct.name;
      obj["stock"] = detailProduct.stock;
      obj["code"] = detailProduct.code; 
      obj["quant"] = detailProduct.quant; 


      this.selectedProductForSetting.push(obj);
      console.log(this.selectedProductForSetting, " pushing other");

      this.showsettingForm2 = true;
      this.productForm.id = "";
      this.productForm.name = "";
      this.productForm.stock = "";
      this.productForm.code = "";
      this.quantySetting = "";
      this.exchange2 = "";
      this.search = ""


    },

    saveSettingProduct(){
      let timerInterval; 
      let headers = { "Content-Type": "application/json;charset=utf-8" };

      for (let index = 0; index < this.selectedProductForSetting.length; index++) {
        axios.patch(`${API}api/sales/product/${this.selectedProductForSetting[index].id}/`, {
          "stock": this.selectedProductForSetting[index].stock - this.selectedProductForSetting[index].quant
        }, {headers}).then((r)=>{
          console.log(r.data, " for patching");
        }).catch((e)=>{
          return e;
        })
      }

      axios.patch(`${API}api/sales/product/${this.idNewSetProduct}/`, {
          "stock": this.stockNewSetProduct + 1,
        },{headers}).then((re)=>{
          this.showsettingForm = false;
          this.$swal.fire({
            title: 'Ajuste de producto',
            text: "¡Se ha realizado el ajuste correctamente!",
            icon: 'success', 
            timer: 3000,
            timerProgressBar: true,
            didOpen: () => {
              this.$swal.showLoading() 
            },
            willClose: () => {
              clearInterval(timerInterval); 
              this.bonusCash = "";
          } 
          }).then((result) => {
            this.getProducts();  
            this.listOfProducts.reverse();  
            this.productForm.id = "";
            this.productForm.name = "";
            this.productForm.stock = "";
            this.productForm.code = "";
            this.quantySetting = "";
            this.exchange2 = "";
            this.search = "";
            return result; 
          });
          return re.data;
          
        }).catch((e)=>{
          return e;
        })
 
    },
    
    restDiference2(){
      this.exchange2 = this.productForm.stock - this.quantySetting;
      return this.exchange2.toFixed(2);
    },

  clearPForm(){
    this.productForm.name = "";
    this.productForm.barcode = "";
    this.productForm.stock = null;
    this.productForm.cost_price = null;
    this.productForm.sale_price = null;
    this.productForm.wholesale_price = null;
    this.productForm.sell_by_date = "";
    this.productForm.branch_office = this.bid; 
    this.productForm.sell_by_date = "";
    this.productForm.filling = "";
    this.productForm.code = "";
    this.productForm.min_stock = null;
    this.productForm.max_stock = null;
  },

  priceFormat(value){
    return 'Q ' + value;
  },


  selectCategory(c){ 
    let headers = { "Content-Type": "application/json;charset=utf-8" };
    this.catId = c.id
    if (this.catId) {
      axios.get(`${API}api/sales/category-p/${this.catId}`,{headers}).then((response)=>{
      this.listOfProducts = response.data.list_products
      this.listOfProducts.reverse();
       return this.listOfProducts;

      }).catch((e)=>{
        return e;
      })
    } else {
      return this.getProducts();
    }

  }, 
 
  searchArray(e) {
    e.preventDefault();
    let filtered = [];
    const input = e.target.value.toLowerCase();
    if (input || this.search) {  
      filtered = this.listOfProducts.filter((el) => {
        return Object.values(el).some((val) =>
          String(val).toLowerCase().includes(input)
        );
      });

      this.log = filtered;
      switch (this.log.length) {
        case 0:
          this.$swal.fire({
            title: 'Modificar producto',
            text: "¡Producto no encontrado!",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar' 
          })
        break;

        case 1: 
          this.showSearcher = false;
          this.showForm = true;  
          this.productForm.id =  this.log[0].id; 
          this.productForm.name = this.log[0].name;
          this.productForm.barcode = this.log[0].barcode;
          this.productForm.stock = this.log[0].stock;
          this.productForm.cost_price = this.log[0].cost_price;
          this.productForm.sale_price = this.log[0].sale_price;
          this.productForm.wholesale_price = this.log[0].wholesale_price;
          this.productForm.sell_by_date = this.log[0].sell_by_date;
          this.productForm.branch_office = this.log[0].branch_office; 
          this.productForm.sell_by_date = this.log[0].sell_by_date;
          this.productForm.filling = this.log[0].filling;
          this.productForm.code =this.log[0].code;
          this.productForm.min_stock = this.log[0].min_stock;
          this.productForm.max_stock = this.log[0].max_stock;
          this.productForm.product_category = this.log[0].product_category.id;
          this.categoryName = this.log[0].product_category.name;
 
        break;
      
        default:
          break;
      }
      if (this.log.length > 1) {
        this.showSearcher = false;
        this.showForm = false;
        this.showDataTable = true;
      }  

    } 
},


searchArrayForSetting(e) {
    e.preventDefault();
    let filtered = [];
    const input = e.target.value.toLowerCase();
    if (input || this.search) {  
      filtered = this.listOfProducts.filter((el) => {
        return Object.values(el).some((val) =>
          String(val).toLowerCase().includes(input)
        );
      });

      this.log = filtered;
      let timerInterval; 
      switch (this.log.length) {
        case 0:
          this.$swal.fire({
            title: 'Ajuste de producto',
            text: "¡Producto no encontrado!",
            icon: 'warning', 
            timer: 3000,
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
        break;

        case 1: 
          this.showsettingForm = true; 
          this.productForm.id =  this.log[0].id; 
          this.productForm.name = this.log[0].name;
          this.productForm.barcode = this.log[0].barcode;
          this.productForm.stock = this.log[0].stock;
          this.productForm.cost_price = this.log[0].cost_price;
          this.productForm.sale_price = this.log[0].sale_price;
          this.productForm.wholesale_price = this.log[0].wholesale_price;
          this.productForm.sell_by_date = this.log[0].sell_by_date;
          this.productForm.branch_office = this.log[0].branch_office; 
          this.productForm.sell_by_date = this.log[0].sell_by_date;
          this.productForm.filling = this.log[0].filling;
          this.productForm.code =this.log[0].code;
          this.productForm.min_stock = this.log[0].min_stock;
          this.productForm.max_stock = this.log[0].max_stock;
          this.productForm.product_category = this.log[0].product_category.id;
          this.categoryName = this.log[0].product_category.name; 

        break;
      
        default:
          break;
      }
 

    } 
},

searchArrayForSetting2(e) { 
    e.preventDefault();
    let filtered = [];
    const input = e.target.value.toLowerCase();
    if (input || this.search2) {  
      filtered = this.listOfProducts.filter((el) => {
        return Object.values(el).some((val) =>
          String(val).toLowerCase().includes(input)
        );
      });

      this.log = filtered;
      let timerInterval; 
      switch (this.log.length) {
        case 0:
          this.$swal.fire({
            title: 'Ajuste de producto',
            text: "¡Producto no encontrado!",
            icon: 'warning', 
            timer: 3000,
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
        break;

        case 1: 
          this.idNewSetProduct =  this.log[0].id; 
          this.descNewSetProduct = this.log[0].name; 
          this.codeNewSetProduct = this.log[0].code; 
          this.stockNewSetProduct = this.log[0].stock;  

        break;
      
        default:
          break;
      }
 

    } 
},




 searchItem() {
  let filtered = [];
  if (this.search) { 
    filtered = this.listOfProducts.filter((el) => {
      return Object.values(el).some((val) =>
        String(val).toLowerCase().includes(this.search)
      );
    });

    this.log = filtered;
      switch (this.log.length) {
      case 0:
        this.$swal.fire({
          title: 'Modificar producto',
          text: "¡Producto no encontrado!",
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar' 
        })
      break;

      case 1: 
        this.showSearcher = false;
        this.showForm = true;  
        this.productForm.id =  this.log[0].id; 
        this.productForm.name = this.log[0].name;
        this.productForm.barcode = this.log[0].barcode;
        this.productForm.stock = this.log[0].stock;
        this.productForm.cost_price = this.log[0].cost_price;
        this.productForm.sale_price = this.log[0].sale_price;
        this.productForm.wholesale_price = this.log[0].wholesale_price;
        this.productForm.sell_by_date = this.log[0].sell_by_date;
        this.productForm.branch_office = this.log[0].branch_office; 
        this.productForm.sell_by_date = this.log[0].sell_by_date;
        this.productForm.filling = this.log[0].filling;
        this.productForm.code =this.log[0].code;
        this.productForm.min_stock = this.log[0].min_stock;
        this.productForm.max_stock = this.log[0].max_stock;
        this.productForm.product_category = this.log[0].product_category.id;
        this.categoryName = this.log[0].product_category.name; 

      break;
    
      default:
        break;
    }
    if (this.log.length > 1) {
      this.showSearcher = false;
      this.showForm = false;
      this.showDataTable = true;
    }  
  } 
},

    submit(event) {
      event.preventDefault(); 
    },

    submitCategoryProductForm() {
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios
        .post(
          `${API}api/sales/product-category/create/`,
          this.categoryProductForm,
          { headers }
        )
        .then((response) => {
          this.getCategories();
          this.productForm.product_category = response.data["id"]; 
          this.categoryName = response.data["name"];
          this.categoryProductForm.name = "";
          this.dialog2 = false;
        })
        .catch((error) => {
          return error;
        });
    },

    getCategories() {
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios
        .get(`${API}api/sales/branch-office-cat/${this.bid}`, { headers })
        .then((response) => {
          this.categories = response.data.list_categories; 

          this.categories.reverse();
        });
    },

    selectText(pcat) {
      this.productForm.product_category = pcat.id; 
      this.categoryName = pcat.name;
    },
 
    submitProductForm( ) {    
      if ( this.productForm.product_category == null ) {
        this.$swal.fire({
          title: 'Formulario',
          text: "¡Debes seleccionar: Categoría!",
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar' 
        }) 
      } else if (this.$refs.productForm.validate()) { 
      this.dialogForm = true
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios
        .post(`${API}api/sales/product/create/`, this.productForm, { headers })
        .then((response) => {
          this.productForm.name = "";
          this.productForm.barcode = "";
          this.productForm.stock = null;
          this.productForm.cost_price = null;
          this.productForm.sale_price = null;
          this.productForm.wholesale_price = null;
          this.productForm.sell_by_date = "";
          this.productForm.branch_office = this.bid; 
          this.productForm.sell_by_date = "";
          this.productForm.filling = "";
          this.productForm.code = "";
          this.productForm.min_stock = null;
          this.productForm.max_stock = null;
          this.categoryName = "Categoría*";
          setTimeout(() => ( (this.productFormDialog = false)), 4000 );
          setTimeout(() => this.notifyVue("top", "right"), 5000); 
          this.getProducts();
          this.$refs.productForm.reset();
          return response.data;
        })
        .catch((error) => {
          return error
        });
      } if (this.productForm.product_category == null) {
        this.$swal.fire({
          title: 'Formulario',
          text: "¡Debes seleccionar: Categoría!",
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar' 
        }) 
        
      }
    },

    getProducts() {
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios
        .get(`${API}api/sales/branch-office-cat/${this.bid}/`, { headers })
        .then(( response ) => {
          this.listOfProducts = response.data.list_products; 
          this.listOfProducts.reverse();  
        })
        .catch((error) => { 
          this.errored = true;
        }).finally(() => this.loading = false);
         
    },

    getProduct(id){
      
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios.get(`${API}api/sales/product-get/${id}/`, { headers }).then((res) => { 
          this.productForm.id = res.data.id;
          this.productForm.name = res.data.name;
          this.productForm.barcode = res.data.barcode;
          this.productForm.stock = res.data.stock;
          this.productForm.cost_price = res.data.cost_price;
          this.productForm.sale_price = res.data.sale_price;
          this.productForm.wholesale_price = res.data.wholesale_price;
          this.productForm.sell_by_date = res.data.sell_by_date;
          this.productForm.branch_office = res.data.branch_office; 
          this.productForm.sell_by_date = res.data.sell_by_date;
          this.productForm.filling = res.data.filling;
          this.productForm.code =res.data.code;
          this.productForm.min_stock = res.data.min_stock;
          this.productForm.max_stock = res.data.max_stock;
          this.productForm.product_category = res.data.product_category.id;
          this.categoryName = res.data.product_category.name;   
      })
    },

    newProduct(){
      this.readOnly = false; 
      this.productFormDialog = true;
      this.productForm.id = "";
      this.productForm.name = "";
      this.productForm.stock = "";
      this.productForm.cost_price = "";
      this.productForm.sale_price ="";
      this.productForm.wholesale_price = ""; 
      this.productForm.barcode = "";
      this.productForm.sell_by_date = ""; 
    },

    patchProduct(){ 
      let headers = { "Content-Type": "application/json;charset=utf-8" }; 
      axios
        .patch(`${API}api/sales/product/${this.productForm.id}/`, this.productForm,{ headers },)
        .then((response) => { 
          this.productForm.name = "";
          this.productForm.barcode = "";
          this.productForm.stock = null;
          this.productForm.cost_price = null;
          this.productForm.sale_price = null;
          this.productForm.wholesale_price = null;
          this.productForm.sell_by_date = "";
          this.productForm.branch_office = this.bid; 
          this.productForm.sell_by_date = "";
          this.productForm.filling = "";
          this.productForm.code = "";
          this.productForm.min_stock = null;
          this.productForm.max_stock = null;
          this.suplierName = "Proveedor*";
          this.codeName = "Código*";
          this.categoryName = "Categoría*";
          setTimeout(() => ( (this.productPatchForm = false)), 4000 );
          setTimeout(() => this.notifyVue("top", "right"), 5000);
          this.$notify({
            message: "¡Se ha guardado el producto! ",
            
            horizontalAlign: horizontalAlign,
            verticalAlign: verticalAlign,
            type: "success",
          });
          this.getProducts();
          return response.data;
        })
        .catch((error) => {
          return error;
        });
    },
    
    patchProductByForm(){ 
      let headers = { "Content-Type": "application/json;charset=utf-8" };

      axios
        .patch(`${API}api/sales/product/${this.productForm.id}/`, this.productForm,{ headers },)
        .then((response) => { 
          this.productForm.name = "";
          this.productForm.barcode = "";
          this.productForm.stock = null;
          this.productForm.cost_price = null;
          this.productForm.sale_price = null;
          this.productForm.wholesale_price = null;
          this.productForm.sell_by_date = "";
          this.productForm.branch_office = this.bid; 
          this.productForm.sell_by_date = "";
          this.productForm.filling = "";
          this.productForm.code = "";
          this.productForm.min_stock = null;
          this.productForm.max_stock = null;
          this.suplierName = "Proveedor*";
          this.codeName = "Código*";
          this.categoryName = "Categoría*";
          setTimeout(() => ( (this.productPatchForm = false)), 4000 ); 
          this.$notify({
            message: "¡Se ha guardado el producto! ",
            
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: "success",
          });
          this.$refs.productForm.reset();
          this.showForm = false;
          this.showSearcher = true;
          this.showDataTable = false;
          this.search = "";
          this.getProducts();
          return response.data;
        })
        .catch((error) => {
          return error
        });
    },

    
    notifyVue(verticalAlign, horizontalAlign) {
      this.$notify({
        message: "¡Se ha registrado el producto! ",
        
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "success",
      });
    },

    notifyVue2(verticalAlign, horizontalAlign) {
      this.$notify({
        message: "¡Debes seleccionar: Categoría! ",
        
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "warning",
      });
    },

    deleteProductAlert(id){
      this.$swal.fire({
        title: '¿Deseas eliminar este producto?',
        text: "¡No podrás revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`${API}api/sales/product/delete/${id}/`).then((res) =>{

          this.showSearcher = true, 
          this.showForm = false,
          this.showDataTable = false;
          this.search = "",
          this.getProducts();

          this.$swal.fire(
            '¡Eliminado!',
            'El producto ha sido eliminado',
            'success', 
          ) 
            return res.data;
          })
         
        }
      })
    },

    fixStock(stock, stockmin){ 
      var stockN;
      if (stock < 1) {
        stockN = "Sin stock";
      } else if (stock <=stockmin) {
        stockN = "Bajo stock";
      } else {
        stockN = "En stock";
      }
      return stockN; 
    }

  },
};
</script>


<style>
.v-data-table-header th{
  text-transform: uppercase;
  font-size: 12px !important;
  border-collapse: collapse;
}

.v-data-table-header td{
  text-transform: uppercase;
  font-size: 11px !important;
  border-collapse: collapse;
}


.rounded-card {
  border-radius: 100px !important;
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
 

 

</style>