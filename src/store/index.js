import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    text: '',
    outputText: ''
  },
  mutations: {
    updateText (state, value) {
      state.text = value
    }
  },
  getters: {
    formatting (state) {
      state.outputText = ''
      var tmp = state.text.split(' ')
      tmp.forEach((value, index, array) => {
        state.outputText = state.outputText + value + '\n'
      })
      return state.outputText
    }
  },
  modules: {
  }
})
