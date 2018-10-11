import Vue from "vue";
import Vuex from "vuex";
import { module } from "@/library";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    dialog: module
  }
});
