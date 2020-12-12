import Vue from 'vue'
import Vuex from 'vuex'
import reminder from './modules/reminder';

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    reminder,
  },
  strict: debug,
});
