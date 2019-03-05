<template>
  <div>
    <h1>Home</h1>
    <text-input></text-input>
    <result-output></result-output>
  </div>
</template>

<script>
import TextInput from '@/components/TextInput'
import ResultOutput from '@/components/ResultOutput'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    'text-input': TextInput,
    'result-output': ResultOutput
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
