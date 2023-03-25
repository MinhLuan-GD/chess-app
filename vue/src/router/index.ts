import { Routes } from "@/utils/constants";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },

  // route
  {
    path: Routes.GAME,
    name: "game",
    component: () => import("../views/GameView.vue"),
  },

  {
    path: Routes.GAME_OPTION,
    name: "game-option",
    component: () => import("../views/GameOptionView.vue"),
  },

  {
    path: Routes.LISTGAME,
    name: "listgame",
    component: () => import("../views/ListGameView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    document.getElementById("app")?.scrollIntoView();
  },
});

export default router;
