<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/ventas">
        <v-icon color="white" size="25">mdi-cart</v-icon>
        <p>Ventas</p>
      </sidebar-link>
      <sidebar-link to="/dashboard">
        <v-icon color="white" size="25">mdi-view-dashboard</v-icon>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/productos">
        <v-icon color="white" size="25">mdi-package-variant-closed</v-icon>
        <p>Productos</p>
      </sidebar-link>
     
     <!--  <sidebar-link to="/proveedores">
        <v-icon color="white" size="25">mdi-account-group</v-icon>
        <p>Créditos</p>
      </sidebar-link>-->
      <sidebar-link to="/compras">
        <v-icon color="white" size="25">mdi-cash-check</v-icon>
        <p>Compras</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content> </dashboard-content>
    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";

import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";


export default {
  components: {
    TopNavbar,
    DashboardContent,
    MobileMenu,
    //FixedPlugin,
  },
  data() {
    return {
      sidebarBackground: "green",
      sidebarBackgroundImage: require("@/assets/img/paradise.jpg"),
    };
  },
};
</script>
