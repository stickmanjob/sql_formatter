<template>
  <div>
    <textarea id="result" v-model="formatting" style="width:400px;height:300px" readonly></textarea>
  </div>
</template>

<script>
export default {
  name: 'ResultOutput',
  methods: {
    resultCopy: function () {
      document.getElementById('result').select()
      document.execCommand('copy')
    },
    preFormatting: function (strValue) {
      // 入力文字を半角スペース区切りで配列に格納(タブ、連続する半角スペース、改行は削除)
      console.log()
      return strValue.replace(/\r?\n+/g, ' ').replace(/\t/, ' ').replace(/\s{2,}/, ' ').split(' ')
    },
    // インデント調整
    indentFormatting: function (sentences) {
      let indentCount = 0
      let result
      result = sentences.map(sentence => {
        if ((/(\)\s*|END)/i).test(sentence)) {
          indentCount--
        }
        for (let i = 0; i < indentCount; i++) {
          sentence = '\t' + sentence
        }
        if ((/(^\($|CASE)/i).test(sentence)) {
          indentCount++
        }
        return sentence
      })
      return result
    }
  },
  computed: {
    formatting () {
      let inputText = this.$store.getters.getInputText // 入力文字
      let words = ''
      let beforeWord = ''
      let afterWord = ''
      let outputText = ''
      let sentences = ['']
      let sentenceIndex = 0
      let breakDiv = true
      let spacedDiv = false
      /* eslint-disable */
      let indentCount = 0
      // **************************************************************
      // ■ keywordsオブジェクト使われ方
      // ・単語がvalueの値と一致した場合「改行」、「行間」について判定される
      //   次の単語がnoBreakWordsと一致した場合改行しない
      //   前の単語がspacedWordsと一致した場合行間を開ける(追加で改行する)
      // **************************************************************
      const keywords = {
        operator: {value: /^[=+<>\-%!]{1,2}$/, noBreakWords: /^.*$/i, spacedWords: /^(?!.*)$/i},
        openParentheses: {value: /^\($/i, noBreakWords: /^(?!.*)$/i, spacedWords: /^(?!.*)$/i},
        closeParentheses: {value: /^\)$/i, noBreakWords: /^AS$/i, spacedWords: /^(?!.*)$/i},
        in: {value: /^IN$/i, noBreakWords: /^.*$/i, spacedWords: /^(?!.*)$/i},
        as: {value: /^AS$/i, noBreakWords: /^.*$/i, spacedWords: /^(?!.*)$/i},
        join: {value: /^JOIN$/i, noBreakWords: /^[^\()]*$/i, spacedWords: /^(?!.*)$/i},
        AggregateFnc: {value: /^(MAX|AVG|COUNT|MIN|SUM)$/i, noBreakWords: /^.*$/i, spacedWords: /^(?!.*)$/i},        
        select: {value: /^SELECT$/i, noBreakWords: /^(TOP|DISTINCT)$/i, spacedWords: /^(UNION|ALL)$/i},
        from: {value: /^FROM$/i, noBreakWords: /^(?!.*)$/i, spacedWords: /^.*$/i},
        where: {value: /^WHERE$/i, noBreakWords: /^(?!.*)$/i, spacedWords: /^.*$/i},
        order: {value: /^ORDER$/i, noBreakWords: /^BY$/i, spacedWords: /^.*$/i},
        inner: {value: /^INNER$/i, noBreakWords: /^JOIN$/i, spacedWords: /^.*$/i},
        left: {value: /^LEFT$/i, noBreakWords: /^(OUTER|JOIN)$/i, spacedWords: /^.*$/i},
        outer: {value: /^OUTER$/i, noBreakWords: /^JOIN$/i, spacedWords: /^(?!.*)$/i},
        top: {value: /^TOP$/i, noBreakWords: /^.*$/i, spacedWords: /^(?!.*)$/i},
        union: {value: /^UNION$/i, noBreakWords: /^ALL$/i, spacedWords: /^.*$/i},
        full: {value: /^FULL$/i, noBreakWords: /^(OUTER|JOIN)$/i, spacedWords: /^.*$/i},
        case: {value: /^(WHEN|ELSE|THEN)/i, noBreakWords: /^.*/i, spacedWords: /^(?!.*)$/i},
        others: {value: /.*$/i, noBreakWords: /^([=,+,<,>,-,%,!]+|IN|BETWEEN|AS|ASC|DESC|THEN)$/i, spacedWords: /^(?!.*)$/i}
      }
      // 入力文字を単語ごとに配列に格納
      words = this.preFormatting(inputText)

      // 文字列整形スタート
      words.forEach((word, index, array) => {
        // 基本:単語毎に改行,行間は空けない
        breakDiv = true
        spacedDiv = false
        beforeWord = words[index - 1]
        afterWord = words[index + 1]
        for (let keyword of Object.keys(keywords)) {
          // console.log(keywords[keyword].value.test(word))
          if (keywords[keyword].value.test(word)) {
            // 前の単語が行間開ける語だった場合のみ追加で改行を行う
            if (keywords[keyword].spacedWords.test(beforeWord)) {
              spacedDiv = true
            }
            // 次の単語が改行禁止語だった場合のみ改行しない
            if (keywords[keyword].noBreakWords.test(afterWord)) {
              // console.log('word:' + word)
              // console.log('words[index + 1]:' + afterWord)
              // console.log('index:' + index)
              word = word + ' '
              breakDiv = false
            }
            if (spacedDiv === true || breakDiv === false) break
          }
        }
        // // インデントの減少
        // if (words[index] === ')') {
        //   indentCount--
        // }
        // 行間の追加
        if (spacedDiv) {
          // word = '\n' + word
          sentenceIndex++
          sentences[sentenceIndex] = ''
        }
        // // インデントを文に反映
        // if (indentCount > 0) {
        //   // 現在のインデントを削除
        //   sentences[sentenceIndex] = sentences[sentenceIndex].replace(/^\t*/i, '')
        //   for (let i = 0; i < indentCount; i++) {
        //     sentences[sentenceIndex] = '\t' + sentences[sentenceIndex]
        //   }
        // }
        // // インデントの追加
        // if (words[index] === '(') {
        //   indentCount++
        // }
        // 単語を文に追加
        sentences[sentenceIndex] = sentences[sentenceIndex] + word
        // 改行
        if (breakDiv) {
          // word = word + '\n'
          sentenceIndex++
          sentences[sentenceIndex] = ''
        }
        // outputText = outputText + word
        //console.log(sentences[sentenceIndex])
      })
      // console.log(sentences.join('\n'))
      sentences = this.indentFormatting(sentences)
      outputText = sentences.join('\n')
      return outputText
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
