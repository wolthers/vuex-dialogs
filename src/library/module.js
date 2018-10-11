import Deferred from "./utils/Deferred";

let deferred;

export default {
  namespaced: true,

  state: {
    customComponent: null,
    componentProps: null,
    componentType: null,
    visible: false
  },

  mutations: {
    SHOW(state, { component, props, type }) {
      state.componentProps = props;
      state.customComponent = component;
      state.componentType = type;
      state.visible = true;
    },
    HIDE(state, payload) {
      if (!deferred) {
        return;
      }
      const cancelStrategy = {
        alert: undefined,
        confirm: false,
        prompt: null
      };
      // Resolve promise with payload or - if omitted - a value that matches the cancel click of the
      // respective DOM apis (window.confirm | window.prompt | window.alert)
      deferred.resolve(payload || cancelStrategy[state.componentType]);
      deferred = null;
      state.visible = false;
      state.customComponent = null;
      state.componentProps = null;
      state.componentType = null;
    }
  },

  actions: {
    SHOW({ dispatch, commit }, { component, props, type }) {
      if (deferred) {
        // Hide any existing dialogs
        dispatch("HIDE");
      }

      deferred = new Deferred();
      commit("SHOW", { component, props, type });

      return deferred.promise;
    },
    HIDE({ commit }, payload) {
      commit("HIDE", payload);
    },
    // Shorthands
    PROMPT({ dispatch }, { component, props }) {
      return dispatch("SHOW", { component, props, type: "prompt" });
    },
    ALERT({ dispatch }, { component, props }) {
      return dispatch("SHOW", { component, props, type: "alert" });
    },
    CONFIRM({ dispatch }, { component, props }) {
      return dispatch("SHOW", { component, props, type: "confirm" });
    }
  }
};
