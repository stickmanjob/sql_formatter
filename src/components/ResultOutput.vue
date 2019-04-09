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
      var keywords = {
        equal: {value: '=', noBreakWords: ['#ANY'], spacedWords: []},
        select: {value: 'SELECT', noBreakWords: ['TOP', 'DISTINCT'], spacedWords: []},
        from: {value: 'FROM', noBreakWords: [], spacedWords: []},
        where: {value: 'WHERE', noBreakWords: [], spacedWords: ['#ANY']},
        top: {value: 'TOP', noBreakWords: ['#ANY'], spacedWords: []}
      }
      words.forEach((word, index, array) => {
        // 基本:単語毎に改行,行間は空けない
        breakDiv = true
        spacedDiv = false
        for (let keyword of Object.keys(keywords)) {
          // console.log(word + '\n')
          // console.log(keywords[keyword].value + '\n')
          // console.log(word === keywords[keyword].value)
          if (word === keywords[keyword].value) {
            console.log(keywords[keyword].spacedWords[0])
            for (let spacedWord of keywords[keyword].spacedWords) {
              // 前の単語が行間開ける語だった場合のみ追加で改行を行う
              if (words[index - 1] === spacedWord || spacedWord === '#ANY') {
                console.log('aaa')
                spacedDiv = true
                break
              }
            }
            for (let noBreakWord of keywords[keyword].noBreakWords) {
              // 次の単語が改行禁止語だった場合のみループを抜けて改行しない
              if (words[index + 1] === noBreakWord || noBreakWord === '#ANY') {
                word = word + ' '
                breakDiv = false
                break
              }
            }
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
