import VueRouter from "vue-router";
import routes from "./routes";
 

// configure router
const router = new VueRouter({ 
    mode: 'history',
    routes, // short for routes: routes
    linkExactActiveClass: "nav-item active"
});
 
router.beforeEach((to, from, next) => { 
 const bo = localStorage.getItem('bo')
  const user = localStorage.getItem('user')
  console.log(user);
  if (user || to.name === 'Login') {
    next()
    } else {
        next({ name: 'Login' });
    }
});

export default router;
