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
      var inputText = this.$store.getters.getInputText // 入力文字
      var words = ''
      var beforeWord = ''
      var afterWord = ''
      var outputText = ''
      var sentense = ['']
      var sentenseIndex = 0
      var breakDiv = true
      var spacedDiv = false
      var indentCount = 0
      // **************************************************************
      // ■ keywordsオブジェクト使われ方
      // ・単語がvalueの値と一致した場合「改行」、「行間」について判定される
      //   次の単語がnoBreakWordsと一致した場合改行しない
      //   前の単語がspacedWordsと一致した場合行間を開ける(追加で改行する)
      // **************************************************************
      var keywords = {
        operator: {value: /^[=+<>\-%!]{1,2}$/, noBreakWords: /^.*$/i, spacedWords: /^(?!.*)$/i},
        openParentheses: {value: /^\($/i, noBreakWords: /^(?!.*)$/i, spacedWords: /^(?!.*)$/i},
        closeParentheses: {value: /^\)$/i, noBreakWords: /^AS$/i, spacedWords: /^(?!.*)$/i},
        as: {value: /^AS$/i, noBreakWords: /^.*$/i, spacedWords: /^(?!.*)$/i},
        select: {value: /^SELECT$/i, noBreakWords: /^(TOP|DISTINCT)$/i, spacedWords: /^(UNION|ALL)$/i},
        from: {value: /^FROM$/i, noBreakWords: /^(?!.*)$/i, spacedWords: /^(?!.*)$/i},
        where: {value: /^WHERE$/i, noBreakWords: /^(?!.*)$/i, spacedWords: /^.*$/i},
        inner: {value: /^INNER$/i, noBreakWords: /^JOIN$/i, spacedWords: /^.*$/i},
        left: {value: /^LEFT$/i, noBreakWords: /^(OUTER|JOIN)$/i, spacedWords: /^.*$/i},
        outer: {value: /^OUTER$/i, noBreakWords: /^JOIN$/i, spacedWords: /^(?!.*)$/i},
        top: {value: /^TOP$/i, noBreakWords: /^.*$/i, spacedWords: /^(?!.*)$/i},
        union: {value: /^UNION$/i, noBreakWords: /^.*$/i, spacedWords: /^.*$/i},
        full: {value: /^FULL$/i, noBreakWords: /^(OUTER|JOIN)$/i, spacedWords: /^.*$/i},
        others: {value: /.*$/i, noBreakWords: /^([=,+,<,>,-,%,!]+|AS)$/i, spacedWords: /^(?!.*)$/i}
      }
      // 入力文字列を整えて、単語ごとに配列に格納(半角スペース区切り)
      words = inputText.replace(/\n+/, ' ').replace(/\s+/, ' ').split(' ')
      // 文字列整形スタート
      words.forEach((word, index, array) => {
        // 基本:単語毎に改行,行間は空けない
        breakDiv = true
        spacedDiv = false
        beforeWord = words[index - 1]
        afterWord = words[index + 1]
        for (let keyword of Object.keys(keywords)) {
          console.log(keywords[keyword].value.test(word))
          if (keywords[keyword].value.test(word)) {
            // 前の単語が行間開ける語だった場合のみ追加で改行を行う
            if (keywords[keyword].spacedWords.test(beforeWord)) {
              spacedDiv = true
            }
            // 次の単語が改行禁止語だった場合のみ改行しない
            if (keywords[keyword].noBreakWords.test(afterWord)) {
              console.log('word:' + word)
              console.log('words[index + 1]:' + afterWord)
              console.log('index:' + index)
              word = word + ' '
              breakDiv = false
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
          sentense[sentenseIndex] = sentense[sentenseIndex].replace(/^\t*/i, '')
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
