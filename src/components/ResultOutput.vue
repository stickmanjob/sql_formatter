<template>
  <div>
    <textarea v-model="formatting"></textarea>
  </div>
</template>

<script>
export default {
  name: 'ResultOutput',
  computed: {
    formatting () {
      return this.$store.getters.formatting
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
