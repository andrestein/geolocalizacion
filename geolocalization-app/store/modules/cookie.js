import VueCookie from "vue-cookie";
import config from "@/assets/js/config";

/**
 * STORE unicamente para manipular los datos del store y las cookies
 */

const state = {
  token: null,
};

const mutations = {
  /**
   * Reinicia el storage y las cookies de Vue
   * @param {Variable que hace referencia al storage de vue} state 
   */
  resetCookie(state) {
    state.token = null;
    localStorage.removeItem(config.cookie.token);
    let keys = Object.keys(config.cookie);
    keys.forEach(item => {
      VueCookie.delete(config.cookie[item]);
    });
    console.log("se elimino el storage")
  },
  /**
   * Setea la informacion del token en las cookies y en el storage de Vue
   * @param {Variable que hace referencia al storage de vue} state 
   * @param {Objeto que contiene la informacion del token a guardar} user 
   */
  setheader(state, user) {
    try {
      state.token = user.access_token;
      localStorage.setItem(config.cookie.token, user.access_token);
      VueCookie.set(config.cookie.token, user.access_token, user.expire + "min");
    } catch (error) {
      console.log(error);
    }
  },
  setStateCookie(state, item) {
    state[item.key] = item.value;
    if (item.value) VueCookie.set(item.key, item.value);
    else VueCookie.delete(item.key);
  }
};

const getters = {
  getStateCookie: state => key => {
    try {
      if (key == config.cookie.token) {
        return localStorage.getItem(config.cookie.token);
      } else {
        let data = state[key];
        if (data) state[key] = VueCookie.get(key);
        return VueCookie.get(key);
      }
    } catch (error) {
      console.log(error);
    }
  },
  getHeader(state) {
    try {
      state.token = localStorage.getItem(config.cookie.token);
      if (!state.token) state.token = VueCookie.get(config.cookie.token);
      return {
        Authorization: `Bearer ${state.token}`
      };
    } catch (error) { }
  },
  getCookie: state => key => {
    let data = state[key]
    if (!data) {
      data = VueCookie.get(key)
      state[key] = data
    }
    return data
  }
};

const actions = {};

export default {
  state,
  getters,
  actions,
  mutations
};
