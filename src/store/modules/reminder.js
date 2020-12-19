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
  removeReminder({ commit }, reminder) {
    commit('deleteReminder', reminder);
  },
}

// Mutations
const mutations = {
  setReminder(state, reminder) {
    state.reminders.push(reminder);
  },
  deleteReminder(state, reminder) {
    const index = state.reminders.findIndex(e => e.title === reminder.title);
    state.reminders.splice(index, 1);
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
