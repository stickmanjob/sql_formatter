<template>
  <div>
    <h1>Home</h1>
    <el-button type="primary" icon="el-icon-document-copy" @click="resultCopy">copy</el-button>
    <el-button type="primary" icon="el-icon-document-checked" >save</el-button>
    <text-input ref="input"></text-input>
    <result-output ref="result"></result-output>
    <list-test></list-test>
  </div>
</template>

<script>
import TextInput from '@/components/TextInput'
import ResultOutput from '@/components/ResultOutput'
import ListTest from '@/components/ListTest'
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
      this.$refs.input.inputforcus()
    }
  },
  components: {
    'text-input': TextInput,
    'result-output': ResultOutput,
    'list-test': ListTest
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
