import VueRouter from "vue-router";
import routes from "./routes";
 

// configure router
const router = new VueRouter({  
    routes, // short for routes: routes
    linkExactActiveClass: "nav-item active",
});
 
router.beforeEach((to, from, next) => {  
  const user = localStorage.getItem("user");
  console.log(user, " user ");
  if (user || to.name === "Login") {
    next();
    } else {
        next({ name: "Login" });
    }
});

export default router;
