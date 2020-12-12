// Initial state
const state = () => ({
  reminders: [],
});

// Getters
const getters = {
  getReminders: (state) => state.reminders,
}

// Actions
const actions = {
  addRemminder({ commit }, reminder) {
    commit('setReminder', reminder);
  },
}

// Mutations
const mutations = {
  setReminder(state, reminder) {
    state.reminders.push(reminder);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
