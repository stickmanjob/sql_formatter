<template>
  <div>
    <textarea v-model="text"></textarea>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  computed: {
    text: {
      get () {
        return this.$store.state.text
      },
      set (value) {
        this.$store.commit('updateText', value)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
