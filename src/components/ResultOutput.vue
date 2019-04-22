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
      var inputText = this.$store.getters.getInputText
      var words = inputText.split(' ')
      var outputText = ''
      var breakDiv = true
      var spacedDiv = false
      var indentCount = 0
      var keywords = {
        equal: {value: '=', noBreakWords: ['#ALL'], spacedWords: []},
        openParentheses: {value: '(', noBreakWords: [], spacedWords: []},
        closeParentheses: {value: ')', noBreakWords: ['AS'], spacedWords: []},
        as: {value: 'AS', noBreakWords: ['#ALL'], spacedWords: []},
        select: {value: 'SELECT', noBreakWords: ['TOP', 'DISTINCT'], spacedWords: []},
        from: {value: 'FROM', noBreakWords: [], spacedWords: []},
        where: {value: 'WHERE', noBreakWords: [], spacedWords: ['#ALL']},
        inner: {value: 'INNER', noBreakWords: ['JOIN'], spacedWords: ['#ALL']},
        left: {value: 'LEFT', noBreakWords: ['OUTER', 'JOIN'], spacedWords: ['#ALL']},
        outer: {value: 'OUTER', noBreakWords: ['JOIN'], spacedWords: []},
        top: {value: 'TOP', noBreakWords: ['#ALL'], spacedWords: []},
        full: {value: 'FULL', noBreakWords: ['OUTER', 'JOIN'], spacedWords: ['#ALL']},
        others: {value: '#ALL', noBreakWords: ['=', 'AS'], spacedWords: []}
      }
      words.forEach((word, index, array) => {
        // 基本:単語毎に改行,行間は空けない
        breakDiv = true
        spacedDiv = false
        for (let keyword of Object.keys(keywords)) {
          // console.log(word + '\n')
          // console.log(keywords[keyword].value + '\n')
          // console.log(word === keywords[keyword].value)
          if (word === keywords[keyword].value || keywords[keyword].value === '#ALL') {
            for (let spacedWord of keywords[keyword].spacedWords) {
              // 前の単語が行間開ける語だった場合のみ追加で改行を行う
              if (words[index - 1] === spacedWord || spacedWord === '#ALL') {
                console.log('aaa')
                spacedDiv = true
                break
              }
            }
            for (let noBreakWord of keywords[keyword].noBreakWords) {
              // 次の単語が改行禁止語だった場合のみループを抜けて改行しない
              if (words[index + 1] === noBreakWord || noBreakWord === '#ALL') {
                word = word + ' '
                breakDiv = false
                break
              }
            }
          }
        }
        if (words[index] === '(') {
          indentCount++
        }
        if (words[index + 1] === ')') {
          indentCount--
        }
        if (indentCount > 0) {
          for (var i = 0; i < indentCount; i++) {
            words[index + 1] = '\t' + words[index + 1]
          }
        }
        if (spacedDiv) {
          word = '\n' + word
        }
        if (breakDiv) {
          word = word + '\n'
        }
        outputText = outputText + word
      })
      return outputText
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
