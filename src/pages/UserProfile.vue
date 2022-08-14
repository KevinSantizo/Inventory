<template>
  <div class=" ">
    <v-row justify="space-between" class="ma-4">  
      <div>
        <v-row justify="center"> 
          <v-dialog v-model="productPatchForm" persistent max-width="1200px"> 
            <v-card>
              <v-card-title>
                <span class="title">Editar producto</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-form ref="productForm">
                    <v-row >
                      <v-col cols="12" sm="4">
                        <v-text-field
                          label="Nombre del producto*"
                          required
                          outlined
                          dense
                          color="#26547c."
                          v-model="productForm.name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <v-text-field
                          label="Stock*"
                          type="number"
                          color="#26547c"
                          outlined
                          dense
                          v-model="productForm.stock"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <v-text-field
                          label="Código" 
                          color="#26547c"
                          outlined
                          dense
                          v-model="productForm.code"
                        ></v-text-field>
                      </v-col>  
                      <v-col cols="12" sm="6">
                        <v-row no-gutters>
                          <v-select
                            class="mr-2"
                            :items="categories"
                            item-text="name"
                            @change="selectText"
                            return-object
                            :disabled="readOnly"
                            :label="categoryName"
                            required
                            color="#26547c"
                            outlined
                            dense
                            v-model="categoryName"
                          ></v-select>
                          <div class=" ">
                            <v-btn
                              @click="dialog2 = true"
                              x-small
                              dark
                              fab
                              :disabled="readOnly"
                              color="green"
                            >
                              <v-icon dark> mdi-plus </v-icon>
                            </v-btn>
                          </div>
                        </v-row>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          label="Precio de compra*"
                          outlined
                          dense
                          color="#26547c"
                          type="number"
                          prefix="Q."
                          v-model="productForm.cost_price"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          label="Precio de venta*"
                          persistent-hint
                          required
                          color="#26547c"
                          outlined
                          dense
                          type="number"
                          prefix="Q."
                          v-model="productForm.sale_price"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field 
                          outlined
                          color="#26547c"
                          dense 
                          type="number"
                          prefix="Q."
                          v-model="productForm.wholesale_price"
                        ></v-text-field>
                      </v-col> 
                      <v-col cols="12" sm="6">
                        <v-text-field
                          :disabled="readOnly"
                          label="Código de barras*"
                          color="#26547c"
                          required
                          outlined
                          dense
                          @keydown.enter="submit"
                          v-model="productForm.barcode"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          label="Fecha de caducidad*"
                          type="date"
                          color="#26547c"
                          required
                          outlined
                          dense
                          v-model="productForm.sell_by_date"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>
              <v-card outlined class="pa-3" color="grey lighten-4">
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    elevation="0" color="grey" dark
                    @click="productPatchForm = false"
                  >
                    Cerrar
                  </v-btn>
                  <v-btn 
                    color="#26547c"
                    dark
                    elevation="0"
                    @click="( dialogForm = true ),patchProduct()"
                  >
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
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
  
        <v-card>
          <v-tabs 
            v-model="tab" 
            color="#26547c"
            align-with-title
          >
            <v-tabs-slider color="#26547c"></v-tabs-slider> 
            <v-tab ><v-icon class="mr-3"  >mdi-file-document-multiple-outline</v-icon>Nuevo</v-tab>
            <v-tab><v-icon class="mr-3" >mdi-shape-outline</v-icon>Categorías</v-tab>
            <v-tab><v-icon class="mr-3" >mdi-clipboard-text-multiple-outline</v-icon>Todos los productos</v-tab>
          </v-tabs>
        </v-card>
      <v-tabs-items v-model="tab" class="mt-3">
      <v-tab-item  > 
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
                      v-model="productForm.stock"
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
                    v-model="productForm.stock"
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
            @click="  submitProductForm()"
          >
            <v-icon dark class="mr-3"> mdi-check </v-icon>
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card> 
      </v-tab-item>
        <v-tab-item 
        >
          <v-card flat>
            <v-card-text v-text="text"></v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item 
        >
          <v-card flat>
            <v-card-text v-text="text"></v-card-text>
          </v-card>
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
  components: {},
  data() {
    return {
      bid: "",
      tab: null,
        items: [
          'web', 'shopping', 'videos', 'images', 'news',
        ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      obligatorioRules: [(v) => !!v || "Campo obligatorio"],
      search: null,
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
        minStock: null,
        maxStock: null,
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
          text: 'Precio de compra',
          align: 'center',
          sortable: false,
          value: 'date' 
        },
        { 
          text: 'Precio sugerido',
          align: 'center',
          sortable: false,
          value: 'date' 
        }, 
        { 
          text: 'Precio de mayoreo',
          align: 'center',
          sortable: false,
          value: 'date' 
        }, 
        {
          text: 'Estado de stock'
        },
        { 
          text: 'Stock',
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

    };
  },


computed: {
    filteredData() {
      if (this.search) {
        return this.listOfProducts.filter((item) => {
          return item.name.toLowerCase().includes(this.search.toLowerCase()) || item.barcode.toLowerCase().includes(this.search.toLowerCase())
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
    console.log(this.bid); 
    this.getCategories();  
    this.getProducts();
  },

  methods: {
    submit(event) {
      event.preventDefault();
      console.log(this.productForm.barcode);
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
          console.log(this.productForm.product_category, "category");
          this.categoryName = response.data["name"];
          this.categoryProductForm.name = "";
          this.dialog2 = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getCategories() {
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios
        .get(`${API}api/sales/product-category/`, { headers })
        .then((response) => {
          this.categories = response.data;
          this.categories.reverse();
        });
    },

    selectText(pcat) {
      this.productForm.product_category = pcat.id;
      console.log(this.productForm.product_category, "category");
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
          this.productForm.branch_office = 1;
          this.suplierName = "Proveedor*";
          this.codeName = "Código*";
          this.categoryName = "Categoría*";
          setTimeout(() => ( (this.productFormDialog = false)), 4000 );
          setTimeout(() => this.notifyVue("top", "right"), 5000);
          this.getProducts();
          this.$refs.productForm.reset();
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      } if (this.productForm.supplier == null || this.productForm.product_category == null || this.productForm.product_code == null) {
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
        .get(`${API}api/sales/product/`, { headers })
        .then(( response ) => {
          this.listOfProducts = response.data;
          this.listOfProducts.reverse();  
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        }).finally(() => this.loading = false);
         
    },

    getProduct(id){
      
      let headers = { "Content-Type": "application/json;charset=utf-8" };
      axios.get(`${API}api/sales/product-get/${id}/`, { headers }).then((res) => {
        console.log(res.data.id);
        this.productForm.id = res.data.id;
        this.productForm.name = res.data.name;
        this.productForm.stock = res.data.stock;
        this.productForm.cost_price = res.data.cost_price;
        this.productForm.sale_price = res.data.sale_price;
        this.productForm.wholesale_price = res.data.wholesale_price;
        this.productForm.barcode = res.data.barcode;
        this.productForm.supplier = res.data.supplier;
        this.productForm.product_category = res.data.product_category; 
        this.productForm.product_code = res.data.product_code; 
        console.log(this.productForm.id, "prd"); 
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
      axios
        .patch(`${API}api/sales/product/${this.productForm.id}/`,  {
          "name": this.productForm.name,
          "stock": this.productForm.stock,
          "cost_price": this.productForm.cost_price,
          "sale_price": this.productForm.sale_price,
          "wholesale_price": this.productForm.wholesale_price,
          "sell_by_date": this.productForm.sell_by_date
        },)
        .then((response) => {
          console.log(response.data, " patching");
          this.productForm.name = "";
          this.productForm.barcode = "";
          this.productForm.stock = null;
          this.productForm.cost_price = null;
          this.productForm.sale_price = null;
          this.productForm.wholesale_price = null;
          this.productForm.sell_by_date = "";
          this.productForm.branch_office = 1;
          this.suplierName = "Proveedor*";
          this.codeName = "Código*";
          this.categoryName = "Categoría*";
          setTimeout(() => ( (this.productPatchForm = false)), 4000 );
          setTimeout(() => this.notifyVue("top", "right"), 5000);
          this.getProducts();
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    notifyVue(verticalAlign, horizontalAlign) {
      this.$notify({
        message: "¡Se ha registrado el producto! ",
        icon: "check",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "success",
      });
    },

    notifyVue2(verticalAlign, horizontalAlign) {
      this.$notify({
        message: "¡Debes seleccionar: Categoría! ",
        icon: "check",
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
          this.getProducts();

          this.$swal.fire(
            '¡Eliminado!',
            'El producto ha sido eliminado',
            'success', 
          )
          console.log(res.data, "deletin");
            return res.data;
          })
         
        }
      })
    },

    fixStock(stock){ 
      var stockN;
      if (stock < 1) {
        stockN = "Sin stock";
      } else if (stock <=10) {
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
.v-data-table-header th {
  text-transform: uppercase;
  font-size: 13px !important;
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