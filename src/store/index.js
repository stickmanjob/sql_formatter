import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stepCount: 0,
    msg: '',
    impression: '',
    errorFlag: false
  },
  mutations: {
    setStepCount (state) {
      console.log('rootsetStepCount')
      state.stepCount++
      console.log(state.stepCount)
    }
  },
  getters: {
    formatting (state, getters) {
      state.msg = ''
      var tmp = state.impression.split(' ')
      tmp.forEach((value, index, array) => {
        state.msg = state.msg + value + '\n'
      })
      return state.msg
    }
  },
  modules: {
  }
})
