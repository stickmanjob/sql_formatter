<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  data () {
    return {
      val: 'こんにちは'
    }
  },
  methods: {
    inputforcus () {
      document.getElementById('input').focus()
    }
  },
  computed: {
    text: {
      get () {
        return this.$store.state.text
      },
      set (value) {
        this.$store.commit('updateText', value)
      }
    }
  },
  directives: {
    test: {
      bind: function (el) {
        console.log('bind')
      },
      inserted: function (el) {
        console.log('inserted')
      },
      update: function (el) {
        console.log('update')
      },
      componentUpdated: function (el) {
        console.log('component')
      },
      unbind: function () {
        console.log('unbind')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
