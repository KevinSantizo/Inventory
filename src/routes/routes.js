import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import LoginPage from "@/pages/LoginPage.vue";
import DashboardPage from "@/pages/DashboardPage.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import IconsCompo from "@/pages/IconsCompo.vue";
import MapsCompo from "@/pages/MapsCompo.vue";
import Notifications from "@/pages/Notifications.vue";
 

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: DashboardPage,
      },
      {
        path: "productos",
        name: "Productos",
        component: UserProfile,
      },
      {
        path: "ventas",
        name: "Ventas",
        component: TableList,
      },
      {
        path: "proveedores",
        name: "Proveedores",
        component: Typography,
      },
      {
        path: "compras",
        name: "Compras",
        component: IconsCompo,
      },
      {
        path: "maps",
        name: "Maps",
        meta: {
          hideFooter: true,
        },
        component: MapsCompo,
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications,
      }, 
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage
  }
];

export default routes;
