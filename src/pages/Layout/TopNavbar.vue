<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">{{ $route.name }}</h3>
      </div>
      <div class="md-toolbar-section-end">
             <div class="md-collapse">
          <!-- <div class="md-autocomplete">
            <md-autocomplete
              class="search"
              v-model="selectedEmployee"
              :md-options="employees"
            >
              <label>Búsqueda</label>
            </md-autocomplete>
          </div> -->
          <md-list>
           
            <li class="md-list-item">
              <a
                class="md-list-item-router md-list-item-container md-button-clean dropdown"
              >
                <div class="md-list-item-content">
                   
                  <md-button
                    slot="title"
                    class="md-button md-just-icon md-simple"
                    @click="logOut()"
                  >
                    <h4>Salir</h4>
                    <md-icon>exit_to_app</md-icon>
                  </md-button>
                </div>
              </a>
            </li>
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
import router from "@/routes/index";

export default {
  data() {
    return {
      selectedEmployee: null,
      employees: [
        "Jim Halpert",
        "Dwight Schrute",
        "Michael Scott",
        "Pam Beesly",
        "Angela Martin",
        "Kelly Kapoor",
        "Ryan Howard",
        "Kevin Malone",
      ],
    };
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },

    logOut(){
      localStorage.clear();
      router.push({ name: "Login" }).catch(e => {
        console.log(e);
      });
    }
  },
};
</script>

<style lang="css"></style>
