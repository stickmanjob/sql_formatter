<template>
  <div>
    <h1>Home</h1>
    <el-button type="primary" icon="el-icon-document-copy" @click="resultCopy">copy</el-button>
    <text-input></text-input>
    <result-output ref="result"></result-output>
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
  methods: {
    resultCopy: function () {
      this.$refs.result.resultCopy()
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
