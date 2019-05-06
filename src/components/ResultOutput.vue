<template>
  <div>
    <textarea id="result" v-model="formatting" readonly></textarea>
  </div>
</template>

<script>
export default {
  name: 'ResultOutput',
  methods: {
    resultCopy: function () {
      document.getElementById('result').select()
      document.execCommand('copy')
    }
  },
  computed: {
    formatting () {
      var inputText = this.$store.getters.getInputText
      var words = inputText.split(' ')
      var outputText = ''
      var sentense = ['']
      var sentenseIndex = 0
      var breakDiv = true
      var spacedDiv = false
      var indentCount = 0
      // **************************************************************
      // ■ keywordsオブジェクト使われ方
      // ・単語がvalueの値と一致した場合「改行」、「行間」について判定される
      //   次の単語がnoBreakWordsだった場合改行しない
      //   前の単語がspacedWordsだった場合行間を開ける(追加で改行する)
      // **************************************************************
      var keywords = {
        equal: {value: '=', noBreakWords: ['#ALL'], spacedWords: []},
        openParentheses: {value: '(', noBreakWords: [], spacedWords: []},
        closeParentheses: {value: ')', noBreakWords: ['AS'], spacedWords: []},
        as: {value: 'AS', noBreakWords: ['#ALL'], spacedWords: []},
        select: {value: 'SELECT', noBreakWords: ['TOP', 'DISTINCT'], spacedWords: ['UNION', 'ALL']},
        from: {value: 'FROM', noBreakWords: [], spacedWords: []},
        where: {value: 'WHERE', noBreakWords: [], spacedWords: ['#ALL']},
        inner: {value: 'INNER', noBreakWords: ['JOIN'], spacedWords: ['#ALL']},
        left: {value: 'LEFT', noBreakWords: ['OUTER', 'JOIN'], spacedWords: ['#ALL']},
        outer: {value: 'OUTER', noBreakWords: ['JOIN'], spacedWords: []},
        top: {value: 'TOP', noBreakWords: ['#ALL'], spacedWords: []},
        union: {value: 'UNION', noBreakWords: ['ALL'], spacedWords: ['#ALL']},
        full: {value: 'FULL', noBreakWords: ['OUTER', 'JOIN'], spacedWords: ['#ALL']},
        others: {value: '#ALL', noBreakWords: ['=', 'AS'], spacedWords: []}
      }
      words.forEach((word, index, array) => {
        // 基本:単語毎に改行,行間は空けない
        breakDiv = true
        spacedDiv = false
        for (let keyword of Object.keys(keywords)) {
          if (word === keywords[keyword].value || keywords[keyword].value === '#ALL') {
            for (let spacedWord of keywords[keyword].spacedWords) {
              // 前の単語が行間開ける語だった場合のみ追加で改行を行う
              if (words[index - 1] === spacedWord || spacedWord === '#ALL') {
                spacedDiv = true
                break
              }
            }
            for (let noBreakWord of keywords[keyword].noBreakWords) {
              // 次の単語が改行禁止語だった場合のみ改行しない
              if (words[index + 1] === noBreakWord || noBreakWord === '#ALL') {
                console.log('word:' + word)
                console.log('words[index + 1]:' + words[index + 1])
                console.log('index:' + index)
                word = word + ' '
                breakDiv = false
                break
              }
            }
            if (spacedDiv === true || breakDiv === false) break
          }
        }
        // インデントの減少
        if (words[index] === ')') {
          indentCount--
        }
        // 行間の追加
        if (spacedDiv) {
          // word = '\n' + word
          sentenseIndex++
          sentense[sentenseIndex] = ''
        }
        // インデントを文に反映
        if (indentCount > 0) {
          // 現在のインデントを削除
          sentense[sentenseIndex] = sentense[sentenseIndex].replace(/^\t*/, '')
          for (var i = 0; i < indentCount; i++) {
            sentense[sentenseIndex] = '\t' + sentense[sentenseIndex]
          }
        }
        // インデントの追加
        if (words[index] === '(') {
          indentCount++
        }
        // 単語を文に追加
        sentense[sentenseIndex] = sentense[sentenseIndex] + word
        // 改行
        if (breakDiv) {
          // word = word + '\n'
          sentenseIndex++
          sentense[sentenseIndex] = ''
        }
        // outputText = outputText + word
        console.log(sentense[sentenseIndex])
      })
      console.log(sentense.join('\n'))
      outputText = sentense.join('\n')
      return outputText
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
